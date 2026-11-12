import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AttendanceProvider, useAttendance } from './context/AttendanceContext';
import { MobileShell } from './components/layout/MobileShell';
import { TopNavBar } from './components/layout/TopNavBar';
import { BottomTabBar, StudentTab, LecturerTab } from './components/layout/BottomTabBar';

// Auth Screens
import { OnboardingCarousel } from './components/onboarding/OnboardingCarousel';
import { WelcomeScreen } from './components/auth/WelcomeScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { RegisterScreen } from './components/auth/RegisterScreen';

// Student Screens & Modals
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentCoursesView } from './components/student/StudentCoursesView';
import { AttendanceHistoryView } from './components/student/AttendanceHistoryView';
import { AttendanceProgressView } from './components/student/AttendanceProgressView';
import { StudentProfileView } from './components/student/StudentProfileView';
import { QrScannerModal } from './components/student/QrScannerModal';
import { CheckInConfirmationModal } from './components/student/CheckInConfirmationModal';
import { StudentNotificationsModal } from './components/student/StudentNotificationsModal';
import { CourseDetailModal } from './components/student/CourseDetailModal';

// Lecturer Screens & Modals
import { LecturerDashboard } from './components/lecturer/LecturerDashboard';
import { LecturerCoursesView } from './components/lecturer/LecturerCoursesView';
import { LiveSessionView } from './components/lecturer/LiveSessionView';
import { LecturerReportsView } from './components/lecturer/LecturerReportsView';
import { LecturerProfileView } from './components/lecturer/LecturerProfileView';
import { StartSessionModal } from './components/lecturer/StartSessionModal';
import { SessionSummaryModal } from './components/lecturer/SessionSummaryModal';

import { Course, AttendanceRecord } from './types/attendance';

function MainAppContent() {
  const {
    isAuthenticated,
    showOnboarding,
    completeOnboarding,
    replayOnboarding,
    userRole,
    lastSessionSummary,
    clearSessionSummary,
  } = useAttendance();

  // Navigation tab state
  const [studentTab, setStudentTab] = useState<StudentTab>('home');
  const [lecturerTab, setLecturerTab] = useState<LecturerTab>('home');

  // Auth sub-view when unauthenticated
  const [authView, setAuthView] = useState<'welcome' | 'login' | 'register'>('welcome');

  // Modals state
  const [scannerOpen, setScannerOpen] = useState(false);
  const [confirmedRecord, setConfirmedRecord] = useState<AttendanceRecord | null>(null);
  const [startSessionOpen, setStartSessionOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [modalCourse, setModalCourse] = useState<Course | null>(null);

  // If not logged in, render Onboarding OR Welcome / Login / Register screens
  if (!isAuthenticated) {
    if (showOnboarding) {
      return (
        <MobileShell>
          <AnimatePresence mode="wait">
            <motion.div
              key="onboarding-flow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="min-h-full"
            >
              <OnboardingCarousel
                onComplete={() => {
                  completeOnboarding();
                  setAuthView('welcome');
                }}
                onSkip={() => {
                  completeOnboarding();
                  setAuthView('welcome');
                }}
              />
            </motion.div>
          </AnimatePresence>
        </MobileShell>
      );
    }

    return (
      <MobileShell>
        <AnimatePresence mode="wait">
          {authView === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25 }}
              className="min-h-full"
            >
              <WelcomeScreen
                onGetStarted={() => setAuthView('register')}
                onSignIn={() => setAuthView('login')}
                onReplayOnboarding={() => replayOnboarding()}
              />
            </motion.div>
          )}
          {authView === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="min-h-full"
            >
              <LoginScreen
                onBack={() => setAuthView('welcome')}
                onNavigateRegister={() => setAuthView('register')}
              />
            </motion.div>
          )}
          {authView === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="min-h-full"
            >
              <RegisterScreen
                onBack={() => setAuthView('welcome')}
                onNavigateLogin={() => setAuthView('login')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </MobileShell>
    );
  }

  const activeTabKey = userRole === 'student' ? studentTab : lecturerTab;

  return (
    <MobileShell onOpenScanner={() => setScannerOpen(true)}>
      {/* Top App Bar */}
      <TopNavBar
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenProfile={() => {
          if (userRole === 'student') setStudentTab('profile');
          else setLecturerTab('profile');
        }}
      />

      {/* Main Views by Role with Smooth Stagger / Page Transitions */}
      <div className="min-h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${userRole}-${activeTabKey}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {userRole === 'student' ? (
              <>
                {studentTab === 'home' && (
                  <StudentDashboard
                    onOpenScanner={() => setScannerOpen(true)}
                    onNavigateCourses={() => setStudentTab('courses')}
                    onNavigateHistory={() => setStudentTab('history')}
                    onNavigateProgress={() => setStudentTab('progress')}
                    onSelectCourse={(course) => setModalCourse(course)}
                  />
                )}
                {studentTab === 'courses' && <StudentCoursesView />}
                {studentTab === 'history' && <AttendanceHistoryView />}
                {studentTab === 'progress' && (
                  <AttendanceProgressView onBack={() => setStudentTab('home')} />
                )}
                {studentTab === 'profile' && <StudentProfileView />}
              </>
            ) : (
              <>
                {lecturerTab === 'home' && (
                  <LecturerDashboard
                    onStartSessionClick={() => setStartSessionOpen(true)}
                    onNavigateLiveSession={() => setLecturerTab('sessions')}
                    onNavigateCourses={() => setLecturerTab('courses')}
                    onNavigateReports={() => setLecturerTab('reports')}
                  />
                )}
                {lecturerTab === 'courses' && (
                  <LecturerCoursesView
                    onStartSessionForCourse={() => setStartSessionOpen(true)}
                  />
                )}
                {lecturerTab === 'sessions' && (
                  <LiveSessionView
                    onStartNewSession={() => setStartSessionOpen(true)}
                    onSessionEnded={() => {
                      // Last session summary handled automatically
                    }}
                  />
                )}
                {lecturerTab === 'reports' && <LecturerReportsView />}
                {lecturerTab === 'profile' && <LecturerProfileView />}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Role-Specific Bottom Tab Bar */}
      <BottomTabBar
        currentTab={userRole === 'student' ? studentTab : lecturerTab}
        onTabChange={(tab) => {
          if (userRole === 'student') {
            if (tab === 'scan') {
              setScannerOpen(true);
            } else {
              setStudentTab(tab as StudentTab);
            }
          } else {
            setLecturerTab(tab as LecturerTab);
          }
        }}
        onOpenScanner={() => setScannerOpen(true)}
        onStartSession={() => setStartSessionOpen(true)}
      />

      {/* Scanner Modal */}
      {scannerOpen && (
        <QrScannerModal
          onClose={() => setScannerOpen(false)}
          onSuccess={(record) => {
            setScannerOpen(false);
            setConfirmedRecord(record);
          }}
        />
      )}

      {/* Check-In Confirmation Modal */}
      {confirmedRecord && (
        <CheckInConfirmationModal
          record={confirmedRecord}
          onClose={() => setConfirmedRecord(null)}
          onViewCourse={() => setStudentTab('courses')}
        />
      )}

      {/* Start Session Modal (Lecturer) */}
      {startSessionOpen && (
        <StartSessionModal
          onClose={() => setStartSessionOpen(false)}
          onSessionStarted={() => {
            setStartSessionOpen(false);
            setLecturerTab('sessions');
          }}
        />
      )}

      {/* Session Summary Modal (Lecturer when session ends) */}
      {lastSessionSummary && (
        <SessionSummaryModal
          summary={lastSessionSummary}
          onClose={clearSessionSummary}
        />
      )}

      {/* Student Notifications Modal */}
      {notificationsOpen && (
        <StudentNotificationsModal
          onClose={() => setNotificationsOpen(false)}
          onOpenScanner={() => setScannerOpen(true)}
        />
      )}

      {/* Course Detail Modal */}
      {modalCourse && (
        <CourseDetailModal
          course={modalCourse}
          onClose={() => setModalCourse(null)}
        />
      )}
    </MobileShell>
  );
}

export default function App() {
  return (
    <AttendanceProvider>
      <MainAppContent />
    </AttendanceProvider>
  );
}
