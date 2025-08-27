import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // 🔑 permite conexiones externas
    port: 5173,
  },
  watch: {
      usePolling: true, // 🔑 Forzar que los cambios remotos se detecten
    },
})
