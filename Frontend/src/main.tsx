import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain="virksomheter.eu.auth0.com"
        clientId="DY8AS2nEvbRy5JUhm66sxDoTlAUuAMRE"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        useRefreshTokens= {true}
        cacheLocation="localstorage"
      >
  
        <App />
      </Auth0Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
