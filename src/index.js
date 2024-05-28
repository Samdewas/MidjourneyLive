import React from "react";
import "./index.css";
import App from "./App";
import { persistor, store } from "./Store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <GoogleOAuthProvider clientId="247099251449-p8cu7tk2t0cq3rqv6v2n1g53gf0gp7jn.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>,
  rootElement
);
