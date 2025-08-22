"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { Appbar } from "@/components/AppBar";
import { ArrowLeft, Activity, Clock, Settings, PlayCircle, PauseCircle } from "lucide-react";

interface ZapDetails {
  trigger: {
    type: {
      name: string;
      image: string;
    };
  };
  actions: Array<{
    type: {
      name: string;
      image: string;
    };
  }>;
}

export default function ZapView() {
  const router = useRouter();
  const params = useParams();
  const [zapDetails, setZapDetails] = useState<ZapDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const fetchZapDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/zap/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setZapDetails(response.data.zap);
      } catch (error) {
        console.error("Error fetching zap details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchZapDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Appbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workflows
          </button>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Workflow Details</h1>
            <button
              onClick={() => setIsActive(!isActive)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {isActive ? (
                <>
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Active
                </>
              ) : (
                <>
                  <PauseCircle className="w-5 h-5 mr-2" />
                  Paused
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Workflow Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex items-center">
            {zapDetails?.trigger && (
              <div className="flex items-center">
                <img
                  src={zapDetails.trigger.type.image}
                  alt={zapDetails.trigger.type.name}
                  className="w-12 h-12 rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">
                    {zapDetails.trigger.type.name}
                  </h3>
                  <p className="text-sm text-gray-500">Trigger</p>
                </div>
              </div>
            )}
            
            <div className="flex-1 flex items-center justify-center">
              <div className="h-0.5 bg-blue-200 flex-1 mx-4" />
            </div>

            {zapDetails?.actions.map((action, index) => (
              <div key={index} className="flex items-center">
                <img
                  src={action.type.image}
                  alt={action.type.name}
                  className="w-12 h-12 rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">
                    {action.type.name}
                  </h3>
                  <p className="text-sm text-gray-500">Action {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats and Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Workflow Stats
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Total Runs</p>
                  <p className="text-lg font-semibold">1,234</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Last Run</p>
                  <p className="text-lg font-semibold">2 hours ago</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Workflow Settings
            </h2>
            <button
              onClick={() => router.push(`/zap/${params.id}/update`)}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Settings className="w-5 h-5 mr-2" />
              Edit Workflow
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}