import React from "react";
import { Button } from "~/components/ui/button";
import axios from "axios";
import { toast, Slide } from "react-toastify";
import { Navigate, useNavigate, type NavigateFunction } from "react-router";

const login = async (e: any, navigate: NavigateFunction) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const formJson = Object.fromEntries(formData.entries());

  let response;

  try {
    response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
      {
        email: formJson.email,
        password: formJson.password,
      },
      { withCredentials: true }
    );
  } catch (error: any) {
    switch (error.status) {
      case 400:
        toast.error("Nepareizi ievadīti dati!", {});
        break;
      case 403:
        toast.error("Jums nav piekļuves šai darbībai!", {});
        break;
      case 404:
        toast.error("Nepareizs lietotājvārds vai parole!", {});
        break;
      case 500:
        toast.error("Servera kļūda. Lūdzu, mēģiniet vēlreiz vēlāk.", {});
        break;
      default:
        toast.error("Nezināma kļūda. Lūdzu, mēģiniet vēlreiz.", {});
        break;
    }
    return;
  }

  if (response && response.status === 200) {
    toast.success("Autentifikācija veiksmīga!", {});
    navigate("/tests");
  }
};

const register = async (e: any, navigate: NavigateFunction) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const formJson = Object.fromEntries(formData.entries());

  let response;

  try {
    response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
      {
        username: formJson.username,
        email: formJson.email,
        password: formJson.password,
      },
      { withCredentials: true }
    );
  } catch (error: any) {
    switch (error.status) {
      case 400:
        toast.error("Nepareizi ievadīti dati!", {});
        break;
      case 403:
        toast.error("Jums nav piekļuves šai darbībai!", {});
        break;
      case 404:
        toast.error("Šāds lietotājs jau pastāv!", {});
        break;
      case 500:
        toast.error("Servera kļūda. Lūdzu, mēģiniet vēlreiz vēlāk.", {});
        break;
      default:
        toast.error("Nezināma kļūda. Lūdzu, mēģiniet vēlreiz.", {});
        break;
    }
    return;
  }

  if (response && response.status === 201) {
    toast.success("Reģistrācija veiksmīga!", {});
    navigate("/tests");
  }
};

const AuthForm: React.FC = () => {
  const [isRegistering, setIsRegistering] = React.useState(false);

  let navigate = useNavigate();

  return (
    <div className="mt-8 p-6 bg-white shadow rounded-lg max-w-sm w-full text-center relative overflow-hidden px-4 min-h-[300px]">
      <div
        className={`absolute inset-0 transition-transform duration-500 ${
          isRegistering ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Registration Form */}
        <form onSubmit={(e) => register(e, navigate)} className="w-full mt-10">
          <input
            type="text"
            name="username"
            placeholder="Lietotājvārds"
            className="border p-2 mb-4 w-10/12 max-w-sm rounded text-center"
          />
          <input
            type="email"
            name="email"
            placeholder="e-pasts"
            className="border p-2 mb-4 w-10/12 max-w-sm rounded text-center"
          />
          <input
            type="password"
            name="password"
            placeholder="Parole"
            className="border p-2 mb-4 w-10/12 max-w-sm rounded text-center"
          />
          <Button
            type="submit"
            className="w-full max-w-10/12 pt-2 font-semibold text-1xl hover:bg-emerald-700 bg-emerald-800 text-white rounded-md"
          >
            Reģistrēties
          </Button>
          <p className="mt-4 text-sm text-gray-700 text-center">
            Ienākt?{" "}
            <span
              onClick={() => setIsRegistering(false)}
              className="text-emerald-800 cursor-pointer hover:underline"
            >
              Klikšķiniet šeit
            </span>
          </p>
        </form>
      </div>

      <div
        className={`absolute inset-0 transition-transform duration-500 ${
          isRegistering ? "translate-x-full" : "translate-x-0"
        }`}
      >
        {/* Login Form */}
        <form
          onSubmit={(e) => login(e, navigate)}
          className="w-full flex flex-col items-center mt-10"
        >
          <input
            type="email"
            name="email"
            placeholder="Ē-Pasts"
            className="border p-2 mb-4 w-10/12 max-w-sm rounded text-center"
          />
          <input
            type="password"
            name="password"
            placeholder="Parole"
            className="border p-2 mb-4 w-10/12 max-w-sm rounded text-center"
          />
          <Button
            type="submit"
            className="w-full max-w-10/12 pt-2 mt-[40px] font-semibold text-1xl hover:bg-emerald-700 bg-emerald-800 text-white rounded-md "
          >
            Ienākt
          </Button>
          <p className="mt-4 text-sm text-gray-700 text-center">
            Atpakaļ uz reģistrāciju?{" "}
            <span
              onClick={() => setIsRegistering(true)}
              className="text-emerald-800 cursor-pointer hover:underline"
            >
              Klikšķiniet šeit
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
