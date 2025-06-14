import { AkLogger, AkLoggerFactory } from '@alerts-kiosk/logger';
import axios from 'axios';
import { singleton } from 'tsyringe';
import { OrefAlert } from './oref.model';

export class OrefApiAlertsSettings {
    constructor(
        public readonly interval: number,
        public readonly interestingZones: string[]
    ) {}
}

@singleton()
export class OrefApi {
    private logger: AkLogger;

    private _liveAlerts: OrefAlert[] = [];

    constructor(
        private settings: OrefApiAlertsSettings,
        loggerFactory: AkLoggerFactory
    ) {
        this.logger = loggerFactory.createLogger(this.constructor.name);

        setInterval(async () => {
            this.logger.info('Fetching alerts ... ');

            await this.fetchAlerts();
        }, settings.interval);
    }

    private async fetchAlerts(): Promise<void> {
        try {
            const res = await axios.get<OrefAlert[]>(
                'https://www.oref.org.il/warningMessages/alert/Alerts.json'
            );

            if (res.status !== 200) {
                this.logger.warn(
                    `Alerts fetching wasn't successful. Status returned: ${res.status} (${res.statusText})`
                );
            }

            if (!res.data?.length) {
                this.logger.info('No alerts at the moment');

                this._liveAlerts = [];

                return;
            }

            this._liveAlerts = res.data.filter(d =>
                this.settings.interestingZones.some(z => d.data.includes(z))
            );

            this.logger.info(
                `Fetched successfully ${res.data.length} live alerts. ${this.liveAlerts.length} are relevant to the interesting zones`
            );

            return;
        } catch (error: any) {
            this.logger.error(`Error trying to fetch alerts`, { error });

            return;
        }
    }

    public get liveAlerts(): OrefAlert[] {
        return this._liveAlerts;
    }
}
