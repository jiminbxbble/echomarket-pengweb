// Helper sesi & autentikasi JWT di browser (sinkron dengan backend /api/auth).
const KUNCI = 'echomarket-sesi'

export function masukkanSesi(email, accessToken = null, user = null) {
  try {
    localStorage.setItem(
      KUNCI,
      JSON.stringify({
        email: user?.email ?? email,
        accessToken,
        user,
        waktu: Date.now(),
      }),
    )
  } catch {
    /* abaikan kalau browser memblokir storage */
  }
}

export function ambilSesi() {
  try {
    return JSON.parse(localStorage.getItem(KUNCI)) || null
  } catch {
    return null
  }
}

export function ambilToken() {
  return ambilSesi()?.accessToken || null
}

export function keluarSesi() {
  try {
    localStorage.removeItem(KUNCI)
  } catch {
    /* abaikan */
  }
}
