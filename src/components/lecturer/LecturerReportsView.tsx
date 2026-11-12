import React, { useState } from 'react';
import { FileDown, CheckCircle2, AlertTriangle, Users, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

export const LecturerReportsView: React.FC = () => {
  const { courses } = useAttendance();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportAll = () => {
    const textContent = `=================================================================
SMART ATTENDANCE — SEMESTER FACULTY REPORT
Department of Computer Science
Generated: ${new Date().toLocaleString()}
=================================================================

COURSE SUMMARY METRICS:
${courses
  .map(
    (c, i) =>
      `${i + 1}. [${c.code}] ${c.name}
   - Room: ${c.room}
   - Enrolled: ${c.enrolledCount} students
   - Attendance Rate: ${c.attendanceRate}%
   - Total Sessions Conducted: ${c.totalSessions}`
  )
  .join('\n\n')}

-----------------------------------------------------------------
EXAMINATION CLEARANCE AUDIT:
- Students >= 75%: 168 (90.3%)
- Students < 75% : 18 (9.7% flagged for academic advisory)

=================================================================
Dean of Faculty of Computing & Information Technology
=================================================================
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Faculty_Semester_Attendance_Report_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="space-y-4 pb-20 px-4 pt-3">
      <div>
        <h1 className="text-xl font-extrabold text-[#1F2A44] font-heading">
          Attendance Reports
        </h1>
        <p className="text-xs text-[#706B62]">
          Semester audits, exam qualification rosters, and exports.
        </p>
      </div>

      {/* Export Button Card */}
      <div className="p-4 rounded-3xl bg-[#1F2A44] text-white space-y-3 shadow-md border border-[#C6A75E]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#C6A75E]/10 blur-xl pointer-events-none" />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#C6A75E]" />
            <span className="text-xs font-bold font-heading text-[#C6A75E] uppercase tracking-wide">
              Official Faculty Audit
            </span>
          </div>
          <span className="text-[11px] text-white/70">Semester 1</span>
        </div>

        <p className="text-xs text-white/90 leading-relaxed relative z-10">
          Download complete registry text archive for all undergraduate cohorts with examination clearances.
        </p>

        <button
          onClick={handleExportAll}
          className="w-full h-11 rounded-2xl bg-[#C6A75E] hover:bg-[#b5964f] active:scale-[0.98] text-[#1F2A44] font-heading font-extrabold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all relative z-10"
        >
          <FileDown className="w-4 h-4 text-[#1F2A44]" />
          <span>Export Full Faculty Report (.txt)</span>
        </button>

        {downloadSuccess && (
          <p className="text-xs text-[#4F8A67] font-semibold bg-[#4F8A67]/20 p-2 rounded-xl text-center border border-[#4F8A67]/40">
            ✓ Report downloaded to your device!
          </p>
        )}
      </div>

      {/* Course Breakdown List */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-[#1F2A44] font-heading uppercase tracking-wider">
          Course Cohort Breakdown
        </h3>

        <div className="space-y-2.5">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-4 rounded-2xl bg-white border border-[#E8DCC8] space-y-2 shadow-xs hover:border-[#C6A75E]/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#C6A75E] font-heading">
                    {course.code}
                  </span>
                  <h4 className="text-xs font-bold text-[#1F2A44] leading-snug">
                    {course.name}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-[#1F2A44] font-heading tabular-nums">
                    {course.attendanceRate}%
                  </span>
                  <span className="text-[9px] text-[#706B62] block">Average</span>
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-[#E8DCC8]/40 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1F2A44] to-[#C6A75E] rounded-full"
                  style={{ width: `${course.attendanceRate}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#706B62] pt-1 border-t border-[#E8DCC8]/60">
                <span>{course.enrolledCount} enrolled students</span>
                <span>{course.totalSessions} total lectures</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
