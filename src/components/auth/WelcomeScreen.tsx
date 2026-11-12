import React from 'react';
import { ArrowRight, GraduationCap, ShieldCheck, PlayCircle, Sparkles, QrCode } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { LottiePlayer } from '../common/LottiePlayer';
import studentWalkingAnim from '../../assets/animations/student_walking.json';
import { ASSETS } from '../../data/mockData';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onReplayOnboarding?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted,
  onSignIn,
  onReplayOnboarding,
}) => {
  const { login, replayOnboarding } = useAttendance();

  const handleReplay = () => {
    if (onReplayOnboarding) {
      onReplayOnboarding();
    } else {
      replayOnboarding();
    }
  };

  return (
    <div className="relative flex flex-col min-h-full bg-[#FAF8F3] text-[#252733] overflow-hidden select-none">
      {/* Top University Brand Bar */}
      <div className="relative z-20 pt-4 px-5 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#1F2A44] flex items-center justify-center text-[#C6A75E] shadow-sm">
            <GraduationCap className="w-5 h-5 text-[#C6A75E]" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-base text-[#1F2A44] tracking-tight block leading-tight">
              Smart Attendance
            </span>
            <span className="text-[11px] font-medium text-[#706B62]">
              University Registry System
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F2A44]/10 border border-[#1F2A44]/20 text-[11px] font-bold text-[#1F2A44]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4F8A67]" />
          <span>Geo-Verified</span>
        </div>
      </div>

      {/* Arched Illustration Header in Warm Beige & Navy */}
      <div className="relative z-10 mx-3 mt-1 rounded-t-[36px] rounded-b-[24px] overflow-hidden bg-gradient-to-b from-[#E8DCC8] via-[#FAF8F3] to-[#E8DCC8] border-2 border-[#E8DCC8] shadow-xs">
        {/* Navy & Gold header accent line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1F2A44] via-[#C6A75E] to-[#1F2A44]" />

        <div className="relative w-full h-[290px] flex items-center justify-center overflow-hidden">
          {/* Lottie Student Walking Scene */}
          <div className="w-full h-full max-w-[270px] flex items-center justify-center">
            <LottiePlayer
              animationData={studentWalkingAnim}
              className="w-full h-full"
            />
          </div>

          {/* 30s Rolling QR Protocol Badge */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="px-3 py-1 rounded-full bg-[#FAF8F3]/95 border border-[#E8DCC8] text-[10px] font-bold text-[#1F2A44] shadow-xs backdrop-blur-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4F8A67] animate-pulse" />
              <span>30-Second Rolling QR</span>
            </div>

            <div className="px-2.5 py-1 rounded-full bg-[#C6A75E] text-[#1F2A44] text-[10px] font-extrabold shadow-xs">
              Academic Year 2026
            </div>
          </div>

          {/* Replay Onboarding Floating Button */}
          <button
            onClick={handleReplay}
            className="absolute bottom-3 right-3 z-30 px-3 py-1.5 rounded-full bg-[#1F2A44]/90 hover:bg-[#1F2A44] active:scale-95 text-[#FAF8F3] text-[11px] font-extrabold flex items-center gap-1.5 shadow-sm backdrop-blur-xs cursor-pointer border border-[#C6A75E]/30 transition-all"
          >
            <PlayCircle className="w-3.5 h-3.5 text-[#C6A75E]" />
            <span>Watch Intro</span>
          </button>
        </div>
      </div>

      {/* Clean Bottom Card Area */}
      <div className="flex-1 px-6 pt-3 pb-5 flex flex-col justify-between">
        {/* Headlines */}
        <div className="space-y-1.5 text-center">
          <h1 className="text-3xl font-black text-[#1F2A44] font-heading leading-tight tracking-tight">
            Show up. <span className="text-[#C6A75E]">Stay on track.</span>
          </h1>

          <p className="text-xs text-[#706B62] max-w-xs mx-auto leading-relaxed font-medium">
            Your classes. Your attendance. All in one place. Authenticated lecture presence with rolling QR codes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-3">
          <button
            onClick={onGetStarted}
            className="w-full h-12 rounded-2xl bg-[#1F2A44] hover:bg-[#2b3a5c] active:scale-[0.99] text-[#FAF8F3] font-heading font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#1F2A44]/20 transition-all cursor-pointer border border-[#1F2A44]"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-[#C6A75E]" />
          </button>

          <button
            onClick={onSignIn}
            className="w-full h-11 rounded-2xl bg-[#E8DCC8]/60 hover:bg-[#E8DCC8] active:scale-[0.99] text-[#1F2A44] border border-[#E8DCC8] font-heading font-bold text-xs flex items-center justify-center transition-all cursor-pointer"
          >
            <span>Log In to Existing Account</span>
          </button>

          {/* Quick Instant Prototype Roles */}
          <div className="pt-2 border-t border-[#E8DCC8]">
            <p className="text-center text-[10px] font-bold uppercase tracking-wider text-[#706B62] mb-1.5 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C6A75E]" />
              <span>Instant Prototype Access</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => login('student')}
                className="px-3 py-2 rounded-xl bg-white hover:bg-[#E8DCC8]/40 border border-[#E8DCC8] text-left transition-colors cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#4F8A67]" />
                  <span className="text-xs font-bold text-[#1F2A44] font-heading">Gabriella (Student)</span>
                </div>
                <span className="text-[10px] text-[#706B62] block">86% Attendance Rate</span>
              </button>

              <button
                onClick={() => login('lecturer')}
                className="px-3 py-2 rounded-xl bg-white hover:bg-[#E8DCC8]/40 border border-[#E8DCC8] text-left transition-colors cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#C6A75E]" />
                  <span className="text-xs font-bold text-[#1F2A44] font-heading">Dr. Kwame (Lecturer)</span>
                </div>
                <span className="text-[10px] text-[#706B62] block">Live QR Console</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
