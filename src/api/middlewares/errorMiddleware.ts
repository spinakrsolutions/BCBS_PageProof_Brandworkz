import { Request, Response, NextFunction } from 'express';
import winstonLogger from '../logger/winstonLogger';
import { AxiosError } from 'axios';
import { AppInsigtsLoggingService } from '../services/AppInsigtsLoggingService';


// Error middleware
export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  const appInsigtsLoggingService = new AppInsigtsLoggingService();
  const error = err as AxiosError;
  if (error.response) {
    appInsigtsLoggingService.trackEvent("API Failure", { config: error.response.config, data: error.response.data, status: error.response.statusText });
    winstonLogger.error(err.message, { config: error.response.config, data: error.response.data, status: error.response.statusText });
  }
  const stackTrace = err.stack;
  if (stackTrace) {
    const firstStackTraceLine = stackTrace.split('\n')[1];
    const matchResult = firstStackTraceLine.match(/\(([^:]+):(\d+):\d+\)$/);
    if (matchResult) {
      const [, fileName, , lineNumber] = matchResult;
      appInsigtsLoggingService.trackEvent("APP Failure", { errmessage: `${err.message} (${fileName}:${lineNumber})` });
      winstonLogger.error(`${err.message} (${fileName}:${lineNumber})`);
    }
    else {
      appInsigtsLoggingService.trackEvent("APP Failure", { errmessage: err.message });
      winstonLogger.error(err.message);
    }
  }
  else {
    appInsigtsLoggingService.trackEvent("APP Failure", { errmessage: err.message });
    winstonLogger.error(err.message, { error: err });
  }
  appInsigtsLoggingService.trackError(err);
  // Respond with an error status code and message
  res.status(500).json({ error: 'Internal server error' });
}
