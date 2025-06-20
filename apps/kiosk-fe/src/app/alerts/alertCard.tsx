import { OrefAlertSeverity } from '@alerts-kiosk/oref-api';
import { Alert, AlertProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { differenceInMinutes } from 'date-fns';

export interface AlertCardProps {
    type: OrefAlertSeverity;
    title: string;
    description: string;
    firstDetected: Date;
}

const typeMapper: Record<OrefAlertSeverity, AlertProps['type']> = {
    danger: 'error',
    info: 'info',
    warning: 'warning'
};

export const AlertCard = ({
    title,
    description,
    firstDetected,
    type
}: AlertCardProps) => {
    const [minutesAgo, setMinutesAgo] = useState<number>(undefined);

    const updateMinutes = () => {
        setMinutesAgo(differenceInMinutes(new Date(), firstDetected));
    };

    useEffect(updateMinutes, [firstDetected]);

    setInterval(updateMinutes, 3000);

    return (
        <Alert
            message={title}
            description={
                <>
                    <p>{description}</p>
                    <p className="AlertCardTime">לפני {minutesAgo} דקות</p>
                </>
            }
            type={typeMapper[type]}
            showIcon
        />
    );
};
