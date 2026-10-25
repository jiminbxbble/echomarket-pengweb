import { useState } from "react";
import "./AddressPage.css";

const LABELS = ["Rumah", "Kantor", "Apartemen", "Kos", "Lainnya"];

const EMPTY_FORM = {
  label: "Rumah",
  nama: "",
  telepon: "",
  provinsi: "",
  kota: "",
  kecamatan: "",
  kelurahan: "",
  jalan: "",
  kodePos: "",
  utama: false,
};

const FIELDS = [
  { name: "nama", label: "Nama Penerima", autoComplete: "name" },
  { name: "telepon", label: "Nomor Telepon", type: "tel", inputMode: "numeric", autoComplete: "tel" },
  { name: "provinsi", label: "Provinsi" },
  { name: "kota", label: "Kota/Kabupaten" },
  { name: "kecamatan", label: "Kecamatan" },
  { name: "kelurahan", label: "Kelurahan/Desa" },
  { name: "jalan", label: "Jalan & Nomor Rumah", autoComplete: "street-address", wide: true },
  { name: "kodePos", label: "Kode Pos", inputMode: "numeric", maxLength: 5 },
];

function validate(f) {
  const e = {};
  if (!f.nama.trim()) e.nama = "Nama penerima wajib diisi";
  if (!f.telepon.trim()) e.telepon = "Nomor telepon wajib diisi";
  else if (!/^(\+62|62|0)8\d{7,11}$/.test(f.telepon.replace(/[\s-]/g, "")))
    e.telepon = "Gunakan nomor HP yang valid, contoh: 081234567890";
  if (!f.provinsi.trim()) e.provinsi = "Provinsi wajib diisi";
  if (!f.kota.trim()) e.kota = "Kota/Kabupaten wajib diisi";
  if (!f.kecamatan.trim()) e.kecamatan = "Kecamatan wajib diisi";
  if (!f.kelurahan.trim()) e.kelurahan = "Kelurahan/Desa wajib diisi";
  if (!f.jalan.trim()) e.jalan = "Jalan & nomor rumah wajib diisi";
  if (!/^\d{5}$/.test(f.kodePos)) e.kodePos = "Kode pos harus 5 digit";
  return e;
}

export default function AddressPage({ onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [saved, setSaved] = useState(false);

  const set = (name, value) => {
    setSaved(false);
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      setErrors(validate({ ...form, [name]: value }));
    }
  };

  const blur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    setTouched(Object.fromEntries(FIELDS.map((f) => [f.name, true])));
    if (Object.keys(e).length) {
      document.querySelector(".em-field.em-has-error input")?.focus();
      return;
    }

    onSubmit ? onSubmit(form) : console.log("Alamat disimpan:", form);
    setSaved(true);
    setForm(EMPTY_FORM);
    setTouched({});
    setErrors({});
  };

  return (
    <div className="em-page">
      <div className="em-main">
        <h1>Tambah alamat baru</h1>

        <div className="em-layout">
          <form className="em-card" onSubmit={handleSubmit} noValidate>
            <div className="em-field">
              <label htmlFor="label">Label Alamat</label>
              <select id="label" value={form.label} onChange={(e) => set("label", e.target.value)}>
                {LABELS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>

            <div className="em-grid">
              {FIELDS.map((f) => (
                <div
                  key={f.name}
                  className={`em-field${f.wide ? " em-wide" : ""}${touched[f.name] && errors[f.name] ? " em-has-error" : ""}`}
                >
                  <label htmlFor={f.name}>{f.label}</label>
                  <input
                    id={f.name}
                    type={f.type || "text"}
                    inputMode={f.inputMode}
                    maxLength={f.maxLength}
                    autoComplete={f.autoComplete}
                    value={form[f.name]}
                    onChange={(e) =>
                      set(f.name, f.name === "kodePos" ? e.target.value.replace(/\D/g, "") : e.target.value)
                    }
                    onBlur={() => blur(f.name)}
                    aria-invalid={!!(touched[f.name] && errors[f.name])}
                  />
                  {touched[f.name] && errors[f.name] && <small role="alert">{errors[f.name]}</small>}
                </div>
              ))}
            </div>

            <div className="em-actions">
              <label className="em-switch">
                <input type="checkbox" checked={form.utama} onChange={(e) => set("utama", e.target.checked)} />
                <span className="em-track" aria-hidden="true" />
                Jadikan Alamat Utama
              </label>
              <button type="submit" className="em-btn-primary">
                <span aria-hidden="true">+</span> Tambah alamat
              </button>
            </div>

            {saved && (
              <p className="em-success" role="status">
                Alamat berhasil ditambahkan.
              </p>
            )}
          </form>

        </div>
      </div>
    </div>
  );
}
