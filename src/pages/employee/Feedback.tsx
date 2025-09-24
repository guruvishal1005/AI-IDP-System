import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Star,
  Clock,
  User,
  Send,
  Filter,
  ChevronDown,
} from "lucide-react";
import { employees, mentorshipData } from "../../utils/mockData";
import { useTheme } from "../../context/ThemeContext";

const Feedback = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("received");
  const [showFilters, setShowFilters] = useState(false);
  const [newFeedback, setNewFeedback] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");

  // For demo, using the first employee as current user
  const currentUser = employees[0];

  const feedbackReceived = [
    {
      id: 1,
      from: "Sarah Johnson",
      role: "Senior Manager",
      date: "2024-06-10",
      type: "Performance Review",
      rating: 4,
      message:
        "Excellent progress on technical skills development. Your leadership potential is clearly emerging through your mentorship of junior team members.",
      category: "Leadership",
    },
    {
      id: 2,
      from: "Michael Chen",
      role: "Team Lead",
      date: "2024-05-28",
      type: "360 Feedback",
      rating: 5,
      message:
        "Outstanding project delivery and problem-solving skills. The innovative approach you took on the automation project saved significant time.",
      category: "Technical",
    },
    {
      id: 3,
      from: "Dr. Priya Sharma",
      role: "Mentor",
      date: "2024-05-15",
      type: "Mentoring Session",
      rating: 4,
      message:
        "Great improvement in strategic thinking. Continue working on stakeholder management and communication with senior leadership.",
      category: "Strategic",
    },
  ];

  const feedbackGiven = [
    {
      id: 1,
      to: "John Anderson",
      role: "Junior Developer",
      date: "2024-06-08",
      type: "Peer Feedback",
      message:
        "John has shown remarkable growth in coding practices and is always willing to learn new technologies.",
      category: "Technical",
    },
    {
      id: 2,
      to: "Lisa Wang",
      role: "Business Analyst",
      date: "2024-05-20",
      type: "Project Feedback",
      message:
        "Excellent collaboration during the requirements gathering phase. Very thorough documentation.",
      category: "Collaboration",
    },
  ];

  const mentoringSessions = mentorshipData.filter(
    (session) =>
      session.menteeName === currentUser.name ||
      session.mentorName === currentUser.name
  );

  const tabs = [
    { id: "received", label: "Feedback Received", icon: MessageCircle },
    { id: "given", label: "Feedback Given", icon: Send },
    { id: "mentorship", label: "Mentorship", icon: User },
    { id: "request", label: "Request Feedback", icon: Star },
  ];

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "text-yellow-400 fill-current"
            : isDark
            ? "text-gray-600"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "technical":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "leadership":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "strategic":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "collaboration":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
      case "scheduled":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30";
      case "in progress":
        return "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30";
    }
  };

  const handleSendFeedbackRequest = () => {
    if (newFeedback.trim() && selectedMentor) {
      // Handle feedback request submission
      setNewFeedback("");
      setSelectedMentor("");
      // Add success notification logic here
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}
          >
            Feedback & Mentorship
          </h1>
          <p className={`mt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Connect, learn, and grow through feedback and mentoring
            relationships
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
        </div>
      </div>

      {/* Tab Navigation */}
      <div
        className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}
      >
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
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

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === "received" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Feedback Received
              </h3>
              <div
                className={`px-4 py-2 rounded-lg ${
                  isDark ? "bg-gray-800" : "bg-white"
                } border ${isDark ? "border-gray-700" : "border-gray-200"}`}
              >
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Average Rating:{" "}
                  <span className="font-semibold text-yellow-500">4.3/5</span>
                </span>
              </div>
            </div>

            {feedbackReceived.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl ${
                  isDark ? "bg-gray-800/50" : "bg-white"
                } border ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } shadow-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full ${
                        isDark ? "bg-purple-900/30" : "bg-purple-100"
                      } flex items-center justify-center`}
                    >
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4
                        className={`font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {feedback.from}
                      </h4>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {feedback.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {getRatingStars(feedback.rating)}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        feedback.category
                      )}`}
                    >
                      {feedback.category}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {feedback.type}
                    </span>
                    <span
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {new Date(feedback.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p
                    className={`${
                      isDark ? "text-gray-300" : "text-gray-600"
                    } leading-relaxed`}
                  >
                    {feedback.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "given" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Feedback Given
              </h3>
              <div
                className={`px-4 py-2 rounded-lg ${
                  isDark ? "bg-gray-800" : "bg-white"
                } border ${isDark ? "border-gray-700" : "border-gray-200"}`}
              >
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Total Given:{" "}
                  <span className="font-semibold text-purple-500">
                    {feedbackGiven.length}
                  </span>
                </span>
              </div>
            </div>

            {feedbackGiven.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl ${
                  isDark ? "bg-gray-800/50" : "bg-white"
                } border ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } shadow-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full ${
                        isDark ? "bg-green-900/30" : "bg-green-100"
                      } flex items-center justify-center`}
                    >
                      <User className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4
                        className={`font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        To: {feedback.to}
                      </h4>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {feedback.role}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      feedback.category
                    )}`}
                  >
                    {feedback.category}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {feedback.type}
                    </span>
                    <span
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {new Date(feedback.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p
                    className={`${
                      isDark ? "text-gray-300" : "text-gray-600"
                    } leading-relaxed`}
                  >
                    {feedback.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "mentorship" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Mentorship Sessions
              </h3>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200">
                Schedule Session
              </button>
            </div>

            {mentoringSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl ${
                  isDark ? "bg-gray-800/50" : "bg-white"
                } border ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } shadow-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4
                      className={`text-lg font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      } mb-2`}
                    >
                      {session.skillFocus}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <span
                        className={`${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <strong>Mentor:</strong> {session.mentorName}
                      </span>
                      <span
                        className={`${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <strong>Mentee:</strong> {session.menteeName}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        session.status
                      )}`}
                    >
                      {session.status}
                    </span>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{session.progress}% Complete</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Started: {new Date(session.startDate).toLocaleDateString()}
                  </span>
                  <span
                    className={`text-sm ${
                      isDark ? "text-purple-400" : "text-purple-600"
                    }`}
                  >
                    Next: {session.nextMeeting}
                  </span>
                </div>

                <div
                  className={`mt-4 p-3 rounded-lg ${
                    isDark ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <strong>Last Meeting:</strong> {session.lastMeeting}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "request" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Request Feedback
              </h3>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl ${
                isDark ? "bg-gray-800/50" : "bg-white"
              } border ${
                isDark ? "border-gray-700" : "border-gray-200"
              } shadow-lg`}
            >
              <div className="space-y-6">
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    } mb-2`}
                  >
                    Select Mentor/Manager
                  </label>
                  <select
                    value={selectedMentor}
                    onChange={(e) => setSelectedMentor(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  >
                    <option value="">Choose a person...</option>
                    <option value="Sarah Johnson">
                      Sarah Johnson - Senior Manager
                    </option>
                    <option value="Dr. Priya Sharma">
                      Dr. Priya Sharma - Mentor
                    </option>
                    <option value="Michael Chen">
                      Michael Chen - Team Lead
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    } mb-2`}
                  >
                    Feedback Request
                  </label>
                  <textarea
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                    placeholder="Describe what specific areas you'd like feedback on..."
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none`}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSendFeedbackRequest}
                    disabled={!newFeedback.trim() || !selectedMentor}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      newFeedback.trim() && selectedMentor
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Request</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Quick Feedback Templates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-2xl ${
                isDark ? "bg-gray-800/50" : "bg-white"
              } border ${
                isDark ? "border-gray-700" : "border-gray-200"
              } shadow-lg`}
            >
              <h4
                className={`text-lg font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                } mb-4`}
              >
                Quick Feedback Templates
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Performance on recent project",
                  "Leadership skills development",
                  "Communication effectiveness",
                  "Technical competencies",
                  "Career development guidance",
                  "Team collaboration",
                ].map((template, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setNewFeedback(
                        `I would appreciate feedback on my ${template.toLowerCase()}.`
                      )
                    }
                    className={`p-3 text-left rounded-lg border ${
                      isDark
                        ? "bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-gray-300"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
                    } transition-colors duration-200`}
                  >
                    {template}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
