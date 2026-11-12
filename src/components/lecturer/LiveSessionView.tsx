import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCw,
  Users,
  CheckCircle2,
  Clock,
  Square,
  Sparkles,
  MapPin,
  Calendar,
  AlertTriangle,
  UserPlus,
  ArrowRight,
  Info,
  Radio,
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { QrCodeGraphic } from '../common/QrCodeGraphic';
import { SessionEndConfirmationModal } from './SessionSummaryModal';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { LottiePlayer } from '../common/LottiePlayer';
import lecturerSessionAnim from '../../assets/animations/lecturer_session.json';

interface LiveSessionViewProps {
  onStartNewSession: () => void;
  onSessionEnded: () => void;
}

export const LiveSessionView: React.FC<LiveSessionViewProps> = ({
  onStartNewSession,
  onSessionEnded,
}) => {
  const {
    activeSession,
    qrCountdown,
    currentQrCodeToken,
    endActiveSession,
    addSimulatedAttendee,
  } = useAttendance();

  const [confirmEndOpen, setConfirmEndOpen] = useState(false);

  if (!activeSession) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 text-center space-y-4 my-auto"
      >
        <div className="w-20 h-20 rounded-3xl bg-[#E8DCC8]/50 border-2 border-[#E8DCC8] flex items-center justify-center mx-auto text-[#706B62] shadow-xs">
          <Clock className="w-10 h-10 text-[#1F2A44] opacity-70" />
        </div>
        <div>
          <h2 className="text-xl font-black text-[#1F2A44] font-heading">
            No Active Session Running
          </h2>
          <p className="text-xs text-[#706B62] max-w-xs mx-auto mt-1 font-medium">
            Start an attendance session for your course to project the live rotating QR code to your classroom screen.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartNewSession}
          className="px-6 py-3.5 rounded-2xl bg-[#1F2A44] text-[#FAF8F3] font-heading font-extrabold text-xs inline-flex items-center gap-2 shadow-md shadow-[#1F2A44]/20 hover:bg-[#2b3a5c] cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#C6A75E]" />
          <span>Launch Classroom Session</span>
        </motion.button>
      </motion.div>
    );
  }

  const presentCount = activeSession.attendees.filter((a) => a.status === 'present').length;
  const lateCount = activeSession.attendees.filter((a) => a.status === 'late').length;
  const totalCheckedIn = presentCount + lateCount;
  const attendancePercent = Math.round((totalCheckedIn / activeSession.totalEnrolled) * 100);

  // 30s countdown circle math
  const ringRadius = 14;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (ringCircumference * qrCountdown) / 30;

  const handleConfirmEnd = () => {
    setConfirmEndOpen(false);
    endActiveSession();
    onSessionEnded();
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 relative">
      {/* Session Hero Header in Navy */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-[#1F2A44] text-[#FAF8F3] p-5 shadow-xs border border-[#1F2A44] relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F8A67] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4F8A67]" />
            </span>
            <span className="text-xs font-bold text-[#C6A75E] uppercase tracking-wider flex items-center gap-1 font-mono">
              <Radio className="w-3.5 h-3.5" />
              <span>Broadcasting Live</span>
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setConfirmEndOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-[#B95757] hover:bg-[#a54a4a] text-white text-[11px] font-bold font-heading flex items-center gap-1.5 shadow-xs cursor-pointer border border-white/20 transition-colors"
          >
            <Square className="w-3 h-3 fill-current" />
            <span>End Session</span>
          </motion.button>
        </div>

        <h1 className="text-xl font-extrabold font-heading leading-tight text-[#FAF8F3] relative z-10">
          {activeSession.courseCode} · {activeSession.courseName}
        </h1>

        <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs text-[#FAF8F3]/90 relative z-10">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C6A75E]" />
            <span>{activeSession.room}</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold">
            <Clock className="w-3.5 h-3.5 text-[#C6A75E]" />
            <span>Cutoff: {activeSession.closingTime}</span>
          </div>
        </div>
      </motion.div>

      {/* Lecturer Live Session Lottie & Screen Broadcast Visual */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-2xl overflow-hidden border border-[#E8DCC8] bg-[#E8DCC8]/30 p-3 shadow-xs flex items-center justify-between gap-3"
      >
        <div className="w-20 h-20 shrink-0">
          <LottiePlayer animationData={lecturerSessionAnim} />
        </div>
        <div className="flex-1 space-y-0.5">
          <span className="text-[10px] font-extrabold text-[#1F2A44] uppercase tracking-wider block">
            Console Broadcast Active
          </span>
          <p className="text-xs font-extrabold font-heading text-[#1F2A44]">
            Hall B3 Auditorium Screen
          </p>
          <p className="text-[11px] text-[#706B62] font-medium">
            30-second rotating cryptographic QR protocol
          </p>
        </div>
      </motion.div>

      {/* Dynamic Rolling QR Code Display with Circular Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl bg-white border border-[#E8DCC8] p-5 shadow-xs text-center space-y-3 relative overflow-hidden"
      >
        {/* Anti-Proxy Refresh Banner with Smooth Circular Countdown Timer */}
        <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E8DCC8] text-xs">
          <div className="flex items-center gap-2.5 text-left">
            <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
              <svg className="w-9 h-9 transform -rotate-90">
                <circle cx="18" cy="18" r={ringRadius} stroke="#E8DCC8" strokeWidth="3" fill="transparent" />
                <motion.circle
                  cx="18"
                  cy="18"
                  r={ringRadius}
                  stroke="#1F2A44"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={ringCircumference}
                  animate={{ strokeDashoffset: ringOffset }}
                  transition={{ duration: 1, ease: 'linear' }}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[11px] font-bold text-[#1F2A44] font-mono tabular-nums">
                {qrCountdown}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#1F2A44] font-heading leading-tight">
                30-Second Rolling QR Cycle
              </p>
              <p className="text-[10px] text-[#706B62] font-medium">
                Refreshes token dynamically to prevent proxies
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-[#1F2A44] bg-[#E8DCC8]/60 px-2.5 py-1 rounded-full">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C6A75E]" style={{ animationDuration: '3s' }} />
            <span>Active</span>
          </div>
        </div>

        {/* Large Crisp QR Matrix */}
        <div className="flex justify-center py-1">
          <QrCodeGraphic value={currentQrCodeToken} size={185} glow />
        </div>

        <p className="text-xs text-[#706B62] max-w-xs mx-auto font-medium">
          Have students open the <strong>Smart Attendance</strong> mobile app and tap <strong>Scan QR</strong>.
        </p>

        {/* Quick Simulator Button for Lecturer */}
        <div className="pt-1">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={addSimulatedAttendee}
            className="w-full py-2.5 rounded-xl bg-[#1F2A44] hover:bg-[#2b3a5c] text-[#FAF8F3] text-xs font-bold font-heading flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
          >
            <UserPlus className="w-4 h-4 text-[#C6A75E]" />
            <span>Simulate Incoming Student Check-in</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Live Check-in Metrics with Animated Numbers */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-2.5 text-center"
      >
        <div className="p-3.5 rounded-2xl bg-white border border-[#E8DCC8] shadow-xs">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1F2A44] font-heading">
            <AnimatedCounter value={totalCheckedIn} />
            <span className="text-xs text-[#706B62] font-normal"> / {activeSession.totalEnrolled}</span>
          </div>
          <p className="text-[10px] font-bold text-[#706B62] uppercase mt-0.5">Checked In</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#4F8A67]/10 border border-[#4F8A67]/25 shadow-xs">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#4F8A67] font-heading">
            <AnimatedCounter value={presentCount} />
          </div>
          <p className="text-[10px] font-bold text-[#4F8A67] uppercase mt-0.5">Present</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#C28B3C]/10 border border-[#C28B3C]/25 shadow-xs">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#C28B3C] font-heading">
            <AnimatedCounter value={lateCount} />
          </div>
          <p className="text-[10px] font-bold text-[#C28B3C] uppercase mt-0.5">Late Arrival</p>
        </div>
      </motion.div>

      {/* Live Attendees Stream */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#1F2A44] font-heading uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#C6A75E]" />
            <span>Live Attendees Stream</span>
          </h3>
          <span className="text-[11px] font-mono text-[#706B62]">
            {activeSession.attendees.length} Verified
          </span>
        </div>

        <div className="space-y-1.5">
          {activeSession.attendees.slice(0, 6).map((att) => (
            <motion.div
              key={att.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 rounded-xl bg-white border border-[#E8DCC8] flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E8DCC8]/60 flex items-center justify-center font-bold text-xs text-[#1F2A44]">
                  {att.studentName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1F2A44] font-heading leading-tight">
                    {att.studentName}
                  </p>
                  <p className="text-[10px] text-[#706B62] font-mono">{att.studentId}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#706B62]">{att.checkInTime}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    att.status === 'present'
                      ? 'bg-[#4F8A67]/15 text-[#4F8A67]'
                      : 'bg-[#C28B3C]/15 text-[#C28B3C]'
                  }`}
                >
                  {att.status === 'present' ? 'Present' : 'Late'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {confirmEndOpen && (
        <SessionEndConfirmationModal
          onCancel={() => setConfirmEndOpen(false)}
          onConfirm={handleConfirmEnd}
        />
      )}
    </div>
  );
};
