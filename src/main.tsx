import './index.css';

import { ConfigProvider } from 'antd';
import ru from 'antd/locale/ru_RU';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={ru}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
