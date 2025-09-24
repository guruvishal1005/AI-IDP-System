import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import KPICard from "../../components/KPICard";
import Card from "../../components/Card";
import {
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  Bell,
  AlertTriangle,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { employees, notifications, chartData } from "../../utils/mockData";

const ManagerDashboard = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();

  // Mock team data for the manager
  const teamMembers = employees
    .filter(
      (emp) => emp.department === "Engineering" || emp.department === "Sales"
    )
    .slice(0, 4);
  const teamProgress = chartData.employeeProgress.filter((emp) =>
    ["Sarah", "John", "Michael", "David"].includes(emp.name)
  );

  const teamStats = {
    totalTeam: teamMembers.length,
    activeIDPs: teamMembers.filter(
      (member) => member.idpStatus === "In Progress"
    ).length,
    overdueTasks: 2,
    avgProgress: Math.round(
      teamMembers.reduce((acc, member) => acc + member.adcScore, 0) /
        teamMembers.length
    ),
  };

  const urgentNotifications = notifications.filter(
    (notif) => notif.priority === "high"
  );

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
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
          Welcome back, {user?.name?.split(" ")[0]}! 👋
        </h1>
        <p
          className={`text-lg mt-2 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Here's your team's development progress overview
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <KPICard
          title="Team Size"
          value={teamStats.totalTeam}
          icon={Users}
          color="blue"
        />
        <KPICard
          title="IDPs In Progress"
          value={teamStats.activeIDPs}
          icon={Clock}
          trend="+2 this month"
          color="purple"
        />
        <KPICard
          title="Overdue Tasks"
          value={teamStats.overdueTasks}
          icon={AlertTriangle}
          color="red"
        />
        <KPICard
          title="Avg Progress"
          value={`${teamStats.avgProgress}%`}
          icon={TrendingUp}
          trend="+8% this month"
          color="green"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Progress Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h2
              className={`text-xl font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Team Progress Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamProgress}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? "#374151" : "#E5E7EB"}
                />
                <XAxis dataKey="name" stroke={isDark ? "#9CA3AF" : "#6B7280"} />
                <YAxis stroke={isDark ? "#9CA3AF" : "#6B7280"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="overall" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Team Members List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h2
              className={`text-xl font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Team Members
            </h2>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    isDark
                      ? "bg-slate-800/50 hover:bg-slate-700/50"
                      : "bg-gray-50 hover:bg-gray-100"
                  } transition-colors cursor-pointer`}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3
                        className={`font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {member.name}
                      </h3>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {member.role} • {member.department}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        member.idpStatus === "Completed"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : member.idpStatus === "In Progress"
                          ? "bg-blue-100 text-blue-800 border border-blue-200"
                          : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                      }`}
                    >
                      {member.idpStatus}
                    </div>
                    <p
                      className={`text-sm mt-1 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      ADC: {member.adcScore}%
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Growth Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h2
              className={`text-xl font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Team Skill Growth Trend
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData.skillTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? "#374151" : "#E5E7EB"}
                />
                <XAxis
                  dataKey="month"
                  stroke={isDark ? "#9CA3AF" : "#6B7280"}
                />
                <YAxis stroke={isDark ? "#9CA3AF" : "#6B7280"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="functional"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  name="Functional Skills"
                />
                <Line
                  type="monotone"
                  dataKey="leadership"
                  stroke="#EC4899"
                  strokeWidth={3}
                  name="Leadership Skills"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Alerts & Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2
                className={`text-xl font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Urgent Alerts
              </h2>
              <Bell
                className={`w-5 h-5 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              />
            </div>
            <div className="space-y-3">
              {urgentNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`flex items-start space-x-3 p-3 rounded-lg ${
                    notification.type === "error"
                      ? isDark
                        ? "bg-red-900/20 border border-red-800/30"
                        : "bg-red-50 border border-red-200"
                      : notification.type === "warning"
                      ? isDark
                        ? "bg-amber-900/20 border border-amber-800/30"
                        : "bg-amber-50 border border-amber-200"
                      : isDark
                      ? "bg-blue-900/20 border border-blue-800/30"
                      : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  <div
                    className={`mt-0.5 ${
                      notification.type === "error"
                        ? "text-red-500"
                        : notification.type === "warning"
                        ? "text-amber-500"
                        : "text-blue-500"
                    }`}
                  >
                    {notification.type === "error" ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : notification.type === "warning" ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {notification.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div
                className={`flex items-center space-x-2 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Next team review: February 15, 2024</span>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
