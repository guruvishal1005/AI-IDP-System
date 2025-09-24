import { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Calendar,
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Play,
} from "lucide-react";
import { employees } from "../../utils/mockData";
import { useTheme } from "../../context/ThemeContext";
import { CircularProgressbar } from "react-circular-progressbar";

const MyIDP = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");

  // For demo, using the first employee as current user
  const currentUser = employees[0];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
      case "in progress":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30";
      case "planned":
        return "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Target },
    { id: "activities", label: "Activities", icon: BookOpen },
    { id: "competencies", label: "Competencies", icon: Users },
    { id: "timeline", label: "Timeline", icon: Calendar },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}
          >
            My Individual Development Plan
          </h1>
          <p className={`mt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Track your professional development journey toward{" "}
            {currentUser.targetRole}
          </p>
        </div>

        <div
          className={`px-4 py-2 rounded-lg ${
            isDark ? "bg-gray-800" : "bg-white"
          } border ${isDark ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span
              className={`text-sm font-medium ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {currentUser.idpStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div
        className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}
      >
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? "border-purple-500 text-purple-600"
                  : `border-transparent ${
                      isDark
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    }`
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl ${
                  isDark ? "bg-gray-800/50" : "bg-white"
                } border ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-lg font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Overall Progress
                  </h3>
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
                <div className="w-20 h-20 mx-auto mb-4">
                  <CircularProgressbar
                    value={currentUser.currentActivities[0]?.progress || 0}
                    text={`${currentUser.currentActivities[0]?.progress || 0}%`}
                    styles={{
                      path: { stroke: "#8b5cf6" },
                      text: {
                        fontSize: "16px",
                        fontWeight: "bold",
                        fill: isDark ? "#fff" : "#374151",
                      },
                      trail: { stroke: isDark ? "#374151" : "#e5e7eb" },
                    }}
                  />
                </div>
                <p
                  className={`text-center text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Current development progress
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-6 rounded-2xl ${
                  isDark ? "bg-gray-800/50" : "bg-white"
                } border ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-lg font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Active Activities
                  </h3>
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-center">
                  <p
                    className={`text-3xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    } mb-2`}
                  >
                    {currentUser.currentActivities.length}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Development activities in progress
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-6 rounded-2xl ${
                  isDark ? "bg-gray-800/50" : "bg-white"
                } border ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-lg font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    ADC Score
                  </h3>
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div className="text-center">
                  <p
                    className={`text-3xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    } mb-2`}
                  >
                    {currentUser.adcScore}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Assessment Development Centre score
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Career Path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-2xl ${
                isDark ? "bg-gray-800/50" : "bg-white"
              } border ${
                isDark ? "border-gray-700" : "border-gray-200"
              } shadow-lg`}
            >
              <h3
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                } mb-6`}
              >
                Career Development Path
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-xl ${
                      isDark ? "bg-blue-900/30" : "bg-blue-100"
                    }`}
                  >
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Current Position
                    </h4>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {currentUser.role}
                    </p>
                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {currentUser.department}
                    </p>
                  </div>
                </div>

                <div className="flex-1 px-8">
                  <div
                    className={`w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 relative`}
                  >
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                      style={{
                        width: `${
                          currentUser.currentActivities[0]?.progress || 0
                        }%`,
                      }}
                    />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <span
                        className={`text-xs font-medium ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {currentUser.currentActivities[0]?.progress || 0}%
                        Complete
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div>
                    <h4
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      } text-right`}
                    >
                      Target Position
                    </h4>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {currentUser.targetRole}
                    </p>
                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {currentUser.location}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl ${
                      isDark ? "bg-green-900/30" : "bg-green-100"
                    }`}
                  >
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === "activities" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Development Activities
              </h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200">
                <Play className="w-4 h-4" />
                <span>Start Activity</span>
              </button>
            </div>

            {currentUser.currentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl ${
                  isDark ? "bg-gray-800/50" : "bg-white"
                } border ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } shadow-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4
                        className={`text-lg font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {activity.title}
                      </h4>
                      {getPriorityIcon(activity.priority)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full font-medium ${getStatusColor(
                          activity.status
                        )}`}
                      >
                        {activity.status}
                      </span>
                      <span
                        className={`${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {activity.type}
                      </span>
                      <span
                        className={`${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Due: {new Date(activity.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="w-16 h-16">
                    <CircularProgressbar
                      value={activity.progress}
                      text={`${activity.progress}%`}
                      styles={{
                        path: {
                          stroke:
                            activity.progress >= 80
                              ? "#10b981"
                              : activity.progress >= 60
                              ? "#f59e0b"
                              : "#ef4444",
                        },
                        text: {
                          fontSize: "16px",
                          fontWeight: "bold",
                          fill: isDark ? "#fff" : "#374151",
                        },
                        trail: { stroke: isDark ? "#374151" : "#e5e7eb" },
                      }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Progress
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {activity.progress}%
                    </span>
                  </div>
                  <div
                    className={`w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2`}
                  >
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${activity.progress}%` }}
                    />
                  </div>
                </div>

                {activity.impact && (
                  <div
                    className={`p-3 rounded-lg ${
                      isDark ? "bg-gray-700/50" : "bg-gray-50"
                    } border-l-4 border-purple-500`}
                  >
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <strong>Expected Impact:</strong> {activity.impact}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "competencies" && (
          <div className="space-y-6">
            <h3
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Competency Gap Analysis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(currentUser.competencyGaps).map(([key, gap]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-6 rounded-2xl ${
                    isDark ? "bg-gray-800/50" : "bg-white"
                  } border ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  } shadow-lg text-center`}
                >
                  <div className="w-24 h-24 mx-auto mb-4">
                    <CircularProgressbar
                      value={(gap.current / gap.required) * 100}
                      text={gap.current.toString()}
                      styles={{
                        path: {
                          stroke:
                            gap.gap > 15
                              ? "#ef4444"
                              : gap.gap > 5
                              ? "#f59e0b"
                              : "#10b981",
                        },
                        text: {
                          fontSize: "14px",
                          fontWeight: "bold",
                          fill: isDark ? "#fff" : "#374151",
                        },
                        trail: { stroke: isDark ? "#374151" : "#e5e7eb" },
                      }}
                    />
                  </div>
                  <h4
                    className={`text-lg font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    } capitalize mb-2`}
                  >
                    {key} Skills
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span
                        className={isDark ? "text-gray-400" : "text-gray-500"}
                      >
                        Current:
                      </span>
                      <span className={isDark ? "text-white" : "text-gray-900"}>
                        {gap.current}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span
                        className={isDark ? "text-gray-400" : "text-gray-500"}
                      >
                        Required:
                      </span>
                      <span className={isDark ? "text-white" : "text-gray-900"}>
                        {gap.required}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span
                        className={isDark ? "text-gray-400" : "text-gray-500"}
                      >
                        Gap:
                      </span>
                      <span
                        className={`font-semibold ${
                          gap.gap > 15
                            ? "text-red-500"
                            : gap.gap > 5
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        {gap.gap} points
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="space-y-6">
            <h3
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Development Timeline
            </h3>

            <div className="relative">
              <div
                className={`absolute left-8 top-0 bottom-0 w-0.5 ${
                  isDark ? "bg-gray-600" : "bg-gray-300"
                }`}
              />

              {currentUser.currentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative flex items-center space-x-6 pb-8"
                >
                  <div
                    className={`w-4 h-4 rounded-full ${
                      activity.status === "Completed"
                        ? "bg-green-500"
                        : activity.status === "In Progress"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                    } relative z-10`}
                  />

                  <div
                    className={`flex-1 p-4 rounded-lg ${
                      isDark ? "bg-gray-800/50" : "bg-white"
                    } border ${
                      isDark ? "border-gray-700" : "border-gray-200"
                    } shadow-sm`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4
                        className={`font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {activity.title}
                      </h4>
                      <span
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {new Date(activity.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          activity.status
                        )}`}
                      >
                        {activity.status}
                      </span>
                      <div
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {activity.progress}% complete
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyIDP;
