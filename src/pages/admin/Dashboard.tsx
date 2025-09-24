import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import KPICard from "../../components/KPICard";
import Card from "../../components/Card";
import {
  Users,
  FileText,
  CheckCircle,
  TrendingUp,
  Bell,
  AlertTriangle,
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
import { chartData, notifications } from "../../utils/mockData";

const AdminDashboard: React.FC = () => {
  const { isDark } = useTheme();

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
          Admin Dashboard
        </h1>
        <p
          className={`text-lg mt-2 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Welcome back! Here's your system overview.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <KPICard
          title="Total Employees"
          value="124"
          icon={Users}
          trend="+5% this month"
          color="blue"
        />
        <KPICard
          title="Pending IDPs"
          value="23"
          icon={FileText}
          trend="-12% this week"
          color="orange"
        />
        <KPICard
          title="Completed IDPs"
          value="89"
          icon={CheckCircle}
          trend="+18% this month"
          color="green"
        />
        <KPICard
          title="Avg ADC Score"
          value="82.4"
          icon={TrendingUp}
          trend="+3.2 points"
          color="purple"
        />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Progress Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3
              className={`text-xl font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Department-wise IDP Completion
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.departmentProgress}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis
                  dataKey="department"
                  className={`text-sm ${
                    isDark ? "fill-gray-400" : "fill-gray-600"
                  }`}
                />
                <YAxis
                  className={`text-sm ${
                    isDark ? "fill-gray-400" : "fill-gray-600"
                  }`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#1e293b" : "#ffffff",
                    border: isDark ? "1px solid #475569" : "1px solid #e2e8f0",
                    borderRadius: "12px",
                    color: isDark ? "#ffffff" : "#000000",
                  }}
                />
                <Bar
                  dataKey="completed"
                  stackId="a"
                  fill="url(#gradient1)"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="pending"
                  stackId="a"
                  fill="url(#gradient2)"
                  radius={[2, 2, 0, 0]}
                />
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#fb923c" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Skill Gap Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3
              className={`text-xl font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Average Skill Gap Closure Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.skillTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis
                  dataKey="month"
                  className={`text-sm ${
                    isDark ? "fill-gray-400" : "fill-gray-600"
                  }`}
                />
                <YAxis
                  className={`text-sm ${
                    isDark ? "fill-gray-400" : "fill-gray-600"
                  }`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#1e293b" : "#ffffff",
                    border: isDark ? "1px solid #475569" : "1px solid #e2e8f0",
                    borderRadius: "12px",
                    color: isDark ? "#ffffff" : "#000000",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="url(#lineGradient)"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#d946ef" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Notifications Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Bell
              className={`w-6 h-6 ${
                isDark ? "text-purple-400" : "text-purple-600"
              }`}
            />
            <h3
              className={`text-xl font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Recent Notifications
            </h3>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                className={`flex items-start gap-3 p-4 rounded-xl transition-all duration-200 ${
                  isDark ? "bg-slate-700/30" : "bg-gray-50"
                }`}
                whileHover={{ x: 4 }}
              >
                <div
                  className={`p-2 rounded-lg ${
                    notification.type === "success"
                      ? "bg-green-100 text-green-600"
                      : notification.type === "warning"
                      ? "bg-orange-100 text-orange-600"
                      : notification.type === "error"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {notification.type === "error" ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <Bell className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {notification.message}
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {notification.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
