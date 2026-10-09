import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './instrument';
import * as Sentry from '@sentry/react';
import store from './redux/store';
import App from './app/App';

createRoot(document.getElementById('root')!).render(
  <Sentry.ErrorBoundary
    fallback={<p>Что-то пошло не так. Обновите страницу.</p>}
  >
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </Sentry.ErrorBoundary>
);
