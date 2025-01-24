import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Фіксація порту
    host: '0.0.0.0', // Дозволяє доступ із зовнішніх джерел
    strictPort: true, // Піднімає помилку, якщо порт зайнятий
  },
})
