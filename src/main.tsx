import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './contexts/ThemeContext';
import DigitalProductStudio from './components/DigitalProductStudio';
import ErrorBoundary from './components/ErrorBoundary';
import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';
import './index.css';

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Web Vitals reporting
onCLS(console.log);
onFCP(console.log);
onLCP(console.log);
onTTFB(console.log);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <DigitalProductStudio />
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
