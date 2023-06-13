import { useRoutes } from "react-router";
import { RtlProvider } from "./components/RtlProvider";
import PanelProvider from "./context/PanelProvider";
import { UserProvider } from "./context/UserProvider";
import routes from "./routes";
function App() {
  const routesJSX = useRoutes(routes);
  return (
    <RtlProvider>
      <UserProvider>
        <PanelProvider>{routesJSX}</PanelProvider>
      </UserProvider>
    </RtlProvider>
  );
}

export default App;
