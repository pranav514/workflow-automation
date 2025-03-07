import Image from "next/image";
import { Button } from "@material-tailwind/react";
import App from "next/app";
import { Appbar } from "@/components/AppBar";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { Description } from "@/components/Description";
import { Footer } from "@/components/Footer";
export default function Home() {
  return (
    <div >
      <Appbar />
      <Hero />
      <Description />
    
      <Pricing />
      <Footer />
    </div>
  );
}
