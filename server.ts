import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './server/routes/api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Parse JSON and URL-encoded bodies for API requests
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Mount backend API routes under /api
  app.use('/api', apiRouter);

  if (!isProd) {
    // Development mode: serve standalone index.html directly without HMR WebSocket injection
    const rootIndexPath = path.resolve(__dirname, 'index.html');
    app.get('/', (_req, res) => {
      res.sendFile(rootIndexPath);
    });

    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false, ws: false },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.get('*', (_req, res) => {
      res.sendFile(rootIndexPath);
    });
  } else {
    // Production mode: serve compiled frontend from dist directory
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on http://0.0.0.0:${PORT} [${isProd ? 'production' : 'development'}]`);
  });
}

startServer().catch((err) => {
  console.error('Fatal: Failed to start server:', err);
  process.exit(1);
});
