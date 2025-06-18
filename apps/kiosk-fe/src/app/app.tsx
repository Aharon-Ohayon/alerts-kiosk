// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.scss';

import { OrefAlert } from '@alerts-kiosk/oref-api';
import { AlertsPage } from './alerts';

export function App() {
    const alerts: OrefAlert[] = [
        {
            cat: 1,
            data: ['ברחבי הארץ'],
            id: '123',
            title: 'שהייה בסמיכות למרחב מוגן',
            desc: 'על תושבי האזורים הבאים לשהות בסמיכות למרחב המוגן.\nיש לצמצם תנועות במרחב ולהימנע מהתקהלויות.\n בעת קבלת התרעה יש להיכנס למרחב מוגן ולשהות בו עד לקבלת הודעה חדשה.',
            firstDetectedAt: new Date()
        }
    ];

    return <AlertsPage alerts={alerts} />;
}

export default App;
