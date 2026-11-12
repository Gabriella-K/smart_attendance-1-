import React from 'react';
import { motion } from 'framer-motion';
import { Bell, GraduationCap } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

interface TopNavBarProps {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  onOpenNotifications,
  onOpenProfile,
}) => {
  const { currentProfile, userRole, unreadNotificationsCount } = useAttendance();

  return (
    <header className="sticky top-0 z-30 h-14 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E8DCC8] px-4 flex items-center justify-between">
      {/* Brand Zone */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-[#1F2A44] flex items-center justify-center text-[#C6A75E] shadow-2xs">
          <GraduationCap className="w-4 h-4 text-[#C6A75E]" />
        </div>
        <div className="leading-none">
          <span className="font-heading font-extrabold text-sm text-[#1F2A44] tracking-tight block">
            Smart Attendance
          </span>
          <span className="text-[10px] text-[#706B62] font-semibold block mt-0.5">
            {userRole === 'student' ? 'Student Portal' : 'Faculty Console'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenNotifications}
          className="relative w-9 h-9 rounded-full bg-white border border-[#E8DCC8] flex items-center justify-center text-[#1F2A44] hover:bg-[#E8DCC8]/40 transition-colors cursor-pointer shadow-2xs"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#C28B3C] ring-2 ring-white animate-pulse" />
          )}
        </motion.button>

        {/* Profile Avatar Trigger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenProfile}
          className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#C6A75E] shadow-2xs cursor-pointer bg-white"
          title="Profile"
        >
          <img
            src={currentProfile.avatar}
            alt={currentProfile.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </motion.button>
      </div>
    </header>
  );
};
