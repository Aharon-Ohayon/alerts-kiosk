import { getLiveAlerts, OrefAlert } from '@alerts-kiosk/oref-api';
import { useState } from 'react';
import { useAppSettingsStore } from '../useAppSettingsStore';

export const useAlerts = () => {
    const [liveAlerts, setAlerts] = useState<OrefAlert[]>();
    const interstedZones = useAppSettingsStore(s => s.interestedZones);

    setInterval(async () => {
        try {
            const { allAlerts, filteredAlerts } = await getLiveAlerts(
                interstedZones
            );

            console.log(
                `Fetched successfully ${
                    filteredAlerts.length
                } relevant alerts for the interested zones ${interstedZones.join(
                    ', '
                )} out of ${allAlerts.length}`
            );

            setAlerts(filteredAlerts);
        } catch (error: any) {
            console.error(
                'Error trying to get live alerts: exception has been thrown',
                error
            );
        }
    }, 1000);

    return {
        liveAlerts
    };
};
