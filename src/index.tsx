import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import App from "./components/App";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </HashRouter>,
  document.getElementById("root")
);
