import Image from "next/image";
import { Button } from "@material-tailwind/react";
import App from "next/app";
import { Appbar } from "@/components/AppBar";
import { Hero } from "@/components/Hero";
export default function Home() {
  return (
    <div className="pb-48">
      <Appbar />
      <Hero />
    </div>
  );
}
