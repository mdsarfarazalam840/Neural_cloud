import { WebSocketServer } from 'ws'
import { spawn, execSync } from 'child_process'

const PORT = 3001
const wss = new WebSocketServer({ port: PORT })

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

console.log(`[terminal-server] Listening on ws://localhost:${PORT}`)

wss.on('connection', (ws) => {
  const shellPath = findShell()
  const shellArgs = shellPath.endsWith('powershell.exe') || shellPath.endsWith('pwsh.exe')
    ? ['-NoLogo', '-NoProfile']
    : []

  console.log(`[terminal-server] Spawning shell: ${shellPath}`)

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
    console.log(`[terminal-server] Shell exited with code ${code}`)
    try { ws.send(`\r\n[process exited with code ${code}]\r\n`) } catch {}
    try { ws.close() } catch {}
  })

  shell.on('error', (err) => {
    console.error(`[terminal-server] Shell error:`, err.message)
    try { ws.send(`\r\n[error: ${err.message}]\r\n`) } catch {}
  })
})

wss.on('error', (err) => {
  console.error('[terminal-server] Error:', err)
})
