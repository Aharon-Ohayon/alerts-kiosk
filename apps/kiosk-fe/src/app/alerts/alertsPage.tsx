import { orefAlertCategory } from '@alerts-kiosk/oref-api';
import { AlertCard } from './alertCard';
import { useAlerts } from './useAlerts';
import { Typography } from 'antd';

export const AlertsPage = () => {
    const { liveAlerts } = useAlerts();
    const { Title } = Typography;

    if (!liveAlerts?.length) {
        return (
            <div className="no-alerts-container">
                <div>
                    <img src="/relaxed.svg" />
                    <Title level={1}>אין התרעות ברגע זה</Title>
                </div>
            </div>
        );
    }

    return liveAlerts.map(({ cat, firstDetectedAt, desc, title }) => (
        <AlertCard
            description={desc}
            title={title}
            type={orefAlertCategory[cat].severity}
            firstDetected={firstDetectedAt}
        />
    ));
};
