import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { LogIn, User, Moon, Sun } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<
    "Admin" | "Manager" | "Employee"
  >("Employee");
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email, selectedRole);
    }
  };

  const demoUsers = [
    {
      email: "admin@powergrid.com",
      role: "Admin" as const,
      name: "Sarah Mitchell",
    },
    {
      email: "manager@powergrid.com",
      role: "Manager" as const,
      name: "Rajesh Kumar",
    },
    {
      email: "employee@powergrid.com",
      role: "Employee" as const,
      name: "Priya Sharma",
    },
  ];

  const handleDemoLogin = (
    demoEmail: string,
    role: "Admin" | "Manager" | "Employee"
  ) => {
    setEmail(demoEmail);
    setSelectedRole(role);
    login(demoEmail, role);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800"
          : "bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50"
      }`}
    >
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
          isDark
            ? "bg-slate-800 text-yellow-400 hover:bg-slate-700"
            : "bg-white text-purple-600 hover:bg-purple-50"
        } shadow-lg`}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl backdrop-blur-sm ${
          isDark
            ? "bg-slate-800/90 border border-slate-700"
            : "bg-white/90 border border-white"
        }`}
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              isDark
                ? "bg-purple-900 text-purple-300"
                : "bg-purple-100 text-purple-600"
            }`}
          >
            <User className="w-8 h-8" />
          </motion.div>
          <h1
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            IRS Login
          </h1>
          <p
            className={`text-sm mt-2 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Intelligent Recommendation System
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark
                  ? "bg-slate-700 border-slate-600 text-white focus:border-purple-400"
                  : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
              } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) =>
                setSelectedRole(
                  e.target.value as "Admin" | "Manager" | "Employee"
                )
              }
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
            >
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-fuchsia-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </motion.button>
        </form>

        <div className="mt-8">
          <div
            className={`text-center text-sm font-medium mb-4 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Demo Accounts
          </div>
          <div className="space-y-2">
            {demoUsers.map((user) => (
              <button
                key={user.email}
                onClick={() => handleDemoLogin(user.email, user.role)}
                className={`w-full p-3 rounded-lg border text-left transition-colors ${
                  isDark
                    ? "bg-slate-700/50 border-slate-600 hover:bg-slate-700 text-white"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-900"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm">{user.name}</div>
                    <div
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {user.email}
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      user.role === "Admin"
                        ? "bg-red-100 text-red-800"
                        : user.role === "Manager"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
