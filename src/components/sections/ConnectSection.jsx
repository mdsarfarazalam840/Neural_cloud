import { useState, useRef } from 'react'
import { motion } from 'motion/react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby5ZkL-gdJJODIVyYeyNKyE8LddCPry8hDATKR12F7IcNTD7fNhl2N-ReR-Q4aQwylYIw/exec'

function generateTxId() {
  const hex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  return Array.from({ length: 32 }, hex).join('').toUpperCase()
}

export default function ConnectSection() {
  const ref = useScrollReveal()
  const formRef = useRef(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const [txId, setTxId] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !message.trim()) return

    const id = generateTxId()
    setTxId(id)
    setStatus('sending')

    // Use form POST to a hidden iframe (bypasses CORS entirely)
    const form = formRef.current
    form.action = GOOGLE_SCRIPT_URL
    form.method = 'POST'
    form.target = 'hidden_iframe'
    form.submit()

    // Show success after 2s (enough for Google to process the POST)
    setTimeout(() => setStatus('success'), 2000)
  }

  function handleReset() {
    setStatus('idle')
    setName('')
    setEmail('')
    setMessage('')
    setTxId('')
  }

  return (
    <section id="connect" className="relative z-10 py-28 px-margin-mobile md:px-margin-desktop bg-background/20 backdrop-blur-[8px]">
      <div ref={ref} className="max-w-2xl mx-auto text-center reveal">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 bg-primary-fixed-dim rounded-full" />
          <span className="font-label-sm text-label-sm text-primary-fixed tracking-[0.3em] uppercase">
            // TRANSMIT_SIGNAL
          </span>
        </div>
        <h2 className="font-display-xl-mobile md:text-headline-lg text-headline-lg text-white mb-6">
          ESTABLISH_CONNECTION
        </h2>
        <p className="font-body-md text-on-surface-variant mb-12">
          Drop a signal. Our systems will decrypt and respond within one quantum cycle.
        </p>

        {status === 'success' ? (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 text-green-400">
              <span className="text-4xl">◈</span>
              <span className="font-display-sm text-headline-sm uppercase tracking-widest">
                TRANSMISSION_SENT
              </span>
            </div>
            <p className="font-body-md text-on-surface-variant max-w-md mx-auto">
              {message}
            </p>
            <div className="inline-block font-label-sm text-label-sm text-primary-fixed-dim tracking-widest bg-surface-dim/50 px-4 py-2 rounded">
              TX_ID: {txId}
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleReset}
                className="cyber-button px-8 py-3 bg-primary-fixed-dim text-on-primary font-body-md font-bold rounded uppercase tracking-widest"
              >
                TRANSMIT_ANOTHER
              </motion.button>
            </div>
          </div>
        ) : (
          <form ref={formRef} className="space-y-8 text-left" onSubmit={handleSubmit}>
            <div aria-hidden="true" className="absolute left-[-9999px] opacity-0">
              <input type="text" name="_honeypot" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="scan-input-wrap">
              <input
                type="text"
                name="name"
                className="scan-input"
                placeholder="SIGNAL_IDENTIFIER"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === 'sending'}
              />
              <div className="scan-line" />
            </div>
            <div className="scan-input-wrap">
              <input
                type="email"
                name="email"
                className="scan-input"
                placeholder="TRANSMIT_FREQUENCY (encrypted)"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'sending'}
              />
              <div className="scan-line" />
            </div>
            <div className="scan-input-wrap">
              <textarea
                className="scan-input resize-none"
                rows={3}
                name="message"
                placeholder="MESSAGE_PAYLOAD..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status === 'sending'}
              />
              <div className="scan-line" />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
              whileTap={status !== 'sending' ? { scale: 0.97 } : {}}
              className="cyber-button w-full py-4 bg-primary-fixed-dim text-on-primary font-body-md font-bold rounded uppercase tracking-widest disabled:opacity-60"
            >
              {status === 'sending' ? 'ENCRYPTING...' : 'TRANSMIT_SIGNAL'}
            </motion.button>
          </form>
        )}
        <iframe name="hidden_iframe" className="hidden" />
      </div>
    </section>
  )
}
