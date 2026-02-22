import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";

import "./firebase";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <AppProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </AppProvider>
  </ErrorBoundary>
);
