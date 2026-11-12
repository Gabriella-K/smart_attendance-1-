import React, { useState } from 'react';
import { BookOpen, Users, Clock, Play, MapPin, ChevronRight, X, Calendar } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { Course } from '../../types/attendance';

interface LecturerCoursesViewProps {
  onStartSessionForCourse?: (courseId: string) => void;
}

export const LecturerCoursesView: React.FC<LecturerCoursesViewProps> = ({
  onStartSessionForCourse,
}) => {
  const { courses } = useAttendance();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div className="space-y-4 pb-20 px-4 pt-3">
      <div>
        <h1 className="text-xl font-extrabold text-[#1F2A44] font-heading">
          Teaching Courses
        </h1>
        <p className="text-xs text-[#706B62]">
          Manage student rosters, lecture venues, and session attendance.
        </p>
      </div>

      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-4 rounded-2xl bg-white border border-[#E8DCC8] shadow-xs space-y-3 hover:border-[#C6A75E] transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#C6A75E] font-heading">
                  {course.code}
                </span>
                <h3 className="text-sm font-bold text-[#1F2A44] leading-snug">
                  {course.name}
                </h3>
                <p className="text-xs text-[#706B62] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C6A75E]" />
                  <span>{course.room}</span>
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-base font-extrabold text-[#4F8A67] font-heading tabular-nums">
                  {course.attendanceRate}%
                </span>
                <span className="text-[10px] text-[#706B62] block">Average</span>
              </div>
            </div>

            {/* Quick stats pills */}
            <div className="flex items-center gap-3 text-xs text-[#706B62] pt-1 border-t border-[#E8DCC8]/60">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#1F2A44]" />
                <strong className="text-[#252733]">{course.enrolledCount}</strong> students
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C6A75E]" />
                <span>{course.schedule.split(' ')[0]}</span>
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setSelectedCourse(course)}
                className="flex-1 py-2 rounded-xl bg-[#FAF8F3] hover:bg-[#E8DCC8]/40 border border-[#E8DCC8] text-xs font-bold text-[#1F2A44] transition-colors cursor-pointer"
              >
                Roster & Analytics
              </button>
              <button
                onClick={() => onStartSessionForCourse?.(course.id)}
                className="px-3.5 py-2 rounded-xl bg-[#1F2A44] hover:bg-[#2C3B5E] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#C6A75E]" />
                <span>Start Session</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Roster & Analytics Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-[#1F2A44]/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-md max-h-[85vh] rounded-t-3xl sm:rounded-2xl bg-[#FAF8F3] border border-[#E8DCC8] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#E8DCC8] flex items-center justify-between bg-white">
              <div>
                <span className="text-xs font-bold text-[#C6A75E] font-heading">
                  {selectedCourse.code} Roster
                </span>
                <h3 className="text-base font-extrabold text-[#1F2A44] font-heading">
                  {selectedCourse.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#E8DCC8] flex items-center justify-center text-[#1F2A44] hover:bg-[#E8DCC8]/30 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto no-scrollbar space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-white border border-[#E8DCC8]/70">
                  <p className="text-lg font-black text-[#1F2A44] font-heading">{selectedCourse.enrolledCount}</p>
                  <p className="text-[10px] text-[#706B62] uppercase font-semibold">Enrolled</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#4F8A67]/10 border border-[#4F8A67]/20">
                  <p className="text-lg font-black text-[#4F8A67] font-heading">{selectedCourse.attendanceRate}%</p>
                  <p className="text-[10px] text-[#4F8A67] uppercase font-semibold">Attended</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#1F2A44]/10 border border-[#1F2A44]/20">
                  <p className="text-lg font-black text-[#1F2A44] font-heading">{selectedCourse.totalSessions}</p>
                  <p className="text-[10px] text-[#706B62] uppercase font-semibold">Sessions</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#1F2A44] font-heading uppercase mb-2">
                  Sample Registered Students
                </h4>
                <div className="space-y-1.5 text-xs">
                  {[
                    { name: 'Gabriella Ucyeye', id: 'STU-2024-8841', rate: '91%' },
                    { name: 'Chidi Eze', id: 'STU-2024-8119', rate: '88%' },
                    { name: 'Nia Kamau', id: 'STU-2024-8204', rate: '85%' },
                    { name: 'Samuel Osei', id: 'STU-2024-8451', rate: '77%' },
                    { name: 'Tariro Moyo', id: 'STU-2024-8390', rate: '95%' },
                  ].map((st) => (
                    <div
                      key={st.id}
                      className="p-2.5 rounded-xl bg-white border border-[#E8DCC8] flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-[#1F2A44]">{st.name}</p>
                        <p className="text-[10px] text-[#706B62]">{st.id}</p>
                      </div>
                      <span className="text-[11px] font-bold text-[#4F8A67]">
                        {st.rate} rate
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-[#E8DCC8] bg-white">
              <button
                onClick={() => setSelectedCourse(null)}
                className="w-full py-2.5 rounded-xl bg-[#1F2A44] hover:bg-[#2C3B5E] text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
