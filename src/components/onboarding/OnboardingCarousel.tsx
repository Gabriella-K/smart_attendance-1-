import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, GraduationCap, ChevronLeft, Sparkles, QrCode } from 'lucide-react';
import { LottiePlayer } from '../common/LottiePlayer';

import studentWalkingAnim from '../../assets/animations/student_walking.json';
import studentScanAnim from '../../assets/animations/student_scan.json';
import attendanceProgressAnim from '../../assets/animations/attendance_progress.json';

interface OnboardingCarouselProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface SlideData {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  lottieData: any;
  ambientScene: React.ReactNode;
}

export const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ onComplete, onSkip }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  const slides: SlideData[] = [
    {
      id: 'show-up',
      badge: 'Step 1 of 3 · Arrival',
      title: 'Show',
      highlight: 'up.',
      description: 'Your campus, your classes, your attendance. Effortless university tracking from the palm of your hand.',
      lottieData: studentWalkingAnim,
      ambientScene: (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="px-2.5 py-1 rounded-full bg-[#FAF8F3]/90 text-[#1F2A44] border border-[#E8DCC8] shadow-xs">
              North Quad Walkway
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#C6A75E] text-[#1F2A44] font-semibold">
              CS 301 · 10:00 AM
            </span>
          </div>
          {/* Subtle architectural silhouette in Navy */}
          <div className="text-center opacity-40">
            <span className="text-[10px] tracking-widest uppercase font-mono text-[#1F2A44]">
              University Campus
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'scan-in',
      badge: 'Step 2 of 3 · Verification',
      title: 'Scan',
      highlight: 'in.',
      description: 'Check in before the moment passes. 30-second rolling QR codes ensure authentic lecture hall presence.',
      lottieData: studentScanAnim,
      ambientScene: (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="px-2.5 py-1 rounded-full bg-[#1F2A44] text-[#FAF8F3] border border-[#C6A75E]/30 flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F8A67] animate-pulse" />
              <span>Dr. Adebayo · Hall B3</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#C6A75E]/20 text-[#1F2A44] border border-[#C6A75E]/40 font-mono">
              30s Cycle
            </span>
          </div>
          <div className="flex justify-center">
            <div className="px-3 py-1 rounded-full bg-[#1F2A44]/90 text-[#C6A75E] text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
              <QrCode className="w-3 h-3 text-[#C6A75E]" />
              <span>Verified Geo-QR Authenticated</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'stay-on-track',
      badge: 'Step 3 of 3 · Progress',
      title: 'Stay on',
      highlight: 'track.',
      description: 'Know where you stand in every course. Instant attendance percentage and exam eligibility confidence.',
      lottieData: attendanceProgressAnim,
      ambientScene: (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="px-2.5 py-1 rounded-full bg-[#4F8A67]/15 text-[#4F8A67] border border-[#4F8A67]/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C6A75E]" />
              <span>Exam Eligible</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#C6A75E] text-[#1F2A44] font-extrabold">
              86% Overall
            </span>
          </div>
          <div className="flex justify-center">
            <span className="text-[10px] text-[#706B62] font-semibold bg-[#FAF8F3]/90 px-3 py-0.5 rounded-full border border-[#E8DCC8]">
              Semester Standing: Excellent
            </span>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Drag / swipe detection on mobile touch
  const handleDragEnd = (_e: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 240 : -240,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -240 : 240,
      opacity: 0,
    }),
  };

  return (
    <div className="relative flex flex-col min-h-full bg-[#FAF8F3] text-[#252733] overflow-hidden select-none">
      {/* Top University Brand Bar */}
      <div className="relative z-20 pt-4 px-5 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1F2A44] flex items-center justify-center text-[#C6A75E] shadow-sm">
            <GraduationCap className="w-4 h-4 text-[#C6A75E]" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-sm text-[#1F2A44] tracking-tight block leading-tight">
              Smart Attendance
            </span>
            <span className="text-[10px] font-medium text-[#706B62]">
              University Portal
            </span>
          </div>
        </div>

        {/* Skip Button (always visible, immediately jumps to Welcome page) */}
        <button
          onClick={onSkip}
          className="px-3.5 py-1 rounded-full bg-[#E8DCC8]/70 hover:bg-[#E8DCC8] active:scale-95 text-xs font-heading font-bold text-[#1F2A44] transition-all cursor-pointer border border-[#E8DCC8]"
        >
          Skip
        </button>
      </div>

      {/* Arched Illustration Viewport (Warm Beige & Soft Gold ambient surface) */}
      <div className="relative z-10 mx-3 mt-1 rounded-t-[36px] rounded-b-[24px] overflow-hidden bg-gradient-to-b from-[#E8DCC8] via-[#FAF8F3] to-[#E8DCC8] border-2 border-[#E8DCC8] shadow-xs">
        {/* Navy & Gold header accent line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1F2A44] via-[#C6A75E] to-[#1F2A44]" />

        {/* Swipeable Motion Area */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="cursor-grab active:cursor-grabbing w-full"
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="relative w-full h-[320px] flex items-center justify-center"
            >
              {/* Lottie Animation Component */}
              <div className="w-full h-full max-w-[280px] p-2 flex items-center justify-center">
                <LottiePlayer
                  animationData={slides[currentSlide].lottieData}
                  className="w-full h-full"
                />
              </div>

              {/* Ambient scene overlays */}
              {slides[currentSlide].ambientScene}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Clean Bottom Card Area with Typography, Page Dots & Primary Action */}
      <div className="flex-1 px-6 pt-4 pb-6 flex flex-col justify-between">
        {/* Text Content */}
        <div className="space-y-1.5 text-center">
          {/* Step Indicator Badge */}
          <div className="inline-block px-3 py-0.5 rounded-full bg-[#1F2A44]/10 text-[#1F2A44] text-[10px] font-extrabold uppercase tracking-wider">
            {slides[currentSlide].badge}
          </div>

          <h2 className="text-3xl font-black text-[#1F2A44] font-heading tracking-tight leading-none">
            {slides[currentSlide].title}{' '}
            <span className="text-[#C6A75E]">{slides[currentSlide].highlight}</span>
          </h2>

          <p className="text-xs text-[#706B62] max-w-xs mx-auto leading-relaxed font-medium">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Controls: Dots & Navigation Buttons */}
        <div className="space-y-4 pt-3">
          {/* Interactive Page Indicator Dots */}
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === idx
                    ? 'w-7 h-2.5 bg-[#1F2A44]'
                    : 'w-2.5 h-2.5 bg-[#E8DCC8] hover:bg-[#706B62]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3">
            {currentSlide > 0 ? (
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-2xl bg-[#E8DCC8]/60 hover:bg-[#E8DCC8] active:scale-95 text-[#1F2A44] flex items-center justify-center border border-[#E8DCC8] transition-all cursor-pointer shrink-0"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            ) : null}

            <button
              onClick={handleNext}
              className="flex-1 h-12 rounded-2xl bg-[#1F2A44] hover:bg-[#2b3a5c] active:scale-[0.98] text-[#FAF8F3] font-heading font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#1F2A44]/20 transition-all cursor-pointer border border-[#1F2A44]"
            >
              <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
              <ArrowRight className="w-4 h-4 text-[#C6A75E]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
