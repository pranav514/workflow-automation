"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import App from "next/app";
import { Appbar } from "@/components/AppBar";
import { div } from "framer-motion/client";


export default function SignInPage() {
  const router = useRouter();
 const [email , setEmail] = useState<string>("");
 const [password , setPassword] = useState<string>("");
 const [loading , setLoading] = useState<boolean>(false)
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    const user = await axios.post("http://localhost:3001/api/v1/user/signin" , {
      email,
      password
    })
    console.log(user.data)
    localStorage.setItem("token" , user.data.token);
    setLoading(false)
    router.push("/dashboard")
    
  };

  const features = [
    "AI-powered workflow automation",
    "Drag-and-drop interface",
    "100+ app integrations",
    "Real-time analytics",
    "Team collaboration tools",
    "24/7 customer support",
  ];

  return (
    <div>
    <Appbar />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-8 flex flex-col lg:flex-row gap-12">
        <motion.div
          className="flex-1 space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Start Your Journey with
              <span className="text-blue-600 block">FlowConnect</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Join thousands of teams who have already transformed their workflow
              with our intelligent automation platform.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CheckCircle className="h-6 w-6 text-blue-500" />
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create your account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />
                </div>
              </div>

              <motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  type="submit"
  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
>
  {loading ? (
    "Loging you in..."
  ) : (
    <>
      Login <ArrowRight className="ml-2 h-5 w-5" />
    </>
  )}
</motion.button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:text-blue-500">
                Sign up
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
    </div>
    
  );
}