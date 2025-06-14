import pino, { Logger } from 'pino';
import { AkLoggerSettings } from './akLoggerSettings';

export class AkLogger {
    public readonly logger: Logger;

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
