import { AlertsPage } from './alerts';
import { ConfigProvider, theme } from 'antd';
import { alertTheme } from '../theme';
import { useAppSettingsStore } from './useAppSettingsStore';

export const App = () => {
    // const alerts: OrefAlert[] = [
    //     {
    //         cat: 1,
    //         data: ['ברחבי הארץ'],
    //         id: '123',
    //         title: 'שהייה בסמיכות למרחב מוגן',
    //         desc: 'על תושבי האזורים הבאים לשהות בסמיכות למרחב המוגן.\nיש לצמצם תנועות במרחב ולהימנע מהתקהלויות.\n בעת קבלת התרעה יש להיכנס למרחב מוגן ולשהות בו עד לקבלת הודעה חדשה.',
    //         firstDetectedAt: new Date()
    //     }
    // ];

    const isDarkMode = useAppSettingsStore(s => s.isDarkMode);

    return (
        <ConfigProvider
            theme={{
                ...alertTheme,
                algorithm: isDarkMode
                    ? theme.darkAlgorithm
                    : theme.defaultAlgorithm
            }}
        >
            <AlertsPage />
        </ConfigProvider>
    );
};

export default App;
