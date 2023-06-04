import publicRoutes from "./publicRoutes";
import protectedRoutes from "./protectedRoutes";

export default [...publicRoutes, ...protectedRoutes];