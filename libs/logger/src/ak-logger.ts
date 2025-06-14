import { singleton } from 'tsyringe';
import pino, { Logger } from 'pino';

export class AkLoggerSettings {
  constructor(
    public readonly minimumLevel: 'debug' | 'info' | 'warn' | 'error'
  ) {}
}

@singleton()
export class AkLoggerFactory {
  constructor(private settings: AkLoggerSettings) {}

  public createLogger(sender: string): AkLogger {
    return new AkLogger(this.settings, sender);
  }
}

export class AkLogger {
  private readonly logger: Logger;

  constructor(settings: AkLoggerSettings, public readonly sender: string) {
    this.logger = pino({ name: sender, level: settings.minimumLevel });
  }

  public debug(content: string, additionalInfo?: any): void {
    this.logger.debug(additionalInfo, content);
  }

  public info(content: string, additionalInfo?: any): void {
    this.logger.info(additionalInfo, content);
  }

  public warn(content: string, additionalInfo?: any): void {
    this.logger.warn(additionalInfo, content);
  }

  public error(content: string, additionalInfo?: any): void {
    this.logger.error(additionalInfo, content);
  }
}
