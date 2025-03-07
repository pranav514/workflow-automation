"use client";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";
import { motion } from "framer-motion";
import { Zap, Bot, Workflow } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Description } from "./Description";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const FeatureCard = ({ icon, title, subtitle }: FeatureCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center p-6 m-4 rounded-lg bg-white shadow-lg max-w-xs"
  >
    <div className="text-blue-500 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{subtitle}</p>
  </motion.div>
);

const companies = [
  { name: "Slack", logo: "/logos/Slack.png" },
  { name: "Spotify", logo: "/logos/Spotify.png" },
  { name: "Airbnb", logo: "/logos/Airbnb.png" },
  { name: "Zapier", logo: "/logos/Zapier.png" },
  { name: "Netflix", logo: "/logos/Netflix.png" },
  { name: "Zomato", logo: "/logos/Zomato.png" },
];

const duplicatedCompanies = Array(2).fill(companies).flat();

const InfiniteLogoSlider = () => {
  return (
    <div className="mt-16 text-center overflow-hidden relative">
      <p className="text-gray-500 mb-4">Trusted by top companies worldwide</p>

      <div className="relative w-full overflow-hidden">
        <div className="flex">
          <motion.div
            className="flex items-center gap-12 whitespace-nowrap"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {companies.map((company, index) => (
              <div
                key={`first-${index}`}
                className="relative w-32 h-12 flex-shrink-0"
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  style={{ objectFit: "contain" }}
                  className="filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
            {/* Second set of logos */}
            {companies.map((company, index) => (
              <div
                key={`second-${index}`}
                className="relative w-32 h-12 flex-shrink-0"
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  style={{ objectFit: "contain" }}
                  className="filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
            {/* Third set of logos for seamless loop */}
            {companies.map((company, index) => (
              <div
                key={`third-${index}`}
                className="relative w-32 h-12 flex-shrink-0"
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  style={{ objectFit: "contain" }}
                  className="filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Automate your workflow as fast as{" "}
            <span className="text-blue-600">you think</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            FlowConnect simplifies your processes, letting you build and manage
            workflows effortlessly. No coding, no delays—just results.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <PrimaryButton
              onClick={() => router.push("/signup")}
              size="big"
              className="hover:scale-105 transition-transform"
            >
              Get Started Free
            </PrimaryButton>
            <SecondaryButton
              onClick={() => router.push("/contact")}
              size="big"
              className="hover:scale-105 transition-transform"
            >
              Schedule Demo
            </SecondaryButton>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <FeatureCard
              icon={<Zap size={32} />}
              title="Blazing Fast"
              subtitle="Set up workflows in seconds and boost efficiency"
            />
            <FeatureCard
              icon={<Bot size={32} />}
              title="Smart Automation"
              subtitle="Handles complex tasks smoothly with zero hassle"
            />
            <FeatureCard
              icon={<Workflow size={32} />}
              title="Effortless Integration"
              subtitle="Works seamlessly with all your favorite tools"
            />
          </div>
          <InfiniteLogoSlider />
        </motion.div>
        <Description />
      </div>
    </div>
  );
};
