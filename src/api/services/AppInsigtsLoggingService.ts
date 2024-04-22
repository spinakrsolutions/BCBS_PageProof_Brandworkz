const appInsights = require('applicationinsights');
import dotenv from 'dotenv';
dotenv.config();

export class AppInsigtsLoggingService {
  constructor() {
    appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING).setAutoCollectRequests(false).start();
  }

  trackEvent(eventName: string, properties: any) {
    appInsights.defaultClient.trackEvent({ name: eventName, properties: properties });
  }

  trackError(err: Error) {
    appInsights.defaultClient.trackException({ exception: err });
  }

  trackNodeHttpRequest(req: any, res: any) {
    appInsights.defaultClient.trackNodeHttpRequest({ request: req, response: res });
  }

  trackTrace(msg: any) {
    appInsights.defaultClient.trackTrace({ message: msg });
  }
}