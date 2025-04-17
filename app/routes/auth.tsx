import React from "react";
import Footer from "~/components/global/footer";
import Navbar from "~/components/global/navbar";
import type { Route } from "../+types/root";
import AuthComponent from "~/auth/authComponent";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tests par Projekta darbu" },
    { name: "description", content: "Tests par Projekta darbu!" },
  ];
}

const Auth: React.FC = () => {
  return (
    <>
      <Navbar />
      <AuthComponent />
      <Footer />
    </>
  );
};

export default Auth;
