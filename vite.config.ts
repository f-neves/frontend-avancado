import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   https: true, // Ativa HTTPS, se necessário
  //   host: 'stp.transfer.com.br', // Host personalizado
  //   port: 9000, // Porta em que o servidor será executado
  // },
})
