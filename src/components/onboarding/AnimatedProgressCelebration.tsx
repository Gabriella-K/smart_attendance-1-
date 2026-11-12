import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Check, Sparkles, TrendingUp, Image as ImageIcon } from 'lucide-react';
import { ASSETS } from '../../data/mockData';

interface AnimatedProgressCelebrationProps {
  className?: string;
  showToggle?: boolean;
}

export const AnimatedProgressCelebration: React.FC<AnimatedProgressCelebrationProps> = ({
  className = '',
  showToggle = true,
}) => {
  const [viewMode, setViewMode] = useState<'animated' | 'render'>('animated');
  const [counter, setCounter] = useState<number>(0);

  // Animate counter from 0 to 86%
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= 86) {
        setCounter(86);
        clearInterval(interval);
      } else {
        setCounter(current);
      }
    }, 28);
    return () => clearInterval(interval);
  }, []);

  // Confetti particles
  const confettiParticles = [
    { x: -50, y: -80, color: '#C6A75E', delay: 0 },
    { x: 45, y: -90, color: '#4F8A67', delay: 0.2 },
    { x: -70, y: -40, color: '#C6A75E', delay: 0.4 },
    { x: 65, y: -50, color: '#1F2A44', delay: 0.1 },
    { x: -30, y: -110, color: '#1F2A44', delay: 0.3 },
    { x: 30, y: -105, color: '#C6A75E', delay: 0.5 },
  ];

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-end overflow-hidden ${className}`}>
      {/* Background Soft Aura */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1F2A44]/15 via-[#E8DCC8]/50 to-[#E9DED0]/80 overflow-hidden pointer-events-none">
        {/* Soft radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#1F2A44]/10 blur-2xl" />
      </div>

      {viewMode === 'animated' ? (
        <div className="relative z-10 w-full h-[330px] flex flex-col items-center justify-between px-3 pt-3 pb-1 select-none">
          {/* Confetti Sparkles Bursting */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {confettiParticles.map((p, idx) => (
              <motion.div
                key={idx}
                animate={{
                  y: [0, p.y, p.y - 10],
                  x: [0, p.x, p.x + (idx % 2 === 0 ? 5 : -5)],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.8],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  delay: p.delay,
                  ease: 'easeOut',
                }}
                className="absolute w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: p.color }}
              />
            ))}
          </div>

          {/* Central Glowing Circular Progress Ring */}
          <div className="relative flex flex-col items-center mt-2">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Outer SVG Progress Ring */}
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="#E9DED0"
                  strokeWidth="10"
                  fill="none"
                />
                <motion.circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="#1F2A44"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="364.4"
                  initial={{ strokeDashoffset: 364.4 }}
                  animate={{ strokeDashoffset: 364.4 - (364.4 * counter) / 100 }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                />
              </svg>

              {/* Inside Counter & Award */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="flex items-baseline"
                >
                  <span className="text-3xl font-black text-[#1F2A44] font-heading leading-none">
                    {counter}
                  </span>
                  <span className="text-base font-bold text-[#1F2A44] font-heading">%</span>
                </motion.div>
                <span className="text-[10px] font-extrabold text-[#4F8A67] uppercase tracking-wider mt-0.5">
                  Excellent Standing
                </span>
              </div>

              {/* Top Golden Star Badge */}
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#C6A75E] border-2 border-white shadow-md flex items-center justify-center text-[#1F2A44]">
                <Award className="w-4 h-4 fill-current text-[#1F2A44]" />
              </div>
            </div>
          </div>

          {/* Floating Course Progress Cards */}
          <div className="w-full max-w-[310px] space-y-1.5 mt-2">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="px-3 py-1.5 rounded-xl bg-white/95 border border-[#E9DED0] shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-[#1F2A44]/15 flex items-center justify-center text-[#1F2A44]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#1F2A44] font-heading">
                    CS 301 · Software Eng
                  </p>
                  <p className="text-[9px] text-[#77716D]">10 of 11 attended</p>
                </div>
              </div>
              <span className="text-xs font-black text-[#1F2A44] font-mono">91%</span>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="px-3 py-1.5 rounded-xl bg-white/95 border border-[#E9DED0] shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-[#4F8A67]/15 flex items-center justify-center text-[#4F8A67]">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#1F2A44] font-heading">
                    CS 304 · Database Systems
                  </p>
                  <p className="text-[9px] text-[#77716D]">11 of 13 attended</p>
                </div>
              </div>
              <span className="text-xs font-black text-[#4F8A67] font-mono">85%</span>
            </motion.div>
          </div>
        </div>
      ) : (
        /* High-Detail 3D Cartoon Render Mode */
        <div className="relative z-10 w-full h-[330px] flex items-end justify-center overflow-hidden rounded-2xl">
          <img
            src={ASSETS.cartoonProgress}
            alt="3D cartoon student celebrating high attendance grades"
            className="w-full h-full object-cover object-center select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
            <span className="text-xs font-bold font-heading">3D Library Celebration</span>
            <span className="text-[10px] font-semibold bg-[#C6A75E] text-[#302D32] px-2 py-0.5 rounded-full font-bold">
              86% Overall Attendance
            </span>
          </div>
        </div>
      )}

      {/* Control Strip */}
      {showToggle && (
        <div className="relative z-20 w-full px-4 pt-2 pb-1 flex items-center justify-between bg-white/80 border-t border-[#E9DED0]/60 backdrop-blur-xs">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#4F8A67]">
            <Sparkles className="w-3 h-3 text-[#C6A75E]" />
            <span>Eligible for Final Exams</span>
          </div>

          <button
            onClick={() => setViewMode(viewMode === 'animated' ? 'render' : 'animated')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1F2A44]/10 hover:bg-[#1F2A44]/20 text-[10px] font-extrabold text-[#1F2A44] transition-colors cursor-pointer"
          >
            {viewMode === 'animated' ? (
              <>
                <ImageIcon className="w-3 h-3" />
                <span>View 3D Render</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-[#C6A75E]" />
                <span>View Live Score</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
