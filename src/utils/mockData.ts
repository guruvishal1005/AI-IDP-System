// POWERGRID IDP Mock Data
export const employees = [
  {
    id: 1,
    name: "Rajesh Kumar Singh",
    department: "Transmission",
    role: "Assistant GM",
    targetRole: "GM Operations",
    idpStatus: "In Progress",
    adcScore: 85,
    email: "rajesh.singh@powergridindia.com",
    photo:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    experienceYears: 12,
    location: "Northern Region",
    competencyGaps: {
      functional: { current: 85, required: 92, gap: 7 },
      leadership: { current: 65, required: 88, gap: 23 },
      geographic: { current: 75, required: 85, gap: 10 },
    },
    currentActivities: [
      {
        id: 1,
        title: "Advanced Grid Management Course",
        type: "Training",
        status: "In Progress",
        dueDate: "2024-03-15",
        progress: 60,
        impact: "Functional Skills +8 points",
        priority: "High",
      },
    ],
  },
  {
    id: 2,
    name: "Priya Sharma",
    department: "Distribution",
    role: "DGM",
    targetRole: "CGM",
    idpStatus: "Completed",
    adcScore: 92,
    email: "priya.sharma@powergridindia.com",
    photo:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150",
    experienceYears: 15,
    location: "Southern Region",
    competencyGaps: {
      functional: { current: 92, required: 95, gap: 3 },
      leadership: { current: 88, required: 95, gap: 7 },
      geographic: { current: 95, required: 90, gap: 0 },
    },
    currentActivities: [
      {
        id: 2,
        title: "Executive Leadership Program",
        type: "Training",
        status: "Completed",
        dueDate: "2024-01-30",
        progress: 100,
        impact: "Leadership Skills +12 points",
        priority: "High",
      },
    ],
  },
  {
    id: 3,
    name: "Arun Verma",
    department: "Corporate Planning",
    role: "JGM",
    targetRole: "DGM",
    idpStatus: "Under Review",
    adcScore: 78,
    email: "arun.verma@powergridindia.com",
    photo:
      "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150",
    experienceYears: 10,
    location: "Western Region",
    competencyGaps: {
      functional: { current: 80, required: 88, gap: 8 },
      leadership: { current: 55, required: 82, gap: 27 },
      geographic: { current: 70, required: 85, gap: 15 },
    },
    currentActivities: [
      {
        id: 3,
        title: "Strategic Planning Course",
        type: "Training",
        status: "Pending",
        dueDate: "2024-04-15",
        progress: 0,
        impact: "Functional Skills +10 points",
        priority: "Medium",
      },
    ],
  },
];

export const notifications = [
  {
    id: 1,
    message: "5 IDP recommendations awaiting committee approval",
    type: "warning",
    time: "2 hours ago",
    priority: "high",
    category: "Committee Action",
  },
  {
    id: 2,
    message: "Rajesh Kumar Singh completed Advanced Grid Management Course",
    type: "success",
    time: "4 hours ago",
    priority: "medium",
    category: "Achievement",
  },
  {
    id: 3,
    message:
      "2 high-potential employees require urgent development interventions",
    type: "error",
    time: "1 day ago",
    priority: "high",
    category: "Development Gap",
  },
];

export const idpActivities = employees.flatMap((emp) => emp.currentActivities);

export const skillGaps = { functional: 72, leadership: 45, geographic: 68 };

export const chartData = {
  departmentProgress: [
    { department: "Transmission", completed: 85, pending: 15, total: 12 },
    { department: "Distribution", completed: 90, pending: 10, total: 8 },
    { department: "Corporate Planning", completed: 70, pending: 30, total: 6 },
    { department: "Human Resources", completed: 95, pending: 5, total: 4 },
    { department: "Engineering", completed: 60, pending: 40, total: 10 },
  ],
  skillTrend: [
    { month: "Jan", functional: 65, leadership: 45, geographic: 60 },
    { month: "Feb", functional: 70, leadership: 50, geographic: 65 },
    { month: "Mar", functional: 68, leadership: 48, geographic: 63 },
    { month: "Apr", functional: 75, leadership: 55, geographic: 68 },
    { month: "May", functional: 78, leadership: 58, geographic: 72 },
    { month: "Jun", functional: 82, leadership: 62, geographic: 75 },
  ],
  employeeProgress: employees.map((emp) => ({
    name: emp.name.split(" ")[0],
    functional: emp.competencyGaps.functional.current,
    leadership: emp.competencyGaps.leadership.current,
    geographic: emp.competencyGaps.geographic.current,
    overall: emp.adcScore,
  })),
};

export const pendingApprovals = [
  {
    id: 1,
    employeeId: 3,
    employeeName: "Arun Verma",
    requestType: "IDP Recommendation",
    title: "Development Plan for DGM Role",
    description:
      "AI-generated personalized development plan based on competency gap analysis",
    estimatedCost: 200000,
    duration: "12-18 months",
    priority: "High",
    requestedDate: "2024-01-20",
    managerNote:
      "Critical successor position requiring immediate attention to leadership gaps",
  },
];

export const mentorshipData = [
  {
    id: 1,
    mentorName: "Shri A.K. Singh (ED Operations)",
    menteeName: "Rajesh Kumar Singh",
    skillFocus: "Strategic Leadership & Operations",
    startDate: "2024-01-01",
    progress: 65,
    lastMeeting: "2024-01-25",
    nextMeeting: "2024-02-05",
    status: "Active",
  },
  {
    id: 2,
    mentorName: "Mrs. Meera Swarup (ED HR)",
    menteeName: "Priya Sharma",
    skillFocus: "Executive Leadership",
    startDate: "2024-01-10",
    progress: 85,
    lastMeeting: "2024-01-28",
    nextMeeting: "2024-02-08",
    status: "Active",
  },
];

export const feedbackData = [
  {
    id: 1,
    employeeId: 1,
    fromUser: "Committee Feedback",
    fromRole: "Succession Planning Committee",
    message:
      "Excellent progress on grid management competencies. Focus on multi-regional exposure for geographic skills development.",
    timestamp: "2024-01-28 14:30",
    type: "committee_feedback",
  },
  {
    id: 2,
    employeeId: 1,
    fromUser: "Rajesh Kumar Singh",
    fromRole: "Employee",
    message:
      "Completed Advanced Grid Management Course Module 5. Ready for practical field assignment.",
    timestamp: "2024-01-28 16:45",
    type: "progress_update",
  },
];

export const reportsData = {
  departmentAnalysis: {
    Transmission: {
      totalEmployees: 12,
      withIDPs: 10,
      avgScore: 82,
      topSkillGap: "Leadership",
      criticalSuccessors: 3,
    },
    Distribution: {
      totalEmployees: 8,
      withIDPs: 7,
      avgScore: 85,
      topSkillGap: "Geographic",
      criticalSuccessors: 2,
    },
    "Corporate Planning": {
      totalEmployees: 6,
      withIDPs: 4,
      avgScore: 79,
      topSkillGap: "Leadership",
      criticalSuccessors: 1,
    },
    "Human Resources": {
      totalEmployees: 4,
      withIDPs: 4,
      avgScore: 88,
      topSkillGap: "Geographic",
      criticalSuccessors: 2,
    },
    Engineering: {
      totalEmployees: 10,
      withIDPs: 6,
      avgScore: 76,
      topSkillGap: "Functional",
      criticalSuccessors: 1,
    },
  },
  quarterlyInsights: [
    {
      quarter: "Q1 2024",
      insight:
        "68% of identified successors show readiness gaps in leadership competencies",
      impact: "High",
      recommendation:
        "Accelerate executive leadership development programs and senior mentorship initiatives",
    },
    {
      quarter: "Q1 2024",
      insight:
        "Geographic mobility constraints affecting 40% of high-potential employees",
      impact: "Medium",
      recommendation:
        "Develop virtual cross-regional exposure programs and project-based rotations",
    },
    {
      quarter: "Q1 2024",
      insight: "AI recommendation system improved IDP effectiveness by 35%",
      impact: "High",
      recommendation:
        "Expand AI-driven competency gap analysis to all leadership levels",
    },
  ],
};
