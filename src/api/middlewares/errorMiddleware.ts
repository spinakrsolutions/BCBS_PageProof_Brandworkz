import { Request, Response, NextFunction } from 'express';
import winstonLogger from '../logger/winstonLogger';

// Error middleware
export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  // Log the error using Winston logger
  winstonLogger.error(err.message, { error: err });

  // Respond with an error status code and message
  res.status(500).json({ error: 'Internal server error' });
}