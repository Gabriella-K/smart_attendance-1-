import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Play, AlertCircle } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

interface StartSessionModalProps {
  onClose: () => void;
  onSessionStarted: () => void;
}

export const StartSessionModal: React.FC<StartSessionModalProps> = ({
  onClose,
  onSessionStarted,
}) => {
  const { courses, createSession } = useAttendance();

  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [sessionDate, setSessionDate] = useState('Today, Nov 11, 2026');
  const [startTime, setStartTime] = useState('10:00 AM');
  const [closingTime, setClosingTime] = useState('10:30 AM');
  const [error, setError] = useState<string | null>(null);

  const selectedCourse = courses.find((c) => c.id === courseId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId) {
      setError('Please select a course for this session.');
      return;
    }
    if (!sessionDate.trim()) {
      setError('Session date is required.');
      return;
    }
    if (!startTime.trim() || !closingTime.trim()) {
      setError('Start time and closing time are required.');
      return;
    }

    const success = createSession(courseId, sessionDate, startTime, closingTime);
    if (success) {
      onSessionStarted();
    } else {
      setError('Could not initialize session. Please check parameters.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl bg-[#FAF8F3] border border-[#E8DCC8] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#E8DCC8] flex items-center justify-between bg-[#E8DCC8]/40">
          <div>
            <span className="text-[11px] font-bold text-[#1F2A44] uppercase tracking-wider font-heading">
              Classroom Attendance
            </span>
            <h2 className="text-base font-extrabold text-[#1F2A44] font-heading">
              Start New Live Session
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E8DCC8] flex items-center justify-center text-[#1F2A44] hover:bg-[#E8DCC8] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-2xl bg-[#B95757]/10 border border-[#B95757]/30 flex items-center gap-2 text-xs text-[#B95757]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Course Selector */}
          <div>
            <label className="block text-xs font-bold text-[#1F2A44] mb-1.5 font-heading">
              Select Course
            </label>
            <div className="relative">
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full h-11 pl-3.5 pr-8 rounded-xl bg-white border border-[#E8DCC8] text-xs font-semibold text-[#252733] focus:outline-none focus:ring-2 focus:ring-[#1F2A44]"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} · {c.name} ({c.enrolledCount} students)
                  </option>
                ))}
              </select>
            </div>
            {selectedCourse && (
              <p className="text-[11px] text-[#706B62] mt-1 flex items-center gap-1 font-medium">
                <MapPin className="w-3 h-3 text-[#C6A75E]" />
                <span>Venue: {selectedCourse.room}</span>
              </p>
            )}
          </div>

          {/* Session Date */}
          <div>
            <label className="block text-xs font-bold text-[#1F2A44] mb-1 font-heading">
              Session Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-[#706B62] absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                placeholder="e.g. Today, Nov 11, 2026"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-[#E8DCC8] text-xs text-[#252733] focus:outline-none focus:ring-2 focus:ring-[#1F2A44]"
              />
            </div>
          </div>

          {/* Time Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1F2A44] mb-1 font-heading">
                Start Time
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-[#706B62] absolute left-3 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="10:00 AM"
                  className="w-full h-11 pl-9 pr-3 rounded-xl bg-white border border-[#E8DCC8] text-xs text-[#252733] focus:outline-none focus:ring-2 focus:ring-[#1F2A44]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1F2A44] mb-1 font-heading">
                Attendance Cutoff
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-[#706B62] absolute left-3 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  placeholder="10:30 AM"
                  className="w-full h-11 pl-9 pr-3 rounded-xl bg-white border border-[#E8DCC8] text-xs text-[#252733] focus:outline-none focus:ring-2 focus:ring-[#1F2A44]"
                />
              </div>
            </div>
          </div>

          {/* Quick presets for duration */}
          <div>
            <label className="block text-[11px] font-semibold text-[#706B62] mb-1.5">
              Quick duration cutoff presets:
            </label>
            <div className="flex gap-1.5">
              {['15 mins', '30 mins', '45 mins', '60 mins'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    const mins = parseInt(preset, 10);
                    const now = new Date();
                    now.setMinutes(now.getMinutes() + mins);
                    setClosingTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                  }}
                  className="flex-1 py-1.5 rounded-lg bg-white hover:bg-[#E8DCC8]/60 border border-[#E8DCC8] text-[11px] font-semibold text-[#1F2A44] cursor-pointer transition-colors"
                >
                  +{preset}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#1F2A44] hover:bg-[#2b3a5c] active:scale-[0.98] text-[#FAF8F3] font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
            >
              <Play className="w-4 h-4 text-[#C6A75E] fill-current" />
              <span>Launch Live Attendance QR</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
