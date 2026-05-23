export default function ToggleSwitch({ active, onClick }) {
  return (
    <div
      className={`toggle-switch ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="knob" />
    </div>
  )
}
