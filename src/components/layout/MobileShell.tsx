import React, { ReactNode } from 'react';
import {
  Smartphone,
  Maximize2,
  ArrowRightLeft,
  UserCheck,
  Wifi,
  Battery,
  Signal,
  Sparkles,
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

interface MobileShellProps {
  children: ReactNode;
  onOpenScanner?: () => void;
}

export const MobileShell: React.FC<MobileShellProps> = ({ children, onOpenScanner }) => {
  const {
    viewportMode,
    setViewportMode,
    userRole,
    setUserRole,
    isAuthenticated,
  } = useAttendance();

  return (
    <div className="min-h-screen bg-[#131926] text-[#FAF8F3] flex flex-col items-center justify-start relative overflow-hidden">
      {/* Top Prototype Utility Bar */}
      <header className="w-full bg-[#1F2A44]/90 backdrop-blur-md border-b border-[#C6A75E]/20 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-[#C6A75E] ring-4 ring-[#C6A75E]/30 animate-pulse" />
          <span className="font-heading font-extrabold text-white tracking-tight text-sm">
            Smart Attendance
          </span>
          <span className="hidden sm:inline text-[#C6A75E] font-semibold text-[11px] bg-white/10 px-2 py-0.5 rounded-full border border-[#C6A75E]/20">
            Navy & Gold Academic Prototype
          </span>
        </div>

        {/* Controls Toolbar */}
        <div className="flex items-center gap-2">
          {/* Quick Role Switcher */}
          {isAuthenticated && (
            <div className="flex items-center bg-black/25 rounded-xl p-0.5 border border-white/10 shadow-sm">
              <button
                onClick={() => setUserRole('student')}
                className={`px-3 py-1 rounded-lg font-heading font-bold text-[11px] transition-all cursor-pointer flex items-center gap-1.5 ${
                  userRole === 'student'
                    ? 'bg-[#C6A75E] text-[#1F2A44] font-extrabold shadow-sm'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                <span>🎓 Gabriella (Student)</span>
              </button>
              <button
                onClick={() => setUserRole('lecturer')}
                className={`px-3 py-1 rounded-lg font-heading font-bold text-[11px] transition-all cursor-pointer flex items-center gap-1.5 ${
                  userRole === 'lecturer'
                    ? 'bg-[#C6A75E] text-[#1F2A44] font-extrabold shadow-sm'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                <span>👨‍🏫 Dr. Kwame (Lecturer)</span>
              </button>
            </div>
          )}

          {/* Viewport Mode Toggle */}
          <div className="hidden md:flex items-center bg-black/25 rounded-xl p-0.5 border border-white/10">
            <button
              onClick={() => setViewportMode('mobile-frame')}
              className={`p-1.5 rounded-lg text-white/80 transition-colors cursor-pointer ${
                viewportMode === 'mobile-frame'
                  ? 'bg-white/20 text-[#C6A75E] shadow-xs'
                  : 'hover:text-white'
              }`}
              title="Mobile Device Shell (390×844)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewportMode('adaptive')}
              className={`p-1.5 rounded-lg text-white/80 transition-colors cursor-pointer ${
                viewportMode === 'adaptive'
                  ? 'bg-white/20 text-[#C6A75E] shadow-xs'
                  : 'hover:text-white'
              }`}
              title="Adaptive Full View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Canvas Area */}
      <main className="flex-1 w-full flex items-center justify-center p-0 md:p-6 overflow-hidden relative z-10">
        {viewportMode === 'mobile-frame' ? (
          /* Phone Device Frame (390 × 844 px target) */
          <div className="relative w-full max-w-[392px] h-[100dvh] md:h-[844px] md:max-h-[92vh] bg-[#FAF8F3] md:rounded-[46px] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] md:border-[10px] md:border-[#1F2A44] overflow-hidden flex flex-col ring-1 ring-white/10">
            {/* Phone Speaker & Dynamic Island */}
            <div className="hidden md:flex absolute top-0 inset-x-0 h-7 z-40 items-center justify-between px-6 pt-2 pointer-events-none text-[#252733]">
              <span className="text-[11px] font-bold font-mono tracking-tight">10:00</span>
              <div className="w-24 h-4 bg-black rounded-full mx-auto" />
              <div className="flex items-center gap-1.5 text-[#252733]">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Scrollable Phone Screen Container */}
            <div className="flex-1 overflow-y-auto no-scrollbar md:pt-6 bg-[#FAF8F3] text-[#252733]">
              {children}
            </div>
          </div>
        ) : (
          /* Adaptive Fullscreen Layout */
          <div className="w-full max-w-2xl min-h-[90vh] bg-[#FAF8F3] rounded-2xl border border-[#E8DCC8] shadow-xl overflow-hidden flex flex-col text-[#252733]">
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
