import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import terminalPlugin from './src/server/terminal-plugin.mjs'

export default defineConfig({
  plugins: [react(), tailwindcss(), terminalPlugin()],
})
