import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import EmployeeProfiles from "./pages/admin/EmployeeProfiles";
import GapAnalysis from "./pages/admin/GapAnalysis";
import CreateIDPs from "./pages/admin/CreateIDPs";
import Reports from "./pages/admin/Reports";

// Manager Pages
import ManagerDashboard from "./pages/manager/Dashboard";
import MyTeam from "./pages/manager/MyTeam";
import Approvals from "./pages/manager/Approvals";
import TrackProgress from "./pages/manager/TrackProgress";

// Employee Pages
import EmployeeDashboard from "./pages/employee/Dashboard";
import MyIDP from "./pages/employee/MyIDP";
import ProgressTracker from "./pages/employee/ProgressTracker";
import Feedback from "./pages/employee/Feedback";

const AppContent = () => {
  const { isAuthenticated, user } = useAuth();
  const { isDark } = useTheme();
  const [currentPage, setCurrentPage] = useState("dashboard");

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderPage = () => {
    const pageKey = `${user?.role}-${currentPage}`;

    switch (pageKey) {
      // Admin Pages
      case "Admin-dashboard":
        return <AdminDashboard />;
      case "Admin-profiles":
        return <EmployeeProfiles />;
      case "Admin-gap-analysis":
        return <GapAnalysis />;
      case "Admin-create-idps":
        return <CreateIDPs />;
      case "Admin-reports":
        return <Reports />;

      // Manager Pages
      case "Manager-dashboard":
        return <ManagerDashboard />;
      case "Manager-my-team":
        return <MyTeam />;
      case "Manager-approvals":
        return <Approvals />;
      case "Manager-track-progress":
        return <TrackProgress />;

      // Employee Pages
      case "Employee-dashboard":
        return <EmployeeDashboard />;
      case "Employee-my-idp":
        return <MyIDP />;
      case "Employee-progress":
        return <ProgressTracker />;
      case "Employee-feedback":
        return <Feedback />;

      default:
        return (
          <div
            className={`text-center py-20 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Page not found
          </div>
        );
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800"
          : "bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50"
      }`}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="ml-64 p-8 relative z-10">
        <div className="max-w-7xl mx-auto">{renderPage()}</div>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
