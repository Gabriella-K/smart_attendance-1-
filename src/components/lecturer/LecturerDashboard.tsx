import React from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Users,
  BookOpen,
  Calendar,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Radio,
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { ASSETS } from '../../data/mockData';
import { AnimatedCounter } from '../common/AnimatedCounter';

interface LecturerDashboardProps {
  onStartSessionClick: () => void;
  onNavigateLiveSession: () => void;
  onNavigateCourses: () => void;
  onNavigateReports: () => void;
}

export const LecturerDashboard: React.FC<LecturerDashboardProps> = ({
  onStartSessionClick,
  onNavigateLiveSession,
  onNavigateCourses,
  onNavigateReports,
}) => {
  const { lecturerProfile, courses, activeSession } = useAttendance();

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
      {/* Lecturer Greeting Header Card in Navy */}
      <motion.div
        variants={itemVariants}
        className="relative rounded-2xl bg-[#1F2A44] p-5 shadow-xs text-[#FAF8F3] overflow-hidden border border-[#1F2A44]"
      >
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[#C6A75E] text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#4F8A67]" />
              <span>Faculty Administrator</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#FAF8F3] font-heading tracking-tight leading-tight">
              Welcome, {lecturerProfile.name.split(' ')[0]} {lecturerProfile.name.split(' ')[1]}!
            </h1>
            <p className="text-xs text-[#FAF8F3]/80 font-medium">
              Dept. of Computer Science · Senior Lecturer
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative shrink-0 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#C6A75E] shadow-sm bg-white">
              <img
                src={lecturerProfile.avatar}
                alt={lecturerProfile.name}
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

      {/* Prominent Navy Start Session Button with Gold Accent */}
      <motion.div variants={itemVariants}>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartSessionClick}
          className="relative w-full h-16 rounded-2xl bg-[#1F2A44] hover:bg-[#2b3a5c] text-[#FAF8F3] shadow-md shadow-[#1F2A44]/20 border border-[#1F2A44] flex items-center justify-between px-5 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-[#C6A75E]">
              <Play className="w-5 h-5 text-[#C6A75E] fill-current ml-0.5" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-bold text-[#C6A75E] uppercase tracking-wider block">
                Classroom Attendance
              </span>
              <span className="text-base font-extrabold font-heading text-[#FAF8F3] tracking-tight block">
                Start New Session
              </span>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#FAF8F3] group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-5 h-5 text-[#C6A75E]" />
          </div>
        </motion.button>
      </motion.div>

      {/* Active Live Session Card (When running) */}
      {activeSession ? (
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onNavigateLiveSession}
          className="rounded-2xl bg-[#E8DCC8]/50 text-[#1F2A44] p-5 shadow-2xs border border-[#E8DCC8] cursor-pointer relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2 relative z-10">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F8A67] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4F8A67]" />
              </span>
              <span className="text-xs font-bold text-[#1F2A44] uppercase tracking-wider flex items-center gap-1 font-mono">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#C6A75E]" />
                <span>Broadcasting Live Now</span>
              </span>
            </div>
            <span className="text-xs font-bold text-[#1F2A44] bg-white border border-[#E8DCC8] px-3 py-1 rounded-full shadow-2xs">
              <AnimatedCounter value={activeSession.attendees.length} suffix=" checked in" />
            </span>
          </div>

          <h3 className="text-lg font-extrabold font-heading text-[#1F2A44] leading-tight relative z-10">
            {activeSession.courseCode} · {activeSession.courseName}
          </h3>
          <p className="text-xs text-[#706B62] font-medium mt-1 relative z-10">
            {activeSession.room} · Cutoff set to {activeSession.closingTime}
          </p>

          <div className="mt-3.5 pt-2.5 border-t border-[#E8DCC8] flex items-center justify-between text-xs font-bold text-[#1F2A44] relative z-10">
            <span>Tap to View Live Rotating QR Screen</span>
            <ChevronRight className="w-4 h-4 text-[#C6A75E] group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>
      ) : null}

      {/* Overview Stats 4-Grid with Animated Counters */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white border border-[#E8DCC8] p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#706B62] uppercase">
            <span>Active Courses</span>
            <BookOpen className="w-4 h-4 text-[#1F2A44]" />
          </div>
          <div className="text-3xl font-extrabold text-[#1F2A44] font-heading">
            <AnimatedCounter value={4} />
          </div>
          <p className="text-[10px] text-[#706B62] font-medium">Undergraduate cohorts</p>
        </div>

        <div className="rounded-2xl bg-white border border-[#E8DCC8] p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#706B62] uppercase">
            <span>Total Students</span>
            <Users className="w-4 h-4 text-[#C6A75E]" />
          </div>
          <div className="text-3xl font-extrabold text-[#1F2A44] font-heading">
            <AnimatedCounter value={186} />
          </div>
          <p className="text-[10px] text-[#706B62] font-medium">Registered attendees</p>
        </div>

        <div className="rounded-2xl bg-white border border-[#E8DCC8] p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#706B62] uppercase">
            <span>Today</span>
            <Calendar className="w-4 h-4 text-[#1F2A44]" />
          </div>
          <div className="text-3xl font-extrabold text-[#1F2A44] font-heading">
            <AnimatedCounter value={2} suffix=" Sessions" />
          </div>
          <p className="text-[10px] text-[#706B62] font-medium">CS 301 & CS 304</p>
        </div>

        <div className="rounded-2xl bg-white border border-[#E8DCC8] p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#706B62] uppercase">
            <span>Department Avg</span>
            <TrendingUp className="w-4 h-4 text-[#4F8A67]" />
          </div>
          <div className="text-3xl font-extrabold text-[#4F8A67] font-heading">
            <AnimatedCounter value={88} suffix="%" />
          </div>
          <p className="text-[10px] text-[#4F8A67] font-bold">Standard threshold: 75%</p>
        </div>
      </motion.div>

      {/* Teaching Courses Preview */}
      <motion.div variants={itemVariants} className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-[#1F2A44] font-heading uppercase tracking-wider">
            Teaching Cohorts
          </h2>
          <button
            onClick={onNavigateCourses}
            className="text-xs font-bold text-[#1F2A44] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>All courses</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#C6A75E]" />
          </button>
        </div>

        <div className="space-y-2">
          {courses.slice(0, 3).map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.01 }}
              className="p-3.5 rounded-2xl bg-white border border-[#E8DCC8] flex items-center justify-between shadow-2xs hover:border-[#1F2A44]/40 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1F2A44] font-heading bg-[#E8DCC8]/50 px-2 py-0.5 rounded-md">
                    {course.code}
                  </span>
                  <span className="text-[10px] text-[#706B62] font-medium">
                    {course.enrolledCount} Students
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#1F2A44] leading-snug">
                  {course.name}
                </h4>
                <p className="text-[10px] text-[#706B62]">{course.room}</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-extrabold text-[#4F8A67] font-heading tabular-nums block">
                  {course.attendanceRate}%
                </span>
                <span className="text-[9px] text-[#706B62] font-medium">Attendance</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Department Reports Shortcut */}
      <motion.div
        variants={itemVariants}
        className="p-4 rounded-2xl bg-white border border-[#E8DCC8] flex items-center justify-between shadow-2xs"
      >
        <div className="space-y-0.5">
          <p className="text-xs font-extrabold text-[#1F2A44] font-heading">
            Official Attendance Audit
          </p>
          <p className="text-[10px] text-[#706B62] font-medium">
            Export text rosters and examination clearances
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNavigateReports}
          className="px-3.5 py-2 rounded-xl bg-[#1F2A44] hover:bg-[#2b3a5c] text-[#FAF8F3] text-xs font-bold cursor-pointer shadow-2xs transition-colors"
        >
          View Reports
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
