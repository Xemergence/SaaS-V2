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
        import("tempo-devtools")
      .then((tempoModule: any) => {
        try {
          if (typeof tempoModule?.TempoDevtools?.init === "function") {
            tempoModule.TempoDevtools.init();
          } else if (typeof tempoModule?.init === "function") {
            tempoModule.init();
          }
        } catch (e) {
          console.warn("Tempo devtools init skipped:", e);
        }
      })
      .catch(() => {});
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
