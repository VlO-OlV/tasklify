import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import "./assets/styles/index.css";
import { ToastProvider } from './app/hooks/contexts/ToastContext';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);