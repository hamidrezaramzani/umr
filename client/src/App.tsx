import { useRoutes } from "react-router";
import routes from "./routes";
function App() {
  const routesJSX = useRoutes(routes);
  return <>{routesJSX}</>;
}

export default App;
