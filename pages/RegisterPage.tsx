
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Phone, Lock, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Language, User } from '../types';

interface Props { 
  lang: Language;
  setUser: (user: User) => void;
}

const RegisterPage: React.FC<Props> = ({ lang, setUser }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', goal: 'Study'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Get all registered users
    const allUsers: any[] = JSON.parse(localStorage.getItem('huayu_users') || '[]');
    
    // Check for duplicate Gmail
    const isDuplicate = allUsers.some(u => u.email.toLowerCase() === formData.email.toLowerCase());

    if (isDuplicate) {
      setTimeout(() => {
        setError(lang === 'BN' ? 'এই Gmail দিয়ে ইতিমধ্যে একটি একাউন্ট তৈরি করা হয়েছে' : 'An account has already been created with this Gmail');
        setIsLoading(false);
      }, 800);
      return;
    }

    setTimeout(() => {
      const newUser: User = {
        id: 'u-' + Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        goal: formData.goal,
        enrolledCourses: [],
        purchasedBooks: []
      };

      // Storage security simulation
      const userToStore = { ...newUser, password: formData.password };
      localStorage.setItem('huayu_users', JSON.stringify([...allUsers, userToStore]));
      
      // Auto Login
      localStorage.setItem('huayu_user', JSON.stringify(newUser));
      setUser(newUser);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const getPasswordStrength = () => {
    if (!formData.password) return 0;
    let strength = 0;
    if (formData.password.length > 6) strength += 33;
    if (/[A-Z]/.test(formData.password)) strength += 33;
    if (/[0-9]/.test(formData.password)) strength += 34;
    return strength;
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white dark:bg-zinc-900 p-8 md:p-14 rounded-[3.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-red-500/5"
      >
        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-2.5">
            {[1, 2].map(s => (
              <div key={s} className={`h-1.5 rounded-full transition-all ${step >= s ? 'w-12 bg-[#C1121F]' : 'w-4 bg-zinc-200 dark:bg-zinc-800'}`} />
            ))}
          </div>
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Protocol {step} of 2</span>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="mb-10 p-5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-red-600 rounded-2xl flex items-center gap-4 text-sm font-bold"
          >
            <AlertCircle className="w-6 h-6 shrink-0" />
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <header>
                <h1 className="text-4xl font-black mb-4 tracking-tight">{lang === 'EN' ? 'Join Academy' : 'যোগ দিন'}</h1>
                <p className="text-zinc-500 font-medium">{lang === 'EN' ? 'Create your official student identity.' : 'আপনার অফিশিয়াল স্টুডেন্ট একাউন্ট তৈরি করুন।'}</p>
              </header>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">{lang === 'EN' ? 'Identity Name' : 'পুরো নাম'}</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-[#C1121F] transition-colors" />
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#C1121F] dark:focus:border-[#C1121F] rounded-2xl pl-14 pr-6 py-5 outline-none font-bold transition-all shadow-sm"
                      placeholder="e.g. Mehedi Hasan"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">{lang === 'EN' ? 'Gmail Access' : 'জিমেইল ঠিকানা'}</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-[#C1121F] transition-colors" />
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#C1121F] dark:focus:border-[#C1121F] rounded-2xl pl-14 pr-6 py-5 outline-none font-bold transition-all shadow-sm"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">{lang === 'EN' ? 'Contact Mobile' : 'ফোন নম্বর'}</label>
                  <div className="relative group">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-[#C1121F] transition-colors" />
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#C1121F] dark:focus:border-[#C1121F] rounded-2xl pl-14 pr-6 py-5 outline-none font-bold transition-all shadow-sm"
                      placeholder="+8801XXXXXXXXX"
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full py-5 bg-zinc-950 dark:bg-zinc-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#C1121F] transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-4"
              >
                {lang === 'EN' ? 'Security Protocol' : 'পরবর্তী ধাপ'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <header>
                <button onClick={() => setStep(1)} className="text-[#C1121F] font-black flex items-center gap-2 text-[10px] uppercase tracking-widest mb-8 hover:gap-3 transition-all">
                  <ArrowLeft className="w-4 h-4" /> {lang === 'EN' ? 'Revision' : 'পেছনে যান'}
                </button>
                <h1 className="text-4xl font-black mb-4 tracking-tight">{lang === 'EN' ? 'Final Auth' : 'একাউন্ট সুরক্ষিত করুন'}</h1>
                <p className="text-zinc-500 font-medium">{lang === 'EN' ? 'Finalize your access credentials.' : 'আপনার যাত্রা শুরু করতে পাসওয়ার্ড সেট করুন।'}</p>
              </header>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">{lang === 'EN' ? 'Academy Focus' : 'মূল লক্ষ্য'}</label>
                  <select 
                    value={formData.goal}
                    onChange={e => setFormData({...formData, goal: e.target.value})}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#C1121F] rounded-2xl px-6 py-5 outline-none font-black uppercase tracking-widest text-[11px] appearance-none cursor-pointer"
                  >
                    <option value="Study">{lang === 'EN' ? 'Study in China' : 'চীনে উচ্চশিক্ষা'}</option>
                    <option value="Business">{lang === 'EN' ? 'Business with China' : 'চীনের সাথে ব্যবসা'}</option>
                    <option value="Job">{lang === 'EN' ? 'Career Excellence' : 'ক্যারিয়ারের সুযোগ'}</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">{lang === 'EN' ? 'Access Key' : 'পাসওয়ার্ড'}</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 transition-colors group-focus-within:text-[#C1121F]" />
                    <input 
                      required
                      type="password" 
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent focus:border-[#C1121F] rounded-2xl pl-14 pr-6 py-5 outline-none font-bold transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full mt-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${getPasswordStrength()}%` }}
                      className={`h-full transition-colors ${getPasswordStrength() > 66 ? 'bg-green-500' : getPasswordStrength() > 33 ? 'bg-yellow-500' : 'bg-[#C1121F]'}`}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700">
                  <input type="checkbox" className="mt-1.5 w-4 h-4 accent-[#C1121F] shrink-0" id="terms" required />
                  <label htmlFor="terms" className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed cursor-pointer">
                    {lang === 'EN' 
                      ? "I understand that a single Gmail permits only one identity. Duplicate registry is restricted." 
                      : "একটি জিমেইল দিয়ে মাত্র একটি একাউন্টই সম্ভব। পুনরায় নিবন্ধন গ্রহণযোগ্য নয়।"}
                  </label>
                </div>
              </div>

              <button 
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full py-5 bg-[#C1121F] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-2xl shadow-red-500/20 flex items-center justify-center gap-4 disabled:opacity-50 active:scale-[0.98]"
              >
                {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (lang === 'EN' ? 'Authorize Registry' : 'নিবন্ধন সম্পন্ন করুন')}
                {!isLoading && <CheckCircle className="w-5 h-5" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 text-center text-xs font-bold uppercase tracking-widest">
          <span className="text-zinc-400">{lang === 'EN' ? 'Returning Student?' : 'একাউন্ট আছে?'}</span>{' '}
          <Link to="/login" className="text-[#C1121F] hover:underline transition-colors">{lang === 'EN' ? 'Login Portal' : 'লগইন করুন'}</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
