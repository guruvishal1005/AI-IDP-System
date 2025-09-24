import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import Card from "../../components/Card";
import {
  CheckCircle,
  XCircle,
  Edit3,
  Clock,
  DollarSign,
  Calendar,
  User,
} from "lucide-react";
import { pendingApprovals } from "../../utils/mockData";

interface ApprovalRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  requestType: string;
  title: string;
  description: string;
  estimatedCost: number;
  duration: string;
  priority: string;
  requestedDate: string;
  managerNote: string;
  status?: "approved" | "rejected";
  adminComment?: string;
}

const CreateIDPs = () => {
  const { isDark } = useTheme();
  const [approvals, setApprovals] =
    useState<ApprovalRequest[]>(pendingApprovals);
  const [selectedRequest, setSelectedRequest] =
    useState<ApprovalRequest | null>(null);
  const [comment, setComment] = useState("");

  const handleApproval = (id: number, action: "approve" | "reject") => {
    setApprovals((prev) =>
      prev.map((approval) =>
        approval.id === id
          ? {
              ...approval,
              status: action === "approve" ? "approved" : "rejected",
              adminComment: comment,
            }
          : approval
      )
    );
    setComment("");
    setSelectedRequest(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "training":
        return "📘";
      case "job rotation":
        return "🔄";
      case "mentorship":
        return "🧑‍🏫";
      default:
        return "📋";
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1
          className={`text-3xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Create & Approve IDPs
        </h1>
        <p
          className={`text-lg mt-2 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Review and approve individual development plan requests
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Pending Requests",
            value: approvals.filter((a) => !a.status).length,
            icon: Clock,
            color: "text-amber-500",
          },
          {
            title: "This Month",
            value: "12",
            icon: Calendar,
            color: "text-blue-500",
          },
          {
            title: "Total Budget",
            value: "₹2.5L",
            icon: DollarSign,
            color: "text-green-500",
          },
          {
            title: "Approved Rate",
            value: "87%",
            icon: CheckCircle,
            color: "text-purple-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="text-center">
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <h3
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {stat.value}
              </h3>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.title}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pending Requests */}
      <Card>
        <h2
          className={`text-xl font-semibold mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Pending Approval Requests
        </h2>

        <div className="space-y-4">
          {approvals
            .filter((approval) => !approval.status)
            .map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-xl p-6 ${
                  isDark
                    ? "border-slate-700 bg-slate-800/30"
                    : "border-gray-200 bg-gray-50"
                } hover:shadow-lg transition-all duration-200`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">
                        {getTypeIcon(request.requestType)}
                      </span>
                      <div>
                        <h3
                          className={`text-lg font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {request.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {request.employeeName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {request.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />₹
                            {request.estimatedCost.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p
                      className={`text-sm mb-3 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {request.description}
                    </p>

                    {request.managerNote && (
                      <div
                        className={`p-3 rounded-lg mb-4 ${
                          isDark ? "bg-slate-700/50" : "bg-blue-50"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            isDark ? "text-blue-300" : "text-blue-800"
                          }`}
                        >
                          <strong>Manager Note:</strong> {request.managerNote}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-xs border ${getPriorityColor(
                          request.priority
                        )}`}
                      >
                        {request.priority} Priority
                      </span>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedRequest(request)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            isDark
                              ? "bg-purple-600 text-white hover:bg-purple-700"
                              : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                          } transition-colors`}
                        >
                          <Edit3 className="w-4 h-4 inline mr-1" />
                          Review
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </Card>

      {/* Review Modal */}
      {selectedRequest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className={`max-w-md w-full rounded-2xl p-6 ${
              isDark
                ? "bg-slate-800 border border-slate-700"
                : "bg-white border border-gray-200"
            } shadow-2xl`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Review Request: {selectedRequest.title}
            </h3>

            <div className="mb-4">
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Admin Comments
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${
                  isDark
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                rows={3}
                placeholder="Add your comments here..."
              />
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleApproval(selectedRequest.id, "approve")}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleApproval(selectedRequest.id, "reject")}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRequest(null)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  isDark
                    ? "bg-slate-700 text-white hover:bg-slate-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                } transition-colors`}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CreateIDPs;
