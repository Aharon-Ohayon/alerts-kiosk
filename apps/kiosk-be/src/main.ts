import { AkLoggerFactory, AkLoggerSettings } from '@alerts-kiosk/logger';
import { OrefApiAlertsSettings } from '@alerts-kiosk/oref-api';
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

const main = async () => {
    initSettings();

    const logger = container.resolve(AkLoggerFactory).createLogger('main');

    const fastify = Fastify({
        logger: true,
        loggerInstance: logger.logger
    });

    // Declare a route
    fastify.get('/', async function handler(request, reply) {
        return { hello: 'world' };
    });

    // Run the server!
    try {
        await fastify.listen({ port: 3000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

main();
