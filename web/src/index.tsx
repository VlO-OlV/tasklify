import React from "react";
import ReactDOM from "react-dom";
import App from "./app/components/App";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import "./public/styles/index.css";
import { ToastProvider } from './app/hooks/contexts/ToastContext';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);