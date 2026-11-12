import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, AlertTriangle, TrendingUp, Sliders, ArrowLeft } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { AnimatedCounter } from '../common/AnimatedCounter';

interface AttendanceProgressViewProps {
  onBack?: () => void;
}

export const AttendanceProgressView: React.FC<AttendanceProgressViewProps> = ({ onBack }) => {
  const { overallAttendanceRate, totalClassesAttended, totalClassesMissed, totalClassesLate } = useAttendance();

  // Test slider to allow testing both >=75% and <75% states directly in the prototype
  const [overrideRate, setOverrideRate] = useState<number | null>(null);

  const displayRate = overrideRate !== null ? overrideRate : overallAttendanceRate;
  const isGoodStanding = displayRate >= 75;

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 relative">
      {/* Header */}
      <div className="flex items-center gap-2 relative z-10">
        {onBack && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white border border-[#E8DCC8] flex items-center justify-center text-[#1F2A44] hover:bg-[#E8DCC8]/40 cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
        )}
        <div>
          <h1 className="text-xl font-extrabold text-[#1F2A44] font-heading">
            Attendance Progress
          </h1>
          <p className="text-xs text-[#706B62] font-medium">
            Semester milestones and examination eligibility matrix.
          </p>
        </div>
      </div>

      {/* Large Animated Ring Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl bg-white border border-[#E8DCC8] p-6 shadow-2xs flex flex-col items-center justify-center text-center relative overflow-hidden"
      >
        {/* SVG Progress Ring */}
        <div className="relative w-44 h-44 my-2 flex items-center justify-center">
          <svg className="w-44 h-44 transform -rotate-90">
            {/* Background track */}
            <circle
              cx="88"
              cy="88"
              r={72}
              stroke="#E8DCC8"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Animated Progress Arc */}
            <motion.circle
              cx="88"
              cy="88"
              r={72}
              stroke={isGoodStanding ? '#1F2A44' : '#C28B3C'}
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 72}
              animate={{ strokeDashoffset: 2 * Math.PI * 72 - (2 * Math.PI * 72 * displayRate) / 100 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl sm:text-5xl font-black text-[#1F2A44] font-heading tabular-nums">
              {displayRate}%
            </span>
            <span className="text-xs font-bold text-[#706B62] mt-0.5">
              Cumulative Rate
            </span>
          </div>
        </div>

        {/* Status Message */}
        <div className="mt-3 max-w-xs space-y-1 w-full">
          {isGoodStanding ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-[#4F8A67]/15 border border-[#4F8A67]/30 text-[#4F8A67] space-y-1 shadow-2xs"
            >
              <div className="flex items-center justify-center gap-1.5 font-bold font-heading text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#4F8A67]" />
                <span>Good Standing Achieved</span>
              </div>
              <p className="text-[11px] text-[#4F8A67] font-semibold leading-tight">
                You have met the university 75% attendance criterion. Keep up this momentum for exam clearance!
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-[#C28B3C]/15 border border-[#C28B3C]/30 text-[#C28B3C] space-y-1 shadow-2xs"
            >
              <div className="flex items-center justify-center gap-1.5 font-bold font-heading text-xs">
                <AlertTriangle className="w-4 h-4 text-[#C28B3C]" />
                <span>Your attendance needs attention.</span>
              </div>
              <p className="text-[11px] text-[#252733]/85 font-medium leading-tight">
                Current rate is below the 75% examination threshold. Attend your upcoming lectures to recover.
              </p>
            </motion.div>
          )}
        </div>

        {/* Prototype interactive slider to test both states */}
        <div className="mt-5 pt-3 border-t border-[#E8DCC8] w-full max-w-xs">
          <div className="flex items-center justify-between text-[11px] text-[#706B62] mb-1 font-bold">
            <span className="flex items-center gap-1 text-[#1F2A44]">
              <Sliders className="w-3.5 h-3.5 text-[#C6A75E]" />
              <span>Simulate threshold:</span>
            </span>
            <span className="font-bold text-[#1F2A44] font-mono">{displayRate}%</span>
          </div>
          <input
            type="range"
            min="45"
            max="100"
            value={displayRate}
            onChange={(e) => setOverrideRate(Number(e.target.value))}
            className="w-full accent-[#1F2A44] cursor-pointer"
          />
        </div>
      </motion.div>

      {/* Metrics Breakdown */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-3.5 rounded-2xl bg-white border border-[#E8DCC8] shadow-2xs">
          <p className="text-xl font-black text-[#1F2A44] font-heading">
            <AnimatedCounter value={totalClassesAttended} />
          </p>
          <p className="text-[10px] font-bold text-[#706B62] uppercase mt-0.5">Attended</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E8DCC8] shadow-2xs">
          <p className="text-xl font-black text-[#C28B3C] font-heading">
            <AnimatedCounter value={totalClassesLate} />
          </p>
          <p className="text-[10px] font-bold text-[#706B62] uppercase mt-0.5">Late</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E8DCC8] shadow-2xs">
          <p className="text-xl font-black text-[#B95757] font-heading">
            <AnimatedCounter value={totalClassesMissed} />
          </p>
          <p className="text-[10px] font-bold text-[#706B62] uppercase mt-0.5">Missed</p>
        </div>
      </div>
    </div>
  );
};
