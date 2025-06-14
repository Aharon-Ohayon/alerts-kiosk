import 'reflect-metadata';

import {
    AkLogger,
    AkLoggerFactory,
    AkLoggerSettings
} from '@alerts-kiosk/logger';
import { OrefApi, OrefApiAlertsSettings } from '@alerts-kiosk/oref-api';
import { container } from 'tsyringe';
import Fastify from 'fastify';

const initSettings = () => {
    container.register(AkLoggerSettings, {
        useValue: new AkLoggerSettings('info')
    });

    container.register(OrefApiAlertsSettings, {
        useValue: new OrefApiAlertsSettings(1000, ['ברחבי הארץ', 'בית שמש'])
    });
};

const initApi = async (logger: AkLogger, port: number) => {
    const fastify = Fastify({
        loggerInstance: logger.logger
    });

    const orefApi = container.resolve(OrefApi);

    fastify.get('/', async function handler() {
        return orefApi.liveAlerts;
    });

    try {
        logger.info(`starting to listening on port ${port} ... `);

        await fastify.listen({ port });

        logger.info(`Listening on port ${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

const main = async () => {
    initSettings();

    const logger = container.resolve(AkLoggerFactory).createLogger('main');

    await initApi(logger, 3000);

    const orefApi = container.resolve(OrefApi);

    orefApi.init();

    logger.info('Api is initialized successfully');
};

main();
