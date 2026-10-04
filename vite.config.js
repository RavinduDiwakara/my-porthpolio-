import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite configuration file
// Integrates React with the Fast Refresh plugin and Tailwind CSS v4 Vite plugin
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5174,
    host: "0.0.0.0",
    open: false,
  },
})
