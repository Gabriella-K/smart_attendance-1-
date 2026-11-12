import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  UserProfile,
  UserRole,
  Course,
  AttendanceRecord,
  LiveSession,
  AppNotification,
  SessionAttendee,
  AttendanceStatus,
} from '../types/attendance';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_LECTURER_PROFILE,
  INITIAL_COURSES,
  INITIAL_ATTENDANCE_HISTORY,
  INITIAL_LIVE_SESSION,
  INITIAL_NOTIFICATIONS,
  SIMULATED_CLASSMATES,
} from '../data/mockData';

interface SessionSummaryData {
  courseCode: string;
  courseName: string;
  lecturer: string;
  date: string;
  totalEnrolled: number;
  presentCount: number;
  lateCount: number;
  absentCount: number;
  attendanceRate: number;
  attendees: SessionAttendee[];
}

interface AttendanceContextType {
  // Auth & Role
  isAuthenticated: boolean;
  userRole: UserRole;
  studentProfile: UserProfile;
  lecturerProfile: UserProfile;
  currentProfile: UserProfile;
  setUserRole: (role: UserRole) => void;
  login: (role?: UserRole) => void;
  logout: () => void;
  register: (name: string, email: string, studentId: string, role: UserRole) => void;

  // Onboarding
  showOnboarding: boolean;
  completeOnboarding: () => void;
  replayOnboarding: () => void;

  // Viewport mode
  viewportMode: 'mobile-frame' | 'adaptive';
  setViewportMode: (mode: 'mobile-frame' | 'adaptive') => void;

  // Courses & Records
  courses: Course[];
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
  attendanceHistory: AttendanceRecord[];
  overallAttendanceRate: number;
  totalClassesAttended: number;
  totalClassesMissed: number;
  totalClassesLate: number;

  // Live Session (Lecturer & Student sync)
  activeSession: LiveSession | null;
  qrCountdown: number; // 30s down to 0
  currentQrCodeToken: string;
  createSession: (courseId: string, date: string, startTime: string, closingTime: string) => boolean;
  endActiveSession: () => SessionSummaryData | null;
  lastSessionSummary: SessionSummaryData | null;
  clearSessionSummary: () => void;

  // Student Actions
  simulateCheckIn: (scenario: 'valid' | 'expired' | 'duplicate' | 'out_of_range') => {
    success: boolean;
    errorType?: 'expired' | 'duplicate' | 'out_of_range';
    message: string;
    record?: AttendanceRecord;
  };
  hasCheckedInCurrentSession: boolean;

  // Notifications
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  unreadNotificationsCount: number;

  // Simulation controls
  addSimulatedAttendee: () => void;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Start unauthenticated so user lands on the onboarding / Welcome Screen
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    // In prototype, show onboarding on first load or when triggered
    try {
      const stored = localStorage.getItem('smart_attendance_onboarding_done');
      return stored !== 'true';
    } catch {
      return true;
    }
  });

  const completeOnboarding = () => {
    try {
      localStorage.setItem('smart_attendance_onboarding_done', 'true');
    } catch {
      // ignore
    }
    setShowOnboarding(false);
  };

  const replayOnboarding = () => {
    setShowOnboarding(true);
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRoleState] = useState<UserRole>('student');
  const [viewportMode, setViewportMode] = useState<'mobile-frame' | 'adaptive'>('mobile-frame');

  const [studentProfile, setStudentProfile] = useState<UserProfile>(INITIAL_STUDENT_PROFILE);
  const [lecturerProfile, setLecturerProfile] = useState<UserProfile>(INITIAL_LECTURER_PROFILE);

  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_HISTORY);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Live session
  const [activeSession, setActiveSession] = useState<LiveSession | null>(INITIAL_LIVE_SESSION);
  const [lastSessionSummary, setLastSessionSummary] = useState<SessionSummaryData | null>(null);
  const [hasCheckedInCurrentSession, setHasCheckedInCurrentSession] = useState<boolean>(false);

  // Dynamic 30-second QR cycle
  const [qrCountdown, setQrCountdown] = useState<number>(30);
  const [currentQrCodeToken, setCurrentQrCodeToken] = useState<string>('CS301-VALID-TOKEN-8834');

  // Timer for QR code refresh
  useEffect(() => {
    if (!activeSession) return;

    const interval = setInterval(() => {
      setQrCountdown((prev) => {
        if (prev <= 1) {
          // Refresh QR token
          const newToken = `${activeSession.courseCode.replace(/\s+/g, '')}-SEC-${Math.floor(1000 + Math.random() * 9000)}`;
          setCurrentQrCodeToken(newToken);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession]);

  // Occasional incoming simulated student in live session to show real-time dynamism
  useEffect(() => {
    if (!activeSession) return;

    const simInterval = setInterval(() => {
      if (Math.random() > 0.6 && activeSession.attendees.length < 25) {
        addSimulatedAttendee();
      }
    }, 12000);

    return () => clearInterval(simInterval);
  }, [activeSession]);

  const currentProfile = userRole === 'student' ? studentProfile : lecturerProfile;

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
  };

  const login = (role?: UserRole) => {
    if (role) setUserRoleState(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const register = (name: string, email: string, studentId: string, role: UserRole) => {
    if (role === 'student') {
      setStudentProfile((prev) => ({
        ...prev,
        name: name || prev.name,
        email: email || prev.email,
        studentId: studentId || prev.studentId,
        role: 'student',
      }));
      setUserRoleState('student');
    } else {
      setLecturerProfile((prev) => ({
        ...prev,
        name: name || prev.name,
        email: email || prev.email,
        role: 'lecturer',
      }));
      setUserRoleState('lecturer');
    }
    setIsAuthenticated(true);
  };

  // Calculations for student stats
  const totalClassesAttended = useMemo(() => {
    return attendanceHistory.filter((r) => r.status === 'present').length;
  }, [attendanceHistory]);

  const totalClassesLate = useMemo(() => {
    return attendanceHistory.filter((r) => r.status === 'late').length;
  }, [attendanceHistory]);

  const totalClassesMissed = useMemo(() => {
    return attendanceHistory.filter((r) => r.status === 'absent').length;
  }, [attendanceHistory]);

  const overallAttendanceRate = useMemo(() => {
    const total = attendanceHistory.length;
    if (total === 0) return 100;
    // Late counts as 0.75 or present counts as 1
    const positive = totalClassesAttended + totalClassesLate * 0.75;
    return Math.round((positive / total) * 100);
  }, [attendanceHistory, totalClassesAttended, totalClassesLate]);

  // Lecturer creates a session
  const createSession = (courseId: string, date: string, startTime: string, closingTime: string): boolean => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return false;

    const newSession: LiveSession = {
      id: `ses_${course.code.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
      courseId: course.id,
      courseCode: course.code,
      courseName: course.name,
      lecturer: lecturerProfile.name,
      room: course.room,
      date: date || 'Today',
      startTime: startTime || '10:00 AM',
      closingTime: closingTime || '10:30 AM',
      qrToken: `${course.code.replace(/\s+/g, '')}-START-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'active',
      totalEnrolled: course.enrolledCount,
      attendees: [],
    };

    setActiveSession(newSession);
    setCurrentQrCodeToken(newSession.qrToken);
    setQrCountdown(30);
    setHasCheckedInCurrentSession(false);

    // Add notification for students
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title: 'New Session Started',
      message: `${lecturerProfile.name} opened attendance for ${course.code} (${course.name}) in ${course.room}.`,
      timestamp: 'Just now',
      type: 'session',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return true;
  };

  // Lecturer ends session
  const endActiveSession = (): SessionSummaryData | null => {
    if (!activeSession) return null;

    const presentCount = activeSession.attendees.filter((a) => a.status === 'present').length;
    const lateCount = activeSession.attendees.filter((a) => a.status === 'late').length;
    const totalAttended = presentCount + lateCount;
    const absentCount = Math.max(0, activeSession.totalEnrolled - totalAttended);
    const rate = Math.round((totalAttended / activeSession.totalEnrolled) * 100);

    const summary: SessionSummaryData = {
      courseCode: activeSession.courseCode,
      courseName: activeSession.courseName,
      lecturer: activeSession.lecturer,
      date: activeSession.date,
      totalEnrolled: activeSession.totalEnrolled,
      presentCount,
      lateCount,
      absentCount,
      attendanceRate: rate,
      attendees: [...activeSession.attendees],
    };

    setLastSessionSummary(summary);
    setActiveSession(null);
    return summary;
  };

  const clearSessionSummary = () => {
    setLastSessionSummary(null);
  };

  // Student check-in simulation
  const simulateCheckIn = (scenario: 'valid' | 'expired' | 'duplicate' | 'out_of_range'): {
    success: boolean;
    errorType?: 'expired' | 'duplicate' | 'out_of_range';
    message: string;
    record?: AttendanceRecord;
  } => {
    if (scenario === 'expired') {
      return {
        success: false,
        errorType: 'expired' as const,
        message: 'This QR code has expired. Lecturer codes refresh every 30 seconds to prevent proxy attendance.',
      };
    }

    if (scenario === 'out_of_range') {
      return {
        success: false,
        errorType: 'out_of_range' as const,
        message: 'Location verification failed. Your device coordinates are outside Lecture Hall B3 geo-boundary.',
      };
    }

    if (scenario === 'duplicate' || hasCheckedInCurrentSession) {
      return {
        success: false,
        errorType: 'duplicate' as const,
        message: 'Duplicate check-in detected. You have already recorded attendance for this session.',
      };
    }

    // Valid check-in!
    const targetCourse = courses.find((c) => c.code === (activeSession?.courseCode || 'CS 301')) || courses[0];
    const isLate = qrCountdown < 8; // If under 8 seconds in the session countdown, mark as Late for realism or Present
    const checkinStatus: AttendanceStatus = isLate ? 'late' : 'present';

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRecord: AttendanceRecord = {
      id: `att_${Date.now()}`,
      courseId: targetCourse.id,
      courseCode: targetCourse.code,
      courseName: targetCourse.name,
      lecturer: targetCourse.lecturer,
      date: 'Today, Nov 11, 2026',
      time: timeString,
      status: checkinStatus,
      room: targetCourse.room,
      sessionTopic: 'Live Attendance Verification',
    };

    // Update history
    setAttendanceHistory((prev) => [newRecord, ...prev]);
    setHasCheckedInCurrentSession(true);

    // Update course statistics
    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id === targetCourse.id) {
          const newAttended = checkinStatus === 'present' ? c.attendedSessions + 1 : c.attendedSessions;
          const newLate = checkinStatus === 'late' ? c.lateSessions + 1 : c.lateSessions;
          const newTotal = c.totalSessions + 1;
          const rate = Math.round(((newAttended + newLate * 0.75) / newTotal) * 100);
          return {
            ...c,
            attendedSessions: newAttended,
            lateSessions: newLate,
            totalSessions: newTotal,
            attendanceRate: rate,
          };
        }
        return c;
      })
    );

    // If there is an active session, add student to the lecturer live list
    if (activeSession) {
      const newAttendee: SessionAttendee = {
        id: `att_gabriella_${Date.now()}`,
        studentName: studentProfile.name,
        studentId: studentProfile.studentId || 'STU-2024-8841',
        avatar: studentProfile.avatar,
        checkInTime: timeString,
        status: checkinStatus === 'late' ? 'late' : 'present',
      };

      setActiveSession((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          attendees: [newAttendee, ...prev.attendees],
        };
      });
    }

    // Add confirmation notification
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Attendance Confirmed!',
        message: `Your check-in for ${targetCourse.code} (${targetCourse.name}) was successfully recorded as ${checkinStatus.toUpperCase()}.`,
        timestamp: 'Just now',
        type: 'success',
        read: false,
      },
      ...prev,
    ]);

    return {
      success: true,
      message: "You're checked in!",
      record: newRecord,
    };
  };

  const addSimulatedAttendee = () => {
    if (!activeSession) return;
    const randomClassmate = SIMULATED_CLASSMATES[Math.floor(Math.random() * SIMULATED_CLASSMATES.length)];
    const alreadyExists = activeSession.attendees.some((a) => a.studentId === randomClassmate.id);
    if (alreadyExists) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isLate = Math.random() > 0.7;

    const newAttendee: SessionAttendee = {
      id: `att_sim_${Date.now()}_${Math.random()}`,
      studentName: randomClassmate.name,
      studentId: randomClassmate.id,
      avatar: '',
      checkInTime: timeStr,
      status: isLate ? 'late' : 'present',
    };

    setActiveSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        attendees: [newAttendee, ...prev.attendees],
      };
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <AttendanceContext.Provider
      value={{
        isAuthenticated,
        showOnboarding,
        completeOnboarding,
        replayOnboarding,
        userRole,
        studentProfile,
        lecturerProfile,
        currentProfile,
        setUserRole,
        login,
        logout,
        register,
        viewportMode,
        setViewportMode,
        courses,
        selectedCourse,
        setSelectedCourse,
        attendanceHistory,
        overallAttendanceRate,
        totalClassesAttended,
        totalClassesMissed,
        totalClassesLate,
        activeSession,
        qrCountdown,
        currentQrCodeToken,
        createSession,
        endActiveSession,
        lastSessionSummary,
        clearSessionSummary,
        simulateCheckIn,
        hasCheckedInCurrentSession,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        unreadNotificationsCount,
        addSimulatedAttendee,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};
