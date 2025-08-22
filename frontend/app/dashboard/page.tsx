"use client";

import { useZaps } from "../hooks/zaps";
import { useRouter } from "next/navigation";
import { Appbar } from "@/components/AppBar";
import { DarkButton } from "@/components/buttons/DarkButton";
import { LinkButton } from "@/components/buttons/LinkButton";
import { Zap } from "../types/zap";
import { motion } from "framer-motion";
import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Trash2, AlertCircle } from "lucide-react";
import { useState } from "react";
import axios from "axios";

import { Plus, Calendar, ArrowRight, ClipboardCopy } from "lucide-react";
function Animations() {
  return (
    <Box sx={{ width: 300 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  workflowName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  workflowName: string;
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
      >
        <div className="flex items-center space-x-2 text-red-600 mb-4">
          <AlertCircle className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Delete Workflow</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{workflowName}"? This action cannot
          be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

function Page() {
  const { loading, zaps } = useZaps();
  console.log("zaps", zaps);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold text-gray-900"
            >
              My Workflows
            </motion.h1>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <DarkButton onClick={() => router.push("/zap/create")}>
                Create Workflow
              </DarkButton>
            </motion.div>
          </div>

          {loading ? <Animations /> : <ZapTable zaps={zaps} />}
        </div>
      </motion.div>
    </div>
  );
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    zapId: string;
    name: string;
  }>({
    isOpen: false,
    zapId: "",
    name: "",
  });

  const handleDelete = async (zapId: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/zap/delete/${zapId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting workflow:", error);
      alert("Failed to delete workflow");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50 border-b">
        <div className="text-sm font-medium text-gray-500">WORKFLOW</div>
        <div className="text-sm font-medium text-gray-500">ID</div>
        <div className="text-sm font-medium text-gray-500">LAST EDITED</div>
        <div className="text-sm font-medium text-gray-500">STATUS</div>
        <div className="text-sm font-medium text-gray-500">WEBHOOK URL</div>
        <div className="text-sm font-medium text-gray-500">ACTIONS</div>
      </div>

      {zaps.map((zap, index) => (
        <motion.div
          key={zap.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50 border-b last:border-b-0"
        >
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <img
                src={zap.trigger.type.image}
                alt={zap.trigger.type.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-gray-400 mx-2">→</span>
              <div className="flex -space-x-2">
                {zap.actions.map((action, idx) => (
                  <img
                    key={idx}
                    src={action.type.image}
                    alt={action.type.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 font-mono">
              {zap.id.substring(0, 8)}...
            </span>
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />1 days ago
          </div>
          <div className="flex items-center">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </div>
          <div className="flex items-center">
            <motion.div
              className="relative group flex items-center"
              whileHover={{ scale: 1.02 }}
            >
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `http://localhost:3000/hooks/catch//653bbbf6-dd5a-4cb6-aebc-5bb57777e6e5/${zap.id}`
                  )
                }
                className="ml-10 p-1 text-gray-400 hover:text-blue-500"
                title="Copy webhook URL"
              >
                <ClipboardCopy className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <LinkButton
                onClick={() => router.push(`/zap/${zap.id}`)}
                // className="flex items-center gap-2"
              >
                View
                <ArrowRight className="w-4 h-4" />
              </LinkButton>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setDeleteModal({
                  isOpen: true,
                  zapId: zap.id,
                  name: zap.trigger.type.name,
                })
              }
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Delete Workflow"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      ))}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, zapId: "", name: "" })}
        onConfirm={() => {
          handleDelete(deleteModal.zapId);
          setDeleteModal({ isOpen: false, zapId: "", name: "" });
        }}
        workflowName={deleteModal.name}
      />
    </div>
  );
}

// pagination to be added here

export default Page;
