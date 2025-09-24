import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import Card from "../../components/Card";
import {
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { employees } from "../../utils/mockData";

const MyTeam = () => {
  const { isDark } = useTheme();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Mock team data
  const teamMembers = employees.slice(0, 4);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "#10B981"; // Green
    if (progress >= 60) return "#8B5CF6"; // Purple
    if (progress >= 40) return "#F59E0B"; // Amber
    return "#EF4444"; // Red
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
          My Team
        </h1>
        <p
          className={`text-lg mt-2 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Monitor team progress and manage individual development plans
        </p>
      </motion.div>

      {/* Team Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Team Members",
            value: teamMembers.length,
            icon: CheckCircle,
            color: "text-blue-500",
          },
          {
            title: "Active IDPs",
            value: teamMembers.filter((m) => m.idpStatus === "In Progress")
              .length,
            icon: Clock,
            color: "text-purple-500",
          },
          {
            title: "Completed",
            value: teamMembers.filter((m) => m.idpStatus === "Completed")
              .length,
            icon: CheckCircle,
            color: "text-green-500",
          },
          {
            title: "Avg Score",
            value: Math.round(
              teamMembers.reduce((acc, m) => acc + m.adcScore, 0) /
                teamMembers.length
            ),
            icon: TrendingUp,
            color: "text-amber-500",
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

      {/* Team Members Table */}
      <Card>
        <h2
          className={`text-xl font-semibold mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Team Members Progress
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? "border-slate-700" : "border-gray-200"
                }`}
              >
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Employee
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Role
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Progress
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  IDP Status
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Last Activity
                </th>
                <th
                  className={`text-left py-3 px-4 font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border-b ${
                    isDark
                      ? "border-slate-700 hover:bg-slate-800/30"
                      : "border-gray-100 hover:bg-gray-50"
                  } transition-colors`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p
                          className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {member.name}
                        </p>
                        <p
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {member.department}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`py-4 px-4 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {member.role}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12">
                        <CircularProgressbar
                          value={member.adcScore}
                          text={`${member.adcScore}%`}
                          styles={buildStyles({
                            textSize: "24px",
                            pathColor: getProgressColor(member.adcScore),
                            textColor: isDark ? "#FFFFFF" : "#1F2937",
                            trailColor: isDark ? "#374151" : "#E5E7EB",
                          })}
                        />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        ADC Score
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        member.idpStatus
                      )}`}
                    >
                      {member.idpStatus}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-4 text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    2 days ago
                  </td>
                  <td className="py-4 px-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedEmployee(member)}
                      className={`p-2 rounded-lg ${
                        isDark
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                      } transition-colors`}
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className={`max-w-4xl w-full rounded-2xl p-6 ${
              isDark
                ? "bg-slate-800 border border-slate-700"
                : "bg-white border border-gray-200"
            } shadow-2xl max-h-[90vh] overflow-y-auto`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedEmployee.photo}
                  alt={selectedEmployee.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3
                    className={`text-2xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {selectedEmployee.name}
                  </h3>
                  <p
                    className={`text-lg ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {selectedEmployee.role} • {selectedEmployee.department}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    Target: {selectedEmployee.targetRole}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedEmployee(null)}
                className={`px-4 py-2 rounded-lg ${
                  isDark
                    ? "bg-slate-700 text-white hover:bg-slate-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                } transition-colors`}
              >
                Close
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Skills Overview */}
              <div
                className={`p-4 rounded-xl ${
                  isDark ? "bg-slate-700/50" : "bg-gray-50"
                }`}
              >
                <h4
                  className={`font-semibold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Skills Assessment
                </h4>
                <div className="space-y-4">
                  {Object.entries(selectedEmployee.skills).map(
                    ([skill, score]) => (
                      <div key={skill}>
                        <div className="flex justify-between mb-2">
                          <span
                            className={`text-sm capitalize ${
                              isDark ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {skill}
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {score}%
                          </span>
                        </div>
                        <div
                          className={`w-full bg-gray-200 rounded-full h-2 ${
                            isDark ? "bg-slate-600" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Current Activities */}
              <div
                className={`p-4 rounded-xl ${
                  isDark ? "bg-slate-700/50" : "bg-gray-50"
                }`}
              >
                <h4
                  className={`font-semibold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Current Activities
                </h4>
                <div className="space-y-3">
                  {selectedEmployee.currentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className={`p-3 rounded-lg ${
                        isDark ? "bg-slate-800/50" : "bg-white"
                      } border ${
                        isDark ? "border-slate-600" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5
                            className={`font-medium ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {activity.title}
                          </h5>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs px-2 py-1 rounded ${getStatusColor(
                                activity.status
                              )}`}
                            >
                              {activity.status}
                            </span>
                            <span
                              className={`text-xs ${
                                isDark ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              Due:{" "}
                              {new Date(activity.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right ml-2">
                          <span
                            className={`text-sm font-medium ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {activity.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Send Message
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2 rounded-lg font-medium ${
                  isDark
                    ? "bg-slate-700 text-white hover:bg-slate-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                } transition-colors flex items-center gap-2`}
              >
                <Calendar className="w-4 h-4" />
                Schedule Review
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MyTeam;
