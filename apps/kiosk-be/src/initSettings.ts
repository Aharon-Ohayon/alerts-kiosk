import { AkLoggerSettings } from '@alerts-kiosk/logger';
import { OrefApiAlertsSettings } from '@alerts-kiosk/oref-api';
import { container } from 'tsyringe';

export const initSettings = () => {
    container.register(AkLoggerSettings, {
        useValue: new AkLoggerSettings('info')
    });

    container.register(OrefApiAlertsSettings, {
        useValue: new OrefApiAlertsSettings(5000, ['ברחבי הארץ', 'בית שמש'], 30)
    });
};
