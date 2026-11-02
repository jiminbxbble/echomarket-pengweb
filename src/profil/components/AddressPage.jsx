import { useEffect, useState } from "react";
import "./AddressPage.css";

const STORAGE_KEY = "echomarket_alamat";
const DEFAULT_MAP = "Bandung, Jawa Barat, Indonesia";
const LABELS = ["Rumah", "Kantor", "Apartemen", "Kos", "Lainnya"];

const EMPTY_FORM = {
  label: "Rumah", nama: "", telepon: "", 
  provinsi: "", kota: "", kecamatan: "", kelurahan: "", 
  jalan: "", kodePos: "", utama: false,
};

const FIELDS = [
  { name: "nama", label: "Nama Penerima", autoComplete: "name" },
  { name: "telepon", label: "Nomor Telepon", type: "tel", inputMode: "numeric", autoComplete: "tel" },
  { name: "provinsi", label: "Provinsi", isRegion: true },
  { name: "kota", label: "Kota/Kabupaten", isRegion: true },
  { name: "kecamatan", label: "Kecamatan", isRegion: true },
  { name: "kelurahan", label: "Kelurahan/Desa", isRegion: true },
  { name: "jalan", label: "Jalan & Nomor Rumah", autoComplete: "street-address", wide: true },
  { name: "kodePos", label: "Kode Pos", inputMode: "numeric", maxLength: 5 },
];

const titleCase = (str) => {
  if (!str) return "";
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

function validate(f) {
  const e = {};
  if (!f.nama.trim()) e.nama = "Nama penerima wajib diisi";
  if (!f.telepon.trim()) e.telepon = "Nomor telepon wajib diisi";
  else if (!/^(\+62|62|0)8\d{7,11}$/.test(f.telepon.replace(/[\s-]/g, "")))
    e.telepon = "Gunakan nomor HP yang valid, contoh: 081234567890";
  if (!f.provinsi.trim()) e.provinsi = "Provinsi wajib dipilih";
  if (!f.kota.trim()) e.kota = "Kota/Kabupaten wajib dipilih";
  if (!f.kecamatan.trim()) e.kecamatan = "Kecamatan wajib dipilih";
  if (!f.kelurahan.trim()) e.kelurahan = "Kelurahan/Desa wajib dipilih";
  if (!f.jalan.trim()) e.jalan = "Jalan & nomor rumah wajib diisi";
  if (!/^\d{5}$/.test(f.kodePos)) e.kodePos = "Kode pos harus 5 digit";
  return e;
}

export default function AddressPage() {
  const [view, setView] = useState("list"); 
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [notice, setNotice] = useState("");
  const [mapQuery, setMapQuery] = useState(DEFAULT_MAP);

  const [regions, setRegions] = useState({ provinsi: [], kota: [], kecamatan: [], kelurahan: [] });
  const [loadingLevel, setLoadingLevel] = useState(""); 
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    if (notice) {
      const timer = setTimeout(() => setNotice(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notice]);

  const getRegionName = (levelName) => {
    const regionData = regions[levelName].find((r) => r.id === form[levelName]);
    return regionData ? titleCase(regionData.name) : "";
  };

  const namaProvinsi = getRegionName("provinsi");
  const namaKota = getRegionName("kota");
  const namaKecamatan = getRegionName("kecamatan");
  const namaKelurahan = getRegionName("kelurahan");

  useEffect(() => {
    const textPeta = [form.jalan, namaKelurahan, namaKecamatan, namaKota, namaProvinsi]
      .filter((s) => s.trim() !== "")
      .join(", ");
    
    if (textPeta) {
      const timer = setTimeout(() => setMapQuery(textPeta), 700);
      return () => clearTimeout(timer);
    }
  }, [form.jalan, namaKelurahan, namaKecamatan, namaKota, namaProvinsi]);

  const loadRegion = async (level, path) => {
    setLoadingLevel(level);
    setApiError(false);
    try {
      const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/${path}.json`);
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      
      setRegions((prev) => ({ ...prev, [level]: data }));
    } catch (err) {
      console.error(err);
      setApiError(true);
    } finally {
      setLoadingLevel("");
    }
  };

  const pickRegion = (levelName, id) => {
    let nextForm = { ...form, [levelName]: id };
    let nextRegions = { ...regions };

    if (levelName === "provinsi") {
      nextForm.kota = ""; nextForm.kecamatan = ""; nextForm.kelurahan = "";
      nextRegions.kota = []; nextRegions.kecamatan = []; nextRegions.kelurahan = [];
      if (id) loadRegion("kota", `regencies/${id}`);
    } 
    else if (levelName === "kota") {
      nextForm.kecamatan = ""; nextForm.kelurahan = "";
      nextRegions.kecamatan = []; nextRegions.kelurahan = [];
      if (id) loadRegion("kecamatan", `districts/${id}`);
    } 
    else if (levelName === "kecamatan") {
      nextForm.kelurahan = "";
      nextRegions.kelurahan = [];
      if (id) loadRegion("kelurahan", `villages/${id}`);
    }

    setForm(nextForm);
    setRegions(nextRegions);
    
    if (touched[levelName]) {
      setErrors(validate(nextForm));
    }
  };

  const isRegionDisabled = (levelName) => {
    if (levelName === "kota") return !form.provinsi;
    if (levelName === "kecamatan") return !form.kota;
    if (levelName === "kelurahan") return !form.kecamatan;
    return false;
  };

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
    if (touched[name]) {
      setErrors(validate({ ...form, [name]: value }));
    }
  };

  const handleBlur = (name) => {
    setTouched({ ...touched, [name]: true });
    setErrors(validate(form));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const currentErrors = validate(form);
    setErrors(currentErrors);
    
    const allTouched = {};
    FIELDS.forEach((f) => { allTouched[f.name] = true; });
    setTouched(allTouched);

    const adaError = Object.keys(currentErrors).length > 0;
    if (adaError) return; 

    const newAddress = { 
      ...form, 
      namaProvinsi, namaKota, namaKecamatan, namaKelurahan,
      id: Date.now(), 
      utama: form.utama || addresses.length === 0 
    };

    setAddresses((prevAddresses) => {
      let updatedAddresses = [...prevAddresses];
      
      if (newAddress.utama) {
        updatedAddresses = updatedAddresses.map((a) => ({ ...a, utama: false }));
      }
      updatedAddresses.push(newAddress);
      return updatedAddresses;
    });

    setNotice("Alamat berhasil ditambahkan");
    setView("list");
  };

  const openForm = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setTouched({});
    setMapQuery(DEFAULT_MAP);
    if (regions.provinsi.length === 0) {
      loadRegion("provinsi", "provinces");
    }
    setView("form");
  };

  const setUtama = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, utama: a.id === id })));
  };

  const removeAddress = (id) => {
    if (!window.confirm("Hapus alamat ini?")) return;
    
    setAddresses((prev) => {
      const sisa = prev.filter((a) => a.id !== id);
      
      if (sisa.length > 0 && !sisa.some((a) => a.utama)) {
        sisa[0].utama = true;
      }
      return sisa;
    });
  };

  const sortedAddresses = [...addresses].sort((a, b) => (a.utama === b.utama ? 0 : a.utama ? -1 : 1));

  if (view === "form") {
    return (
      <div className="em-page">
        <button type="button" className="em-back" onClick={() => setView("list")}>
          ← Kembali
        </button>
        <h1>Alamat Baru</h1>

        <div className="em-layout">
          <form onSubmit={handleSubmit} noValidate>
            <div className="em-field">
              <label htmlFor="em-label">Label Alamat</label>
              <select id="em-label" value={form.label} onChange={(e) => handleChange("label", e.target.value)}>
                {LABELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {apiError && (
              <p className="em-api-error">
                Data wilayah gagal dimuat. Periksa koneksi internet kamu.
              </p>
            )}

            <div className="em-grid">
              {FIELDS.map((f) => {
                let fieldClass = "em-field";
                if (f.wide) fieldClass += " em-wide";
                if (touched[f.name] && errors[f.name]) fieldClass += " em-has-error";

                return (
                  <div key={f.name} className={fieldClass}>
                    <label htmlFor={`em-${f.name}`}>{f.label}</label>
                    
                    {f.isRegion ? (
                      <select
                        id={`em-${f.name}`}
                        value={form[f.name]}
                        disabled={isRegionDisabled(f.name)}
                        onChange={(e) => pickRegion(f.name, e.target.value)}
                        onBlur={() => handleBlur(f.name)}
                      >
                        <option value="">
                          {loadingLevel === f.name ? "Memuat data..." : `Pilih ${f.label.toLowerCase()}`}
                        </option>
                        {regions[f.name].map((r) => (
                          <option key={r.id} value={r.id}>{titleCase(r.name)}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={`em-${f.name}`}
                        type={f.type || "text"}
                        inputMode={f.inputMode}
                        maxLength={f.maxLength}
                        autoComplete={f.autoComplete}
                        value={form[f.name]}
                        onChange={(e) => {
                          const val = f.name === "kodePos" ? e.target.value.replace(/\D/g, "") : e.target.value;
                          handleChange(f.name, val);
                        }}
                        onBlur={() => handleBlur(f.name)}
                      />
                    )}
                    {touched[f.name] && errors[f.name] && <small>{errors[f.name]}</small>}
                  </div>
                );
              })}
            </div>

            <div className="em-actions">
              <label className="em-switch">
                <input
                  type="checkbox"
                  checked={form.utama || addresses.length === 0}
                  disabled={addresses.length === 0}
                  onChange={(e) => handleChange("utama", e.target.checked)}
                />
                <span className="em-track" />
                Jadikan Alamat Utama
              </label>
              <div className="em-buttons">
                <button type="button" className="em-btn-o" onClick={() => setView("list")}>Batal</button>
                <button type="submit" className="em-btn">Simpan</button>
              </div>
            </div>
          </form>

          <div className="em-map">
            <iframe
              title="Peta lokasi alamat"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`}
              loading="lazy"
            />
            <div className="em-preview">
              <p>{form.jalan || "Jalan dan Nomor Rumah"}</p>
              <p>{namaKelurahan || "Kelurahan / Desa"}, {namaKecamatan || "Kecamatan"}</p>
              <p>{namaKota || "Kota / Kabupaten"}, {namaProvinsi || "Provinsi"}, {form.kodePos || "12345"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="em-page">
      <div className="em-head">
        <div>
          <h1>Alamat saya</h1>
          <p className="em-sub">Kelola alamat pengiriman untuk pesanan Anda</p>
        </div>
        {addresses.length > 0 && (
          <button type="button" className="em-btn" onClick={openForm}>+ Tambah Alamat Baru</button>
        )}
      </div>

      {notice && <p className="em-success">{notice}</p>}

      {addresses.length === 0 ? (
        <div className="em-empty">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p className="em-empty-title">Belum ada alamat yang ditambahkan</p>
          <p className="em-sub">Tambahkan alamat agar pesananmu bisa dikirim ke tujuan yang tepat.</p>
          <button type="button" className="em-btn" onClick={openForm}>+ Tambah Alamat Baru</button>
        </div>
      ) : (
        <ul className="em-list">
          {sortedAddresses.map((a) => (
            <li key={a.id} className="em-item">
              <div className="em-item-top">
                <span className="em-badge">{a.label}</span>
                {a.utama && <span className="em-badge em-badge-utama">Utama</span>}
              </div>
              <p className="em-who"><b>{a.nama}</b> | {a.telepon}</p>
              <p className="em-where">
                {a.jalan}, {a.namaKelurahan}, {a.namaKecamatan}, {a.namaKota}, {a.namaProvinsi} {a.kodePos}
              </p>
              <div className="em-item-actions">
                {!a.utama && (
                  <button type="button" className="em-link" onClick={() => setUtama(a.id)}>Jadikan utama</button>
                )}
                <button type="button" className="em-link em-danger" onClick={() => removeAddress(a.id)}>Hapus</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}