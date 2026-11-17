import { ambilToken, keluarSesi } from '../auth/sesi'

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '')

async function request(method, path, body) {
  const headers = {}
  const token = ambilToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (res.status === 204) {
    return null
  }

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    if (res.status === 401 && token) {
      keluarSesi()
    }
    const pesan = Array.isArray(data?.message)
      ? data.message[0]
      : data?.message || `Permintaan gagal (HTTP ${res.status})`
    throw new Error(pesan)
  }

  return data
}

export const api = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  patch: (path, body) => request('PATCH', path, body),
  delete: (path) => request('DELETE', path),
}
