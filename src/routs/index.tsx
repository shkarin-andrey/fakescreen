import AuthPage from '../pages/AuthPage';
import GenerateScreenPage from '../pages/GenerateScreenPage';
import ScreenPage from '../pages/ScreenPage';

export const isAuthRout = [
  {
    path: '/',
    element: <GenerateScreenPage />,
  },
  {
    path: '/:id',
    element: <ScreenPage />,
  },
];

export const defaultRout = [
  {
    path: '/',
    element: <AuthPage />,
  },
];
