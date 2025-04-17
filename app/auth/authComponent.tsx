import React from "react";
import AuthForm from "./authForm";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useUser } from "~/contexts/UserContext";

const AuthComponent: React.FC = () => {
  let navigate = useNavigate();
  const { user, fetchUser } = useUser();

  React.useEffect(() => {
    let isMounted = true;

    fetchUser().then((authenticated) => {
      if (isMounted && authenticated) {
        toast.success("Jūs jau esat autentificēts!", {});
        navigate("/tests");
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-start pt-16 min-h-screen px-4">
      <h1 className="text-4xl font-bold text-emerald-950 text-center mt-10 max-w-md">
        Autentifikācija
      </h1>
      <div className="flex flex-col justify-center items-center mt-6 text-1xl font-medium max-w-md">
        <h2 className="text-emerald-950 text-center">
          Lūdzu, ievadiet savus autentifikācijas datus
        </h2>
      </div>

      <AuthForm />
    </main>
  );
};

export default AuthComponent;
