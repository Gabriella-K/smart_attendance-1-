import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, MapPin, User, ArrowRight, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AttendanceRecord } from '../../types/attendance';
import { LottiePlayer } from '../common/LottiePlayer';
import checkinSuccessAnim from '../../assets/animations/checkin_success.json';

interface CheckInConfirmationModalProps {
  record: AttendanceRecord;
  onClose: () => void;
  onViewCourse?: () => void;
}

export const CheckInConfirmationModal: React.FC<CheckInConfirmationModalProps> = ({
  record,
  onClose,
  onViewCourse,
}) => {
  useEffect(() => {
    // Multi-stage celebratory confetti explosion with Navy & Gold theme
    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#C6A75E', '#1F2A44', '#4F8A67', '#E8DCC8', '#FAF8F3'],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 55,
          origin: { x: 0.15, y: 0.65 },
          colors: ['#C6A75E', '#1F2A44'],
        });
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 55,
          origin: { x: 0.85, y: 0.65 },
          colors: ['#C6A75E', '#4F8A67'],
        });
      }, 250);

      return () => clearTimeout(timer);
    } catch {
      // safe fallback
    }
  }, []);

  const isLate = record.status === 'late';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#1F2A44]/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto no-scrollbar"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        className="w-full max-w-sm rounded-[32px] bg-[#FAF8F3] border-2 border-[#E8DCC8] p-6 shadow-2xl space-y-4 text-center relative overflow-hidden"
      >
        {/* Decorative Top Accent Arch */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#E8DCC8]/40 via-transparent to-transparent pointer-events-none" />

        {/* Celebratory Lottie Checkin Animation Container */}
        <div className="relative mx-auto w-36 h-36 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gradient-to-br from-[#1F2A44] to-[#2C3B5E] flex items-center justify-center">
          <LottiePlayer
            animationData={checkinSuccessAnim}
            className="w-full h-full p-2"
          />
        </div>

        {/* Text Heading with Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4F8A67]/15 border border-[#4F8A67]/35 text-[#4F8A67] text-xs font-black mb-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A75E]" />
            <span>Attendance Verified & Recorded</span>
          </div>
          <h2 className="text-2xl font-black text-[#1F2A44] font-heading tracking-tight">
            You're checked in!
          </h2>
          <p className="text-xs text-[#706B62] font-medium mt-0.5">
            Synchronized with university lecture registry.
          </p>
        </motion.div>

        {/* Course Details Card with Navy/Gold Accents */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white border border-[#E8DCC8] p-4 text-left space-y-2.5 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-[#C6A75E] font-heading bg-[#1F2A44] px-2.5 py-0.5 rounded-lg">
              {record.courseCode}
            </span>
            <span
              className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                isLate
                  ? 'bg-[#C28B3C]/20 text-[#C28B3C] border border-[#C28B3C]/40'
                  : 'bg-[#4F8A67]/20 text-[#4F8A67] border border-[#4F8A67]/40'
              }`}
            >
              {isLate ? 'Late Arrival' : 'Present (On Time)'}
            </span>
          </div>

          <h3 className="text-sm font-extrabold text-[#1F2A44] leading-snug">
            {record.courseName}
          </h3>

          <div className="pt-2 border-t border-[#E8DCC8]/60 space-y-1.5 text-xs text-[#706B62]">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#1F2A44]" />
              <span className="text-[#252733] font-semibold">{record.lecturer}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#C6A75E]" />
              <span>Timestamp: <strong className="text-[#252733]">{record.time}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C6A75E]" />
              <span>{record.room}</span>
            </div>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2 pt-1"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="w-full h-12 rounded-2xl bg-[#1F2A44] hover:bg-[#2C3B5E] text-white font-heading font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#1F2A44]/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Done</span>
          </motion.button>

          {onViewCourse && (
            <button
              onClick={() => {
                onClose();
                onViewCourse();
              }}
              className="w-full h-9 rounded-xl bg-transparent text-xs font-bold text-[#1F2A44] hover:bg-[#E8DCC8]/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Course Attendance</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C6A75E]" />
            </button>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
