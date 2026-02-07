
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Clock, Play, 
  Settings, Bookmark,
  TrendingUp, CheckCircle, Lock, XCircle, ShieldCheck, ShoppingBag, Eye
} from 'lucide-react';
import { Language, User, Enrollment, BookOrder } from '../types';
import { COURSES, BOOKS } from '../constants';

interface Props { 
  lang: Language;
  user: User;
}

const DashboardPage: React.FC<Props> = ({ lang, user }) => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [bookOrders, setBookOrders] = useState<BookOrder[]>([]);

  useEffect(() => {
    // Sync Course Enrollments
    const savedEnr: Enrollment[] = JSON.parse(localStorage.getItem('huayu_enrollments') || '[]');
    setEnrollments(savedEnr.filter(e => e.userId === user.id));
    
    // Sync Book Orders
    const savedOrders: BookOrder[] = JSON.parse(localStorage.getItem('huayu_book_orders') || '[]');
    const userOrders = savedOrders.filter(o => o.userId === user.id);
    setBookOrders(userOrders);

    // CRITICAL: Filter books - only approved ones show in shelf
    const approvedBooks = userOrders
      .filter(o => o.status === 'approved')
      .flatMap(o => o.items.map(i => i.id));
    
    const updatedUser = { ...user, purchasedBooks: [...new Set(approvedBooks)] };
    localStorage.setItem('huayu_user', JSON.stringify(updatedUser));
  }, [user.id]);

  const approvedCourseIds = enrollments
    .filter(e => e.status === 'approved')
    .map(e => e.courseId);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white dark:bg-zinc-950 transition-colors">
      <header className="mb-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-5xl font-black mb-3 text-zinc-900 dark:text-white tracking-tight leading-none">
            {lang === 'EN' ? `Hey, ${user.name.split(' ')[0]}!` : `স্বাগতম, ${user.name.split(' ')[0]}!`}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 flex items-center gap-3 font-black text-[11px] uppercase tracking-[0.2em]">
            <ShieldCheck className="w-5 h-5 text-[#C1121F]" />
            {lang === 'EN' ? 'Authenticated Student Registry' : 'ভেরিফাইড লার্নিং পোর্টাল'}
          </p>
        </motion.div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:block text-right">
             <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-1">{lang === 'EN' ? 'Academy ID' : 'ছাত্র আইডি'}</p>
             <p className="text-xs font-mono font-bold text-zinc-600 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-4 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">{user.id}</p>
          </div>
          <button className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:text-[#C1121F] shadow-lg shadow-black/5 transition-all active:scale-95 group text-zinc-600 dark:text-zinc-400">
            <Settings className="w-6 h-6 group-hover:rotate-45 transition-transform" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-14">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-8 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center shadow-xl shadow-black/5 group relative overflow-hidden transition-all hover:border-[#C1121F]/20">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#C1121F] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-24 h-24 rounded-full border-4 border-[#C1121F]/10 border-t-[#C1121F] flex items-center justify-center mb-8 relative">
                <span className="text-3xl font-black text-zinc-900 dark:text-white">45%</span>
              </div>
              <h4 className="font-black text-[11px] uppercase tracking-widest mb-1 text-zinc-900 dark:text-zinc-100">{lang === 'EN' ? 'Academy Rank' : 'অ্যাকাডেমি র‍্যাংক'}</h4>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest">Global Top 10%</p>
            </div>
            
            <div className="p-8 bg-zinc-950 text-white rounded-[3rem] flex flex-col items-center text-center relative overflow-hidden shadow-2xl shadow-black/40 group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C1121F]/20 to-transparent pointer-events-none" />
              <TrendingUp className="w-10 h-10 text-green-500 mb-8 relative z-10 group-hover:scale-110 transition-transform" />
              <h3 className="text-6xl font-black mb-3 relative z-10">12</h3>
              <p className="text-[11px] opacity-60 font-black uppercase tracking-[0.2em] relative z-10">{lang === 'EN' ? 'Day Streak' : 'দিনের স্ট্রিক'}</p>
            </div>

            <div className="p-8 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center shadow-xl shadow-black/5">
              <ShoppingBag className="w-10 h-10 text-blue-500 mb-8" />
              <h3 className="text-5xl font-black mb-3 text-zinc-900 dark:text-white">{user.purchasedBooks.length}</h3>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-[0.2em]">{lang === 'EN' ? 'Books Owned' : 'সংগৃহীত বই'}</p>
            </div>
          </div>

          {/* Book Order History */}
          {bookOrders.length > 0 && (
            <div className="space-y-10">
              <h3 className="text-xl font-black flex items-center gap-3 px-3 uppercase tracking-[0.1em] text-zinc-800 dark:text-zinc-200">
                <ShoppingBag className="w-6 h-6 text-[#C1121F]" />
                {lang === 'EN' ? 'My Book Orders' : 'আমার বইয়ের অর্ডার'}
              </h3>
              <div className="grid grid-cols-1 gap-8">
                {bookOrders.map(order => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    key={order.id} 
                    className={`p-10 rounded-[3.5rem] border-2 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 transition-all relative overflow-hidden ${
                      order.status === 'pending' ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800' :
                      order.status === 'approved' ? 'bg-green-50/20 dark:bg-green-950/10 border-green-100 dark:border-green-900/20' :
                      'bg-red-50/20 dark:bg-red-950/10 border-red-100 dark:border-red-900/20'
                    }`}
                  >
                    <div className="relative z-10">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {order.items.map(item => (
                          <span key={item.id} className="px-4 py-1.5 bg-white dark:bg-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest border border-zinc-100 dark:border-zinc-700 shadow-sm">
                            {item.title}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-widest">
                         <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {order.date}</span>
                         <span className="w-1 h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
                         <span className="text-[#C1121F]">{order.totalAmount}</span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-4 font-black text-[11px] uppercase tracking-[0.2em] px-10 py-5 rounded-[1.5rem] relative z-10 shadow-sm ${
                      order.status === 'pending' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500' :
                      order.status === 'approved' ? 'bg-green-100 text-green-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {order.status === 'pending' ? <Clock className="w-5 h-5 animate-pulse" /> : 
                       order.status === 'approved' ? <CheckCircle className="w-5 h-5" /> : 
                       <XCircle className="w-5 h-5" />}
                      {order.status === 'pending' ? (lang === 'EN' ? 'Reviewing' : 'অর্ডার যাচাইাধীন') : 
                       order.status === 'approved' ? (lang === 'EN' ? 'Confirmed' : 'অনুমোদিত') : 
                       (lang === 'EN' ? 'Rejected' : 'বাতিল')}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Active Courses */}
          <div className="space-y-10">
            <h3 className="text-xl font-black uppercase tracking-[0.1em] text-zinc-800 dark:text-zinc-200 flex items-center gap-3 px-3">
              <BookOpen className="w-6 h-6 text-[#C1121F]" />
              {lang === 'EN' ? 'My Learning Curriculum' : 'আমার কারিকুলাম'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {COURSES.filter(c => approvedCourseIds.includes(c.id)).map(course => (
                <motion.div key={course.id} whileHover={{ y: -12 }} className="bg-white dark:bg-zinc-900 p-10 rounded-[3.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col transition-all group">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-[#C1121F] group-hover:scale-110 transition-transform">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <span className="text-[10px] font-black bg-zinc-50 dark:bg-zinc-800 px-4 py-2 rounded-xl uppercase tracking-widest">{course.level}</span>
                  </div>
                  <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">{course.title[lang]}</h4>
                  <button onClick={() => navigate(`/lesson/${course.id}`)} className="w-full py-5 bg-zinc-950 dark:bg-zinc-800 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#C1121F] transition-all shadow-xl shadow-black/10">
                    <Play className="w-4 h-4 fill-current" />
                    {lang === 'EN' ? 'Launch' : 'শুরু করুন'}
                  </button>
                </motion.div>
              ))}
              {approvedCourseIds.length === 0 && (
                <div className="col-span-full py-20 text-center border-4 border-dashed rounded-[4rem] border-zinc-100 dark:border-zinc-800/40 opacity-40">
                   <Lock className="w-10 h-10 mx-auto mb-4" />
                   <p className="font-black uppercase tracking-widest text-xs">{lang === 'EN' ? 'No Active Courses' : 'কোনো সক্রিয় কোর্স নেই'}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Digital Shelf */}
        <div className="space-y-10">
          <div className="bg-white dark:bg-zinc-900 rounded-[3.5rem] p-10 lg:p-12 border border-zinc-200 dark:border-zinc-800 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 text-8xl chinese-font group-hover:rotate-12 transition-transform">藏</div>
            <h3 className="text-2xl font-black mb-12 uppercase tracking-tight relative z-10">{lang === 'EN' ? 'Digital Shelf' : 'আমার লাইব্রেরি'}</h3>
            <div className="grid grid-cols-2 gap-6 relative z-10">
              {BOOKS.filter(b => user.purchasedBooks.includes(b.id)).map(book => (
                <motion.div whileHover={{ scale: 1.08 }} key={book.id} className="group/book cursor-pointer">
                  <div className="aspect-[3/4] rounded-[1.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-lg border border-transparent group-hover/book:border-[#C1121F]/30 transition-all relative">
                    <img src={book.image} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/book:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="p-3 bg-white text-[#C1121F] rounded-xl shadow-xl">
                          <Eye className="w-5 h-5" />
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {user.purchasedBooks.length === 0 && (
                <div className="col-span-full py-24 text-center opacity-30 border-2 border-dashed border-zinc-100 dark:border-zinc-800/40 rounded-[2.5rem]">
                   <Bookmark className="w-10 h-10 mx-auto mb-4" />
                   <p className="text-[10px] font-black uppercase tracking-widest">Library Empty</p>
                   <p className="text-[9px] mt-2 max-w-[150px] mx-auto uppercase tracking-widest leading-relaxed">Purchased books appear here after approval</p>
                </div>
              )}
            </div>
            <Link to="/store" className="w-full mt-10 py-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-[#C1121F] hover:bg-red-50 dark:hover:bg-red-950/20 transition-all border border-zinc-100 dark:border-zinc-800 flex items-center justify-center gap-3 relative z-10">
               {lang === 'EN' ? 'Browse Bookstore' : 'বইয়ের দোকান'}
            </Link>
          </div>

          <div className="p-10 bg-zinc-950 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-[#C1121F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative z-10">
                <h4 className="text-xl font-black mb-4 uppercase tracking-tight">{lang === 'EN' ? 'Academy Help' : 'সাহায্য কেন্দ্র'}</h4>
                <p className="text-sm opacity-60 mb-8 leading-relaxed font-medium">Have issues with an order or course access? Contact support immediately.</p>
                <Link to="/contact" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#C1121F] hover:text-white transition-colors">
                   Get Support
                   <div className="w-6 h-px bg-current" />
                </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
