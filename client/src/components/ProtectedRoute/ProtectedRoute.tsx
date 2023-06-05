import { ReactNode, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserProvider";

interface ProtectedRouteProps {
  type: "admin" | "student";
  children: ReactNode | null;
}
const ProtectedRoute = ({ type, children }: ProtectedRouteProps) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  if (!user?.isLogged) {
    navigate("/auth/login");
    return <></>;
  }

  if (user.user?.type !== type) {
    navigate("/auth/login");
    return <></>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
