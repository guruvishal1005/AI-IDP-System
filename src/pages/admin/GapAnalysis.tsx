import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import Card from "../../components/Card";
import { TrendingDown, AlertTriangle, Brain, Lightbulb } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { employees } from "../../utils/mockData";

const GapAnalysis: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

  const skillGapData = [
    { skill: "Functional", current: 72, required: 85, gap: 13 },
    { skill: "Leadership", current: 45, required: 75, gap: 30 },
    { skill: "Geographic", current: 68, required: 80, gap: 12 },
    { skill: "Technical", current: 85, required: 90, gap: 5 },
    { skill: "Communication", current: 70, required: 85, gap: 15 },
    { skill: "Innovation", current: 60, required: 80, gap: 20 },
  ];

  const aiRecommendations = [
    {
      id: 1,
      type: "Critical",
      skill: "Leadership",
      gap: 30,
      recommendation: "Enroll in Advanced Leadership Workshop",
      timeframe: "3 months",
      impact: "High",
      color: "red",
    },
    {
      id: 2,
      type: "High Priority",
      skill: "Innovation",
      gap: 20,
      recommendation: "Assign cross-department innovation project",
      timeframe: "6 weeks",
      impact: "Medium",
      color: "orange",
    },
    {
      id: 3,
      type: "Medium Priority",
      skill: "Communication",
      gap: 15,
      recommendation: "Join public speaking club or Toastmasters",
      timeframe: "2 months",
      impact: "Medium",
      color: "yellow",
    },
    {
      id: 4,
      type: "Low Priority",
      skill: "Geographic",
      gap: 12,
      recommendation: "Cultural awareness training program",
      timeframe: "4 weeks",
      impact: "Low",
      color: "blue",
    },
  ];

  const getGapColor = (gap: number) => {
    if (gap >= 25) return "text-red-500";
    if (gap >= 15) return "text-orange-500";
    if (gap >= 10) return "text-yellow-500";
    return "text-green-500";
  };

  const getGapBgColor = (gap: number) => {
    if (gap >= 25) return "bg-red-500/10 border-red-500/20";
    if (gap >= 15) return "bg-orange-500/10 border-orange-500/20";
    if (gap >= 10) return "bg-yellow-500/10 border-yellow-500/20";
    return "bg-green-500/10 border-green-500/20";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
          Gap Analysis
        </h1>
        <p
          className={`text-lg mt-2 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Analyze skill gaps and receive AI-powered recommendations for
          development.
        </p>
      </motion.div>

      {/* Employee Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <div className="flex items-center gap-4 mb-4">
            <TrendingDown
              className={`w-6 h-6 ${
                isDark ? "text-purple-400" : "text-purple-600"
              }`}
            />
            <h3
              className={`text-xl font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Select Employee for Analysis
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {employees.slice(0, 6).map((employee) => (
              <motion.button
                key={employee.id}
                onClick={() => setSelectedEmployee(employee)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedEmployee.id === employee.id
                    ? `border-purple-500 ${
                        isDark ? "bg-purple-500/10" : "bg-purple-50"
                      }`
                    : `${
                        isDark
                          ? "border-slate-600 hover:border-purple-400"
                          : "border-gray-200 hover:border-purple-300"
                      }`
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={employee.photo}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
                />
                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {employee.name.split(" ")[0]}
                </p>
              </motion.button>
            ))}
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Gap Radar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3
              className={`text-xl font-semibold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Skills Gap Analysis - {selectedEmployee.name}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillGapData}>
                <PolarGrid />
                <PolarAngleAxis
                  dataKey="skill"
                  className={`text-sm ${
                    isDark ? "fill-gray-400" : "fill-gray-600"
                  }`}
                />
                <PolarRadiusAxis
                  domain={[0, 100]}
                  className={`text-xs ${
                    isDark ? "fill-gray-400" : "fill-gray-600"
                  }`}
                />
                <Radar
                  name="Current Level"
                  dataKey="current"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Required Level"
                  dataKey="required"
                  stroke="#ec4899"
                  fill="#ec4899"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </RadarChart>
            </ResponsiveContainer>

            {/* Gap Indicators */}
            <div className="mt-6 space-y-3">
              {skillGapData.map((skill) => (
                <div
                  key={skill.skill}
                  className="flex items-center justify-between"
                >
                  <span
                    className={`font-medium ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {skill.skill}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${getGapColor(skill.gap)}`}>
                      Gap: {skill.gap}%
                    </span>
                    {skill.gap >= 15 && (
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center gap-2 mb-6">
              <Brain
                className={`w-6 h-6 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <h3
                className={`text-xl font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                AI Recommendations
              </h3>
            </div>

            <div className="space-y-4">
              {aiRecommendations.map((rec) => (
                <motion.div
                  key={rec.id}
                  className={`p-4 rounded-xl border ${getGapBgColor(rec.gap)}`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        rec.color === "red"
                          ? "bg-red-500"
                          : rec.color === "orange"
                          ? "bg-orange-500"
                          : rec.color === "yellow"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      } bg-opacity-20`}
                    >
                      <Lightbulb
                        className={`w-5 h-5 ${
                          rec.color === "red"
                            ? "text-red-500"
                            : rec.color === "orange"
                            ? "text-orange-500"
                            : rec.color === "yellow"
                            ? "text-yellow-500"
                            : "text-blue-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm font-medium px-2 py-1 rounded-full ${
                            rec.color === "red"
                              ? "bg-red-500/20 text-red-600"
                              : rec.color === "orange"
                              ? "bg-orange-500/20 text-orange-600"
                              : rec.color === "yellow"
                              ? "bg-yellow-500/20 text-yellow-600"
                              : "bg-blue-500/20 text-blue-600"
                          }`}
                        >
                          {rec.type}
                        </span>
                        <span
                          className={`text-xs ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {rec.timeframe}
                        </span>
                      </div>
                      <p
                        className={`font-medium mb-2 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {rec.recommendation}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span
                          className={`${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Skill: {rec.skill}
                        </span>
                        <span
                          className={`font-medium ${
                            rec.impact === "High"
                              ? "text-green-500"
                              : rec.impact === "Medium"
                              ? "text-orange-500"
                              : "text-blue-500"
                          }`}
                        >
                          {rec.impact} Impact
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default GapAnalysis;
