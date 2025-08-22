"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for trying out FlowConnect",
    features: [
      "5 workflows",
      "100 tasks/month",
      "Basic integrations",
      "Community support",
      "1 team member",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "29",
    description: "Great for growing businesses",
    features: [
      "Unlimited workflows",
      "10,000 tasks/month",
      "Advanced integrations",
      "Priority support",
      "Up to 5 team members",
      "Workflow templates",
      "Custom branding",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "99",
    description: "For large scale operations",
    features: [
      "Unlimited everything",
      "Custom integrations",
      "24/7 phone support",
      "Unlimited team members",
      "Advanced analytics",
      "SLA guarantee",
      "Dedicated success manager",
      "Custom security controls",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that's right for your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                plan.popular ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.2 + featureIndex * 0.1,
                    }}
                    className="flex items-center space-x-3 text-gray-600"
                  >
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};