import { FC, useEffect } from 'react';
import ReactGa from 'react-ga';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { TRACKING_ID } from '../../config';
import { useAppSelector } from '../../hooks/useAppSelector';
import { messages } from '../../i18n/messages';
import { defaultRout, isAuthRout } from '../../routs';

ReactGa.initialize(TRACKING_ID, {
  debug: process.env.NODE_ENV === 'development',
});

const App: FC = () => {
  const language = useAppSelector((state) => state.language.language);
  const theme = useAppSelector((state) => state.theme.theme);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

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
          {isAuth
            ? isAuthRout.map((item) => (
                <Route key={item.path} path={item.path} element={item.element} />
              ))
            : defaultRout.map((item) => (
                <Route key={item.path} path={item.path} element={item.element} />
              ))}
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
