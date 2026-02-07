
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Menu, Sun, Moon, LogOut, 
  ShieldCheck, ChevronDown, LayoutDashboard
} from 'lucide-react';

import { Language, User } from './types';
import { NAV_LINKS } from './constants';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import LearnPage from './pages/LearnPage';
import StorePage from './pages/StorePage';
import BlogPage from './pages/BlogPage';
import InterpreterPage from './pages/InterpreterPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CheckoutPage from './pages/CheckoutPage';
import BookCheckoutPage from './pages/BookCheckoutPage';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';
import AIChatbot from './components/AIChatbot';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('BN');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('huayu_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('huayu_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('huayu_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('huayu_theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'EN' ? 'BN' : 'EN';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  
  const handleLogout = () => {
    localStorage.removeItem('huayu_user');
    setCurrentUser(null);
    setIsDropdownOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
        <CustomCursor />
        
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-[#C1121F] rounded-lg flex items-center justify-center text-white font-bold text-xl chinese-font group-hover:rotate-12 transition-transform shadow-lg shadow-red-500/10">
                  华
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold tracking-tight block leading-none text-zinc-900 dark:text-white uppercase">MASUD</span>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-black">LANGUAGE LAB</span>
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map(link => (
                  <Link 
                    key={link.path} 
                    to={link.path}
                    className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-[#C1121F] dark:hover:text-[#C1121F] transition-all"
                  >
                    {link.label[lang]}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={toggleLang} 
                  className="hidden sm:flex p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-all text-zinc-600 dark:text-zinc-300"
                >
                  <Globe className="w-4 h-4" /> {lang}
                </button>
                
                <button 
                  onClick={toggleDarkMode} 
                  className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#C1121F] transition-all group relative overflow-hidden"
                  aria-label="Toggle Dark Mode"
                >
                  <motion.div
                    initial={false}
                    animate={{ y: darkMode ? -40 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <Moon className="w-4 h-4 text-zinc-400 group-hover:text-[#C1121F]" />
                    <Sun className="w-4 h-4 text-yellow-500 mt-6 absolute" />
                  </motion.div>
                </button>

                {currentUser ? (
                  <div className="relative ml-1">
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-[#C1121F] transition-all shadow-sm"
                    >
                      <div className="w-6 h-6 bg-[#C1121F] rounded-lg flex items-center justify-center text-[10px] text-white font-bold">
                        {currentUser.isAdmin ? 'A' : currentUser.name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block text-zinc-800 dark:text-zinc-200">
                        {currentUser.isAdmin ? 'Admin' : currentUser.name.split(' ')[0]}
                      </span>
                      <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden py-2"
                        >
                          {currentUser.isAdmin && (
                            <Link to="/admin" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-800 text-[#C1121F]">
                              <LayoutDashboard className="w-4 h-4" /> {lang === 'EN' ? 'Admin Portal' : 'এডমিন পোর্টাল'}
                            </Link>
                          )}
                          <Link to="/dashboard" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                            <ShieldCheck className="w-4 h-4" /> {lang === 'EN' ? 'Student Dashboard' : 'ড্যাশবোর্ড'}
                          </Link>
                          <div className="h-px bg-zinc-100 dark:bg-zinc-800 mx-2 my-1" />
                          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20">
                            <LogOut className="w-4 h-4" /> {lang === 'EN' ? 'Logout' : 'লগআউট'}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link to="/login" className="ml-1 px-6 py-2 bg-[#C1121F] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-500/10 active:scale-95">
                    {lang === 'EN' ? 'Login' : 'লগইন'}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage lang={lang} />} />
            <Route path="/about" element={<AboutPage lang={lang} />} />
            <Route path="/courses" element={<CoursesPage lang={lang} user={currentUser} />} />
            <Route path="/learn" element={<LearnPage lang={lang} />} />
            <Route path="/store" element={<StorePage lang={lang} />} />
            <Route path="/blog" element={<BlogPage lang={lang} />} />
            <Route path="/interpreter" element={<InterpreterPage lang={lang} />} />
            <Route path="/contact" element={<ContactPage lang={lang} />} />
            <Route path="/login" element={<LoginPage lang={lang} setUser={setCurrentUser} />} />
            <Route path="/admin/login" element={<AdminLoginPage lang={lang} setUser={setCurrentUser} />} />
            <Route path="/register" element={<RegisterPage lang={lang} setUser={setCurrentUser} />} />
            <Route path="/checkout/:courseId" element={<CheckoutPage lang={lang} user={currentUser} />} />
            <Route path="/book-checkout" element={<BookCheckoutPage lang={lang} user={currentUser} />} />
            <Route path="/lesson/:courseId" element={currentUser ? <LessonPage lang={lang} user={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/quiz" element={<QuizPage lang={lang} user={currentUser} />} />
            <Route 
              path="/dashboard" 
              element={currentUser ? <DashboardPage lang={lang} user={currentUser} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin/*" 
              element={currentUser?.isAdmin ? <AdminDashboard lang={lang} /> : <Navigate to="/admin/login" />} 
            />
          </Routes>
        </main>

        {/* Global AI Chatbot */}
        <AIChatbot lang={lang} />

        <footer className="bg-zinc-50 dark:bg-zinc-900/50 py-16 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} Masud Language Lab. Standard Registry.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
