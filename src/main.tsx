import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes/__root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/assets/css/index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => (
    <div style={{ color: "white" }}>burada hiçbir şey yok!</div>
  ),
});

const queryClient = new QueryClient();
const rootElement = document.getElementById("root")!;

ReactDOM.createRoot(rootElement).render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ThemeProvider>
);
