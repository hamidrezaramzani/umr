import "./styles/global.css";
import { ChakraBaseProvider, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./config/theme";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ChakraBaseProvider theme={theme}>
        <BrowserRouter>
          <ToastContainer
            position="bottom-left"
            bodyClassName="iran-yekan-regular"
          />
          <App />
        </BrowserRouter>
      </ChakraBaseProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
