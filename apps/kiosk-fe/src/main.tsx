import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

import App from './app/app';
import { alertTheme } from './theme';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <StrictMode>
        <ConfigProvider theme={alertTheme}>
            <App />
        </ConfigProvider>
    </StrictMode>
);
