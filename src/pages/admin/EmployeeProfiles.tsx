import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import Card from "../../components/Card";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Radar,
} from "lucide-react";
import { employees } from "../../utils/mockData";
import { Dialog } from "@headlessui/react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
  ResponsiveContainer,
} from "recharts";

const EmployeeProfiles: React.FC = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept =
      filterDept === "All" || employee.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "In Progress":
        return <Clock className="w-5 h-5 text-orange-500" />;
      case "Pending":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const skillsData = [
    { skill: "Technical", current: 85, target: 90 },
    { skill: "Leadership", current: 70, target: 85 },
    { skill: "Communication", current: 80, target: 88 },
    { skill: "Problem Solving", current: 75, target: 82 },
    { skill: "Teamwork", current: 90, target: 95 },
    { skill: "Innovation", current: 65, target: 78 },
  ];

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
          Employee Profiles
        </h1>
        <p
          className={`text-lg mt-2 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Manage and view all employee information and IDP status.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                  isDark
                    ? "bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                    : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>
            <div className="relative">
              <Filter
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className={`pl-11 pr-8 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                  isDark
                    ? "bg-slate-700/50 border-slate-600 text-white"
                    : "bg-white/50 border-gray-300 text-gray-900"
                }`}
              >
                <option value="All">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
              </select>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Employee Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={`border-b ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <th
                    className={`text-left py-4 px-2 font-semibold ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Employee
                  </th>
                  <th
                    className={`text-left py-4 px-2 font-semibold ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Department
                  </th>
                  <th
                    className={`text-left py-4 px-2 font-semibold ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Role
                  </th>
                  <th
                    className={`text-left py-4 px-2 font-semibold ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    IDP Status
                  </th>
                  <th
                    className={`text-left py-4 px-2 font-semibold ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    ADC Score
                  </th>
                  <th
                    className={`text-center py-4 px-2 font-semibold ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <motion.tr
                    key={employee.id}
                    className={`border-b ${
                      isDark ? "border-gray-700/50" : "border-gray-100"
                    } hover:${
                      isDark ? "bg-slate-700/30" : "bg-gray-50"
                    } transition-colors`}
                    whileHover={{
                      backgroundColor: isDark
                        ? "rgba(51, 65, 85, 0.3)"
                        : "rgba(249, 250, 251, 1)",
                    }}
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.photo}
                          alt={employee.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p
                            className={`font-medium ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {employee.name}
                          </p>
                          <p
                            className={`text-sm ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {employee.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className={`py-4 px-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {employee.department}
                    </td>
                    <td
                      className={`py-4 px-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {employee.role}
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(employee.idpStatus)}
                        <span
                          className={`text-sm ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {employee.idpStatus}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold ${
                            employee.adcScore >= 85
                              ? "text-green-500"
                              : employee.adcScore >= 75
                              ? "text-orange-500"
                              : "text-red-500"
                          }`}
                        >
                          {employee.adcScore}
                        </span>
                        <div
                          className={`w-16 h-2 rounded-full ${
                            isDark ? "bg-gray-700" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              employee.adcScore >= 85
                                ? "bg-green-500"
                                : employee.adcScore >= 75
                                ? "bg-orange-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${employee.adcScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <motion.button
                        onClick={() => setSelectedEmployee(employee)}
                        className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:shadow-lg transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
      </motion.div>

      {/* Employee Profile Modal */}
      <Dialog
        open={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Dialog.Panel
            className={`w-full max-w-2xl rounded-3xl p-8 ${
              isDark ? "bg-slate-800" : "bg-white"
            } shadow-2xl border ${
              isDark ? "border-slate-700" : "border-gray-200"
            }`}
          >
            {selectedEmployee && (
              <>
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={selectedEmployee.photo}
                    alt={selectedEmployee.name}
                    className="w-20 h-20 rounded-2xl object-cover"
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
                      className={`${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {selectedEmployee.role} • {selectedEmployee.department}
                    </p>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {selectedEmployee.email}
                    </p>
                  </div>
                </div>

                {/* Skills Radar Chart */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Radar
                      className={`w-5 h-5 ${
                        isDark ? "text-purple-400" : "text-purple-600"
                      }`}
                    />
                    <h4
                      className={`text-lg font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Skills Assessment
                    </h4>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={skillsData}>
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
                      <RechartsRadar
                        name="Current"
                        dataKey="current"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <RechartsRadar
                        name="Target"
                        dataKey="target"
                        stroke="#ec4899"
                        fill="#ec4899"
                        fillOpacity={0.1}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* IDP Progress */}
                <div>
                  <h4
                    className={`text-lg font-semibold mb-4 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Current IDP Progress
                  </h4>
                  <div className="space-y-4">
                    <div
                      className={`p-4 rounded-xl ${
                        isDark ? "bg-slate-700/50" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`font-medium ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Overall Progress
                        </span>
                        <span className="text-purple-500 font-semibold">
                          75%
                        </span>
                      </div>
                      <div
                        className={`w-full h-3 rounded-full ${
                          isDark ? "bg-gray-600" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-500"
                          style={{ width: "75%" }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Status: {selectedEmployee.idpStatus}
                      </span>
                      <span
                        className={`${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        ADC Score: {selectedEmployee.adcScore}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div className="mt-8 flex justify-end">
                  <motion.button
                    onClick={() => setSelectedEmployee(null)}
                    className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
                      isDark
                        ? "bg-slate-600 text-white hover:bg-slate-500"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default EmployeeProfiles;
