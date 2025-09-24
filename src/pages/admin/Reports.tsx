import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import Card from "../../components/Card";
import {
  Download,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Award,
  AlertTriangle,
  Filter,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { chartData, reportsData, employees } from "../../utils/mockData";

const Reports = () => {
  const { isDark } = useTheme();
  const [selectedReport, setSelectedReport] = useState("overview");

  const pieData = Object.entries(reportsData.departmentAnalysis).map(
    ([dept, data]) => ({
      name: dept,
      value: data.withIDPs,
      total: data.totalEmployees,
      percentage: Math.round((data.withIDPs / data.totalEmployees) * 100),
    })
  );

  const COLORS = ["#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#EF4444"];

  const skillGapData = [
    { skill: "Leadership", gap: 45, department: "Sales" },
    { skill: "Functional", gap: 28, department: "Operations" },
    { skill: "Geographic", gap: 32, department: "Marketing" },
    { skill: "Technical", gap: 25, department: "Engineering" },
  ];

  // Enhanced Analytics Data
  const successionReadinessData = [
    { department: "Engineering", ready: 85, developing: 12, notReady: 3 },
    { department: "Sales", ready: 72, developing: 20, notReady: 8 },
    { department: "Operations", ready: 68, developing: 25, notReady: 7 },
    { department: "Marketing", ready: 78, developing: 18, notReady: 4 },
    { department: "Finance", ready: 82, developing: 15, notReady: 3 },
  ];

  const talentPipelineData = [
    { level: "C-Level", internal: 2, external: 1, gap: 1 },
    { level: "VP", internal: 5, external: 2, gap: 3 },
    { level: "Director", internal: 12, external: 4, gap: 6 },
    { level: "Manager", internal: 25, external: 8, gap: 4 },
    { level: "Senior", internal: 45, external: 15, gap: 2 },
  ];

  const competencyHeatmapData = [
    {
      department: "Engineering",
      technical: 95,
      leadership: 72,
      behavioral: 85,
      strategic: 68,
    },
    {
      department: "Sales",
      technical: 70,
      leadership: 88,
      behavioral: 92,
      strategic: 75,
    },
    {
      department: "Operations",
      technical: 85,
      leadership: 75,
      behavioral: 80,
      strategic: 70,
    },
    {
      department: "Marketing",
      technical: 78,
      leadership: 82,
      behavioral: 88,
      strategic: 85,
    },
    {
      department: "Finance",
      technical: 88,
      leadership: 78,
      behavioral: 85,
      strategic: 90,
    },
  ];

  const riskAssessmentData = [
    {
      position: "CTO",
      riskLevel: "High",
      successor: "Prepared",
      timeframe: "6 months",
    },
    {
      position: "Sales Director",
      riskLevel: "Medium",
      successor: "In Development",
      timeframe: "12 months",
    },
    {
      position: "Operations Manager",
      riskLevel: "Low",
      successor: "Ready",
      timeframe: "3 months",
    },
    {
      position: "Marketing Head",
      riskLevel: "Medium",
      successor: "Prepared",
      timeframe: "9 months",
    },
  ];

  const reportTabs = [
    { id: "overview", label: "Executive Overview", icon: TrendingUp },
    { id: "succession", label: "Succession Planning", icon: Users },
    { id: "competency", label: "Competency Analysis", icon: Target },
    { id: "pipeline", label: "Talent Pipeline", icon: BarChart3 },
    { id: "risk", label: "Risk Assessment", icon: AlertTriangle },
    { id: "ai-insights", label: "AI Insights", icon: Award },
  ];

  const handleExportPDF = () => {
    // Mock PDF export
    alert("Report exported as PDF! (This is a demo)");
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-start mb-8"
      >
        <div>
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Analytics & Reports
          </h1>
          <p
            className={`text-lg mt-2 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Comprehensive insights and performance analytics
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExportPDF}
          className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export PDF
        </motion.button>
      </motion.div>

      {/* Report Navigation */}
      <div
        className={`border-b ${
          isDark ? "border-gray-700" : "border-gray-200"
        } mb-8`}
      >
        <nav className="flex space-x-8">
          {reportTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedReport(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                selectedReport === tab.id
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

      {/* Overview Tab */}
      {selectedReport === "overview" && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Total Employees",
                value: "40",
                change: "+5%",
                icon: Users,
                color: "text-blue-500",
              },
              {
                title: "Active IDPs",
                value: "32",
                change: "+23%",
                icon: Target,
                color: "text-green-500",
              },
              {
                title: "Completion Rate",
                value: "80%",
                change: "+12%",
                icon: TrendingUp,
                color: "text-purple-500",
              },
              {
                title: "Avg ADC Score",
                value: "84",
                change: "+8%",
                icon: BarChart3,
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
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    <span
                      className={`text-sm font-medium ${
                        stat.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
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

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Department IDP Coverage
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <RechartsPieChart
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </RechartsPieChart>
                </RechartsPieChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Monthly Progress Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
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
          </div>
        </div>
      )}

      {/* Department Analysis Tab */}
      {selectedReport === "departments" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Department Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.departmentProgress}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? "#374151" : "#E5E7EB"}
                  />
                  <XAxis
                    dataKey="department"
                    stroke={isDark ? "#9CA3AF" : "#6B7280"}
                    fontSize={12}
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
                  <Bar
                    dataKey="completed"
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar dataKey="pending" fill="#EC4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Department Insights
              </h3>
              <div className="space-y-4">
                {Object.entries(reportsData.departmentAnalysis).map(
                  ([dept, data]) => (
                    <div
                      key={dept}
                      className={`p-4 rounded-lg ${
                        isDark ? "bg-slate-800/50" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4
                            className={`font-semibold ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {dept}
                          </h4>
                          <p
                            className={`text-sm ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {data.withIDPs}/{data.totalEmployees} employees with
                            IDPs
                          </p>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-sm font-medium ${
                              isDark ? "text-purple-400" : "text-purple-600"
                            }`}
                          >
                            Avg Score: {data.avgScore}
                          </div>
                          <div
                            className={`text-xs ${
                              isDark ? "text-amber-400" : "text-amber-600"
                            }`}
                          >
                            Gap: {data.topSkillGap}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Skill Gaps Tab */}
      {selectedReport === "skills" && (
        <div className="space-y-6">
          <Card>
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Critical Skill Gaps by Department
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={skillGapData} layout="horizontal">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? "#374151" : "#E5E7EB"}
                />
                <XAxis type="number" stroke={isDark ? "#9CA3AF" : "#6B7280"} />
                <YAxis
                  dataKey="skill"
                  type="category"
                  stroke={isDark ? "#9CA3AF" : "#6B7280"}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="gap" fill="#EF4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reportsData.quarterlyInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                      insight.impact === "High"
                        ? "bg-red-100 text-red-800 border border-red-200"
                        : insight.impact === "Medium"
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : "bg-green-100 text-green-800 border border-green-200"
                    }`}
                  >
                    {insight.impact} Impact
                  </div>
                  <h4
                    className={`font-semibold mb-2 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {insight.insight}
                  </h4>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {insight.recommendation}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Trends Tab */}
      {selectedReport === "trends" && (
        <div className="space-y-6">
          <Card>
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Employee Progress Over Time
            </h3>
            <ResponsiveContainer width="100%" height={400}>
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
                  name="Functional"
                />
                <Line
                  type="monotone"
                  dataKey="leadership"
                  stroke="#EC4899"
                  strokeWidth={3}
                  name="Leadership"
                />
                <Line
                  type="monotone"
                  dataKey="geographic"
                  stroke="#10B981"
                  strokeWidth={3}
                  name="Geographic"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Reports;
