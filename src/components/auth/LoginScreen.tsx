import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, AlertCircle, Sparkles, GraduationCap } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { UserRole } from '../../types/attendance';
import { LottiePlayer } from '../common/LottiePlayer';
import studentScanAnim from '../../assets/animations/student_scan.json';

interface LoginScreenProps {
  onBack: () => void;
  onNavigateRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onNavigateRegister }) => {
  const { login } = useAttendance();

  const [email, setEmail] = useState('gabriella.ucyeye@university.edu');
  const [password, setPassword] = useState('student2026');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState<string | null>(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmailSent, setForgotEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid university email address.');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }
    setError(null);
    login(role);
  };

  const fillDemo = (demoRole: UserRole) => {
    if (demoRole === 'student') {
      setEmail('gabriella.ucyeye@university.edu');
      setPassword('studentPass2026');
      setRole('student');
    } else {
      setEmail('k.mensah@university.edu');
      setPassword('lecturerPass2026');
      setRole('lecturer');
    }
    setError(null);
  };

  return (
    <div className="relative flex flex-col min-h-full bg-[#FAF8F3] text-[#252733] overflow-hidden select-none">
      {/* Top Header Bar */}
      <div className="relative z-20 pt-4 px-5 pb-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-[#E8DCC8]/60 hover:bg-[#E8DCC8] active:scale-95 text-[#1F2A44] flex items-center justify-center border border-[#E8DCC8] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-black text-[#1F2A44] font-heading uppercase tracking-wider">
          University Sign In
        </span>
        <div className="w-9" />
      </div>

      {/* Arched Illustration Frame in Warm Beige & Navy */}
      <div className="relative z-10 mx-3 mt-1 rounded-t-[32px] rounded-b-[20px] overflow-hidden bg-gradient-to-b from-[#E8DCC8] via-[#FAF8F3] to-[#E8DCC8] border-2 border-[#E8DCC8] shadow-xs">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1F2A44] via-[#C6A75E] to-[#1F2A44]" />
        <div className="relative w-full h-[185px] flex items-center justify-center overflow-hidden">
          <div className="w-full h-full max-w-[200px] flex items-center justify-center">
            <LottiePlayer
              animationData={studentScanAnim}
              className="w-full h-full"
            />
          </div>
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[#252733] pointer-events-none">
            <span className="text-[10px] font-extrabold font-heading bg-[#FAF8F3]/95 px-2.5 py-0.5 rounded-full border border-[#E8DCC8] shadow-2xs text-[#1F2A44]">
              Smart Attendance Portal
            </span>
          </div>
        </div>
      </div>

      {/* Clean Form Area */}
      <div className="flex-1 px-6 pt-3 pb-5 flex flex-col justify-between">
        <div>
          <div className="mb-3">
            <h1 className="text-2xl font-black text-[#1F2A44] font-heading">
              Login
            </h1>
            <p className="text-xs text-[#706B62] font-medium mt-0.5">
              Enter your university credentials to verify attendance.
            </p>
          </div>

          {/* Role Segmented Switch */}
          <div className="p-1 rounded-2xl bg-[#E8DCC8]/60 flex gap-1 mb-3.5 border border-[#E8DCC8]">
            <button
              type="button"
              onClick={() => {
                setRole('student');
                setEmail('gabriella.ucyeye@university.edu');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-heading font-extrabold transition-all cursor-pointer ${
                role === 'student'
                  ? 'bg-[#1F2A44] text-[#FAF8F3] shadow-xs'
                  : 'text-[#1F2A44] hover:text-[#C6A75E]'
              }`}
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('lecturer');
                setEmail('k.mensah@university.edu');
              }}
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

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-extrabold text-[#1F2A44] mb-1 font-heading">
                Username / Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#706B62] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@university.edu"
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-[#E8DCC8] text-xs text-[#252733] placeholder:text-[#706B62]/60 focus:outline-none focus:ring-2 focus:ring-[#1F2A44] font-medium shadow-2xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-extrabold text-[#1F2A44] font-heading">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-[10px] font-bold text-[#C6A75E] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#706B62] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-white border border-[#E8DCC8] text-xs text-[#252733] placeholder:text-[#706B62]/60 focus:outline-none focus:ring-2 focus:ring-[#1F2A44] font-medium shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#706B62] hover:text-[#252733] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Primary Button (Navy #1F2A44) */}
            <button
              type="submit"
              className="w-full h-11 mt-2 rounded-xl bg-[#1F2A44] hover:bg-[#2b3a5c] active:scale-[0.98] text-[#FAF8F3] font-heading font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#1F2A44]/20 transition-all cursor-pointer border border-[#1F2A44]"
            >
              <span>Login</span>
            </button>

            {/* Fast Demo Credentials Fill */}
            <div className="pt-1">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemo('student')}
                  className="px-2 py-1.5 rounded-lg bg-[#E8DCC8]/50 border border-[#E8DCC8] text-[10px] font-bold text-[#1F2A44] hover:border-[#1F2A44] transition-colors cursor-pointer text-center"
                >
                  Fill Gabriella
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo('lecturer')}
                  className="px-2 py-1.5 rounded-lg bg-[#E8DCC8]/50 border border-[#E8DCC8] text-[10px] font-bold text-[#1F2A44] hover:border-[#1F2A44] transition-colors cursor-pointer text-center"
                >
                  Fill Dr. Kwame
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Bottom Switch Link */}
        <div className="pt-3 text-center border-t border-[#E8DCC8]">
          <p className="text-xs text-[#706B62]">
            Don't have an account?{' '}
            <button
              onClick={onNavigateRegister}
              className="font-extrabold text-[#1F2A44] hover:underline cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#FAF8F3] border border-[#E8DCC8] p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-[#1F2A44] font-heading">
              Reset Password
            </h3>
            <p className="text-xs text-[#706B62]">
              Enter your student or faculty email to receive a recovery token.
            </p>
            <input
              type="email"
              defaultValue={email}
              className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#E8DCC8] text-sm text-[#252733]"
            />
            {forgotEmailSent ? (
              <p className="text-xs font-semibold text-[#4F8A67] bg-[#4F8A67]/10 p-2 rounded-xl text-center">
                ✓ Password recovery link sent to university inbox!
              </p>
            ) : null}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setForgotModalOpen(false);
                  setForgotEmailSent(false);
                }}
                className="flex-1 py-2.5 rounded-xl border border-[#E8DCC8] text-xs font-bold text-[#1F2A44] cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setForgotEmailSent(true)}
                className="flex-1 py-2.5 rounded-xl bg-[#1F2A44] text-xs font-bold text-[#FAF8F3] cursor-pointer"
              >
                Send Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
