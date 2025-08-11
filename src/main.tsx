import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

// Initialize TempoDevtools only in development with guarded dynamic import
if (import.meta.env.DEV) {
  if (
    import.meta.env.VITE_TEMPO === "true" ||
    import.meta.env.TEMPO === "true"
  ) {
    console.log("Initializing Tempo Devtools");
    import("tempo-devtools")
      .then((tempoModule) => {
        // Handle various export shapes: {TempoDevtools}, {Tempo}, default function
        let initFunction = null;

        if (
          tempoModule.TempoDevtools &&
          typeof tempoModule.TempoDevtools.init === "function"
        ) {
          initFunction = tempoModule.TempoDevtools.init;
        } else if (
          tempoModule.Tempo &&
          typeof tempoModule.Tempo.init === "function"
        ) {
          initFunction = tempoModule.Tempo.init;
        } else if (typeof tempoModule.default === "function") {
          initFunction = tempoModule.default;
        } else if (typeof tempoModule.init === "function") {
          initFunction = tempoModule.init;
        }

        if (initFunction) {
          initFunction();
          console.log("Tempo Devtools initialized successfully");
        } else {
          console.warn(
            "No valid Tempo initialization function found in module:",
            Object.keys(tempoModule),
          );
        }
      })
      .catch((error) => {
        console.warn(
          "Failed to initialize Tempo Devtools:",
          error.message || error,
        );
      });
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
