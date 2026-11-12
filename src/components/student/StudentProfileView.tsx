import React, { useState } from 'react';
import {
  User,
  Mail,
  Hash,
  BookOpen,
  Camera,
  Bell,
  Shield,
  LogOut,
  ArrowRightLeft,
  ChevronRight,
  GraduationCap,
  PlayCircle,
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { ASSETS } from '../../data/mockData';

export const StudentProfileView: React.FC = () => {
  const { studentProfile, logout, setUserRole, replayOnboarding } = useAttendance();

  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  return (
    <div className="space-y-4 pb-20 px-4 pt-3">
      {/* Profile Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#1F2A44] font-heading">
          My Profile
        </h1>
        <p className="text-xs text-[#706B62]">
          Student credentials and verified attendance identity.
        </p>
      </div>

      {/* Main Student ID Card */}
      <div className="rounded-2xl bg-white border border-[#E8DCC8] p-5 shadow-2xs text-center relative overflow-hidden">
        {/* Top Decorative Stripe in Navy & Gold */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1F2A44] via-[#C6A75E] to-[#1F2A44]" />

        <div className="relative mx-auto w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#C6A75E] shadow-xs bg-white mt-2 mb-3">
          <img
            src={studentProfile.avatar}
            alt={studentProfile.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-lg font-extrabold text-[#1F2A44] font-heading leading-tight">
          {studentProfile.name}
        </h2>
        <p className="text-xs font-semibold text-[#1F2A44] mt-0.5">
          {studentProfile.studentId}
        </p>
        <p className="text-[11px] text-[#706B62] mt-0.5">
          {studentProfile.program} · {studentProfile.year}
        </p>

        {/* University Badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCC8]/50 text-[#1F2A44] text-[11px] font-bold">
          <GraduationCap className="w-3.5 h-3.5 text-[#C6A75E]" />
          <span>Faculty of Computing</span>
        </div>
      </div>

      {/* Account Info Details */}
      <div className="rounded-2xl bg-white border border-[#E8DCC8] p-4.5 space-y-3 shadow-2xs">
        <h3 className="text-xs font-bold text-[#1F2A44] font-heading uppercase tracking-wider">
          Student Information
        </h3>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-[#E8DCC8]">
            <span className="text-[#706B62] flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#1F2A44]" />
              Email
            </span>
            <span className="font-semibold text-[#252733] font-mono">
              {studentProfile.email}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-[#E8DCC8]">
            <span className="text-[#706B62] flex items-center gap-2">
              <Hash className="w-3.5 h-3.5 text-[#C6A75E]" />
              Registry ID
            </span>
            <span className="font-semibold text-[#252733] font-mono">
              {studentProfile.studentId}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-[#E8DCC8]">
            <span className="text-[#706B62] flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#1F2A44]" />
              Department
            </span>
            <span className="font-semibold text-[#252733] text-right">
              {studentProfile.department}
            </span>
          </div>
        </div>
      </div>

      {/* Settings & Permissions */}
      <div className="rounded-2xl bg-white border border-[#E8DCC8] p-4.5 space-y-3 shadow-2xs">
        <h3 className="text-xs font-bold text-[#1F2A44] font-heading uppercase tracking-wider">
          Settings & Preferences
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Camera className="w-4 h-4 text-[#1F2A44]" />
              <div>
                <p className="font-bold text-[#252733]">Scanner Camera Access</p>
                <p className="text-[10px] text-[#706B62]">QR attendance authentication</p>
              </div>
            </div>
            <button
              onClick={() => setCameraEnabled(!cameraEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                cameraEnabled ? 'bg-[#1F2A44]' : 'bg-[#E8DCC8]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  cameraEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-[#C6A75E]" />
              <div>
                <p className="font-bold text-[#252733]">Push Alerts</p>
                <p className="text-[10px] text-[#706B62]">Session opening & reminders</p>
              </div>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                notificationsEnabled ? 'bg-[#1F2A44]' : 'bg-[#E8DCC8]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  notificationsEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-[#4F8A67]" />
              <div>
                <p className="font-bold text-[#252733]">Biometric Verification</p>
                <p className="text-[10px] text-[#706B62]">Fast face/touch unlock</p>
              </div>
            </div>
            <button
              onClick={() => setBiometricsEnabled(!biometricsEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                biometricsEnabled ? 'bg-[#1F2A44]' : 'bg-[#E8DCC8]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  biometricsEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Role Switching & Replay Introduction */}
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
          onClick={() => setUserRole('lecturer')}
          className="w-full h-11 rounded-xl bg-[#1F2A44] text-[#FAF8F3] font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-2xs hover:bg-[#2b3a5c] cursor-pointer transition-colors"
        >
          <ArrowRightLeft className="w-4 h-4 text-[#C6A75E]" />
          <span>Switch to Lecturer Experience</span>
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
