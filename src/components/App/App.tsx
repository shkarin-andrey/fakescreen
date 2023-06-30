import { FC, useCallback, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useAppSelector';
import { messages } from '../../i18n/messages';
import GenerateScreenPage from '../../pages/GenerateScreenPage';
import ScreenPage from '../../pages/ScreenPage';
import Layout from '../Layout';
import Title from '../Title';

const App: FC = () => {
  const language = useAppSelector((state) => state.language.language);

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
