import { useRoutes } from "react-router";
import { UserProvider } from "./context/UserProvider";
import routes from "./routes";
function App() {
  const routesJSX = useRoutes(routes);
  return <UserProvider>{routesJSX}</UserProvider>;
}

export default App;
