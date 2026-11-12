import React from 'react';
import { X, CheckCircle2, Clock, AlertCircle, Calendar, MapPin, Mail, User } from 'lucide-react';
import { Course, AttendanceRecord } from '../../types/attendance';
import { useAttendance } from '../../context/AttendanceContext';

interface CourseDetailModalProps {
  course: Course;
  onClose: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, onClose }) => {
  const { attendanceHistory } = useAttendance();

  const courseHistory = attendanceHistory.filter(
    (r) => r.courseCode === course.code || r.courseId === course.id
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#1F2A44]/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md max-h-[90vh] rounded-t-3xl sm:rounded-2xl bg-[#FAF8F3] border border-[#E8DCC8] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-4 border-b border-[#E8DCC8] flex items-center justify-between bg-white">
          <div>
            <span className="text-xs font-bold text-[#C6A75E] font-heading">
              {course.code}
            </span>
            <h2 className="text-base font-extrabold text-[#1F2A44] font-heading leading-tight">
              {course.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#E8DCC8] flex items-center justify-center text-[#1F2A44] hover:bg-[#E8DCC8]/30 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto no-scrollbar p-5 space-y-4">
          {/* Attendance KPI Card */}
          <div className="p-4 rounded-2xl bg-[#1F2A44] text-[#FAF8F3] flex items-center justify-between shadow-sm border border-[#C6A75E]/30 relative overflow-hidden">
            <div className="space-y-1 relative z-10">
              <span className="text-[11px] font-semibold text-[#C6A75E] uppercase tracking-wide">
                Course Attendance
              </span>
              <div className="text-3xl font-black font-heading tabular-nums text-white">
                {course.attendanceRate}%
              </div>
              <p className="text-xs text-white/80">
                {course.attendanceRate >= 75
                  ? '✓ Meets exam requirement (≥75%)'
                  : '⚠️ Below 75% exam qualification'}
              </p>
            </div>

            {/* Circular progress visual */}
            <div className="relative w-16 h-16 flex items-center justify-center relative z-10">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#C6A75E"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="163.36"
                  strokeDashoffset={163.36 - (163.36 * course.attendanceRate) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-xs font-bold text-white tabular-nums">
                {course.attendanceRate}%
              </span>
            </div>
          </div>

          {/* Session Breakdown Grid */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-2xl bg-[#4F8A67]/10 border border-[#4F8A67]/20">
              <span className="text-xl font-black text-[#4F8A67] font-heading tabular-nums">
                {course.attendedSessions}
              </span>
              <p className="text-[10px] font-bold text-[#706B62] uppercase mt-0.5">Present</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#C28B3C]/10 border border-[#C28B3C]/20">
              <span className="text-xl font-black text-[#C28B3C] font-heading tabular-nums">
                {course.lateSessions}
              </span>
              <p className="text-[10px] font-bold text-[#706B62] uppercase mt-0.5">Late</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#B95757]/10 border border-[#B95757]/20">
              <span className="text-xl font-black text-[#B95757] font-heading tabular-nums">
                {course.missedSessions}
              </span>
              <p className="text-[10px] font-bold text-[#706B62] uppercase mt-0.5">Missed</p>
            </div>
          </div>

          {/* Lecturer & Schedule Info */}
          <div className="p-3.5 rounded-xl bg-white border border-[#E8DCC8] space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#252733]">
              <User className="w-4 h-4 text-[#1F2A44]" />
              <span className="font-semibold">{course.lecturer}</span>
            </div>
            <div className="flex items-center gap-2 text-[#706B62]">
              <Mail className="w-4 h-4 text-[#C6A75E]" />
              <span>{course.lecturerEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-[#706B62]">
              <MapPin className="w-4 h-4 text-[#C6A75E]" />
              <span>{course.room}</span>
            </div>
            <div className="flex items-center gap-2 text-[#706B62]">
              <Calendar className="w-4 h-4 text-[#1F2A44]" />
              <span>Schedule: {course.schedule}</span>
            </div>
          </div>

          {/* Past Course Sessions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#1F2A44] font-heading uppercase tracking-wider">
              Attendance Records for this Course ({courseHistory.length})
            </h4>

            {courseHistory.length === 0 ? (
              <p className="text-xs text-[#706B62] italic py-2">
                No past session records found for this course yet.
              </p>
            ) : (
              <div className="space-y-2">
                {courseHistory.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-xl bg-white border border-[#E8DCC8] flex items-center justify-between shadow-xs"
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#1F2A44]">
                        {rec.sessionTopic || 'Lecture Session'}
                      </p>
                      <p className="text-[10px] text-[#706B62]">
                        {rec.date} · {rec.time}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        rec.status === 'present'
                          ? 'bg-[#4F8A67]/15 text-[#4F8A67]'
                          : rec.status === 'late'
                          ? 'bg-[#C28B3C]/15 text-[#C28B3C]'
                          : 'bg-[#B95757]/15 text-[#B95757]'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Sessions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#1F2A44] font-heading uppercase tracking-wider">
              Upcoming Schedule
            </h4>
            <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#C6A75E]/30 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#1F2A44]">Next Lecture Session</p>
                <p className="text-[11px] text-[#706B62]">{course.nextClassTime} · {course.room}</p>
              </div>
              <span className="text-[11px] font-bold text-[#C6A75E]">Scheduled</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#E8DCC8] bg-white">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#1F2A44] hover:bg-[#2C3B5E] text-white text-xs font-bold font-heading cursor-pointer transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
