import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = true,
}) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      className={`rounded-2xl p-6 transition-all duration-300 ${
        isDark
          ? "bg-slate-800/60 backdrop-blur-md shadow-lg border border-purple-500/20"
          : "bg-white/60 backdrop-blur-md shadow-lg border border-purple-100"
      } ${className}`}
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
