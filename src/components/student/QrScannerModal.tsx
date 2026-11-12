import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Zap,
  ZapOff,
  AlertTriangle,
  RefreshCw,
  MapPin,
  Check,
  ShieldAlert,
  Info,
  Radio,
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { AttendanceRecord } from '../../types/attendance';
import { QrCodeGraphic } from '../common/QrCodeGraphic';
import { LottiePlayer } from '../common/LottiePlayer';
import checkinSuccessAnim from '../../assets/animations/checkin_success.json';
import qrScanAnim from '../../assets/animations/qr_scan.json';

interface QrScannerModalProps {
  onClose: () => void;
  onSuccess: (record: AttendanceRecord) => void;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({ onClose, onSuccess }) => {
  const { simulateCheckIn, activeSession, currentQrCodeToken, qrCountdown } = useAttendance();

  const [flashlightOn, setFlashlightOn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showSuccessLottie, setShowSuccessLottie] = useState(false);

  const handleTestScenario = (scenario: 'valid' | 'expired' | 'duplicate' | 'out_of_range') => {
    setIsScanning(true);
    setErrorMessage(null);
    setErrorType(null);

    setTimeout(() => {
      setIsScanning(false);
      const result = simulateCheckIn(scenario);

      if (result.success && result.record) {
        setShowSuccessLottie(true);
        // After showing the Lottie celebration, transition smoothly
        setTimeout(() => {
          onSuccess(result.record!);
        }, 1800);
      } else {
        setErrorMessage(result.message);
        setErrorType(result.errorType || 'error');
      }
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#1F2A44] flex flex-col justify-between text-[#FAF8F3] overflow-hidden"
    >
      {/* Dark Navy scanner background with subtle radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F2A44] via-[#141C2E] to-[#0D1322] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#C6A75E]/10 blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="pt-6 px-6 pb-3 flex items-center justify-between z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-[#FAF8F3] transition-colors cursor-pointer border border-white/15 shadow-sm"
        >
          <X className="w-5 h-5" />
        </motion.button>

        <div className="flex flex-col items-center">
          <span className="font-heading font-extrabold text-sm tracking-wide text-[#FAF8F3] flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-[#C6A75E] animate-pulse" />
            <span>Classroom Scanner</span>
          </span>
          <span className="text-[11px] font-semibold text-[#C6A75E]">
            {activeSession ? `${activeSession.courseCode} · ${activeSession.room}` : 'Live Attendance Check-In'}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFlashlightOn(!flashlightOn)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
            flashlightOn
              ? 'bg-[#C6A75E] text-[#1F2A44] border-[#C6A75E] shadow-[0_0_16px_#C6A75E]'
              : 'bg-white/10 hover:bg-white/20 text-[#FAF8F3] border-white/15'
          }`}
          title="Toggle Flashlight"
        >
          {flashlightOn ? <Zap className="w-5 h-5 fill-current" /> : <ZapOff className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Main Viewfinder Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Flashlight beam simulation */}
        {flashlightOn && (
          <div className="absolute inset-0 bg-radial from-amber-100/25 via-amber-200/5 to-transparent pointer-events-none" />
        )}

        {/* Success Lottie Overlay */}
        <AnimatePresence>
          {showSuccessLottie && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute z-40 inset-0 flex flex-col items-center justify-center bg-[#1F2A44]/95 p-6 backdrop-blur-md"
            >
              <div className="w-48 h-48">
                <LottiePlayer animationData={checkinSuccessAnim} loop={false} />
              </div>
              <motion.h3
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-black font-heading text-[#FAF8F3] mt-2 text-center"
              >
                You're checked in!
              </motion.h3>
              <p className="text-xs text-[#C6A75E] font-medium mt-1">
                Verified Present · Recorded in Registry
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Viewfinder Frame with Animated Gold Scanning Beam & Corners */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-2 border-[#E8DCC8]/30 bg-[#0E1524]/80 backdrop-blur-md flex items-center justify-center shadow-2xl">
          {/* Animated Gold Scanning Beam */}
          <div className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-[#C6A75E] to-transparent animate-scan-beam shadow-[0_0_12px_#C6A75E] z-20 pointer-events-none" />

          {/* Animated Corner Brackets */}
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-3 left-3 w-7 h-7 border-t-3 border-l-3 border-[#C6A75E] rounded-tl-lg shadow-[0_0_8px_#C6A75E]" />
            <div className="absolute top-3 right-3 w-7 h-7 border-t-3 border-r-3 border-[#C6A75E] rounded-tr-lg shadow-[0_0_8px_#C6A75E]" />
            <div className="absolute bottom-3 left-3 w-7 h-7 border-b-3 border-l-3 border-[#C6A75E] rounded-bl-lg shadow-[0_0_8px_#C6A75E]" />
            <div className="absolute bottom-3 right-3 w-7 h-7 border-b-3 border-r-3 border-[#C6A75E] rounded-br-lg shadow-[0_0_8px_#C6A75E]" />
          </motion.div>

          {/* Live QR Target in View */}
          <div className="transform scale-80 transition-transform">
            <QrCodeGraphic
              value={currentQrCodeToken}
              size={170}
              glow
            />
          </div>

          {/* Scanning indicator */}
          {isScanning && (
            <div className="absolute inset-0 bg-[#1F2A44]/90 flex flex-col items-center justify-center gap-2 z-30">
              <RefreshCw className="w-8 h-8 text-[#C6A75E] animate-spin" />
              <p className="text-xs font-bold font-heading text-[#FAF8F3]">Validating Geo-QR Key...</p>
            </div>
          )}
        </div>

        {/* Clear Instruction */}
        <div className="mt-5 text-center space-y-1">
          <p className="text-xs text-[#FAF8F3]/90 font-bold font-heading">
            Align QR code within the frame.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono text-[#FAF8F3]/80">
            <span>Rotating in</span>
            <span className="text-[#C6A75E] font-bold">{qrCountdown}s</span>
          </div>
        </div>

        {/* Error message banner */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 mx-4 p-3.5 rounded-2xl bg-[#B95757] border border-white/20 text-[#FAF8F3] text-xs space-y-1 max-w-xs shadow-xl"
            >
              <div className="flex items-center gap-2 font-bold font-heading">
                <ShieldAlert className="w-4 h-4 text-[#C6A75E] shrink-0" />
                <span>
                  {errorType === 'expired' && 'QR Expired'}
                  {errorType === 'duplicate' && 'Duplicate Check-In'}
                  {errorType === 'out_of_range' && 'Geo-Fence Boundary Alert'}
                  {!['expired', 'duplicate', 'out_of_range'].includes(errorType || '') && 'Verification Notice'}
                </span>
              </div>
              <p className="text-[11px] text-[#FAF8F3]/90 leading-relaxed">{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Simulation Drawer / Bottom Controls in Navy */}
      <motion.div
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        className="p-5 bg-[#141C2E] border-t border-white/10 rounded-t-3xl z-20 space-y-3 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#C6A75E]" />
            <span className="text-[11px] font-extrabold text-[#FAF8F3] font-heading uppercase tracking-wide">
              Simulated Test Scenarios
            </span>
          </div>
          <span className="text-[10px] text-[#706B62] font-semibold">Evaluation Mode</span>
        </div>

        {/* 4 Interactive Test Scenario Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTestScenario('valid')}
            className="p-2.5 rounded-xl bg-[#4F8A67] hover:bg-[#437557] active:scale-[0.98] text-white text-left transition-all cursor-pointer flex items-center gap-2 border border-white/10 shadow-xs"
          >
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-[#C6A75E]" />
            </div>
            <div>
              <p className="text-xs font-black leading-tight font-heading">Valid QR</p>
              <p className="text-[10px] text-white/80">Check-in success</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTestScenario('expired')}
            className="p-2.5 rounded-xl bg-[#1F2A44] hover:bg-[#283654] active:scale-[0.98] text-[#FAF8F3] text-left transition-all cursor-pointer flex items-center gap-2 border border-white/15 shadow-xs"
          >
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 text-[#C6A75E]" />
            </div>
            <div>
              <p className="text-xs font-black leading-tight font-heading">Expired QR</p>
              <p className="text-[10px] text-[#FAF8F3]/70">30s cycle expired</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTestScenario('duplicate')}
            className="p-2.5 rounded-xl bg-[#C28B3C] hover:bg-[#b07d34] active:scale-[0.98] text-white text-left transition-all cursor-pointer flex items-center gap-2 border border-white/10 shadow-xs"
          >
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-[#FAF8F3]" />
            </div>
            <div>
              <p className="text-xs font-black leading-tight font-heading">Duplicate</p>
              <p className="text-[10px] text-white/80">Already recorded</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTestScenario('out_of_range')}
            className="p-2.5 rounded-xl bg-[#2b1f24] hover:bg-[#36262d] active:scale-[0.98] text-white text-left transition-all cursor-pointer flex items-center gap-2 border border-white/10 shadow-xs"
          >
            <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#B95757]" />
            </div>
            <div>
              <p className="text-xs font-black leading-tight font-heading">Off Campus</p>
              <p className="text-[10px] text-white/80">Outside Hall B3</p>
            </div>
          </motion.button>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-[#FAF8F3] transition-colors cursor-pointer border border-white/15"
        >
          Cancel Scan
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
