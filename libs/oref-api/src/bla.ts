import { AkLoggerFactory } from '@alerts-kiosk/logger';
import { injectable } from 'tsyringe';

@injectable()
export class Bla {
    constructor(loggerFactory: AkLoggerFactory) {
        const logger = loggerFactory.createLogger('bla');

        logger.info('BLA');
    }

    public blabla() {}
}
