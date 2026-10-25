import Item from "./kotak_pensil.jpg"
import Map from "./map.png"

export default function BuyPage() {
    return (
        <main style={{ backgroundColor: "transparent", boxShadow: "none", maxWidth: 1060, margin: "0 auto", padding: "8px 20px 40px" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 6, marginBottom: 16 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
                <p style={{ margin: 0, fontWeight: 700, color: "#111" }}>Bojongsoang, Bandung</p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 24 }}>
                <div style={{ flex: 1, maxWidth: 710, display: "flex", flexDirection: "column", gap: 36 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                        <section style={{ width: 280, flexShrink: 0 }}>
                            <div style={{ width: 280, height: 280, borderRadius: 16, overflow: "hidden" }}>
                                <img
                                    src={Item}
                                    alt="Tempat pensil dari kardus bekas"
                                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                />
                            </div>

                            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                                <img
                                    src={Item}
                                    alt="Tempat pensil dari kardus bekas"
                                    style={{ width: 70, height: 70, borderRadius: 8, objectFit: "cover" }}
                                />
                                <img
                                    src={Item}
                                    alt="Tempat pensil dari kardus bekas"
                                    style={{ width: 70, height: 70, borderRadius: 8, objectFit: "cover" }}
                                />
                            </div>
                        </section>

                        <section style={{ backgroundColor: "white", borderRadius: 16, padding: "22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                            <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "#333", lineHeight: 1 }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
                                    <circle cx="12" cy="5" r="1.8" />
                                    <circle cx="12" cy="12" r="1.8" />
                                    <circle cx="12" cy="19" r="1.8" />
                                </svg>
                            </div>

                            <h2 style={{ fontWeight: 700, color: "#111", margin: 0 }}>
                                Tempat Pensil dari Kardus Bekas
                            </h2>
                            <p style={{ fontSize: 28, fontWeight: 800, color: "#111", margin: "0 0 20px 0" }}>
                                Rp 10.000
                            </p>

                            <h3 style={{ fontWeight: 700, color: "#111", margin: "0 0 6px 0" }}>
                                Deskripsi produk
                            </h3>
                            <p style={{ color: "#444", margin: "0 0 14px 0" }}>
                                Tempat Pensil Daur Ulang yang terbuat dari Kardus bekas. Tempat pensil ini adalah variant Limited Edition.
                            </p>

                            <div style={{ borderBottom: "1px solid #eee", marginBottom: 14 }}></div>

                            <h3 style={{ fontWeight: 700, color: "#111", margin: "0 0 8px 0" }}>
                                Detail
                            </h3>
                            <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", rowGap: 6, fontSize: 12, marginBottom: 12 }}>
                                <span style={{ fontWeight: 700, color: "#111" }}>Kondisi</span>
                                <span style={{ color: "#333" }}>Bekas</span>
                                <span style={{ fontWeight: 700, color: "#111" }}>Merek</span>
                                <span style={{ color: "#333" }}>Florsi</span>
                                <span style={{ fontWeight: 700, color: "#111" }}>Warna</span>
                                <span style={{ color: "#333" }}>Merah</span>
                            </div>

                            <h3 style={{ fontWeight: 700, color: "#111", margin: "0 0 6px 0" }}>
                                Spesifikasi
                            </h3>
                            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: "#222", lineHeight: 1.8 }}>
                                <li>Kardus</li>
                                <li>Elegan</li>
                                <li>Awet</li>
                            </ul>

                            <div style={{ borderBottom: "1.5px solid #eee", margin: "18px 0" }}></div>

                            <h3 style={{ fontWeight: 700, color: "#111", margin: "0 0 10px 0" }}>
                                Informasi penjual
                            </h3>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#b3b3b3", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, fontWeight: 700, letterSpacing: 0.8 }}>
                                    MK
                                </div>
                                <span style={{ fontWeight: 600, color: "#222" }}>
                                    Halilintar Store
                                </span>
                            </div>

                            <p style={{ color: "#222", margin: "0 0 8px 0" }}>
                                Lokasi : Bojongsoang, Bandung
                            </p>

                            <div style={{ width: "100%", height: 125, borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", position: "relative", backgroundColor: "#f0f4f1" }}>
                                <img src={Map} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                            </div>

                            <div style={{ borderBottom: "1.5px solid #eee", margin: "18px 0" }}></div>

                            <h3 style={{ fontWeight: 700, color: "#111", margin: "0 0 10px 0" }}>
                                Pengiriman
                            </h3>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#222", marginBottom: 6 }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>Dikirim dari <strong>Kota Bandung</strong></span>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#222", marginBottom: 2 }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="1" y="3" width="15" height="13" />
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                    <circle cx="5.5" cy="18.5" r="2.5" />
                                    <circle cx="18.5" cy="18.5" r="2.5" />
                                </svg>
                                <strong>Ongkir Rp: 500</strong>
                            </div>
                            <p style={{ color: "#666", margin: "0 0 0 24px" }}>
                                Ekonomi &gt; Estimasi tiba 23 – 27 Aug
                            </p>
                        </section>
                    </div>

                    <div>
                        <h2 style={{ fontWeight: 700, color: "#111", margin: "0 0 16px 0" }}>
                            Ulasan pembeli
                        </h2>

                        <div style={{ backgroundColor: "white", borderRadius: 16, padding: "24px 32px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#fbc02d">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                    <span style={{ fontSize: 24, fontWeight: 800, color: "#111" }}>5</span>
                                    <span style={{ fontSize: 18, color: "#888", fontWeight: 500 }}>/5</span>
                                </div>
                                <p style={{ fontWeight: 600, color: "#222", margin: "0 0 4px 0" }}>
                                    100% pelanggan merasa puas
                                </p>
                                <p style={{ color: "#888", margin: 0 }}>
                                    10 rating &nbsp; 5 ulasan
                                </p>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 220 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                                    <span style={{ color: "#fbc02d", fontSize: 13 }}>★</span>
                                    <span style={{ fontWeight: 600, color: "#222", width: 10 }}>5</span>
                                    <div style={{ flex: 1, height: 4, backgroundColor: "#e0e0e0", borderRadius: 4, overflow: "hidden" }}>
                                        <div style={{ width: "100%", height: "100%", backgroundColor: "#81c784" }}></div>
                                    </div>
                                    <span style={{ color: "#333", fontSize: 12 }}>(10)</span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                                    <span style={{ color: "#fbc02d", fontSize: 13 }}>★</span>
                                    <span style={{ fontWeight: 600, color: "#222", width: 10 }}>4</span>
                                    <div style={{ flex: 1, height: 4, backgroundColor: "#e0e0e0", borderRadius: 4 }}></div>
                                    <span style={{ color: "#333", fontSize: 12 }}>(0)</span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                                    <span style={{ color: "#fbc02d", fontSize: 13 }}>★</span>
                                    <span style={{ fontWeight: 600, color: "#222", width: 10 }}>3</span>
                                    <div style={{ flex: 1, height: 4, backgroundColor: "#e0e0e0", borderRadius: 4 }}></div>
                                    <span style={{ color: "#333", fontSize: 12 }}>(0)</span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                                    <span style={{ color: "#fbc02d", fontSize: 13 }}>★</span>
                                    <span style={{ fontWeight: 600, color: "#222", width: 10 }}>2</span>
                                    <div style={{ flex: 1, height: 4, backgroundColor: "#e0e0e0", borderRadius: 4 }}></div>
                                    <span style={{ color: "#333", fontSize: 12 }}>(0)</span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                                    <span style={{ color: "#fbc02d", fontSize: 13 }}>★</span>
                                    <span style={{ fontWeight: 600, color: "#222", width: 10 }}>1</span>
                                    <div style={{ flex: 1, height: 4, backgroundColor: "#e0e0e0", borderRadius: 4 }}></div>
                                    <span style={{ color: "#333", fontSize: 12 }}>(0)</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "flex-start", gap: 24, marginTop: 24 }}>
                            <div style={{ width: 160, flexShrink: 0 }}>
                                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: "0 0 16px 0" }}>
                                    Filter ulasan
                                </h3>

                                <p style={{ fontWeight: 700, color: "#111", margin: "0 0 10px 0" }}>
                                    Media
                                </p>
                                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#222", cursor: "pointer", marginBottom: 16 }}>
                                    <span style={{ width: 15, height: 15, border: "2px solid #222", borderRadius: 3, display: "inline-block" }}></span>
                                    <span>Dengan foto & vidio</span>
                                </label>

                                <p style={{ fontWeight: 700, color: "#111", margin: "0 0 10px 0" }}>
                                    Rating
                                </p>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <label key={star} style={{ display: "flex", alignItems: "center", gap: 8, color: "#222", cursor: "pointer" }}>
                                            <span style={{ width: 15, height: 15, border: "2px solid #222", borderRadius: 3, display: "inline-block" }}></span>
                                            <span style={{ color: "#fbc02d", fontSize: 13 }}>★</span>
                                            <span>{star}</span>
                                        </label>
                                    ))}
                                </div>

                                <p style={{ fontWeight: 700, color: "#111", margin: "0 0 10px 0" }}>
                                    Topik ulasan
                                </p>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    <label style={{ display: "flex", alignItems: "center", gap: 8, color: "#222", cursor: "pointer" }}>
                                        <span style={{ width: 15, height: 15, border: "2px solid #222", borderRadius: 3, display: "inline-block" }}></span>
                                        <span>Sesuai gambar</span>
                                    </label>
                                    {[1, 2, 3].map((idx) => (
                                        <label key={idx} style={{ display: "flex", alignItems: "center", gap: 8, color: "#222", cursor: "pointer" }}>
                                            <span style={{ width: 15, height: 15, border: "2px solid #222", borderRadius: 3, display: "inline-block" }}></span>
                                            <span>Pesanan tepat waktu</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div style={{ backgroundColor: "white", borderRadius: 16, padding: "24px 26px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)", flex: 1 }}>
                                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: "0 0 14px 0" }}>
                                    Foto dan video pembeli
                                </h3>
                                <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                                    {[1, 2, 3, 4].map((i) => (
                                        <img
                                            key={i}
                                            src={Item}
                                            alt={`Foto pembeli ${i}`}
                                            style={{ width: "23%", height: 86, borderRadius: 6, objectFit: "cover" }}
                                        />
                                    ))}
                                </div>

                                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: "0 0 6px 0" }}>
                                    Ulasan pilihan
                                </h3>
                                <p style={{ color: "#666", margin: "0 0 14px 0" }}>
                                    Menampilkan 10 dari 12 ulasan
                                </p>

                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                    <div style={{ display: "flex", gap: 2, color: "#fbc02d", fontSize: 13 }}>
                                        <span>★</span>
                                        <span>★</span>
                                        <span>★</span>
                                        <span>★</span>
                                        <span>★</span>
                                    </div>
                                    <span style={{ fontSize: 12, color: "#888" }}>
                                        4 hari yang lalu
                                    </span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                    <div style={{ width: 26, height: 26, borderRadius: "50%", backgroundColor: "#b3b3b3", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, letterSpacing: 0.8 }}>
                                        MK
                                    </div>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>
                                        Fauzein
                                    </span>
                                </div>

                                <p style={{ fontSize: 13, color: "#222", margin: "0 0 14px 0" }}>
                                    Bahan berkualitas bagus, mantap
                                </p>

                                <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                                    {[1, 2, 3, 4].map((i) => (
                                        <img
                                            key={i}
                                            src={Item}
                                            alt={`Lampiran ulasan ${i}`}
                                            style={{ width: "23%", height: 86, borderRadius: 6, objectFit: "cover" }}
                                        />
                                    ))}
                                </div>

                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                        </svg>
                                        <span style={{ fontWeight: 600, color: "#222" }}>
                                            Merasa terbantu?
                                        </span>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer", fontWeight: 600, color: "#222" }}>
                                        <span>Lihat Balasan</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ width: 300, flexShrink: 0, position: "sticky", top: 20 }}>
                    <section style={{ backgroundColor: "white", borderRadius: 20, padding: "24px 22px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column" }}>
                        <p style={{ fontWeight: 600, color: "#222", margin: "0 0 10px 0" }}>
                            Jumlah Pembelian
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", border: "1.5px solid #777", borderRadius: 6, padding: "3px 12px", width: 95, height: 32 }}>
                                <span style={{ color: "#d32f2f", fontSize: 18, fontWeight: 700, cursor: "pointer", userSelect: "none" }}>−</span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>1</span>
                                <span style={{ color: "#4caf50", fontSize: 18, fontWeight: 700, cursor: "pointer", userSelect: "none" }}>+</span>
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#222" }}>
                                Stok Sisa: 30
                            </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 20 }}>
                            <span style={{ fontWeight: 600, color: "#222" }}>Sub Total:</span>
                            <span style={{ fontSize: 22, fontWeight: 800, color: "#111" }}>Rp 10.000</span>
                        </div>

                        <p style={{ fontWeight: 600, color: "#222", margin: "0 0 8px 0" }}>
                            Kirim pesan ke penjual
                        </p>
                        <div style={{ backgroundColor: "#c5cbd1", borderRadius: 6, padding: "12px 14px", fontSize: 12, fontWeight: 600, color: "#222", marginBottom: 12 }}>
                            Apakah ini masih ada?
                        </div>

                        <button style={{ backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: 8, padding: "10px 0", fontWeight: 600, cursor: "pointer", width: "100%", marginBottom: 14 }}>
                            Kirim pesan
                        </button>

                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <button style={{ flex: 1, backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: 10, padding: "10px 12px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", height: 42 }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 11l4-7M19 11l-4-7M2 11h20M4 11l1.5 8a2 2 0 0 0 2 1.7h9a2 2 0 0 0 2-1.7L20 11" />
                                </svg>
                                <span>Masukkan keranjang</span>
                            </button>
                            <button style={{ width: 42, height: 42, backgroundColor: "#e53935", color: "white", border: "none", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                                </svg>
                            </button>
                        </div>
                    </section>
                </div>
            </div>

            <section style={{ marginTop: 48 }}>
                <h2 style={{ fontWeight: 700, color: "#111", margin: "0 0 18px 0" }}>
                    Rekomendasi barang Serupa
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
                    {[1, 2, 3, 4, 5].map((itemIndex) => (
                        <div
                            key={itemIndex}
                            style={{
                                backgroundColor: "white",
                                borderRadius: 14,
                                padding: 10,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <img
                                src={Item}
                                alt="Tempat pensil"
                                style={{ width: "100%", aspectRatio: "1/1", borderRadius: 10, objectFit: "cover", display: "block" }}
                            />

                            <div style={{ padding: "8px 2px 2px" }}>
                                <h3 style={{ fontSize: 13.5, fontWeight: 700, color: "#111", margin: "0 0 4px 0" }}>
                                    Tempat pensil
                                </h3>
                                <p style={{ fontSize: 14.5, fontWeight: 800, color: "#111", margin: "0 0 8px 0" }}>
                                    Rp 10.000
                                </p>

                                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "#666", marginBottom: 6 }}>
                                    <span style={{ color: "#fbc02d", fontSize: 13 }}>★</span>
                                    <span style={{ fontWeight: 600, color: "#333" }}>4.9</span>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
                                        <circle cx="9" cy="21" r="1" />
                                        <circle cx="20" cy="21" r="1" />
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                    </svg>
                                    <span style={{ fontSize: 11, color: "#888" }}>10rb+ terjual</span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#777" }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span>Bandung</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}