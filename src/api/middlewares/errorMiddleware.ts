import { Request, Response, NextFunction } from 'express';
import winstonLogger from '../logger/winstonLogger';
import { AxiosError } from 'axios';


// Error middleware
export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.log(err.message);
  const error = err as AxiosError;
  if (error.response) {
    winstonLogger.error(err.message, { config: error.response.config, data: error.response.data, status: error.response.statusText });
  }
  const stackTrace = err.stack;
  if (stackTrace) {
    const firstStackTraceLine = stackTrace.split('\n')[1];
    const matchResult = firstStackTraceLine.match(/\(([^:]+):(\d+):\d+\)$/);
    if (matchResult) {
      const [, fileName, , lineNumber] = matchResult;
      winstonLogger.error(`${err.message} (${fileName}:${lineNumber})`);
    }
    else {
      winstonLogger.error(err.message);
    }
  }
  else {
    winstonLogger.error(err.message, { error: err });
  }
  // Respond with an error status code and message
  res.status(500).json({ error: 'Internal server error' });
}
