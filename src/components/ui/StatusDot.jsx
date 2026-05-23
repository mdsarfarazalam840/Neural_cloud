export default function StatusDot({ rings = 1 }) {
  return (
    <div className="status-dot">
      <div className="core" />
      <div className="ring" />
      {rings > 1 && <div className="ring ring-2" />}
    </div>
  )
}
