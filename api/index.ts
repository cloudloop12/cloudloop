import { app } from '../server.js';

export default function handler(req: any, res: any) {
  try {
    return app(req, res);
  } catch (err: any) {
    console.error('[Vercel Serverless Fatal Error]:', err);
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({
        success: false,
        error: 'Vercel Serverless Invocation Crash',
        details: err?.message || String(err),
        timestamp: new Date().toISOString(),
      });
    }
  }
}

