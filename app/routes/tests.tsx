import React from "react";
import type { Route } from "../+types/root";
import Navbar from "~/components/global/navbar";
import Footer from "~/components/global/footer";
import TestsComponent from "~/tests/testsComponent";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Testi" },
    { name: "description", content: "Tests par Projekta darbu!" },
  ];
}

const Tests: React.FC = () => {
  return (
    <>
      <Navbar />
      <TestsComponent />
      <Footer />
    </>
  );
};

export default Tests;
