import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, CheckCircle2, Sparkles, RefreshCw, Smartphone, Image as ImageIcon } from 'lucide-react';
import { ASSETS } from '../../data/mockData';

interface AnimatedTakingAttendanceProps {
  className?: string;
  showToggle?: boolean;
}

export const AnimatedTakingAttendance: React.FC<AnimatedTakingAttendanceProps> = ({
  className = '',
  showToggle = true,
}) => {
  const [viewMode, setViewMode] = useState<'animated' | 'render'>('animated');
  const [scanState, setScanState] = useState<'scanning' | 'confirmed'>('scanning');
  const [attendeeCount, setAttendeeCount] = useState<number>(38);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(28);

  // 30s rolling QR counter simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Periodic automatic successful check-in burst simulation
  const triggerScanSuccess = () => {
    setScanState('confirmed');
    setAttendeeCount((c) => c + 1);
    setTimeout(() => {
      setScanState('scanning');
    }, 3200);
  };

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-end overflow-hidden ${className}`}>
      {/* Background Lecture Hall Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1F2A44]/15 via-[#E8DCC8]/50 to-[#E9DED0]/80 overflow-hidden pointer-events-none">
        {/* Soft background lecture hall tiers */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#1F2A44]/10 to-transparent" />
      </div>

      {viewMode === 'animated' ? (
        <div className="relative z-10 w-full h-[330px] flex flex-col items-center justify-between px-3 pt-3 pb-1 select-none">
          {/* Top Lecturer Projected Screen with Rotating QR Code */}
          <div className="relative w-full max-w-[310px] rounded-2xl bg-[#1E2522] border-2 border-[#1F2A44] p-3 text-white shadow-lg overflow-hidden">
            {/* Screen Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px]">
              <div className="flex items-center gap-1.5 font-bold font-heading text-white">
                <span className="w-2 h-2 rounded-full bg-[#4F8A67] animate-ping" />
                <span>CS 301 · Software Engineering</span>
              </div>
              <div className="flex items-center gap-1 text-[#C6A75E] font-mono font-semibold">
                <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                <span>{secondsRemaining}s</span>
              </div>
            </div>

            {/* Projected QR & Live Laser Scan Beam */}
            <div className="relative mt-2.5 flex items-center justify-between gap-3">
              {/* Animated Glowing QR Code Box */}
              <div className="relative w-24 h-24 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md overflow-hidden shrink-0">
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#302D32]">
                  {/* Outer corner finders */}
                  <rect x="5" y="5" width="28" height="28" fill="#1F2A44" rx="3" />
                  <rect x="9" y="9" width="20" height="20" fill="#FFFFFF" />
                  <rect x="13" y="13" width="12" height="12" fill="#1F2A44" />

                  <rect x="67" y="5" width="28" height="28" fill="#1F2A44" rx="3" />
                  <rect x="71" y="9" width="20" height="20" fill="#FFFFFF" />
                  <rect x="75" y="13" width="12" height="12" fill="#1F2A44" />

                  <rect x="5" y="67" width="28" height="28" fill="#1F2A44" rx="3" />
                  <rect x="9" y="71" width="20" height="20" fill="#FFFFFF" />
                  <rect x="13" y="75" width="12" height="12" fill="#1F2A44" />

                  {/* QR Matrix blocks */}
                  <rect x="40" y="8" width="8" height="8" fill="#302D32" />
                  <rect x="52" y="8" width="8" height="8" fill="#302D32" />
                  <rect x="40" y="24" width="8" height="8" fill="#302D32" />
                  <rect x="44" y="44" width="12" height="12" fill="#1F2A44" />
                  <rect x="12" y="44" width="8" height="8" fill="#302D32" />
                  <rect x="24" y="48" width="8" height="8" fill="#302D32" />
                  <rect x="70" y="44" width="10" height="8" fill="#302D32" />
                  <rect x="84" y="52" width="8" height="8" fill="#302D32" />
                  <rect x="40" y="68" width="8" height="8" fill="#302D32" />
                  <rect x="56" y="76" width="10" height="10" fill="#302D32" />
                  <rect x="72" y="72" width="16" height="8" fill="#302D32" />
                </svg>

                {/* Animated Green Laser Scan Beam Sweeping Up and Down */}
                <motion.div
                  animate={{ y: [-4, 88, -4] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#4F8A67] to-transparent shadow-[0_0_8px_#4F8A67]"
                >
                  <div className="absolute inset-x-4 -top-1 h-3 bg-[#4F8A67]/25 blur-xs" />
                </motion.div>
              </div>

              {/* Live Session Telemetry Panel */}
              <div className="flex-1 space-y-1.5 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-white/70">Verified Roster</span>
                  <span className="text-xs font-extrabold text-[#C6A75E] font-mono">
                    {attendeeCount} / 52
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#4F8A67] to-[#C6A75E] rounded-full"
                    animate={{ width: `${(attendeeCount / 52) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="text-[9px] text-white/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4F8A67]" />
                  <span>Geo-fenced to Lecture Hall B3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Student Raising Smartphone in Hand (Anime / 3D Cartoon Perspective) */}
          <div className="relative w-full max-w-[290px] flex flex-col items-center">
            {/* Animated Laser Light Rays Projecting Between Phone and Screen */}
            <motion.div
              animate={{ opacity: [0.35, 0.75, 0.35] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-48 h-8 -mb-3 bg-gradient-to-t from-[#4F8A67]/30 to-transparent blur-sm pointer-events-none"
            />

            {/* Student's Smartphone with Live Viewfinder */}
            <motion.div
              animate={{
                y: [0, -3, 0],
                rotate: [-0.5, 0.5, -0.5],
              }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="relative w-52 rounded-2xl bg-[#302D32] border-4 border-[#1F2A44] p-2 text-white shadow-2xl overflow-hidden"
            >
              {/* Phone Top Notch */}
              <div className="w-16 h-2 rounded-full bg-black/60 mx-auto mb-1.5" />

              {/* Camera Screen Reticle */}
              <div className="relative h-20 rounded-xl bg-black/80 flex flex-col items-center justify-center border border-white/20 p-2 overflow-hidden">
                <AnimatePresence mode="wait">
                  {scanState === 'scanning' ? (
                    <motion.div
                      key="scanning-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center space-y-1"
                    >
                      {/* Viewfinder corner brackets */}
                      <div className="relative w-16 h-12 border border-[#4F8A67]/60 rounded-xs flex items-center justify-center">
                        <QrCode className="w-6 h-6 text-[#4F8A67] opacity-80" />
                        <motion.div
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                          className="absolute inset-0 border border-[#C6A75E]/80 rounded-xs"
                        />
                      </div>
                      <span className="text-[9px] font-bold text-[#C6A75E] uppercase tracking-wider">
                        Align QR Code
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="confirmed-state"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center bg-[#4F8A67]/30 inset-0 absolute"
                    >
                      <CheckCircle2 className="w-7 h-7 text-[#4F8A67] drop-shadow-md animate-bounce" />
                      <span className="text-[10px] font-extrabold text-white font-heading mt-0.5">
                        Verified Present!
                      </span>
                      <span className="text-[8px] text-white/80">
                        10:02 AM · Gabriella Ucyeye
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Student Thumb Holding Phone Base */}
              <div className="absolute -bottom-2 -right-1 w-10 h-10 rounded-full bg-[#8C5338] border-2 border-[#693721] shadow-md z-20 pointer-events-none" />
              <div className="absolute -bottom-2 -left-1 w-10 h-10 rounded-full bg-[#8C5338] border-2 border-[#693721] shadow-md z-20 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      ) : (
        /* High-Detail 3D Cartoon Render Mode */
        <div className="relative z-10 w-full h-[330px] flex items-end justify-center overflow-hidden rounded-2xl">
          <img
            src={ASSETS.cartoonQrScan}
            alt="3D cartoon student taking attendance in university lecture hall"
            className="w-full h-full object-cover object-center select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
            <span className="text-xs font-bold font-heading">3D Lecture Hall Scene</span>
            <span className="text-[10px] font-semibold bg-[#4F8A67]/80 px-2 py-0.5 rounded-full backdrop-blur-xs">
              Instant Geo-QR Check-In
            </span>
          </div>
        </div>
      )}

      {/* Control Strip */}
      {showToggle && (
        <div className="relative z-20 w-full px-4 pt-2 pb-1 flex items-center justify-between bg-white/80 border-t border-[#E9DED0]/60 backdrop-blur-xs">
          <button
            onClick={triggerScanSuccess}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#4F8A67] hover:bg-[#1f6f4d] active:scale-95 text-[10px] font-extrabold text-white transition-all cursor-pointer shadow-xs"
          >
            <Smartphone className="w-3 h-3 text-[#C6A75E]" />
            <span>Simulate Check-In</span>
          </button>

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
                <span>View Live Scanner</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
