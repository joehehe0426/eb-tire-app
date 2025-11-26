import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Register Service Worker for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Use base URL to ensure service worker works with GitHub Pages base path
    const swPath = `${import.meta.env.BASE_URL}service-worker.js`;
    navigator.serviceWorker.register(swPath, { scope: import.meta.env.BASE_URL })
      .then((reg) => {
        console.log('Service Worker registered', reg);
      })
      .catch((err) => {
        console.log('Service Worker failed', err);
      });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);