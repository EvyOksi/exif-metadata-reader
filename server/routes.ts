import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // This EXIF reader is a client-side only application
  // No API routes needed - all processing happens in the browser
  
  const httpServer = createServer(app);
  return httpServer;
}
