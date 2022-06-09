import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PerseusThemeProvider from "./lib/theme";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import WalletProviderWrapper from "providers/WalletProvider";
import StrapiPublicProvider from "providers/StrapiPublicProvider";
import StoreProvider from "providers/StoreProvider";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <StrapiPublicProvider>
          <WalletProviderWrapper>
            <BrowserRouter>
              <PerseusThemeProvider>
                <App />
              </PerseusThemeProvider>
            </BrowserRouter>
          </WalletProviderWrapper>
        </StrapiPublicProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);

reportWebVitals();
