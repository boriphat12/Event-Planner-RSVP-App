import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    userId? : string;
}

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}