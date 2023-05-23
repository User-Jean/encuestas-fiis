import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: ''
  // root: './src/encuestas',
  // build: {
  //   rollupOptions: {
  //     input: {
  //         main: resolve(__dirname, 'src/encuestas/index.html'),
  //         multiminerales: resolve(__dirname, 'src/encuestas/some-page.html')
  //     }
  //   }
  // }
})
