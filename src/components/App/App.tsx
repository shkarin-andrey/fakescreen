import { FC, useEffect } from 'react';
import ReactGa from 'react-ga';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { TRACKING_ID } from '../../config';
import { useAppSelector } from '../../hooks/useAppSelector';
import { messages } from '../../i18n/messages';
import GenerateScreenPage from '../../pages/GenerateScreenPage';
import ScreenPage from '../../pages/ScreenPage';

ReactGa.initialize(TRACKING_ID);

const App: FC = () => {
  const language = useAppSelector((state) => state.language.language);
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    window.onbeforeunload = function () {
      return true;
    };
  }, []);

  return (
    <IntlProvider
      messages={messages[language]}
      locale={language}
      defaultLocale={language}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GenerateScreenPage />} />
          <Route path='/:id' element={<ScreenPage />} />
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
