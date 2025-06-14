import React from 'react';
import {
    OrefAlert,
    orefAlertCategory,
    OrefAlertCategory,
    OrefAlertSeverity
} from '@alerts-kiosk/oref-api';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { AlertTriangle, Shield, Info, Bell } from 'lucide-react';
import './alertsPage.css';

interface AlertsPageProps {
    alerts: OrefAlert[];
}

const severityToIcon = {
    info: <Info className="alert-icon" />,
    danger: <AlertTriangle className="alert-icon" />,
    warning: <Shield className="alert-icon" />
};

const getAlertSeverity = (category: OrefAlertCategory): OrefAlertSeverity =>
    orefAlertCategory[category].severity;

const AlertsPage: React.FC<AlertsPageProps> = ({ alerts }) => {
    if (alerts.length === 0) {
        return (
            <div className="alerts-page">
                <div className="alerts-container">
                    <div className="no-alerts">
                        <Shield className="no-alerts-icon" />
                        <h2>אין התראות פעילות</h2>
                        <p>כרגע אין התראות במערכת</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="alerts-page">
            <div className="alerts-container">
                <header className="alerts-header">
                    <h1>התראות פעילות</h1>
                    <div className="alerts-count">{alerts.length} התראות</div>
                </header>

                <div className="alerts-grid">
                    {alerts.map(alert => {
                        const severity = getAlertSeverity(alert.cat);
                        return (
                            <AlertDialog.Root key={alert.id}>
                                <AlertDialog.Trigger asChild>
                                    <div
                                        className={`alert-card alert-${severity}`}
                                    >
                                        <div className="alert-card-header">
                                            <div className="alert-icon-container">
                                                {severityToIcon[severity]}
                                            </div>
                                            <div className="alert-meta">
                                                <span className="alert-category">
                                                    {
                                                        orefAlertCategory[
                                                            alert.cat
                                                        ].title
                                                    }
                                                </span>
                                                <span className="alert-severity">
                                                    {
                                                        orefAlertCategory[
                                                            alert.cat
                                                        ].severity
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="alert-title">
                                            {alert.title}
                                        </h3>

                                        <div className="alert-locations">
                                            {alert.data.map(
                                                (location, index) => (
                                                    <span
                                                        key={index}
                                                        className="location-tag"
                                                    >
                                                        {location}
                                                    </span>
                                                )
                                            )}
                                        </div>

                                        <p className="alert-description">
                                            {alert.desc.length > 100
                                                ? `${alert.desc.substring(
                                                      0,
                                                      100
                                                  )}...`
                                                : alert.desc}
                                        </p>
                                    </div>
                                </AlertDialog.Trigger>

                                <AlertDialog.Portal>
                                    <AlertDialog.Overlay className="alert-dialog-overlay" />
                                    <AlertDialog.Content className="alert-dialog-content">
                                        <div className="alert-dialog-header">
                                            <div className="alert-dialog-icon">
                                                {severityToIcon[severity]}
                                            </div>
                                            <div>
                                                <AlertDialog.Title className="alert-dialog-title">
                                                    {alert.title}
                                                </AlertDialog.Title>
                                                <div className="alert-dialog-meta">
                                                    <span className="alert-category">
                                                        {
                                                            orefAlertCategory[
                                                                alert.cat
                                                            ].title
                                                        }
                                                    </span>
                                                    <span
                                                        className={`alert-severity severity-${severity}`}
                                                    >
                                                        {
                                                            orefAlertCategory[
                                                                alert.cat
                                                            ].severity
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="alert-dialog-locations">
                                            <h4>מיקומים:</h4>
                                            <div className="locations-list">
                                                {alert.data.map(
                                                    (location, index) => (
                                                        <span
                                                            key={index}
                                                            className="location-tag-large"
                                                        >
                                                            {location}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <AlertDialog.Description className="alert-dialog-description">
                                            {alert.desc}
                                        </AlertDialog.Description>

                                        <div className="alert-dialog-actions">
                                            <AlertDialog.Cancel asChild>
                                                <button className="dialog-button dialog-button-cancel">
                                                    סגור
                                                </button>
                                            </AlertDialog.Cancel>
                                        </div>
                                    </AlertDialog.Content>
                                </AlertDialog.Portal>
                            </AlertDialog.Root>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AlertsPage;
