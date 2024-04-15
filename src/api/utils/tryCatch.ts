import { Request, Response, NextFunction } from 'express';
import { errorMiddleware } from '../middlewares/errorMiddleware';

export const tryCatch = (controller: (req: Request, res: Response) => Promise<void>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await controller(req, res);
  } catch (error) {
    errorMiddleware(error,req,res,next);
  }
};