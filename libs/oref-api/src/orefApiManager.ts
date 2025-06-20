import axios from 'axios';
import { AkLogger, AkLoggerFactory } from '@alerts-kiosk/logger';
import { OrefAlert } from './oref.model';
import { OrefApiAlertsSettings } from './orefApiSettings';
import { injectable } from 'tsyringe';

@injectable()
export class OrefApiManager {
    private logger: AkLogger;

    private _liveAlerts: OrefAlert[] = [];

    constructor(
        loggerFactory: AkLoggerFactory,
        private settings: OrefApiAlertsSettings
    ) {
        this.logger = loggerFactory.createLogger(this.constructor.name);
    }

    public init(): void {
        this.logger.info('Initializing OrefApi ... ');

        setInterval(async () => {
            this.logger.info('Fetching alerts ... ');

            await this.fetchAlerts();
        }, this.settings.interval);
    }

    private async getLiveAlerts(): Promise<{
        filteredAlerts: OrefAlert[];
        allAlerts: OrefAlert[];
    }> {
        const res = await axios.get<string | OrefAlert[]>(
            'https://www.oref.org.il/warningMessages/alert/Alerts.json'
        );

        if (res.status !== 200) {
            throw new Error(
                `Alerts fetching wasn't successful. Status returned: ${res.status} (${res.statusText})`
            );
        }

        if (typeof res.data === 'string' || !res.data?.length) {
            return { allAlerts: [], filteredAlerts: [] };
        }

        const liveAlerts = res.data.filter(d =>
            this.settings.interestingZones.some(z => d.data.includes(z))
        );

        return { filteredAlerts: liveAlerts, allAlerts: res.data };
    }

    public async fetchAlerts(): Promise<void> {
        try {
            const { allAlerts, filteredAlerts } = await this.getLiveAlerts();

            this.logger.info(
                `Fetched successfully ${
                    filteredAlerts.length
                } relevant alerts for the interested zones ${this.settings.interestingZones.join(
                    ', '
                )} out of ${allAlerts.length}`
            );

            this._liveAlerts = filteredAlerts;
        } catch (error: any) {
            this.logger.error(`Error trying to fetch alerts`, { error });
        }
    }

    public get liveAlerts(): OrefAlert[] {
        return this._liveAlerts;
    }
}
