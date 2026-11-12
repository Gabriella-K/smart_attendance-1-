import React from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  BookOpen,
  QrCode,
  Clock,
  User,
  Radio,
  FileText,
  Play,
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

export type StudentTab = 'home' | 'courses' | 'scan' | 'history' | 'profile' | 'progress';
export type LecturerTab = 'home' | 'courses' | 'sessions' | 'reports' | 'profile';

interface BottomTabBarProps {
  currentTab: string;
  onTabChange: (tab: any) => void;
  onOpenScanner?: () => void;
  onStartSession?: () => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  currentTab,
  onTabChange,
  onOpenScanner,
  onStartSession,
}) => {
  const { userRole, activeSession } = useAttendance();

  if (userRole === 'student') {
    const studentTabs = [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'courses', label: 'Courses', icon: BookOpen },
      { id: 'scan', label: 'Scan', icon: QrCode, isCenter: true },
      { id: 'history', label: 'History', icon: Clock },
      { id: 'profile', label: 'Profile', icon: User },
    ];

    return (
      <nav className="shrink-0 w-full z-30 bg-[#FAF8F3]/95 backdrop-blur-md border-t border-[#E8DCC8] px-2 pt-1 pb-1 shadow-xs select-none">
        <div className="grid grid-cols-5 items-center h-15">
          {studentTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;

            if (tab.isCenter) {
              return (
                <div key={tab.id} className="flex flex-col items-center justify-center relative -top-3">
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      onTabChange('scan');
                      onOpenScanner?.();
                    }}
                    className="w-13 h-13 rounded-2xl bg-[#1F2A44] hover:bg-[#2b3a5c] text-[#FAF8F3] flex items-center justify-center shadow-lg shadow-[#1F2A44]/30 border-2 border-[#FAF8F3] cursor-pointer group transition-colors"
                    title="Scan QR Code"
                  >
                    <Icon className="w-6 h-6 text-[#C6A75E] group-hover:scale-105 transition-transform" />
                  </motion.button>
                  <span className={`text-[10px] font-bold font-heading mt-0.5 ${isActive ? 'text-[#1F2A44]' : 'text-[#706B62]'}`}>
                    Scan
                  </span>
                </div>
              );
            }

            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.94 }}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center justify-center min-h-[46px] cursor-pointer transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="studentActiveTabPill"
                    className="absolute inset-x-2 inset-y-1 rounded-xl bg-[#E8DCC8]/60 border border-[#E8DCC8] -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}

                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'text-[#1F2A44] scale-105' : 'text-[#706B62] hover:text-[#1F2A44]'
                  }`}
                />
                <span
                  className={`text-[10px] font-extrabold font-heading mt-1 ${
                    isActive ? 'text-[#1F2A44]' : 'text-[#706B62]'
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="studentActiveTabDot"
                    className="w-1.5 h-1.5 rounded-full bg-[#C6A75E] mt-0.5"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Mobile Home Indicator bar */}
        <div className="w-24 h-1 bg-[#1F2A44]/20 rounded-full mx-auto mt-0.5 mb-0.5 pointer-events-none" />
      </nav>
    );
  }

  // Lecturer Navigation
  const lecturerTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'sessions', label: activeSession ? 'Live' : 'Start', icon: activeSession ? Radio : Play, isCenter: true },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="shrink-0 w-full z-30 bg-[#FAF8F3]/95 backdrop-blur-md border-t border-[#E8DCC8] px-2 pt-1 pb-1 shadow-xs select-none">
      <div className="grid grid-cols-5 items-center h-15">
        {lecturerTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          if (tab.isCenter) {
            return (
              <div key={tab.id} className="flex flex-col items-center justify-center relative -top-3">
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    if (activeSession) {
                      onTabChange('sessions');
                    } else if (onStartSession) {
                      onStartSession();
                    } else {
                      onTabChange('sessions');
                    }
                  }}
                  className="w-13 h-13 rounded-2xl bg-[#1F2A44] hover:bg-[#2b3a5c] text-[#FAF8F3] flex items-center justify-center shadow-lg shadow-[#1F2A44]/30 border-2 border-[#FAF8F3] cursor-pointer group transition-colors"
                  title="Manage Sessions"
                >
                  {activeSession ? (
                    <Radio className="w-6 h-6 text-[#C6A75E] animate-pulse" />
                  ) : (
                    <Play className="w-5 h-5 text-[#C6A75E] fill-current ml-0.5" />
                  )}
                </motion.button>
                <span className={`text-[10px] font-bold font-heading mt-0.5 ${isActive ? 'text-[#1F2A44]' : 'text-[#706B62]'}`}>
                  {tab.label}
                </span>
              </div>
            );
          }

          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center min-h-[46px] cursor-pointer transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="lecturerActiveTabPill"
                  className="absolute inset-x-2 inset-y-1 rounded-xl bg-[#E8DCC8]/60 border border-[#E8DCC8] -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}

              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'text-[#1F2A44] scale-105' : 'text-[#706B62] hover:text-[#1F2A44]'
                }`}
              />
              <span
                className={`text-[10px] font-extrabold font-heading mt-1 ${
                  isActive ? 'text-[#1F2A44]' : 'text-[#706B62]'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.span
                  layoutId="lecturerActiveTabDot"
                  className="w-1.5 h-1.5 rounded-full bg-[#C6A75E] mt-0.5"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Mobile Home Indicator bar */}
      <div className="w-24 h-1 bg-[#1F2A44]/20 rounded-full mx-auto mt-0.5 mb-0.5 pointer-events-none" />
    </nav>
  );
};
