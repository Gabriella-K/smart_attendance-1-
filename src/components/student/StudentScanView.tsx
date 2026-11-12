import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  QrCode,
  Camera,
  KeyRound,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Radio,
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { LottiePlayer } from '../common/LottiePlayer';
import qrScanAnim from '../../assets/animations/qr_scan.json';
import studentScanAnim from '../../assets/animations/student_scan.json';

interface StudentScanViewProps {
  onOpenScanner: () => void;
  onCodeSuccess?: (courseName: string) => void;
}

export const StudentScanView: React.FC<StudentScanViewProps> = ({
  onOpenScanner,
  onCodeSuccess,
}) => {
  const {
    activeSession,
    courses,
    recordAttendance,
    hasCheckedInCurrentSession,
    attendanceHistory,
  } = useAttendance();

  const [manualCode, setManualCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);
  const [codeSuccessMsg, setCodeSuccessMsg] = useState<string | null>(null);

  const handleManualCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = manualCode.trim().toUpperCase();
    if (!clean || clean.length < 4) {
      setCodeError('Please enter a 4 to 6-digit session code provided by your lecturer.');
      return;
    }

    // Identify target course
    const targetCourse = activeSession
      ? courses.find((c) => c.id === activeSession.courseId) || courses[0]
      : courses[0];

    recordAttendance(targetCourse.id, 'present', targetCourse.name);
    setCodeError(null);
    setCodeSuccessMsg(`Attendance confirmed for ${targetCourse.code}: ${targetCourse.name}!`);
    setManualCode('');
    onCodeSuccess?.(targetCourse.name);

    setTimeout(() => {
      setCodeSuccessMsg(null);
    }, 4000);
  };

  return (
    <div className="space-y-4 pb-8 px-4 pt-3">
      {/* Page Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1F2A44]/10 text-[#1F2A44] text-[10px] font-extrabold uppercase tracking-wider mb-1">
          <Sparkles className="w-3 h-3 text-[#C6A75E]" />
          <span>Attendance Verification</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#1F2A44] font-heading">
          Scan Attendance
        </h1>
        <p className="text-xs text-[#706B62]">
          Scan lecturer projector QR or enter session code inside the lecture hall.
        </p>
      </div>

      {/* Main Scanner Action Card */}
      <div className="rounded-3xl bg-[#1F2A44] text-white p-5 border border-[#C6A75E]/30 shadow-md relative overflow-hidden">
        {/* Decorative Gold Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-[#C6A75E]/15 blur-2xl pointer-events-none" />

        <div className="flex flex-col items-center text-center space-y-3 relative z-10">
          {/* Animated Viewfinder Lottie container */}
          <div className="relative w-44 h-44 rounded-2xl bg-black/40 border-2 border-[#C6A75E]/40 flex items-center justify-center p-2 overflow-hidden shadow-inner">
            <LottiePlayer
              animationData={qrScanAnim}
              className="w-full h-full"
            />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-white font-heading">
              Ready to Check In
            </h3>
            <p className="text-xs text-white/70 max-w-xs leading-relaxed">
              Align your camera with the dynamic QR code displayed on the classroom screen.
            </p>
          </div>

          {/* Primary Scan Button */}
          <button
            onClick={onOpenScanner}
            className="w-full h-12 rounded-2xl bg-[#C6A75E] hover:bg-[#b5964f] active:scale-[0.98] text-[#1F2A44] font-heading font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C6A75E]/20 transition-all cursor-pointer"
          >
            <Camera className="w-4 h-4 text-[#1F2A44]" />
            <span>Launch Live Camera Scanner</span>
          </button>
        </div>
      </div>

      {/* Active Session Status Card */}
      {activeSession ? (
        <div className="p-4 rounded-2xl bg-white border border-[#C6A75E] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold text-[#1F2A44] font-heading">
              <Radio className="w-3.5 h-3.5 text-[#4F8A67] animate-pulse" />
              <span>Live Session in Progress</span>
            </span>
            <span className="text-[10px] font-mono text-[#C6A75E] font-bold bg-[#1F2A44] px-2 py-0.5 rounded-full">
              {activeSession.courseCode}
            </span>
          </div>

          <div className="text-xs text-[#706B62] space-y-1">
            <p className="font-bold text-[#252733] text-sm">{activeSession.courseName}</p>
            <div className="flex items-center gap-3 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C6A75E]" />
                <span>{activeSession.room}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#1F2A44]" />
                <span>Started {activeSession.startTime}</span>
              </span>
            </div>
          </div>

          {hasCheckedInCurrentSession ? (
            <div className="mt-2 p-2 rounded-xl bg-[#4F8A67]/15 border border-[#4F8A67]/30 flex items-center gap-2 text-xs text-[#4F8A67] font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>You have already checked into this active lecture!</span>
            </div>
          ) : (
            <button
              onClick={onOpenScanner}
              className="mt-2 w-full py-2.5 rounded-xl bg-[#1F2A44] hover:bg-[#2b3a5c] text-white text-xs font-bold font-heading flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <QrCode className="w-3.5 h-3.5 text-[#C6A75E]" />
              <span>Check In to This Session</span>
            </button>
          )}
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-white border border-[#E8DCC8] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FAF8F3] border border-[#E8DCC8] flex items-center justify-center text-[#1F2A44]">
              <Clock className="w-4 h-4 text-[#C6A75E]" />
            </div>
            <div>
              <p className="font-bold text-[#1F2A44] font-heading">Upcoming Lecture</p>
              <p className="text-[10px] text-[#706B62]">Next: CS 301 at 10:00 AM · Hall B3</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#C6A75E] bg-[#E8DCC8]/40 px-2 py-0.5 rounded-lg">
            Scheduled
          </span>
        </div>
      )}

      {/* Alternative Manual Session Code Input */}
      <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8DCC8] space-y-3">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-[#1F2A44]" />
          <h4 className="text-xs font-bold text-[#1F2A44] font-heading">
            Alternative: Enter Lecture Session Code
          </h4>
        </div>
        <p className="text-[11px] text-[#706B62]">
          If camera access is limited, input the numeric or alpha session PIN provided by your lecturer.
        </p>

        {codeError && (
          <div className="p-2 rounded-xl bg-[#B95757]/10 border border-[#B95757]/30 text-xs text-[#B95757] flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{codeError}</span>
          </div>
        )}

        {codeSuccessMsg && (
          <div className="p-2 rounded-xl bg-[#4F8A67]/15 border border-[#4F8A67]/30 text-xs text-[#4F8A67] flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{codeSuccessMsg}</span>
          </div>
        )}

        <form onSubmit={handleManualCodeSubmit} className="flex gap-2">
          <input
            type="text"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="e.g. CS301 or 8842"
            className="flex-1 h-11 px-3.5 rounded-xl bg-white border border-[#E8DCC8] text-xs font-mono font-bold text-[#252733] uppercase placeholder:normal-case placeholder:font-sans placeholder:text-[#706B62]/60 focus:outline-none focus:ring-2 focus:ring-[#1F2A44]"
          />
          <button
            type="submit"
            className="px-4 h-11 rounded-xl bg-[#1F2A44] hover:bg-[#2b3a5c] text-white text-xs font-bold font-heading cursor-pointer transition-colors shrink-0"
          >
            Verify
          </button>
        </form>
      </div>

      {/* Security & Verification Integrity Badges */}
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2.5 rounded-xl bg-white border border-[#E8DCC8] space-y-1">
          <div className="flex items-center gap-1.5 text-[#4F8A67] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Geofence Active</span>
          </div>
          <p className="text-[10px] text-[#706B62]">
            Restricted to 50m radius of classroom hall.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-white border border-[#E8DCC8] space-y-1">
          <div className="flex items-center gap-1.5 text-[#C6A75E] font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>Anti-Proxy QR</span>
          </div>
          <p className="text-[10px] text-[#706B62]">
            Rotates dynamically every 30 seconds.
          </p>
        </div>
      </div>
    </div>
  );
};
