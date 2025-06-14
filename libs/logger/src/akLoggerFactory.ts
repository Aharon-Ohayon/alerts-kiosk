import { singleton } from 'tsyringe';
import { AkLogger } from './akLogger';
import { AkLoggerSettings } from './akLoggerSettings';

@singleton()
export class AkLoggerFactory {
  constructor(private settings: AkLoggerSettings) {}

  public createLogger(sender: string): AkLogger {
    return new AkLogger(this.settings, sender);
  }
}
