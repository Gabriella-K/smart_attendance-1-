import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, BookOpen, Clock } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { Course } from '../../types/attendance';
import { CourseDetailModal } from './CourseDetailModal';

export const StudentCoursesView: React.FC = () => {
  const { courses } = useAttendance();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter((c) => {
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.lecturer.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4 pb-24 px-4 pt-3">
      {/* Title & Search */}
      <div className="space-y-3">
        <div>
          <h1 className="text-xl font-extrabold text-[#1F2A44] font-heading">
            My Courses
          </h1>
          <p className="text-xs text-[#706B62]">
            Track attendance thresholds and semester progress.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#706B62] absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by code, title, or lecturer..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-[#E8DCC8] text-xs text-[#252733] placeholder:text-[#706B62]/60 focus:outline-none focus:ring-2 focus:ring-[#1F2A44] shadow-2xs font-medium"
          />
        </div>
      </div>

      {/* Course List with Motion Cards */}
      <div className="space-y-3">
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedCourse(course)}
            className="p-4 rounded-2xl bg-white border border-[#E8DCC8] hover:border-[#1F2A44]/40 transition-all cursor-pointer shadow-2xs space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#1F2A44] font-heading bg-[#E8DCC8]/50 px-2 py-0.5 rounded-md">
                  {course.code}
                </span>
                <h3 className="text-sm font-bold text-[#1F2A44] leading-snug">
                  {course.name}
                </h3>
                <p className="text-xs text-[#706B62] font-medium">{course.lecturer}</p>
              </div>

              {/* Attendance percentage indicator */}
              <div className="text-right shrink-0">
                <span
                  className={`text-lg font-extrabold font-heading tabular-nums ${
                    course.attendanceRate >= 85
                      ? 'text-[#4F8A67]'
                      : course.attendanceRate >= 75
                      ? 'text-[#C28B3C]'
                      : 'text-[#B95757]'
                  }`}
                >
                  {course.attendanceRate}%
                </span>
                <span className="text-[10px] text-[#706B62] block">Attendance</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-[#E8DCC8]/60 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  course.attendanceRate >= 85
                    ? 'bg-[#4F8A67]'
                    : course.attendanceRate >= 75
                    ? 'bg-[#C28B3C]'
                    : 'bg-[#B95757]'
                }`}
                style={{ width: `${Math.min(100, course.attendanceRate)}%` }}
              />
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between text-[11px] text-[#706B62] pt-1 border-t border-[#E8DCC8]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C6A75E]" />
                <span>Next: {course.nextClassTime}</span>
              </div>
              <div className="flex items-center gap-1 font-semibold text-[#1F2A44]">
                <span>Details</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C6A75E]" />
              </div>
            </div>
          </motion.div>
        ))}

        {filteredCourses.length === 0 && (
          <div className="p-8 text-center rounded-2xl bg-white border border-[#E8DCC8] shadow-2xs">
            <BookOpen className="w-8 h-8 text-[#706B62] mx-auto mb-2 opacity-50" />
            <p className="text-sm font-bold text-[#1F2A44]">No courses found</p>
            <p className="text-xs text-[#706B62] mt-1">Try another search query.</p>
          </div>
        )}
      </div>

      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};
