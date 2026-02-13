import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import fs from 'node:fs'
import path from 'node:path'

const useHttps = process.env.VITE_HTTPS === 'true'

function resolveHttpsConfig() {
  if (!useHttps) return undefined
  const certDir = path.resolve(__dirname, 'certs')
  const certFile = path.join(certDir, 'localhost.pem')
  const keyFile = path.join(certDir, 'localhost-key.pem')
  try {
    if (fs.existsSync(certFile) && fs.existsSync(keyFile)) {
      return {
        cert: fs.readFileSync(certFile),
        key: fs.readFileSync(keyFile),
      }
    }
  } catch {}
  return true
}

const backendProxy = {
  target: 'http://localhost:8082',
  changeOrigin: true,
}

const httpsConfig = resolveHttpsConfig()

const basePath = process.env.VITE_BASE || '/'

// Единый порт 5196 для dev + preview, и прокси в обоих режимах
export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    // Если есть доверенные сертификаты (mkcert) — используем их.
    // Иначе fallback на self-signed (basic-ssl), чтобы HTTPS всё равно поднялся.
    useHttps && httpsConfig === true ? basicSsl() : undefined
  ],
  server: {
    port: 5196,
    strictPort: true,
    https: httpsConfig,
    proxy: {
      '/api': backendProxy,
      '/swagger': backendProxy
    }
  },
  preview: {
    port: 5196,
    https: httpsConfig,
    proxy: {
      '/api': backendProxy,
      '/swagger': backendProxy
    }
  }
})
