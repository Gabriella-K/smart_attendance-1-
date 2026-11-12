import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Image as ImageIcon, Play, Footprints } from 'lucide-react';
import { ASSETS } from '../../data/mockData';

interface AnimatedWalkingStudentProps {
  className?: string;
  showToggle?: boolean;
}

export const AnimatedWalkingStudent: React.FC<AnimatedWalkingStudentProps> = ({
  className = '',
  showToggle = true,
}) => {
  const [viewMode, setViewMode] = useState<'animated' | 'render'>('animated');
  const [walkSpeed, setWalkSpeed] = useState<'normal' | 'brisk'>('normal');

  const speedMultiplier = walkSpeed === 'brisk' ? 0.65 : 0.95;

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-end overflow-hidden ${className}`}>
      {/* Background Campus Scene with subtle depth */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1F2A44]/15 via-[#E8DCC8]/50 to-[#E9DED0]/80 overflow-hidden pointer-events-none">
        {/* Distant campus silhouette: Clock Tower & Arched Hall */}
        <svg
          viewBox="0 0 400 200"
          className="absolute bottom-12 inset-x-0 w-full h-36 opacity-35"
          preserveAspectRatio="none"
        >
          {/* Main Hall */}
          <path d="M20,200 L20,130 L60,110 L100,130 L100,200 Z" fill="#1F2A44" />
          <path d="M120,200 L120,100 L150,85 L180,100 L180,200 Z" fill="#1F2A44" />
          {/* Central Clock Tower */}
          <path d="M185,200 L185,50 L205,30 L225,50 L225,200 Z" fill="#1F2A44" />
          <circle cx="205" cy="70" r="10" fill="#C6A75E" />
          <path d="M205,65 L205,70 L210,70" stroke="#1F2A44" strokeWidth="1.5" />
          {/* Right Library Wing */}
          <path d="M240,200 L240,120 L280,105 L320,120 L320,200 Z" fill="#1F2A44" />
          <path d="M330,200 L330,140 L370,125 L400,140 L400,200 Z" fill="#1F2A44" />
        </svg>

        {/* Parallax Drifting Campus Clouds */}
        <motion.div
          animate={{ x: [-80, 420] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="absolute top-4 left-0 w-24 h-7 rounded-full bg-white/60 blur-[1px]"
        />
        <motion.div
          animate={{ x: [-120, 400] }}
          transition={{ repeat: Infinity, duration: 32, ease: 'linear', delay: 8 }}
          className="absolute top-10 left-0 w-36 h-9 rounded-full bg-white/45 blur-[1px]"
        />

        {/* Animated Moving Campus Paver Road (gives true walking motion) */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-[#E0D3C1] border-t-2 border-[#D2C3AF] overflow-hidden">
          {/* Moving paving stones texture */}
          <motion.div
            animate={{ x: [0, -72] }}
            transition={{ repeat: Infinity, duration: speedMultiplier, ease: 'linear' }}
            className="flex w-[600px] h-full"
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="w-18 h-full border-r border-[#C9B9A3] flex flex-col justify-between py-1 px-1.5 opacity-70"
              >
                <div className="h-3 rounded-xs bg-[#D6C7B3] opacity-60" />
                <div className="h-3 rounded-xs bg-[#CFBEA8] opacity-50 translate-x-2" />
                <div className="h-3 rounded-xs bg-[#D8C9B5] opacity-60 -translate-x-1" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main View: Either Rich SVG/Motion Cartoon Student Walk or 3D Rendered Scene */}
      {viewMode === 'animated' ? (
        <div className="relative z-10 w-full h-[330px] flex items-end justify-center select-none">
          {/* Real Full Animated Character: African university student girl with braided bun, mustard jacket & backpack */}
          <motion.div
            animate={{
              y: [0, -6, 0, -6, 0],
              rotate: [-0.8, 0.8, -0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: speedMultiplier * 2,
              ease: 'easeInOut',
            }}
            className="relative w-56 h-[310px] flex items-end justify-center"
          >
            {/* Soft contact ground shadow under feet */}
            <motion.div
              animate={{
                scaleX: [1, 1.25, 1, 1.25, 1],
                opacity: [0.35, 0.22, 0.35, 0.22, 0.35],
              }}
              transition={{ repeat: Infinity, duration: speedMultiplier * 2, ease: 'easeInOut' }}
              className="absolute -bottom-1 w-32 h-4 rounded-full bg-[#302D32]/35 blur-[2px] z-0"
            />

            {/* Complete Vector Animated Cartoon Character in Pixar/Disney Style */}
            <svg
              viewBox="0 0 200 320"
              className="w-full h-full relative z-10"
              style={{ filter: 'drop-shadow(0 12px 16px rgba(48, 45, 50, 0.18))' }}
            >
              <defs>
                <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8C5338" />
                  <stop offset="100%" stopColor="#693721" />
                </linearGradient>
                <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C6A75E" />
                  <stop offset="100%" stopColor="#D99A2B" />
                </linearGradient>
                <linearGradient id="jeansGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3F5E78" />
                  <stop offset="100%" stopColor="#283C4F" />
                </linearGradient>
                <linearGradient id="backpackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E8262" />
                  <stop offset="100%" stopColor="#1F2A44" />
                </linearGradient>
              </defs>

              {/* Backpack (Behind body) with sway */}
              <motion.g
                animate={{
                  rotate: [3, -3, 3],
                  y: [-1, 2, -1],
                }}
                transition={{ repeat: Infinity, duration: speedMultiplier * 2, ease: 'easeInOut' }}
                style={{ transformOrigin: '80px 140px' }}
              >
                <rect x="52" y="105" width="46" height="65" rx="16" fill="url(#backpackGrad)" stroke="#135942" strokeWidth="2.5" />
                <path d="M54,128 L96,128" stroke="#C6A75E" strokeWidth="2.5" strokeDasharray="3 3" />
                <rect x="58" y="134" width="34" height="28" rx="8" fill="#135942" />
                {/* Backpack Keychain / Campus Badge */}
                <circle cx="94" cy="155" r="4.5" fill="#C6A75E" />
              </motion.g>

              {/* Back Arm (Swings in counter-motion to right leg) */}
              <motion.g
                animate={{
                  rotate: [24, -24, 24],
                }}
                transition={{ repeat: Infinity, duration: speedMultiplier * 2, ease: 'easeInOut' }}
                style={{ transformOrigin: '78px 120px' }}
              >
                <path d="M78,120 Q64,155 58,190" stroke="url(#jacketGrad)" strokeWidth="16" strokeLinecap="round" />
                {/* Hand */}
                <circle cx="56" cy="195" r="7.5" fill="url(#skinGrad)" />
              </motion.g>

              {/* Back Leg (Right leg - walking cycle) */}
              <motion.g
                animate={{
                  rotate: [-28, 28, -28],
                }}
                transition={{ repeat: Infinity, duration: speedMultiplier * 2, ease: 'easeInOut' }}
                style={{ transformOrigin: '92px 185px' }}
              >
                {/* Thigh */}
                <path d="M92,185 L84,235" stroke="url(#jeansGrad)" strokeWidth="18" strokeLinecap="round" />
                {/* Calf & Foot */}
                <motion.g
                  animate={{
                    rotate: [18, 0, 18],
                  }}
                  transition={{ repeat: Infinity, duration: speedMultiplier * 2, ease: 'easeInOut' }}
                  style={{ transformOrigin: '84px 235px' }}
                >
                  <path d="M84,235 L78,285" stroke="url(#jeansGrad)" strokeWidth="15" strokeLinecap="round" />
                  {/* Sneaker */}
                  <path d="M70,285 L94,285 L98,295 L64,295 Z" fill="#FAF8F3" stroke="#E9DED0" strokeWidth="1.5" />
                  <rect x="64" y="293" width="34" height="3" rx="1.5" fill="#1F2A44" />
                </motion.g>
              </motion.g>

              {/* Front Leg (Left leg - alternating walking cycle) */}
              <motion.g
                animate={{
                  rotate: [28, -28, 28],
                }}
                transition={{ repeat: Infinity, duration: speedMultiplier * 2, ease: 'easeInOut' }}
                style={{ transformOrigin: '112px 185px' }}
              >
                {/* Thigh */}
                <path d="M112,185 L120,235" stroke="url(#jeansGrad)" strokeWidth="18" strokeLinecap="round" />
                {/* Calf & Foot */}
                <motion.g
                  animate={{
                    rotate: [0, 24, 0],
                  }}
                  transition={{ repeat: Infinity, duration: speedMultiplier * 2, ease: 'easeInOut' }}
                  style={{ transformOrigin: '120px 235px' }}
                >
                  <path d="M120,235 L126,285" stroke="url(#jeansGrad)" strokeWidth="15" strokeLinecap="round" />
                  {/* Sneaker */}
                  <path d="M118,285 L144,285 L148,295 L112,295 Z" fill="#FAF8F3" stroke="#E9DED0" strokeWidth="1.5" />
                  <rect x="112" y="293" width="36" height="3" rx="1.5" fill="#1F2A44" />
                </motion.g>
              </motion.g>

              {/* Torso & Mustard Jacket */}
              <g>
                <path
                  d="M84,115 C84,115 76,140 78,185 C88,190 120,190 128,185 C130,140 122,115 122,115 Z"
                  fill="url(#jacketGrad)"
                  stroke="#D99A2B"
                  strokeWidth="1.5"
                />
                {/* Inner Shirt Collar */}
                <polygon points="98,115 108,115 103,130" fill="#302D32" />
                {/* Jacket Zipper line & buttons */}
                <line x1="103" y1="130" x2="103" y2="185" stroke="#FAF8F3" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="114" cy="142" r="3" fill="#1F2A44" />
                <circle cx="114" cy="155" r="3" fill="#1F2A44" />
              </g>

              {/* Head & Neck */}
              <g>
                {/* Neck */}
                <rect x="99" y="98" width="10" height="18" fill="url(#skinGrad)" rx="3" />
                {/* Head Face Oval */}
                <ellipse cx="104" cy="80" rx="19" ry="22" fill="url(#skinGrad)" />
                {/* Friendly Smile */}
                <path d="M99,88 Q104,94 110,88" stroke="#FAF8F3" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Expressive cartoon eyes */}
                <ellipse cx="98" cy="76" rx="3.5" ry="4.5" fill="#302D32" />
                <circle cx="99.5" cy="74.5" r="1.5" fill="#FFFFFF" />
                <ellipse cx="110" cy="76" rx="3.5" ry="4.5" fill="#302D32" />
                <circle cx="111.5" cy="74.5" r="1.5" fill="#FFFFFF" />
                {/* Cute Eyebrows */}
                <path d="M94,70 Q98,67 102,69" stroke="#302D32" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M106,69 Q110,67 114,70" stroke="#302D32" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Gold Earring */}
                <circle cx="85" cy="82" r="3" fill="none" stroke="#C6A75E" strokeWidth="2" />
                {/* Braided Hair Bun in Stylized 3D Volume */}
                <circle cx="104" cy="44" r="22" fill="#201C1B" />
                {/* Braided texture details */}
                <path d="M88,44 Q104,32 120,44" stroke="#3A2F2B" strokeWidth="3" fill="none" />
                <path d="M90,52 Q104,40 118,52" stroke="#3A2F2B" strokeWidth="3" fill="none" />
                <path d="M94,36 Q104,26 114,36" stroke="#3A2F2B" strokeWidth="3" fill="none" />
                {/* Hairline framing face */}
                <path d="M86,72 C88,60 120,60 122,72 C116,64 92,64 86,72 Z" fill="#201C1B" />
              </g>

              {/* Front Arm (Swings in counter-motion to left leg, holds university notebook) */}
              <motion.g
                animate={{
                  rotate: [-24, 24, -24],
                }}
                transition={{ repeat: Infinity, duration: speedMultiplier * 2, ease: 'easeInOut' }}
                style={{ transformOrigin: '124px 120px' }}
              >
                <path d="M124,120 Q138,155 142,190" stroke="url(#jacketGrad)" strokeWidth="16" strokeLinecap="round" />
                {/* Hand holding student notebook */}
                <circle cx="143" cy="194" r="7.5" fill="url(#skinGrad)" />
                {/* University Course Binder / Notebook */}
                <rect x="135" y="180" width="16" height="24" rx="2" fill="#1F2A44" stroke="#C6A75E" strokeWidth="1.5" />
                <line x1="139" y1="184" x2="147" y2="184" stroke="#FFFFFF" strokeWidth="1.5" />
                <line x1="139" y1="188" x2="147" y2="188" stroke="#FFFFFF" strokeWidth="1.5" />
              </motion.g>
            </svg>
          </motion.div>

          {/* Floating Live Badge: On The Way To Lecture */}
          <div className="absolute top-2 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="px-3 py-1 rounded-full bg-white/90 border border-[#E9DED0] shadow-xs flex items-center gap-1.5 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#1F2A44] animate-pulse" />
              <span className="text-[11px] font-extrabold text-[#1F2A44] font-heading">
                Heading to Hall B3
              </span>
            </div>

            <div className="px-2.5 py-1 rounded-full bg-[#C6A75E]/90 text-[#302D32] text-[10px] font-bold shadow-xs">
              CS 301 · 10:00 AM
            </div>
          </div>
        </div>
      ) : (
        /* High-Detail 3D Cartoon Render Mode */
        <div className="relative z-10 w-full h-[330px] flex items-end justify-center overflow-hidden rounded-2xl">
          <img
            src={ASSETS.cartoonStudentWalk}
            alt="3D cartoon stylized African university student walking to class"
            className="w-full h-full object-cover object-center select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
            <span className="text-xs font-bold font-heading">3D University World</span>
            <span className="text-[10px] font-semibold bg-[#1F2A44]/80 px-2 py-0.5 rounded-full backdrop-blur-xs">
              Pixar / Disney 3D Style
            </span>
          </div>
        </div>
      )}

      {/* Control Strip (Pace & Mode toggle) */}
      {showToggle && (
        <div className="relative z-20 w-full px-4 pt-2 pb-1 flex items-center justify-between bg-white/80 border-t border-[#E9DED0]/60 backdrop-blur-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setWalkSpeed(walkSpeed === 'normal' ? 'brisk' : 'normal')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E8DCC8] hover:bg-[#E9DED0] text-[10px] font-extrabold text-[#1F2A44] transition-colors cursor-pointer"
            >
              <Footprints className="w-3 h-3 text-[#1F2A44]" />
              <span>{walkSpeed === 'normal' ? 'Pace: Normal' : 'Pace: Brisk'}</span>
            </button>
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
                <span>View Live Walk</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
