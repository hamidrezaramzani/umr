import { useRoutes } from "react-router";
import { RtlProvider } from "./components/RtlProvider";
import { UserProvider } from "./context/UserProvider";
import routes from "./routes";
function App() {
  const routesJSX = useRoutes(routes);
  return (
    <RtlProvider>
      <UserProvider>{routesJSX}</UserProvider>
    </RtlProvider>
  );
}

export default App;
