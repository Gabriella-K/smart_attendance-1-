import React from 'react';
import {
  Mail,
  GraduationCap,
  MapPin,
  Calendar,
  ArrowRightLeft,
  LogOut,
  ShieldCheck,
  Award,
  PlayCircle,
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { ASSETS } from '../../data/mockData';

export const LecturerProfileView: React.FC = () => {
  const { lecturerProfile, logout, setUserRole, replayOnboarding } = useAttendance();

  return (
    <div className="space-y-4 pb-20 px-4 pt-3">
      <div>
        <h1 className="text-xl font-extrabold text-[#1F2A44] font-heading">
          Faculty Profile
        </h1>
        <p className="text-xs text-[#706B62]">
          Lecturer credentials, academic department, and administration.
        </p>
      </div>

      {/* Profile Card in Ivory with Navy / Gold Accents */}
      <div className="rounded-2xl bg-white border border-[#E8DCC8] p-5 shadow-2xs text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1F2A44] via-[#C6A75E] to-[#1F2A44]" />

        <div className="relative mx-auto w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#C6A75E] shadow-xs bg-white mt-2 mb-3">
          <img
            src={lecturerProfile.avatar}
            alt={lecturerProfile.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-lg font-extrabold text-[#1F2A44] font-heading leading-tight">
          {lecturerProfile.name}
        </h2>
        <p className="text-xs font-semibold text-[#1F2A44] mt-0.5">
          Senior Lecturer · Software Engineering
        </p>
        <p className="text-[11px] text-[#706B62] mt-0.5">
          {lecturerProfile.department}
        </p>

        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCC8]/50 text-[#1F2A44] text-[11px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4F8A67]" />
          <span>Faculty Chair Verification Officer</span>
        </div>
      </div>

      {/* Information Rows */}
      <div className="rounded-2xl bg-white border border-[#E8DCC8] p-4.5 space-y-3 shadow-2xs">
        <h3 className="text-xs font-bold text-[#1F2A44] font-heading uppercase tracking-wider">
          Office & Faculty Details
        </h3>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-[#E8DCC8]">
            <span className="text-[#706B62] flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#1F2A44]" />
              Staff Email
            </span>
            <span className="font-semibold text-[#252733] font-mono">
              {lecturerProfile.email}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-[#E8DCC8]">
            <span className="text-[#706B62] flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C6A75E]" />
              Office Location
            </span>
            <span className="font-semibold text-[#252733]">
              Tech Block Room 408
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-[#E8DCC8]">
            <span className="text-[#706B62] flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#1F2A44]" />
              Office Consultation Hours
            </span>
            <span className="font-semibold text-[#252733]">
              Tue & Thu 2:00 - 4:00 PM
            </span>
          </div>
        </div>
      </div>

      {/* Role Switcher & Actions */}
      <div className="space-y-2 pt-1">
        <button
          onClick={() => {
            logout();
            replayOnboarding();
          }}
          className="w-full h-11 rounded-xl bg-[#E8DCC8]/60 text-[#1F2A44] border border-[#E8DCC8] font-heading font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#E8DCC8] cursor-pointer transition-colors shadow-2xs"
        >
          <PlayCircle className="w-4 h-4 text-[#C6A75E]" />
          <span>Replay introduction</span>
        </button>

        <button
          onClick={() => setUserRole('student')}
          className="w-full h-11 rounded-xl bg-[#1F2A44] text-[#FAF8F3] font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-2xs hover:bg-[#2b3a5c] cursor-pointer transition-colors"
        >
          <ArrowRightLeft className="w-4 h-4 text-[#C6A75E]" />
          <span>Switch to Student Experience (Gabriella)</span>
        </button>

        <button
          onClick={logout}
          className="w-full h-11 rounded-xl bg-white text-[#B95757] border border-[#E8DCC8] font-heading font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#B95757]/10 cursor-pointer transition-colors shadow-2xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
