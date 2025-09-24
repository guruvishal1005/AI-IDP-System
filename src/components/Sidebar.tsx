import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  Home,
  Users,
  BarChart3,
  FileText,
  Settings,
  Moon,
  Sun,
  LogOut,
  Target,
  TrendingUp,
  MessageSquare,
  UserCheck,
  Award,
  Brain,
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const getMenuItems = () => {
    switch (user?.role) {
      case "Admin":
        return [
          { id: "dashboard", label: "Dashboard", icon: Home },
          { id: "profiles", label: "Employee Profiles", icon: Users },
          { id: "gap-analysis", label: "Gap Analysis", icon: TrendingUp },
          { id: "create-idps", label: "Create/Approve IDPs", icon: FileText },
          { id: "reports", label: "Reports", icon: BarChart3 },
        ];
      case "Manager":
        return [
          { id: "dashboard", label: "Dashboard", icon: Home },
          { id: "my-team", label: "My Team", icon: Users },
          {
            id: "approvals",
            label: "Approve Recommendations",
            icon: UserCheck,
          },
          {
            id: "track-progress",
            label: "Track Mentee Progress",
            icon: Target,
          },
        ];
      case "Employee":
        return [
          { id: "dashboard", label: "Dashboard", icon: Home },
          { id: "my-idp", label: "My IDP", icon: Target },
          { id: "progress", label: "Progress Tracker", icon: TrendingUp },
          { id: "feedback", label: "Feedback/Mentorship", icon: MessageSquare },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div
      className={`w-64 h-screen fixed left-0 top-0 z-50 transition-all duration-300 ${
        isDark
          ? "bg-slate-900/95 border-r border-purple-500/20"
          : "bg-white/80 border-r border-purple-200"
      } backdrop-blur-xl shadow-xl`}
    >
      {/* Header */}
      <div className="p-6 border-b border-purple-200/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1
              className={`font-bold text-lg ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              IDP System
            </h1>
            <p
              className={`text-sm ${
                isDark ? "text-purple-300" : "text-purple-600"
              }`}
            >
              {user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                isActive
                  ? `${
                      isDark
                        ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/25"
                        : "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/25"
                    }`
                  : `${
                      isDark
                        ? "text-gray-300 hover:bg-purple-500/10 hover:text-purple-300"
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                    }`
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-purple-200/20 space-y-2">
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isDark
              ? "text-gray-300 hover:bg-purple-500/10 hover:text-purple-300"
              : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
          }`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="font-medium">
            {isDark ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        <button
          onClick={logout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isDark
              ? "text-red-400 hover:bg-red-500/10"
              : "text-red-600 hover:bg-red-50"
          }`}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
