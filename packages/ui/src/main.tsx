// eslint-disable-next-line import/no-unresolved
import 'virtual:windi.css';
import '@/styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from '@/App';
import { ToastContainer } from '@/components/toast/ToastContainer';
import { store } from '@/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('app'),
);
