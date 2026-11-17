const PATHS = {
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></>,
  cart: <><circle cx="9" cy="20" r="1.2" /><circle cx="18" cy="20" r="1.2" /><path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6" /></>,
  basket: <path d="M5 11l4-7M19 11l-4-7M2 11h20M4 11l1.5 8a2 2 0 0 0 2 1.7h9a2 2 0 0 0 2-1.7L20 11" />,
  bell: <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />,
  chat: <><path d="M21 12a9 9 0 0 1-13.2 8L3 21l1.2-4.6A9 9 0 1 1 21 12z" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth="2.6" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />,
  pencil: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  bank: <path d="M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M3 10l9-6 9 6z" />,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4M12 15v2" /></>,
  box: <path d="M21 8l-9-5-9 5v8l9 5 9-5zM3.3 7.5L12 12.5l8.7-5M12 22V12.5" />,
  ticket: <path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4zM13 7v2M13 11v2M13 15v2" />,
}

export default function Icon({ name, size, color }) {
  return (
    <svg className="ic" viewBox="0 0 24 24" style={{ fontSize: size, color }} aria-hidden="true">
      {PATHS[name]}
    </svg>
  )
}
