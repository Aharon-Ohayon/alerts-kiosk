import { OrefAlert, orefAlertCategory } from '@alerts-kiosk/oref-api';
import { AlertCard } from './alertCard';

export const AlertsPage = ({ alerts }: { alerts: OrefAlert[] }) => {
    return alerts.map(({ cat, firstDetectedAt, desc, title }) => (
        <AlertCard
            description={desc}
            title={title}
            type={orefAlertCategory[cat].severity}
            firstDetected={firstDetectedAt}
        />
    ));
};
