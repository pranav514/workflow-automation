"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const Description = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Transform Your Workflow
              <span className="block text-blue-600 mt-2">With Intelligent Automation</span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Our powerful workflow automation platform helps teams work smarter, 
              not harder. Eliminate repetitive tasks and focus on what matters most.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="flex-1 relative h-[600px] w-full lg:w-[600px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/flow.png"
              alt="Workflow Diagram"
              fill
              style={{ objectFit: "contain" }}
              className="filter grayscale hover:grayscale-0 transition-duration-300"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
const features = [
  {
    title: "Drag & Drop Interface",
    description: "Build complex workflows without writing a single line of code",
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
  },
  {
    title: "Smart Integrations",
    description: "Connect with your favorite tools and services seamlessly",
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
  },
  {
    title: "Real-time Analytics",
    description: "Monitor and optimize your workflows with detailed insights",
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
  }
];