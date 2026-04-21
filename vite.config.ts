import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'mock-vercel-api',
        configureServer(server) {
          server.middlewares.use('/api/login', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk.toString(); });
              req.on('end', () => {
                const data = JSON.parse(body || '{}');
                // Untuk simulasi lokal di AI Studio. Cek password default.
                const secret = env.DASHBOARD_SECRET_CODE || 'mandiriTeSu2026';
                res.setHeader('Content-Type', 'application/json');
                if (data.password === secret) {
                  res.writeHead(200);
                  res.end(JSON.stringify({ success: true, token: 'mandiri-authenticated' }));
                } else {
                  res.writeHead(401);
                  res.end(JSON.stringify({ success: false, message: 'Kode rahasia yang Anda masukkan salah.' }));
                }
              });
            }
          });
        }
      }
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
