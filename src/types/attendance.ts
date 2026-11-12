export type UserRole = 'student' | 'lecturer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  studentId?: string;
  role: UserRole;
  department: string;
  avatar: string;
  program?: string;
  year?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  lecturer: string;
  lecturerEmail: string;
  room: string;
  schedule: string;
  attendanceRate: number; // percentage, e.g. 88
  totalSessions: number;
  attendedSessions: number;
  lateSessions: number;
  missedSessions: number;
  nextClassTime: string;
  enrolledCount: number;
  description?: string;
}

export type AttendanceStatus = 'present' | 'late' | 'absent';

export interface AttendanceRecord {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  lecturer: string;
  date: string;
  time: string;
  status: AttendanceStatus;
  room: string;
  sessionTopic?: string;
}

export interface SessionAttendee {
  id: string;
  studentName: string;
  studentId: string;
  avatar: string;
  checkInTime: string;
  status: 'present' | 'late';
}

export interface LiveSession {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  lecturer: string;
  room: string;
  date: string;
  startTime: string;
  closingTime: string;
  qrToken: string;
  status: 'active' | 'closed';
  attendees: SessionAttendee[];
  totalEnrolled: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'session' | 'success' | 'warning' | 'info';
  read: boolean;
  actionRoute?: string;
}
