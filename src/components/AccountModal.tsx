import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { X, LogOut, User, Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { logoutAdmin } from "../lib/firebase";
import { useDevicePerformance } from "../lib/useDevicePerformance";
import { GoogleIcon } from "./GoogleIcon";
import { useBodyLock } from "../lib/useBodyLock";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}



export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const { user } = useAuth();
  const { isLowEnd } = useDevicePerformance();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useBodyLock(isOpen);

  const handleLogout = async () => {
    await logoutAdmin();
    onClose();
  };

  if (!mounted || !user) return null;

  const userInitial = user.displayName?.[0] || user.email?.[0]?.toUpperCase() || "U";
  const userPhoto = user.photoURL;
  const isGoogle = user.providerData?.[0]?.providerId === "google.com";

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center pointer-events-auto" dir="rtl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`absolute inset-0 bg-black/80 ${isLowEnd ? '' : 'backdrop-blur-md'}`}
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[400px] bg-[#0d0d0d] border border-white/10 rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Decorative background */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

            {/* Header */}
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between shrink-0 relative z-10">
              <h3 className="text-lg font-black text-white font-arabic">حسابي</h3>
              <button 
                onClick={onClose} 
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Display */}
            <div className="p-6 relative z-10 space-y-6">
              {/* User Identity */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#0d0d0d] shadow-[0_0_0_2px_rgba(255,255,255,0.1)] bg-white/5 flex items-center justify-center">
                    {userPhoto ? (
                      <img src={userPhoto} alt="User avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-black text-white">{userInitial}</span>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 rounded-full bg-[#0d0d0d] flex items-center justify-center shadow-sm">
                    <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  </div>
                </div>
                {user.displayName && (
                  <h2 className="text-xl font-bold text-white mb-1" dir="ltr">{user.displayName}</h2>
                )}
                <p className="text-gray-400 text-sm font-medium" dir="ltr">{user.email}</p>
              </div>

              {/* Account Details Tags */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white/[0.03] border border-white/5 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                      <ShieldCheck size={16} />
                    </div>
                    <span className="text-sm font-bold text-white font-arabic">حالة الحساب</span>
                  </div>
                  <span className="text-xs font-bold text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20 font-arabic">نشط</span>
                </div>

                <div className="flex items-center justify-between bg-white/[0.03] border border-white/5 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                      {isGoogle ? <GoogleIcon /> : <Mail size={16} />}
                    </div>
                    <span className="text-sm font-bold text-white font-arabic">طريقة التسجيل</span>
                  </div>
                  <span className="text-xs font-bold text-gray-400 font-arabic bg-black px-3 py-1.5 rounded-full border border-white/10">
                    {isGoogle ? "Google" : "البريد الإلكتروني"}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 mt-2 relative z-10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all font-bold text-sm font-arabic group"
              >
                <LogOut size={18} className="transition-transform group-hover:-translate-x-1" />
                تسجيل الخروج
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
