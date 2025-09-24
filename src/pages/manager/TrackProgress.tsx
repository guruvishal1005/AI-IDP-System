import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  Calendar,
  MessageSquare,
  User,
  ChevronRight,
} from "lucide-react";
import { employees, mentorshipData } from "../../utils/mockData";
import { useTheme } from "../../context/ThemeContext";
import { CircularProgressbar } from "react-circular-progressbar";

const TrackProgress = () => {
  const { isDark } = useTheme();
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
      case "in progress":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1
          className={`text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}
        >
          Track Team Progress
        </h1>
        <p className={`mt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Monitor Individual Development Plan progress for your team members
        </p>
      </div>

      {/* Team Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Team Members",
            value: employees.length,
            icon: User,
            color: "blue",
          },
          {
            title: "Active IDPs",
            value: employees.filter((e) => e.idpStatus === "In Progress")
              .length,
            icon: Target,
            color: "green",
          },
          {
            title: "Avg Progress",
            value: `${Math.round(
              employees.reduce(
                (sum, emp) => sum + (emp.currentActivities?.[0]?.progress || 0),
                0
              ) / employees.length
            )}%`,
            icon: TrendingUp,
            color: "purple",
          },
          {
            title: "Due This Month",
            value: employees.filter((e) =>
              e.currentActivities?.some(
                (a) => new Date(a.dueDate).getMonth() === new Date().getMonth()
              )
            ).length,
            icon: Calendar,
            color: "orange",
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

      {/* Team Members Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Team List */}
        <div className="space-y-4">
          <h2
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Team Members
          </h2>

          {employees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl ${
                isDark ? "bg-gray-800/50" : "bg-white"
              } border ${
                isDark ? "border-gray-700" : "border-gray-200"
              } cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedEmployee === employee.id ? "ring-2 ring-purple-500" : ""
              }`}
              onClick={() => setSelectedEmployee(employee.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={employee.photo}
                    alt={employee.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {employee.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {employee.role} → {employee.targetRole}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(
                        employee.idpStatus
                      )}`}
                    >
                      {employee.idpStatus}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12">
                    <CircularProgressbar
                      value={employee.currentActivities?.[0]?.progress || 0}
                      text={`${
                        employee.currentActivities?.[0]?.progress || 0
                      }%`}
                      styles={{
                        path: { stroke: "#8b5cf6" },
                        text: {
                          fontSize: "24px",
                          fontWeight: "bold",
                          fill: isDark ? "#fff" : "#374151",
                        },
                        trail: { stroke: isDark ? "#374151" : "#e5e7eb" },
                      }}
                    />
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Progress */}
        <div className="space-y-6">
          <h2
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Detailed Progress
          </h2>

          {selectedEmployee ? (
            (() => {
              const employee = employees.find((e) => e.id === selectedEmployee);
              if (!employee) return null;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-xl ${
                    isDark ? "bg-gray-800/50" : "bg-white"
                  } border ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  } shadow-lg`}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={employee.photo}
                      alt={employee.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3
                        className={`text-2xl font-bold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {employee.name}
                      </h3>
                      <p
                        className={`${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {employee.department} • {employee.location}
                      </p>
                    </div>
                  </div>

                  {/* Competency Progress */}
                  <div className="mb-6">
                    <h4
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      } mb-4`}
                    >
                      Competency Development
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(employee.competencyGaps).map(
                        ([key, gap]) => (
                          <div key={key} className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2">
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
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    fill: isDark ? "#fff" : "#374151",
                                  },
                                  trail: {
                                    stroke: isDark ? "#374151" : "#e5e7eb",
                                  },
                                }}
                              />
                            </div>
                            <p
                              className={`text-sm font-medium ${
                                isDark ? "text-white" : "text-gray-900"
                              } capitalize`}
                            >
                              {key}
                            </p>
                            <p
                              className={`text-xs ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              Gap: {gap.gap} points
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Current Activities */}
                  <div className="mb-6">
                    <h4
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      } mb-4`}
                    >
                      Current Activities
                    </h4>
                    <div className="space-y-3">
                      {employee.currentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className={`p-4 rounded-lg ${
                            isDark ? "bg-gray-700/50" : "bg-gray-50"
                          } border ${
                            isDark ? "border-gray-600" : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5
                              className={`font-medium ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {activity.title}
                            </h5>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                activity.status
                              )}`}
                            >
                              {activity.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm">
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
                                Due:{" "}
                                {new Date(
                                  activity.dueDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2`}
                              >
                                <div
                                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${activity.progress}%` }}
                                />
                              </div>
                              <span
                                className={`text-sm font-medium ${getProgressColor(
                                  activity.progress
                                )} dark:text-gray-300`}
                              >
                                {activity.progress}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mentorship Status */}
                  {(() => {
                    const mentorship = mentorshipData.find(
                      (m) => m.menteeName === employee.name
                    );
                    if (!mentorship) return null;

                    return (
                      <div>
                        <h4
                          className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          } mb-4`}
                        >
                          Mentorship Progress
                        </h4>
                        <div
                          className={`p-4 rounded-lg ${
                            isDark ? "bg-gray-700/50" : "bg-gray-50"
                          } border ${
                            isDark ? "border-gray-600" : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p
                                className={`font-medium ${
                                  isDark ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {mentorship.mentorName}
                              </p>
                              <p
                                className={`text-sm ${
                                  isDark ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                Focus: {mentorship.skillFocus}
                              </p>
                            </div>
                            <div className="w-12 h-12">
                              <CircularProgressbar
                                value={mentorship.progress}
                                text={`${mentorship.progress}%`}
                                styles={{
                                  path: { stroke: "#10b981" },
                                  text: {
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    fill: isDark ? "#fff" : "#374151",
                                  },
                                  trail: {
                                    stroke: isDark ? "#374151" : "#e5e7eb",
                                  },
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span
                              className={`${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              Next Meeting:{" "}
                              {new Date(
                                mentorship.nextMeeting
                              ).toLocaleDateString()}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                mentorship.status
                              )}`}
                            >
                              {mentorship.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              );
            })()
          ) : (
            <div
              className={`text-center py-20 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Select a team member</h3>
              <p>
                Choose a team member from the list to view their detailed
                progress.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackProgress;
