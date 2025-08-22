"use client";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";
import { motion } from "framer-motion";
import { Zap, Bot, Workflow } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Description } from "./Description";
import { InfiniteLogoSlider } from "./InfiniteLogoSlider";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const FeatureCard = ({ icon, title, subtitle }: FeatureCardProps) => (
  <motion.div
    whileHover={{ scale: 1.03, y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="flex flex-col items-center p-8 rounded-xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 max-w-xs relative overflow-hidden group"
  >
    <motion.div
      className="text-blue-500 mb-6 relative z-10 p-4 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300"
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>

    <motion.h3
      className="text-2xl font-bold mb-3 text-gray-900 relative z-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {title}
    </motion.h3>

    <motion.p
      className="text-gray-600 text-center leading-relaxed relative z-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {subtitle}
    </motion.p>

    {/* Background decoration */}
    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </motion.div>
);

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

          <div className="grid md:grid-cols-3 gap-8 mt-12 px-4">
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
      </div>
    </div>
  );
};
