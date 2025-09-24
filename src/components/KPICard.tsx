import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = "purple",
}) => {
  const { isDark } = useTheme();

  const getColorClasses = () => {
    switch (color) {
      case "green":
        return isDark
          ? "from-emerald-600 to-green-600 shadow-emerald-500/25"
          : "from-emerald-500 to-green-500 shadow-emerald-500/25";
      case "blue":
        return isDark
          ? "from-blue-600 to-cyan-600 shadow-blue-500/25"
          : "from-blue-500 to-cyan-500 shadow-blue-500/25";
      case "orange":
        return isDark
          ? "from-orange-600 to-amber-600 shadow-orange-500/25"
          : "from-orange-500 to-amber-500 shadow-orange-500/25";
      default:
        return isDark
          ? "from-purple-600 to-fuchsia-600 shadow-purple-500/25"
          : "from-purple-500 to-fuchsia-500 shadow-purple-500/25";
    }
  };

  return (
    <motion.div
      className={`rounded-2xl p-6 transition-all duration-300 ${
        isDark
          ? "bg-slate-800/60 backdrop-blur-md shadow-lg border border-purple-500/20"
          : "bg-white/60 backdrop-blur-md shadow-lg border border-purple-100"
      }`}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className={`text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {title}
          </p>
          <p
            className={`text-3xl font-bold mt-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {value}
          </p>
          {trend && <p className="text-sm text-green-500 mt-1">{trend}</p>}
        </div>
        <div
          className={`p-3 rounded-xl bg-gradient-to-r ${getColorClasses()} shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default KPICard;
