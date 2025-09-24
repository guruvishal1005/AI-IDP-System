import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  IndianRupee,
  Calendar,
  User,
  MessageSquare,
} from "lucide-react";
import { pendingApprovals } from "../../utils/mockData";
import { useTheme } from "../../context/ThemeContext";

const Approvals = () => {
  const { isDark } = useTheme();
  const [approvals, setApprovals] = useState(pendingApprovals);
  const [filter, setFilter] = useState("all");

  const handleApprove = (id: number) => {
    setApprovals((prev) => prev.filter((approval) => approval.id !== id));
  };

  const handleReject = (id: number) => {
    setApprovals((prev) => prev.filter((approval) => approval.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30";
      case "low":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30";
    }
  };

  const filteredApprovals = approvals.filter((approval) => {
    if (filter === "all") return true;
    return approval.priority.toLowerCase() === filter;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}
          >
            IDP Approvals
          </h1>
          <p className={`mt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Review and approve Individual Development Plans for your team
            members
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {["all", "high", "medium", "low"].map((priority) => (
            <button
              key={priority}
              onClick={() => setFilter(priority)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === priority
                  ? "bg-purple-600 text-white shadow-lg"
                  : `${
                      isDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    } border`
              }`}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Pending",
            value: approvals.length,
            icon: Clock,
            color: "blue",
          },
          {
            title: "High Priority",
            value: approvals.filter((a) => a.priority === "High").length,
            icon: FileText,
            color: "red",
          },
          {
            title: "This Month",
            value: approvals.filter(
              (a) =>
                new Date(a.requestedDate).getMonth() === new Date().getMonth()
            ).length,
            icon: Calendar,
            color: "green",
          },
          {
            title: "Total Budget",
            value: `₹${(
              approvals.reduce((sum, a) => sum + a.estimatedCost, 0) / 100000
            ).toFixed(1)}L`,
            icon: IndianRupee,
            color: "purple",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-2xl ${
              isDark ? "bg-gray-800/50" : "bg-white"
            } backdrop-blur-sm border ${
              isDark ? "border-gray-700" : "border-gray-200"
            } shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {stat.title}
                </p>
                <p
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}
              >
                <stat.icon
                  className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Approval Cards */}
      <div className="space-y-6">
        {filteredApprovals.map((approval, index) => (
          <motion.div
            key={approval.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-2xl ${
              isDark ? "bg-gray-800/50" : "bg-white"
            } backdrop-blur-sm border ${
              isDark ? "border-gray-700" : "border-gray-200"
            } shadow-lg`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <User
                      className={`w-5 h-5 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <h3
                      className={`text-xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {approval.employeeName}
                    </h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      approval.priority
                    )}`}
                  >
                    {approval.priority} Priority
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      } mb-2`}
                    >
                      {approval.title}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      } mb-4`}
                    >
                      {approval.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar
                          className={`w-4 h-4 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={isDark ? "text-gray-300" : "text-gray-600"}
                        >
                          Duration: {approval.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <IndianRupee
                          className={`w-4 h-4 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={isDark ? "text-gray-300" : "text-gray-600"}
                        >
                          Estimated Cost: ₹
                          {(approval.estimatedCost / 100000).toFixed(1)}L
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5
                      className={`font-medium ${
                        isDark ? "text-white" : "text-gray-900"
                      } mb-2`}
                    >
                      Manager's Note:
                    </h5>
                    <div
                      className={`p-3 rounded-lg ${
                        isDark ? "bg-gray-700/50" : "bg-gray-50"
                      } border-l-4 border-purple-500`}
                    >
                      <div className="flex items-start space-x-2">
                        <MessageSquare
                          className={`w-4 h-4 mt-0.5 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <p
                          className={`text-sm ${
                            isDark ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {approval.managerNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 ml-6">
                <button
                  onClick={() => handleApprove(approval.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleReject(approval.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredApprovals.length === 0 && (
          <div
            className={`text-center py-20 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No approvals found</h3>
            <p>
              There are no {filter === "all" ? "" : `${filter} priority `}
              approvals pending at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Approvals;
