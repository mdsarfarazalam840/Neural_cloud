import { useState, useEffect } from 'react'

export function useLiveStreams() {
  const [streams, setStreams] = useState({ tx: '4.8 GB/S', mem: '12.4%', temp: '32°C' })

  useEffect(() => {
    const id = setInterval(() => {
      setStreams({
        tx: `${(Math.random() * 5 + 3).toFixed(1)} GB/S`,
        mem: `${(Math.random() * 5 + 10).toFixed(1)}%`,
        temp: `${Math.floor(Math.random() * 10 + 28)}°C`,
      })
    }, 2500)
    return () => clearInterval(id)
  }, [])

  return streams
}
