import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  Calendar,
  Award,
  ChevronDown,
  Filter,
  Download,
} from "lucide-react";
import { employees } from "../../utils/mockData";
import { useTheme } from "../../context/ThemeContext";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const ProgressTracker = () => {
  const { isDark } = useTheme();
  //const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [showFilters, setShowFilters] = useState(false);

  // For demo, using the first employee as current user
  const currentUser = employees[0];

  const progressData = [
    {
      month: "Jan",
      technical: 65,
      leadership: 40,
      behavioral: 70,
      overall: 58,
    },
    {
      month: "Feb",
      technical: 68,
      leadership: 45,
      behavioral: 72,
      overall: 62,
    },
    {
      month: "Mar",
      technical: 72,
      leadership: 50,
      behavioral: 75,
      overall: 66,
    },
    {
      month: "Apr",
      technical: 75,
      leadership: 55,
      behavioral: 78,
      overall: 69,
    },
    {
      month: "May",
      technical: 78,
      leadership: 60,
      behavioral: 80,
      overall: 73,
    },
    {
      month: "Jun",
      technical: 82,
      leadership: 65,
      behavioral: 83,
      overall: 77,
    },
  ];

  const skillProgress = [
    { name: "Technical Skills", current: 82, target: 90, improvement: "+17" },
    { name: "Leadership", current: 65, target: 85, improvement: "+25" },
    { name: "Behavioral", current: 83, target: 90, improvement: "+13" },
    { name: "Communication", current: 75, target: 80, improvement: "+8" },
    { name: "Problem Solving", current: 70, target: 85, improvement: "+15" },
  ];

  const milestones = [
  {
    title: "High Voltage Safety Training",
    date: "2024-02-10",
    status: "Completed",
    points: 20,
    description:
      "Completed mandatory high-voltage equipment handling and safety certification.",
  },
  {
    title: "Smart Grid Technology Workshop",
    date: "2024-03-25",
    status: "Completed",
    points: 30,
    description:
      "Participated in hands-on workshop on smart grids and digital substations.",
  },
  {
    title: "Renewable Integration Project",
    date: "2024-04-15",
    status: "In Progress",
    points: 40,
    description:
      "Currently involved in a live project for solar and wind integration into regional grid.",
  },
  {
    title: "Leadership Development Program",
    date: "2024-05-20",
    status: "Scheduled",
    points: 25,
    description:
      "Nominated for POWERGRID’s leadership development and succession pipeline training.",
  },
  {
    title: "Cybersecurity Awareness for Grid Systems",
    date: "2024-06-05",
    status: "Scheduled",
    points: 15,
    description:
      "Upcoming program focused on securing SCADA/OT systems from cyber threats.",
  },
  ];

  const achievements = [
    {
      title: "Top Performer Q1",
      date: "2024-03-31",
      category: "Performance",
      icon: "🏆",
    },
    {
      title: "Innovation Award",
      date: "2024-02-15",
      category: "Innovation",
      icon: "💡",
    },
    {
      title: "Team Player of the Month",
      date: "2024-01-30",
      category: "Collaboration",
      icon: "🤝",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
      case "in progress":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30";
      case "scheduled":
        return "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "#10b981";
    if (progress >= 60) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}
          >
            Progress Tracker
          </h1>
          <p className={`mt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Monitor your development progress and achievements
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              } transition-colors duration-200`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Progress Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl ${
            isDark ? "bg-gray-800/50" : "bg-white"
          } border ${isDark ? "border-gray-700" : "border-gray-200"} shadow-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Overall Progress
            </h3>
            <TrendingUp className="w-6 h-6 text-purple-500" />
          </div>
          <div className="w-20 h-20 mx-auto mb-4">
            <CircularProgressbar
              value={77}
              text="77%"
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
            +15% from last month
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-6 rounded-2xl ${
            isDark ? "bg-gray-800/50" : "bg-white"
          } border ${isDark ? "border-gray-700" : "border-gray-200"} shadow-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Milestones
            </h3>
            <Target className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-center">
            <p
              className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              } mb-2`}
            >
              2/4
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Completed this quarter
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-2xl ${
            isDark ? "bg-gray-800/50" : "bg-white"
          } border ${isDark ? "border-gray-700" : "border-gray-200"} shadow-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Activities
            </h3>
            <Calendar className="w-6 h-6 text-blue-500" />
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
              Active development activities
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-6 rounded-2xl ${
            isDark ? "bg-gray-800/50" : "bg-white"
          } border ${isDark ? "border-gray-700" : "border-gray-200"} shadow-lg`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Achievements
            </h3>
            <Award className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="text-center">
            <p
              className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              } mb-2`}
            >
              {achievements.length}
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Recognition badges earned
            </p>
          </div>
        </motion.div>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={`p-6 rounded-2xl ${
            isDark ? "bg-gray-800/50" : "bg-white"
          } border ${isDark ? "border-gray-700" : "border-gray-200"} shadow-lg`}
        >
          <h3
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            } mb-6`}
          >
            Progress Trend (Last 6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#374151" : "#e5e7eb"}
              />
              <XAxis dataKey="month" stroke={isDark ? "#9ca3af" : "#6b7280"} />
              <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="overall"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="technical"
                stroke="#10b981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="leadership"
                stroke="#f59e0b"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="behavioral"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className={`p-6 rounded-2xl ${
            isDark ? "bg-gray-800/50" : "bg-white"
          } border ${isDark ? "border-gray-700" : "border-gray-200"} shadow-lg`}
        >
          <h3
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            } mb-6`}
          >
            Skill Progress vs Target
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillProgress} layout="horizontal">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#374151" : "#e5e7eb"}
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                stroke={isDark ? "#9ca3af" : "#6b7280"}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                stroke={isDark ? "#9ca3af" : "#6b7280"}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="current" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              <Bar
                dataKey="target"
                fill="#e5e7eb"
                radius={[0, 4, 4, 0]}
                opacity={0.3}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Detailed Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`p-6 rounded-2xl ${
            isDark ? "bg-gray-800/50" : "bg-white"
          } border ${isDark ? "border-gray-700" : "border-gray-200"} shadow-lg`}
        >
          <h3
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            } mb-6`}
          >
            Development Milestones
          </h3>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  isDark ? "bg-gray-700/50" : "bg-gray-50"
                } border-l-4 ${
                  milestone.status === "Completed"
                    ? "border-green-500"
                    : milestone.status === "In Progress"
                    ? "border-blue-500"
                    : "border-purple-500"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {milestone.title}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      milestone.status
                    )}`}
                  >
                    {milestone.status}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } mb-2`}
                >
                  {milestone.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                    {new Date(milestone.date).toLocaleDateString()}
                  </span>
                  <span className="font-medium text-purple-600">
                    +{milestone.points} points
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={`p-6 rounded-2xl ${
            isDark ? "bg-gray-800/50" : "bg-white"
          } border ${isDark ? "border-gray-700" : "border-gray-200"} shadow-lg`}
        >
          <h3
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            } mb-6`}
          >
            Recent Achievements
          </h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  isDark ? "bg-gray-700/50" : "bg-gray-50"
                } border ${isDark ? "border-gray-600" : "border-gray-200"}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {achievement.title}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {achievement.category} •{" "}
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div
              className={`p-4 rounded-lg border-2 border-dashed ${
                isDark
                  ? "border-gray-600 bg-gray-700/30"
                  : "border-gray-300 bg-gray-50"
              } text-center`}
            >
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Complete more activities to unlock new achievements!
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Skill Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`p-6 rounded-2xl ${
          isDark ? "bg-gray-800/50" : "bg-white"
        } border ${isDark ? "border-gray-700" : "border-gray-200"} shadow-lg`}
      >
        <h3
          className={`text-xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          } mb-6`}
        >
          Detailed Skill Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillProgress.map((skill, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                isDark ? "bg-gray-700/50" : "bg-gray-50"
              } border ${isDark ? "border-gray-600" : "border-gray-200"}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4
                  className={`font-medium ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {skill.name}
                </h4>
                <span className="text-green-500 text-sm font-medium">
                  {skill.improvement}
                </span>
              </div>
              <div className="w-16 h-16 mx-auto mb-3">
                <CircularProgressbar
                  value={(skill.current / skill.target) * 100}
                  text={`${skill.current}%`}
                  styles={{
                    path: {
                      stroke: getProgressColor(
                        (skill.current / skill.target) * 100
                      ),
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
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                    Current:
                  </span>
                  <span className={isDark ? "text-white" : "text-gray-900"}>
                    {skill.current}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                    Target:
                  </span>
                  <span className={isDark ? "text-white" : "text-gray-900"}>
                    {skill.target}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressTracker;
