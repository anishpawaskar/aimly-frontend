import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/theme-provider.jsx";
import { BrowserRouter } from "react-router";
import { TaskPageProvider } from "./context/task-page-provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TaskPageProvider>
          <App />
        </TaskPageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
