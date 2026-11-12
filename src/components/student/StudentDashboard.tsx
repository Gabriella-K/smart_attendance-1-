import React from 'react';
import { motion } from 'framer-motion';
import {
  QrCode,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  TrendingUp,
  Sparkles,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Award,
  Layers,
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { ASSETS } from '../../data/mockData';
import { Course } from '../../types/attendance';
import { AnimatedCounter } from '../common/AnimatedCounter';

interface StudentDashboardProps {
  onOpenScanner: () => void;
  onNavigateCourses: () => void;
  onNavigateHistory: () => void;
  onNavigateProgress?: () => void;
  onSelectCourse: (course: Course) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onOpenScanner,
  onNavigateCourses,
  onNavigateHistory,
  onNavigateProgress,
  onSelectCourse,
}) => {
  const {
    studentProfile,
    overallAttendanceRate,
    totalClassesAttended,
    totalClassesMissed,
    totalClassesLate,
    courses,
    attendanceHistory,
    activeSession,
    hasCheckedInCurrentSession,
  } = useAttendance();

  const upcomingCourse = courses[0]; // Software Engineering
  const recentHistory = attendanceHistory.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4 pb-24 px-4 pt-3 relative"
    >
      {/* Student Welcome Header Card in Navy */}
      <motion.div
        variants={itemVariants}
        className="relative rounded-2xl bg-[#1F2A44] p-5 shadow-xs text-[#FAF8F3] overflow-hidden border border-[#1F2A44]"
      >
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[#C6A75E] text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#4F8A67]" />
              <span>Campus Active</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#FAF8F3] font-heading tracking-tight leading-tight">
              Good morning, {studentProfile.name.split(' ')[0]}!
            </h1>
            <p className="text-xs text-[#FAF8F3]/80 font-medium">
              {studentProfile.studentId} · B.Sc. Software Engineering
            </p>
          </div>

          {/* Cartoon Student Avatar */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative shrink-0 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#C6A75E] shadow-sm bg-white">
              <img
                src={ASSETS.cartoonProgress || ASSETS.studentAvatar}
                alt={studentProfile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#4F8A67] border-2 border-white flex items-center justify-center text-[10px] text-white">
              ✓
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Attendance Summary Hero Card */}
      <motion.div
        variants={itemVariants}
        onClick={onNavigateProgress}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="relative rounded-2xl bg-[#E8DCC8]/50 text-[#1F2A44] p-5 shadow-xs border border-[#E8DCC8] cursor-pointer overflow-hidden group"
      >
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#1F2A44] flex items-center justify-center text-[#C6A75E] shadow-2xs">
              <Award className="w-4 h-4 text-[#C6A75E]" />
            </span>
            <div>
              <span className="text-[11px] font-extrabold text-[#1F2A44] uppercase tracking-wider block font-heading">
                Official Attendance Standing
              </span>
              <span className="text-xs text-[#706B62] font-medium">
                Examination Qualification Matrix
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-[#1F2A44] group-hover:translate-x-0.5 transition-transform">
            <span>Progress</span>
            <ChevronRight className="w-4 h-4 text-[#C6A75E]" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 relative z-10 pt-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl sm:text-5xl font-black font-heading text-[#1F2A44] tracking-tight">
                <AnimatedCounter value={overallAttendanceRate} suffix="%" />
              </span>
              <span className="text-xs font-bold text-[#1F2A44] bg-[#C6A75E]/30 border border-[#C6A75E]/50 px-2 py-0.5 rounded-full">
                {overallAttendanceRate >= 75 ? '✓ Exam Clear' : '⚠️ Warning'}
              </span>
            </div>
            <p className="text-xs text-[#706B62] mt-1 font-medium">
              <strong className="text-[#1F2A44] font-bold">{totalClassesAttended}</strong> attended ·{' '}
              <strong className="text-[#C28B3C] font-bold">{totalClassesLate}</strong> late ·{' '}
              <strong className="text-[#B95757] font-bold">{totalClassesMissed}</strong> missed
            </p>
          </div>

          {/* Circular SVG Ring Mini Graphic */}
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="#E8DCC8" strokeWidth="6" fill="transparent" />
              <motion.circle
                cx="32"
                cy="32"
                r="26"
                stroke="#1F2A44"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray="163.36"
                initial={{ strokeDashoffset: 163.36 }}
                animate={{ strokeDashoffset: 163.36 - (163.36 * overallAttendanceRate) / 100 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>
            <TrendingUp className="w-5 h-5 text-[#C6A75E] absolute" />
          </div>
        </div>
      </motion.div>

      {/* Prominent Large Navy Scan QR Button with Gold Accent */}
      <motion.div variants={itemVariants}>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenScanner}
          className="relative w-full h-16 rounded-2xl bg-[#1F2A44] hover:bg-[#2b3a5c] text-[#FAF8F3] shadow-md shadow-[#1F2A44]/20 border border-[#1F2A44] flex items-center justify-between px-5 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-[#C6A75E]">
              <QrCode className="w-6 h-6 text-[#C6A75E]" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-bold text-[#C6A75E] uppercase tracking-wider block">
                {hasCheckedInCurrentSession ? '✓ Verified · Scan Another' : 'Instant Classroom Verification'}
              </span>
              <span className="text-base font-extrabold font-heading text-[#FAF8F3] tracking-tight block">
                Scan QR Code
              </span>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#FAF8F3] group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-5 h-5 text-[#C6A75E]" />
          </div>
        </motion.button>

        {activeSession && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#4F8A67]/10 border border-[#4F8A67]/30 text-xs text-[#4F8A67] font-bold"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F8A67] animate-pulse" />
              <span>Broadcast: {activeSession.courseCode} ({activeSession.room})</span>
            </div>
            <span className="text-[#4F8A67] bg-white px-2 py-0.5 rounded-full text-[10px] shadow-2xs">
              {hasCheckedInCurrentSession ? '✓ Recorded' : 'Scan to Check In'}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Upcoming Class Spotlight in Warm Beige Card */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl bg-[#E8DCC8]/40 text-[#252733] p-5 shadow-2xs border border-[#E8DCC8] relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-[#1F2A44] text-xs font-bold border border-[#E8DCC8]">
            <Clock className="w-3.5 h-3.5 text-[#C6A75E]" />
            <span>Upcoming Lecture</span>
          </div>
          <span className="text-xs text-[#FAF8F3] font-bold bg-[#1F2A44] px-2.5 py-0.5 rounded-full">
            Today
          </span>
        </div>

        <div className="space-y-1 relative z-10">
          <span className="text-xs font-bold text-[#C6A75E] tracking-wider uppercase">
            {upcomingCourse.code}
          </span>
          <h3 className="text-lg font-extrabold font-heading text-[#1F2A44]">
            {upcomingCourse.name}
          </h3>
          <p className="text-xs text-[#706B62] font-medium">{upcomingCourse.lecturer}</p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E8DCC8] flex items-center justify-between text-xs text-[#706B62] relative z-10">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C6A75E]" />
            <span>{upcomingCourse.room}</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[#1F2A44]">
            <Calendar className="w-3.5 h-3.5 text-[#C6A75E]" />
            <span>10:00 - 11:30 AM</span>
          </div>
        </div>
      </motion.div>

      {/* Enrolled Courses Section */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-[#1F2A44] font-heading uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#C6A75E]" />
            <span>Enrolled Courses ({courses.length})</span>
          </h2>
          <button
            onClick={onNavigateCourses}
            className="text-xs font-bold text-[#1F2A44] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>View all</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#C6A75E]" />
          </button>
        </div>

        <div className="space-y-2.5">
          {courses.slice(0, 3).map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectCourse(course)}
              className="p-4 rounded-2xl bg-white border border-[#E8DCC8] hover:border-[#1F2A44]/40 transition-all cursor-pointer flex items-center justify-between shadow-2xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#E8DCC8]/50 text-[#1F2A44] font-heading">
                    {course.code}
                  </span>
                  <span className="text-[11px] text-[#706B62] font-medium">
                    {course.room.split(',')[0]}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1F2A44] leading-snug">
                  {course.name}
                </h4>
                <p className="text-[10px] text-[#706B62] font-medium">
                  Next: {course.nextClassTime}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span
                  className={`text-base font-extrabold font-heading tabular-nums ${
                    course.attendanceRate >= 85
                      ? 'text-[#4F8A67]'
                      : course.attendanceRate >= 75
                      ? 'text-[#C28B3C]'
                      : 'text-[#B95757]'
                  }`}
                >
                  {course.attendanceRate}%
                </span>
                <span className="text-[10px] text-[#706B62] block font-medium">Attendance</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Attendance Activity Stream */}
      <motion.div variants={itemVariants} className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-[#1F2A44] font-heading uppercase tracking-wider">
            Recent Verified Activity
          </h2>
          <button
            onClick={onNavigateHistory}
            className="text-xs font-bold text-[#1F2A44] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>History</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#C6A75E]" />
          </button>
        </div>

        <div className="space-y-2">
          {recentHistory.map((record) => (
            <motion.div
              key={record.id}
              whileHover={{ x: 2 }}
              className="p-3.5 rounded-2xl bg-white border border-[#E8DCC8] flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    record.status === 'present'
                      ? 'bg-[#4F8A67]/15 text-[#4F8A67]'
                      : record.status === 'late'
                      ? 'bg-[#C28B3C]/15 text-[#C28B3C]'
                      : 'bg-[#B95757]/15 text-[#B95757]'
                  }`}
                >
                  {record.status === 'present' && <CheckCircle className="w-4 h-4" />}
                  {record.status === 'late' && <Clock className="w-4 h-4" />}
                  {record.status === 'absent' && <AlertCircle className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1F2A44] leading-tight">
                    {record.courseCode} · {record.courseName}
                  </h4>
                  <p className="text-[10px] text-[#706B62]">
                    {record.date} · {record.time}
                  </p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                  record.status === 'present'
                    ? 'bg-[#4F8A67]/15 text-[#4F8A67] border border-[#4F8A67]/30'
                    : record.status === 'late'
                    ? 'bg-[#C28B3C]/15 text-[#C28B3C] border border-[#C28B3C]/30'
                    : 'bg-[#B95757]/15 text-[#B95757] border border-[#B95757]/30'
                }`}
              >
                {record.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
