import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Hash, Lock, AlertCircle } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { UserRole } from '../../types/attendance';
import { LottiePlayer } from '../common/LottiePlayer';
import studentWalkingAnim from '../../assets/animations/student_walking.json';

interface RegisterScreenProps {
  onBack: () => void;
  onNavigateLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBack, onNavigateLogin }) => {
  const { register } = useAttendance();

  const [role, setRole] = useState<UserRole>('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please provide your full legal name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid university email address.');
      return;
    }
    if (role === 'student' && !studentId.trim()) {
      setError('Student ID number is required (e.g. STU-2024-8841).');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    setError(null);
    register(fullName, email, studentId, role);
  };

  return (
    <div className="relative flex flex-col min-h-full bg-[#FAF8F3] text-[#252733] overflow-y-auto no-scrollbar select-none">
      {/* Top Header Bar */}
      <div className="relative z-20 pt-4 px-5 pb-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-[#E8DCC8]/60 hover:bg-[#E8DCC8] active:scale-95 text-[#1F2A44] flex items-center justify-center border border-[#E8DCC8] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-black text-[#1F2A44] font-heading uppercase tracking-wider">
          Student Registration
        </span>
        <div className="w-9" />
      </div>

      {/* Arched Illustration Frame */}
      <div className="relative z-10 mx-3 mt-1 rounded-t-[32px] rounded-b-[20px] overflow-hidden bg-gradient-to-b from-[#E8DCC8] via-[#FAF8F3] to-[#E8DCC8] border-2 border-[#E8DCC8] shadow-xs">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1F2A44] via-[#C6A75E] to-[#1F2A44]" />
        <div className="relative w-full h-[150px] flex items-center justify-center overflow-hidden">
          <div className="w-full h-full max-w-[170px] flex items-center justify-center">
            <LottiePlayer
              animationData={studentWalkingAnim}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Clean Form Area */}
      <div className="flex-1 px-6 pt-3 pb-6 flex flex-col justify-between">
        <div>
          <div className="mb-3">
            <h1 className="text-2xl font-black text-[#1F2A44] font-heading">
              Sign Up
            </h1>
            <p className="text-xs text-[#706B62] font-medium mt-0.5">
              Create your official verified attendance account.
            </p>
          </div>

          {/* Role Segmented Switch */}
          <div className="p-1 rounded-2xl bg-[#E8DCC8]/60 flex gap-1 mb-3.5 border border-[#E8DCC8]">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-2 rounded-xl text-xs font-heading font-extrabold transition-all cursor-pointer ${
                role === 'student'
                  ? 'bg-[#1F2A44] text-[#FAF8F3] shadow-xs'
                  : 'text-[#1F2A44]'
              }`}
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => setRole('lecturer')}
              className={`flex-1 py-2 rounded-xl text-xs font-heading font-extrabold transition-all cursor-pointer ${
                role === 'lecturer'
                  ? 'bg-[#1F2A44] text-[#FAF8F3] shadow-xs'
                  : 'text-[#1F2A44]'
              }`}
            >
              👨‍🏫 Lecturer
            </button>
          </div>

          {error && (
            <div className="mb-3 p-2.5 rounded-xl bg-[#B95757]/10 border border-[#B95757]/30 flex items-center gap-2 text-xs text-[#B95757]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleRegister} className="space-y-2.5">
            <div>
              <label className="block text-[11px] font-extrabold text-[#1F2A44] mb-1 font-heading">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#706B62] absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Gabriella Ucyeye"
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-[#E8DCC8] text-xs text-[#252733] placeholder:text-[#706B62]/60 focus:outline-none focus:ring-2 focus:ring-[#1F2A44] font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-[#1F2A44] mb-1 font-heading">
                University Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#706B62] absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-[#E8DCC8] text-xs text-[#252733] placeholder:text-[#706B62]/60 focus:outline-none focus:ring-2 focus:ring-[#1F2A44] font-medium"
                />
              </div>
            </div>

            {role === 'student' && (
              <div>
                <label className="block text-[11px] font-extrabold text-[#1F2A44] mb-1 font-heading">
                  Student ID Number
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-[#706B62] absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. STU-2024-8841"
                    className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-[#E8DCC8] text-xs text-[#252733] placeholder:text-[#706B62]/60 focus:outline-none focus:ring-2 focus:ring-[#1F2A44] font-medium"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-extrabold text-[#1F2A44] mb-1 font-heading">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#706B62] absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full h-10 pl-10 pr-3 rounded-xl bg-white border border-[#E8DCC8] text-xs text-[#252733] placeholder:text-[#706B62]/60 focus:outline-none focus:ring-2 focus:ring-[#1F2A44]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#1F2A44] mb-1 font-heading">
                  Confirm
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full h-10 px-3 rounded-xl bg-white border border-[#E8DCC8] text-xs text-[#252733] placeholder:text-[#706B62]/60 focus:outline-none focus:ring-2 focus:ring-[#1F2A44]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 mt-3 rounded-xl bg-[#1F2A44] hover:bg-[#2b3a5c] active:scale-[0.98] text-[#FAF8F3] font-heading font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#1F2A44]/20 transition-all cursor-pointer border border-[#1F2A44]"
            >
              <span>Create Account</span>
            </button>
          </form>
        </div>

        <div className="pt-3 text-center border-t border-[#E8DCC8] mt-3">
          <p className="text-xs text-[#706B62]">
            Already have an account?{' '}
            <button
              onClick={onNavigateLogin}
              className="font-extrabold text-[#1F2A44] hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
