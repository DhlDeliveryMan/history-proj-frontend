import React from "react";
import { useNavigate } from "react-router";
import { useUser } from "~/contexts/UserContext";

const Logout: React.FC = () => {
  let navigate = useNavigate();
  let { user, logout } = useUser();

  React.useEffect(() => {
    logout().then(() => {
      navigate("/");
    });
  }, []);

  return (
    <div>
      <h1>Logout</h1>
      <p>You are being logged out.</p>
    </div>
  );
};

export default Logout;
