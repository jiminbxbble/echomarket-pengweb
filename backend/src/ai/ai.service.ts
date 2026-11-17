import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { ChatRequestDto } from './dto/ai.dto';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
}

interface GroqResponse {
  choices?: Array<{
    message?: { content?: string };
  }>;
}

@Injectable()
export class AiService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async chat(dto: ChatRequestDto) {
    const kataKunci = dto.message
      .toLowerCase()
      .split(/\s+/)
      .filter((k) => k.length > 3)
      .slice(0, 4);

    // RAG-lite: ambil produk yang relevan dari database sebagai konteks LLM
    let produkKonteks = await this.prisma.product.findMany({
      where:
        kataKunci.length > 0
          ? {
              OR: kataKunci.flatMap((k) => [
                { nama: { contains: k, mode: 'insensitive' as const } },
                { kategoriId: { contains: k, mode: 'insensitive' as const } },
              ]),
            }
          : undefined,
      take: 6,
      orderBy: { terjual: 'desc' },
      select: {
        id: true,
        nama: true,
        harga: true,
        kategoriId: true,
        lokasi: true,
        rating: true,
        gambar: true,
      },
    });

    if (produkKonteks.length === 0) {
      produkKonteks = await this.prisma.product.findMany({
        take: 6,
        orderBy: { terjual: 'desc' },
        select: {
          id: true,
          nama: true,
          harga: true,
          kategoriId: true,
          lokasi: true,
          rating: true,
          gambar: true,
        },
      });
    }

    const katalogTeks = produkKonteks
      .map(
        (p) =>
          `- [ID:${p.id}] ${p.nama} | Kategori: ${p.kategoriId} | Harga: Rp ${p.harga.toLocaleString('id-ID')} | Lokasi: ${p.lokasi ?? '-'} | Rating: ${p.rating}`,
      )
      .join('\n');

    const systemPrompt = `Kamu adalah EchoBot, asisten AI ramah lingkungan untuk marketplace EchoMarket.
Tugasmu: membantu pengguna mencari produk daur ulang/bekas layak pakai, memberi tips daur ulang & keberlanjutan, serta merekomendasikan produk yang tersedia di katalog berikut.
Jawablah dengan ramah, ringkas, dan dalam bahasa Indonesia (atau ikuti bahasa pengguna).

Katalog Produk EchoMarket saat ini:
${katalogTeks || '(Katalog kosong)'}`;

    const geminiKey = this.config.get<string>('GEMINI_API_KEY')?.trim();
    if (geminiKey) {
      const reply = await this.panggilGemini(geminiKey, systemPrompt, dto);
      return {
        reply,
        recommendations: produkKonteks.slice(0, 3),
        mode: 'gemini' as const,
      };
    }

    const groqKey = this.config.get<string>('GROQ_API_KEY')?.trim();
    if (groqKey) {
      const reply = await this.panggilGroq(groqKey, systemPrompt, dto);
      return {
        reply,
        recommendations: produkKonteks.slice(0, 3),
        mode: 'groq' as const,
      };
    }

    // Fallback jika GEMINI_API_KEY / GROQ_API_KEY belum diisi
    const daftar = produkKonteks
      .slice(0, 3)
      .map((p) => `• ${p.nama} (Rp ${p.harga.toLocaleString('id-ID')})`)
      .join('\n');
    return {
      reply: `Halo! Saya EchoBot. Saat ini GEMINI_API_KEY belum diisi di server, namun berdasarkan katalog EchoMarket berikut rekomendasi produk ramah lingkungan yang cocok:\n${daftar}`,
      recommendations: produkKonteks.slice(0, 3),
      mode: 'fallback' as const,
    };
  }

  private async panggilGemini(
    apiKey: string,
    systemPrompt: string,
    dto: ChatRequestDto,
  ) {
    const model =
      this.config.get<string>('GEMINI_MODEL')?.trim() ||
      'gemini-flash-lite-latest';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const contents = [
      ...(dto.history ?? []).slice(-6).map((h) => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }],
      })),
      { role: 'user', parts: [{ text: dto.message }] },
    ];

    let res: Response;
    try {
      res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: { temperature: 0.6, maxOutputTokens: 512 },
        }),
        signal: AbortSignal.timeout(30_000),
      });
    } catch {
      throw new ServiceUnavailableException(
        'Koneksi ke layanan AI Gemini timeout atau terputus',
      );
    }

    if (!res.ok) {
      throw new ServiceUnavailableException(
        `Layanan AI Gemini gagal merespons (HTTP ${res.status})`,
      );
    }

    const data = (await res.json()) as GeminiResponse;
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'Maaf, EchoBot belum bisa menjawab saat ini.'
    );
  }

  private async panggilGroq(
    apiKey: string,
    systemPrompt: string,
    dto: ChatRequestDto,
  ) {
    const model =
      this.config.get<string>('GROQ_MODEL')?.trim() ||
      'llama-3.3-70b-versatile';

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...(dto.history ?? []).slice(-6),
          { role: 'user', content: dto.message },
        ],
        temperature: 0.6,
        max_tokens: 512,
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      throw new ServiceUnavailableException(
        `Layanan AI Groq gagal merespons (HTTP ${res.status})`,
      );
    }

    const data = (await res.json()) as GroqResponse;
    return (
      data.choices?.[0]?.message?.content?.trim() ||
      'Maaf, EchoBot belum bisa menjawab saat ini.'
    );
  }
}
