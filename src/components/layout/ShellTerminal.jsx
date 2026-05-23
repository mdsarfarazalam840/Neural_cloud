import { useEffect, useRef, useState } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { useSettings } from '../../context/SettingsContext'
import '@xterm/xterm/css/xterm.css'

const NEURAL_CLOUD_ART = [
  '\x1b[96m  _   _ _____ _   _ ____      _    _        ____ _     ___  _   _ ____  ',
  ' | \\ | | ____| | | |  _ \\    / \\  | |      / ___| |   / _ \\| | | |  _ \\ ',
  ' |  \\| |  _| | | | | |_) |  / _ \\ | |     | |   | |  | | | | | | | | | |',
  ' | |\\  | |___| |_| |  _ <  / ___ \\| |___  | |___| |__| |_| | |_| | |_| |',
  ' |_| \\_|_____|\\___/|_| \\_\\/_/   \\_\\_____|  \\____|_____\\___/ \\___/|____/ ',
  '\x1b[0m',
]

function wsUrl() {
  const proto = location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${proto}//${location.host}/terminal`
}

export default function ShellTerminal() {
  const { terminalOpen, setTerminalOpen } = useSettings()
  const containerRef = useRef(null)
  const panelRef = useRef(null)
  const termRef = useRef(null)
  const wsRef = useRef(null)
  const reconnectRef = useRef(null)
  const [status, setStatus] = useState('disconnected')

  useEffect(() => {
    if (!terminalOpen) {
      setStatus('disconnected')
      termRef.current?.dispose()
      termRef.current = null
      wsRef.current?.close()
      wsRef.current = null
      clearTimeout(reconnectRef.current)
      return
    }
    setStatus('connecting')

    const el = containerRef.current
    if (!el) return

    const term = new Terminal({
      cursorBlink: true,
      cursorStyle: 'bar',
      fontSize: 13,
      fontFamily: "'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace",
      theme: {
        background: '#0a0a0a',
        foreground: '#e5e2e1',
        cursor: '#00dbe7',
        selectionBackground: '#00dbe733',
        black: '#000000',
        red: '#ff6b6b',
        green: '#00dbe7',
        yellow: '#e8c423',
        blue: '#74f5ff',
        magenta: '#ecb2ff',
        cyan: '#00f2ff',
        white: '#e5e2e1',
        brightBlack: '#3a3939',
        brightRed: '#ff6b6b',
        brightGreen: '#00dbe7',
        brightYellow: '#ffe173',
        brightBlue: '#74f5ff',
        brightMagenta: '#ecb2ff',
        brightCyan: '#00f2ff',
        brightWhite: '#ffffff',
      },
      allowTransparency: true,
      cols: 80,
      rows: 24,
    })

    const fit = new FitAddon()
    term.loadAddon(fit)
    term.open(el)

    termRef.current = term

    function focusTerminal() {
      try { term.focus() } catch {}
      const textarea = el.querySelector('textarea')
      if (textarea && document.activeElement !== textarea) {
        try { textarea.focus() } catch {}
      }
    }

    function onTransitionEnd() {
      fit.fit()
      focusTerminal()
    }

    const panel = panelRef.current
    if (panel) {
      panel.addEventListener('transitionend', onTransitionEnd, { once: true })
    }

    requestAnimationFrame(() => {
      fit.fit()
      focusTerminal()
    })

    NEURAL_CLOUD_ART.forEach(line => term.writeln(line))

    function connect() {
      let ws
      try {
        ws = new WebSocket(wsUrl())
      } catch {
        setStatus('reconnecting')
        scheduleReconnect()
        return
      }
      wsRef.current = ws

      ws.onopen = () => {
        setStatus('connected')
        clearTimeout(reconnectRef.current)
      }

      ws.onmessage = (e) => {
        const clean = e.data.replace(/\x7f/g, '')
        term.write(clean)
      }

      ws.onclose = () => {
        setStatus('reconnecting')
        scheduleReconnect()
      }

      ws.onerror = () => {
        ws.close()
      }
    }

    function scheduleReconnect() {
      clearTimeout(reconnectRef.current)
      reconnectRef.current = setTimeout(() => {
        if (terminalOpen) {
          setStatus('reconnecting')
          connect()
        }
      }, 300)
    }

    const disposable = term.onData((data) => {
      if (data === '\x7f' || data === '\b') {
        term.write('\b \b')
      } else if (data.length === 1 && data >= ' ' && data <= '~') {
        term.write(data)
      }
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(data)
      }
    })

    const resizeObserver = new ResizeObserver(() => {
      try { fit.fit() } catch {}
    })
    resizeObserver.observe(el)

    connect()

    return () => {
      if (panel) {
        panel.removeEventListener('transitionend', onTransitionEnd)
      }
      disposable.dispose()
      resizeObserver.disconnect()
      clearTimeout(reconnectRef.current)
      wsRef.current?.close()
      wsRef.current = null
      term.dispose()
      termRef.current = null
    }
  }, [terminalOpen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && terminalOpen) setTerminalOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [terminalOpen, setTerminalOpen])

  useEffect(() => {
    const onCtrlBacktick = (e) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        setTerminalOpen(v => !v)
      }
    }
    document.addEventListener('keydown', onCtrlBacktick)
    return () => document.removeEventListener('keydown', onCtrlBacktick)
  }, [setTerminalOpen])

  const statusColor =
    status === 'connected' ? 'bg-primary-fixed-dim' :
    status === 'connecting' ? 'bg-yellow-400' :
    'bg-red-500'

  const statusLabel =
    status === 'connected' ? 'CONNECTED' :
    status === 'connecting' ? 'CONNECTING...' :
    'RECONNECTING...'

  return (
    <div
      className={`shell-terminal ${terminalOpen ? 'open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) setTerminalOpen(false) }}
    >
      <div ref={panelRef} className="shell-terminal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="shell-terminal-header">
          <div className="shell-terminal-title">
            <span className={`w-2 h-2 rounded-full shrink-0 ${statusColor}`} />
            <span>CORE_SHELL v4.0</span>
            <span className="text-[10px] text-outline ml-2 uppercase tracking-wider">{statusLabel}</span>
          </div>
          <button className="shell-terminal-close" onClick={() => setTerminalOpen(false)}>
            <span className="material-symbols-outlined text-sm text-outline hover:text-white transition-colors">close</span>
          </button>
        </div>
        <div
          ref={containerRef}
          className="shell-terminal-body"
          onMouseDown={() => termRef.current?.focus()}
        />
      </div>
    </div>
  )
}
