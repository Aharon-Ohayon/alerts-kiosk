// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.scss';

import { OrefAlert } from '@alerts-kiosk/oref-api';
import AlertsPage from './alerts';

export function App() {
    const alerts: OrefAlert[] = [
        {
            cat: 1,
            data: ['ברחבי הארץ'],
            desc: 'תיאור',
            id: '123',
            title: 'כותרת'
        }
    ];
    return <AlertsPage alerts={alerts} />;
}

export default App;
