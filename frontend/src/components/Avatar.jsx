export default function Avatar({ src, className = '', onClick, size }) {
  return (
    <div
      className={`pic ${className}`}
      style={size ? { width: size, height: size } : undefined}
      onClick={onClick}
    >
      {src ? (
        <img src={src} alt="Foto profil" />
      ) : (
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="38" r="18" fill="#fff" />
          <ellipse cx="50" cy="92" rx="32" ry="26" fill="#fff" />
        </svg>
      )}
    </div>
  )
}
