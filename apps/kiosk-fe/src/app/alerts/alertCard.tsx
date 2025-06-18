import { OrefAlertSeverity } from '@alerts-kiosk/oref-api';
import { Alert, AlertProps } from 'antd';
import { useMemo } from 'react';
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
    const minutesAgo = useMemo(
        () => differenceInMinutes(new Date(), firstDetected),
        [firstDetected]
    );

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
