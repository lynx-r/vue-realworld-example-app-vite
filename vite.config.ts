import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: {overlay: false}
  },
  alias: {
    '~': resolve(__dirname, 'src'),
  },
})
