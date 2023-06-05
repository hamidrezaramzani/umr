import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserProvider";

const Logout = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  navigate("/auth/login");
  logout();

  return <></>;
};

export default Logout;
