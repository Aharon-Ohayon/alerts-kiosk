import 'reflect-metadata';

import { container } from 'tsyringe';
import { AkLogger, AkLoggerFactory } from '@alerts-kiosk/logger';
import Fastify from 'fastify';

import { initSettings } from './initSettings';
import { OrefApiManager } from '@alerts-kiosk/oref-api';

const initApi = async (
    logger: AkLogger,
    orefApi: OrefApiManager,
    port: number
) => {
    const fastify = Fastify({
        loggerInstance: logger.logger
    });

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

    logger.info('Initializing OrefApiManager ... ');

    const orefApi = container.resolve(OrefApiManager);

    orefApi.init();

    logger.info('OrefApiManager is initialized.');

    logger.info('Initializing api ...');

    await initApi(logger, orefApi, 3000);

    logger.info('Api is initialized successfully');
};

main();
