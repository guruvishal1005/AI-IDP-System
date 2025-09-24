import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import KPICard from "../../components/KPICard";
import Card from "../../components/Card";
import {
  Target,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  Calendar,
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();

  const progressPercentage = 68;
  const adcScore = 82;

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
          Welcome back, {user?.name}!
        </h1>
        <p
          className={`text-lg mt-2 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Track your professional development journey and upcoming goals.
        </p>
      </motion.div>

      {/* Profile Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <span className="text-2xl font-bold text-white">
                {user?.name?.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h3
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {user?.name}
              </h3>
              <p
                className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}
              >
                Transmission Engineer
              </p>
              <div className="flex items-center gap-4">
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    isDark
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  Current Role
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    isDark
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  Target: Grid Operations Engineer
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mb-2">
                <CircularProgressbar
                  value={adcScore}
                  text={`${adcScore}`}
                  styles={buildStyles({
                    textSize: "20px",
                    pathColor: "#8b5cf6",
                    textColor: isDark ? "#ffffff" : "#1f2937",
                    trailColor: isDark ? "#374151" : "#e5e7eb",
                  })}
                />
              </div>
              <p
                className={`text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                ADC Score
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <KPICard
          title="Activities Pending"
          value="3"
          icon={Clock}
          trend="2 due this week"
          color="orange"
        />
        <KPICard
          title="Completed Activities"
          value="12"
          icon={CheckCircle}
          trend="+4 this month"
          color="green"
        />
        <KPICard
          title="Progress"
          value="68%"
          icon={TrendingUp}
          trend="+12% this quarter"
          color="blue"
        />
        <KPICard
          title="Skills Improved"
          value="5"
          icon={Award}
          trend="Leadership +15%"
          color="purple"
        />
      </motion.div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* IDP Journey Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <div className="flex items-center gap-2 mb-6">
              <Target
                className={`w-6 h-6 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <h3
                className={`text-xl font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Your IDP Journey
              </h3>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`font-medium ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Overall Progress
                </span>
                <span className="text-purple-500 font-semibold">
                  {progressPercentage}%
                </span>
              </div>
              <div
                className={`w-full h-4 rounded-full ${
                  isDark ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>

            {/* Milestone Timeline */}
            <div className="space-y-4">
              {[
                {
                  title: "Leadership Fundamentals",
                  status: "completed",
                  date: "Dec 2024",
                },
                {
                  title: "Cross-Department Project",
                  status: "in-progress",
                  date: "Jan 2025",
                },
                {
                  title: "Mentorship Program",
                  status: "in-progress",
                  date: "Feb 2025",
                },
                {
                  title: "Public Speaking Workshop",
                  status: "pending",
                  date: "Mar 2025",
                },
                {
                  title: "Technical Certification",
                  status: "pending",
                  date: "Apr 2025",
                },
              ].map((milestone, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      milestone.status === "completed"
                        ? "bg-green-500 border-green-500"
                        : milestone.status === "in-progress"
                        ? "bg-orange-500 border-orange-500"
                        : `border-gray-400 ${
                            isDark ? "bg-gray-700" : "bg-white"
                          }`
                    }`}
                  />
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {milestone.title}
                    </p>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {milestone.date}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      milestone.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : milestone.status === "in-progress"
                        ? "bg-orange-100 text-orange-600"
                        : `${
                            isDark
                              ? "bg-gray-700 text-gray-400"
                              : "bg-gray-100 text-gray-500"
                          }`
                    }`}
                  >
                    {milestone.status.replace("-", " ")}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions & Next Steps */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Next Action */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Calendar
                className={`w-5 h-5 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <h4
                className={`font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Next Action
              </h4>
            </div>
            <div
              className={`p-4 rounded-xl border-l-4 border-purple-500 ${
                isDark ? "bg-slate-700/30" : "bg-purple-50"
              }`}
            >
              <p
                className={`font-medium mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Complete Module 3
              </p>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Public Speaking Workshop
              </p>
              <p
                className={`text-xs mt-2 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              >
                Due: Jan 15, 2025
              </p>
            </div>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Award
                className={`w-5 h-5 ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              />
              <h4
                className={`font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Recent Achievements
              </h4>
            </div>
            <div className="space-y-3">
              {[
                {
                  title: "Leadership Course",
                  badge: "Completed",
                  color: "green",
                },
                {
                  title: "Team Collaboration",
                  badge: "+20 points",
                  color: "blue",
                },
                {
                  title: "Mentorship Session",
                  badge: "Excellent",
                  color: "purple",
                },
              ].map((achievement, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {achievement.title}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      achievement.color === "green"
                        ? "bg-green-100 text-green-600"
                        : achievement.color === "blue"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {achievement.badge}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
