import React from 'react';
import { X, Bell, Check, Sparkles, AlertCircle, Info, Clock, CheckCheck } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

interface StudentNotificationsModalProps {
  onClose: () => void;
  onOpenScanner?: () => void;
}

export const StudentNotificationsModal: React.FC<StudentNotificationsModalProps> = ({
  onClose,
  onOpenScanner,
}) => {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useAttendance();

  return (
    <div className="fixed inset-0 z-50 bg-[#1F2A44]/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md max-h-[85vh] rounded-t-3xl sm:rounded-2xl bg-[#FAF8F3] border border-[#E8DCC8] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-4 border-b border-[#E8DCC8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#1F2A44] text-[#C6A75E] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1F2A44] font-heading">
                Campus Notifications
              </h2>
              <span className="text-[10px] text-[#706B62]">
                {notifications.filter((n) => !n.read).length} unread updates
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="text-[11px] font-bold text-[#706B62] hover:text-[#1F2A44] cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-[#E8DCC8] flex items-center justify-center text-[#1F2A44] hover:bg-[#E8DCC8]/30 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto no-scrollbar p-4 space-y-2.5 flex-1">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                notif.read
                  ? 'bg-white border-[#E8DCC8]/70 opacity-80'
                  : 'bg-[#FAF8F3] border-[#C6A75E] shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    notif.type === 'session'
                      ? 'bg-[#1F2A44] text-[#C6A75E]'
                      : notif.type === 'success'
                      ? 'bg-[#4F8A67]/15 text-[#4F8A67]'
                      : notif.type === 'warning'
                      ? 'bg-[#C28B3C]/15 text-[#C28B3C]'
                      : 'bg-[#1F2A44]/10 text-[#1F2A44]'
                  }`}
                >
                  {notif.type === 'session' && <Sparkles className="w-4 h-4" />}
                  {notif.type === 'success' && <Check className="w-4 h-4" />}
                  {notif.type === 'warning' && <AlertCircle className="w-4 h-4" />}
                  {notif.type === 'info' && <Info className="w-4 h-4" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#1F2A44] leading-tight font-heading">
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-[#706B62]">{notif.timestamp}</span>
                  </div>

                  <p className="text-xs text-[#252733]/85 leading-relaxed">
                    {notif.message}
                  </p>

                  {notif.type === 'session' && onOpenScanner && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                        onOpenScanner();
                      }}
                      className="mt-2 px-3 py-1.5 rounded-xl bg-[#1F2A44] text-white text-[11px] font-bold font-heading hover:bg-[#2C3B5E] cursor-pointer inline-flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <span>Open Scanner Now</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="p-8 text-center text-[#706B62] space-y-1">
              <CheckCheck className="w-8 h-8 mx-auto opacity-40 text-[#4F8A67]" />
              <p className="text-xs font-bold text-[#1F2A44]">All caught up!</p>
              <p className="text-[11px]">No active campus announcements.</p>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-[#E8DCC8] bg-white">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#1F2A44] hover:bg-[#2C3B5E] text-white text-xs font-bold font-heading cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
