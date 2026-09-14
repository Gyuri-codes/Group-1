import React, { useState } from 'react';
import { useResort } from '../context/ResortContext';
import { 
  X, 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Crown,
  AlertCircle,
  Loader2,
  ShieldCheck
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    authModalMode, 
    closeAuthModal, 
    openAuthModal, 
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    loginUser,
    authLoading,
    authError,
    clearAuthError
  } = useResort();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [localError, setLocalError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleGoogleSignIn = async () => {
    setLocalError(null);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      // Error handled in context or captured here
      console.warn('Google sign-in attempt:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    try {
      if (authModalMode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password, {
          firstName: firstName || 'Guest',
          lastName: lastName || 'Traveler',
          phone: phone || '+63 917 000 0000',
          loyaltyPoints: 350,
          loyaltyTier: 'Wave',
          memberSince: new Date().getFullYear().toString()
        });
      }
    } catch (err: any) {
      console.warn('Auth form error:', err);
    }
  };

  const activeError = localError || authError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#E0D5C1] shadow-2xl relative my-auto">
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF7F2] text-[#4A3E31] hover:bg-[#EDE4D3] transition cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-full bg-[#E4A853] text-[#2C241D] flex items-center justify-center font-bold text-lg shadow-sm">
            👑
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#2C241D]">
              {authModalMode === 'login' ? 'Welcome Back to Alon' : 'Join Alon Glow Club'}
            </h3>
            <p className="text-xs text-[#7A6A58]">
              {authModalMode === 'login' 
                ? 'Access your cloud reservations & Glow rewards' 
                : 'Earn 350 bonus points upon registration & 10% off'}
            </p>
          </div>
        </div>

        {/* Google OAuth Quick Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={authLoading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-stone-50 text-stone-800 text-xs sm:text-sm font-semibold rounded-xl border border-stone-300 shadow-xs transition duration-150 cursor-pointer disabled:opacity-60"
          >
            {authLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#006D77]" />
            ) : (
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.97 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex py-2 items-center mb-4">
          <div className="grow border-t border-stone-200"></div>
          <span className="shrink mx-3 text-[11px] text-stone-400 uppercase font-medium tracking-wider">
            or with email
          </span>
          <div className="grow border-t border-stone-200"></div>
        </div>

        {/* Error Notice */}
        {activeError && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{activeError}</p>
            </div>
            <button 
              type="button" 
              onClick={() => {
                setLocalError(null);
                clearAuthError();
              }}
              className="text-rose-400 hover:text-rose-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="grid grid-cols-2 p-1 bg-[#FAF7F2] rounded-xl mb-4 text-xs font-bold text-[#6B5A48]">
          <button
            type="button"
            onClick={() => {
              setLocalError(null);
              clearAuthError();
              openAuthModal('login');
            }}
            className={`py-2 rounded-lg transition cursor-pointer ${authModalMode === 'login' ? 'bg-white text-[#2C241D] shadow-xs' : 'hover:text-[#2C241D]'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setLocalError(null);
              clearAuthError();
              openAuthModal('signup');
            }}
            className={`py-2 rounded-lg transition cursor-pointer ${authModalMode === 'signup' ? 'bg-white text-[#2C241D] shadow-xs' : 'hover:text-[#2C241D]'}`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {authModalMode === 'signup' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#6B5A48] mb-1 uppercase text-[10px]">First Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    placeholder="e.g. Maria"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium focus:ring-1 focus:ring-[#006D77] focus:outline-hidden"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-[#6B5A48] mb-1 uppercase text-[10px]">Last Name</label>
                <input
                  type="text"
                  placeholder="e.g. Santos"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium focus:ring-1 focus:ring-[#006D77] focus:outline-hidden"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-[#6B5A48] mb-1 uppercase text-[10px]">Email Address</label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium focus:ring-1 focus:ring-[#006D77] focus:outline-hidden"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#6B5A48] mb-1 uppercase text-[10px]">Password</label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
              <input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium focus:ring-1 focus:ring-[#006D77] focus:outline-hidden"
                required
              />
            </div>
          </div>

          {authModalMode === 'signup' && (
            <div>
              <label className="block font-bold text-[#6B5A48] mb-1 uppercase text-[10px]">Mobile Phone</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                <input
                  type="tel"
                  placeholder="+63 917 582 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 bg-[#FAF7F2] border border-[#DDD0B9] rounded-xl text-[#2C241D] font-medium focus:ring-1 focus:ring-[#006D77] focus:outline-hidden"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-3 rounded-xl bg-[#2C241D] hover:bg-[#1E1712] text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer mt-3 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {authLoading && <Loader2 className="w-4 h-4 animate-spin text-[#E4A853]" />}
            <span>
              {authModalMode === 'login' ? 'Sign In to Glow Account' : 'Register & Claim 350 Glow Pts'}
            </span>
          </button>
        </form>

        {/* Quick Demo Login Preset Buttons */}
        <div className="mt-4 pt-3 border-t border-[#EFE8DC]">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest text-center mb-2">
            Quick Demo Accounts
          </p>
          <div className="grid grid-cols-3 gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => {
                loginUser('guest@alon.ph', 'customer', 'Maria Santos (Guest)');
                closeAuthModal();
              }}
              className="py-1.5 px-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition cursor-pointer text-center"
            >
              Guest 🏖️
            </button>
            <button
              type="button"
              onClick={() => {
                loginUser('staff@alon.ph', 'staff', 'Kuya Noel (Concierge)');
                closeAuthModal();
              }}
              className="py-1.5 px-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#006D77] font-medium transition cursor-pointer text-center"
            >
              Staff 🔑
            </button>
            <button
              type="button"
              onClick={() => {
                loginUser('admin@alon.ph', 'admin', 'General Manager');
                closeAuthModal();
              }}
              className="py-1.5 px-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-medium transition cursor-pointer text-center"
            >
              Admin 👑
            </button>
          </div>
        </div>

        {/* Member Perk snippet */}
        <div className="mt-4 pt-3 border-t border-[#EFE8DC] text-[11px] text-[#6B5A48] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E4A853] shrink-0" />
          <span>Members enjoy 10% lower rates, free welcome sunset cocktail & cloud reservation sync.</span>
        </div>
      </div>
    </div>
  );
};

