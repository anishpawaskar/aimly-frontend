import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/theme-provider.jsx";
import { BrowserRouter } from "react-router";
import { TaskPageProvider } from "./context/task-page-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TaskPageProvider>
            <App />
          </TaskPageProvider>
        </ThemeProvider>
      </QueryClientProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </BrowserRouter>
  </StrictMode>
);
