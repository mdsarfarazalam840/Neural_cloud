import { WebSocketServer } from 'ws'
import { spawn, execSync } from 'child_process'

function findShell() {
  if (process.platform !== 'win32') return 'bash'
  try {
    execSync('where cmd.exe', { stdio: 'ignore' })
    return 'cmd.exe'
  } catch {
    try {
      execSync('where powershell.exe', { stdio: 'ignore' })
      return 'powershell.exe'
    } catch {
      return 'pwsh.exe'
    }
  }
}

export default function terminalPlugin() {
  let wss

  return {
    name: 'terminal-server',
    configureServer(server) {
      wss = new WebSocketServer({ noServer: true })

      server.httpServer.on('upgrade', (req, socket, head) => {
        if (req.url === '/terminal') {
          wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit('connection', ws, req)
          })
        }
      })

      const urls = server.resolvedUrls?.local ?? []
      const url = urls[0] || `http://localhost:${server.config.server.port || 5173}`
      console.log(`[terminal-plugin] Terminal WebSocket at ${url}terminal`)

      wss.on('connection', (ws) => {
        const shellPath = findShell()
        console.log(`[terminal-plugin] Spawning shell: ${shellPath}`)

        const shellArgs = shellPath.endsWith('powershell.exe') || shellPath.endsWith('pwsh.exe')
          ? ['-NoLogo', '-NoProfile']
          : []
        const shell = spawn(shellPath, shellArgs, {
          stdio: ['pipe', 'pipe', 'pipe'],
          env: { ...process.env, TERM: 'xterm', COLUMNS: '120', LINES: '40' },
        })

        let bannerFiltered = false
        shell.stdout.on('data', (d) => {
          let output = d.toString()
          if (!bannerFiltered) {
            bannerFiltered = true
            output = output.replace(/^.*Microsoft Windows.*$/gm, '')
            output = output.replace(/^.*\(c\) Microsoft Corporation.*$/gm, '')
            output = output.replace(/\n\s*\n/g, '\n')
          }
          try { ws.send(output) } catch {}
        })
        shell.stderr.on('data', (d) => {
          try { ws.send(d.toString()) } catch {}
        })

        ws.on('message', (d) => {
          const str = d.toString()
          if (str === '__RESIZE__') return
          try { shell.stdin.write(str.replace(/\r/g, '\n')) } catch {}
        })

        ws.on('close', () => {
          shell.kill()
        })

        shell.on('exit', (code) => {
          console.log(`[terminal-plugin] Shell exited with code ${code}`)
          try { ws.send(`\r\n[process exited with code ${code}]\r\n`) } catch {}
          try { ws.close() } catch {}
        })

        shell.on('error', (err) => {
          console.error(`[terminal-plugin] Shell error:`, err.message)
          try { ws.send(`\r\n[error: ${err.message}]\r\n`) } catch {}
        })
      })
    },
    closeBundle() {
      wss?.close()
    },
  }
}
