import { motion } from 'motion/react'

export default function ToggleSwitch({ active, onClick }) {
  return (
    <motion.div
      className={`toggle-switch ${active ? 'active' : ''}`}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <div className="knob" />
    </motion.div>
  )
}
