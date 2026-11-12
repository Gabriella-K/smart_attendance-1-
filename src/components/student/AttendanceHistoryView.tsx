import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, Clock, AlertCircle, Calendar } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { AttendanceStatus } from '../../types/attendance';

export const AttendanceHistoryView: React.FC = () => {
  const { attendanceHistory } = useAttendance();
  const [filterStatus, setFilterStatus] = useState<'all' | AttendanceStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = attendanceHistory.filter((rec) => {
    const matchesFilter = filterStatus === 'all' || rec.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      rec.courseName.toLowerCase().includes(q) ||
      rec.courseCode.toLowerCase().includes(q) ||
      rec.lecturer.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4 pb-20 px-4 pt-3">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#1F2A44] font-heading">
          Attendance History
        </h1>
        <p className="text-xs text-[#706B62]">
          Official log of all classroom check-ins and verified sessions.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#706B62] absolute left-3.5 top-3.5 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by course or lecturer..."
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-[#E8DCC8] text-xs text-[#252733] placeholder:text-[#706B62]/60 focus:outline-none focus:ring-2 focus:ring-[#1F2A44] shadow-2xs font-medium"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 p-1 rounded-xl bg-[#E8DCC8]/50 overflow-x-auto no-scrollbar border border-[#E8DCC8]">
        {(['all', 'present', 'late', 'absent'] as const).map((status) => {
          const count =
            status === 'all'
              ? attendanceHistory.length
              : attendanceHistory.filter((r) => r.status === status).length;

          return (
            <motion.button
              key={status}
              whileTap={{ scale: 0.96 }}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold capitalize transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filterStatus === status
                  ? 'bg-[#1F2A44] text-[#FAF8F3] shadow-xs'
                  : 'text-[#706B62] hover:text-[#1F2A44]'
              }`}
            >
              {status} ({count})
            </motion.button>
          );
        })}
      </div>

      {/* Records Feed */}
      <div className="space-y-2.5">
        {filteredRecords.map((record) => {
          const isPresent = record.status === 'present';
          const isLate = record.status === 'late';
          const isAbsent = record.status === 'absent';

          return (
            <div
              key={record.id}
              className="p-3.5 rounded-2xl bg-white border border-[#E8DCC8] shadow-2xs space-y-2 hover:border-[#1F2A44]/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1F2A44] font-heading bg-[#E8DCC8]/50 px-2 py-0.5 rounded-md">
                      {record.courseCode}
                    </span>
                    <span className="text-[11px] text-[#706B62]">
                      {record.room}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-[#1F2A44] leading-snug">
                    {record.courseName}
                  </h3>
                  <p className="text-[11px] text-[#706B62]">{record.lecturer}</p>
                </div>

                {/* Status Badge */}
                <div
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shrink-0 ${
                    isPresent
                      ? 'bg-[#4F8A67]/15 text-[#4F8A67] border border-[#4F8A67]/30'
                      : isLate
                      ? 'bg-[#C28B3C]/15 text-[#C28B3C] border border-[#C28B3C]/30'
                      : 'bg-[#B95757]/15 text-[#B95757] border border-[#B95757]/30'
                  }`}
                >
                  {isPresent && <CheckCircle2 className="w-3 h-3" />}
                  {isLate && <Clock className="w-3 h-3" />}
                  {isAbsent && <AlertCircle className="w-3 h-3" />}
                  <span className="capitalize">{record.status}</span>
                </div>
              </div>

              {/* Timestamp */}
              <div className="pt-2 border-t border-[#E8DCC8] flex items-center justify-between text-[11px] text-[#706B62]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#C6A75E]" />
                  <span>{record.date}</span>
                </div>
                <div className="flex items-center gap-1 font-medium text-[#252733]">
                  <Clock className="w-3 h-3 text-[#1F2A44]" />
                  <span>{record.time}</span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredRecords.length === 0 && (
          <div className="p-8 text-center rounded-2xl bg-white border border-[#E8DCC8] space-y-1 shadow-2xs">
            <p className="text-sm font-bold text-[#1F2A44]">No attendance records found</p>
            <p className="text-xs text-[#706B62]">
              Try adjusting your filter or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
