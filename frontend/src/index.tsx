import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import reportWebVitals from "./reportWebVitals";
import Navigation from "./components/Navigation";
import { AuthProvider } from "./context/auth";
import "./globals.css";
import "react-tippy/dist/tippy.css";
import { ThemeProvider } from "./context/theme";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Toaster
            position="top-center"
            reverseOrder={true}
            toastOptions={{
              duration: 2500,
              className: "bg-main",
            }}
          />
          <Navigation />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
reportWebVitals();
