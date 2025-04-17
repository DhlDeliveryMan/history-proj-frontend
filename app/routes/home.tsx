import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/components/global/navbar";
import Footer from "~/components/global/footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tests par Projekta darbu" },
    { name: "description", content: "Tests par Projekta darbu!" },
  ];
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Welcome />
      <Footer />
    </>
  );
}
