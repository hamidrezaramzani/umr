import "./styles/global.css";
import { ChakraBaseProvider, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./config/theme";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ChakraBaseProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraBaseProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
