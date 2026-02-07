
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, GraduationCap, BookOpen, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { COURSES, BOOKS, TESTIMONIALS } from '../constants';
import { Link } from 'react-router-dom';

interface Props { lang: Language; }

const HomePage: React.FC<Props> = ({ lang }) => {
  return (
    <div className="overflow-hidden bg-white dark:bg-zinc-950 transition-colors text-center lg:text-left">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-4">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10 flex items-center justify-center">
          <span className="text-[40rem] chinese-font select-none dark:text-zinc-800">学</span>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-[#C1121F] text-sm font-bold mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'EN' ? 'Certified Master Instructor' : 'প্রত্যয়িত মাস্টার ইন্সট্রাক্টর'}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-zinc-900 dark:text-white">
              {lang === 'EN' ? (
                <>Learn <span className="text-[#C1121F]">Chinese</span> with Precision & Cultural Depth.</>
              ) : (
                <>নির্ভুলতা এবং গভীরতায় <span className="text-[#C1121F]">চাইনিজ</span> শিখুন।</>
              )}
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-lg leading-relaxed font-medium">
              {lang === 'EN' 
                ? 'Expert HSK coaching, professional interpretation, and award-winning books from Bangladesh\'s leading expert.' 
                : 'বাংলাদেশের শীর্ষস্থানীয় বিশেষজ্ঞের কাছ থেকে HSK কোচিং, পেশাদার অনুবাদ সেবা এবং পুরস্কারপ্রাপ্ত বই।'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/courses" className="px-8 py-4 bg-[#C1121F] text-white rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 group">
                {lang === 'EN' ? 'Start Learning' : 'শিক্ষা শুরু করুন'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/quiz" className="px-8 py-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 shadow-xl group">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                {lang === 'EN' ? 'Chinese Learn Quiz' : 'চাইনিজ লার্ন কুইজ'}
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img 
                    key={i} 
                    src={`https://i.pravatar.cc/100?u=${i}`} 
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-950" 
                    alt="User" 
                  />
                ))}
              </div>
              <div className="text-sm text-left">
                <div className="flex items-center gap-1 text-yellow-500 mb-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest text-[10px]">1,200+ {lang === 'EN' ? 'Success Stories' : 'সফল ছাত্রছাত্রী'}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-8 border-white dark:border-zinc-800 shadow-2xl relative group">
              <img 
                src="https://i.ibb.co.com/w3Q2J8G/1000127502.jpg" 
                alt="Md. Masud Rana" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white text-left">
                <p className="text-sm font-bold opacity-80 mb-1 uppercase tracking-widest">Md. Masud Rana</p>
                <p className="text-2xl font-black tracking-tight">Chinese Interpreter & Chinese Language Teacher</p>
              </div>
            </div>
            {/* Float Cards */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-zinc-800 p-5 rounded-3xl shadow-2xl flex items-center gap-4 animate-bounce border border-zinc-100 dark:border-zinc-700">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl text-green-600">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-widest leading-none mb-1">{lang === 'EN' ? 'HSK Success' : 'HSK সাফল্য'}</p>
                <p className="text-xl font-black text-zinc-900 dark:text-white">98% Pass Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white dark:bg-zinc-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: lang === 'EN' ? 'Years Exp' : 'অভিজ্ঞতা', value: '7+', icon: MessageSquare },
              { label: lang === 'EN' ? 'Students' : 'ছাত্রছাত্রী', value: '1.2K', icon: GraduationCap },
              { label: lang === 'EN' ? 'Books Sold' : 'বই বিক্রি', value: '5K+', icon: BookOpen },
              { label: lang === 'EN' ? 'Projects' : 'প্রকল্প', value: '200+', icon: ShieldCheck },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                className="text-center p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 transition-all border border-zinc-200 dark:border-zinc-800 shadow-sm hover-lift"
              >
                <stat.icon className="w-8 h-8 text-[#C1121F] mx-auto mb-6" />
                <h3 className="text-4xl font-black mb-2 text-zinc-900 dark:text-white">{stat.value}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/20 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-zinc-900 dark:text-white">{lang === 'EN' ? 'Our Featured Courses' : 'আমাদের জনপ্রিয় কোর্সসমূহ'}</h2>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg leading-relaxed">{lang === 'EN' ? 'From HSK preparation to specialized business Chinese, we have the right curriculum for your goals.' : 'HSK প্রস্তুতি থেকে বিশেষায়িত ব্যবসায়িক চাইনিজ পর্যন্ত, আপনার লক্ষ্য অনুযায়ী আমাদের পাঠ্যক্রম রয়েছে।'}</p>
            </div>
            <Link to="/courses" className="text-[#C1121F] font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:gap-4 transition-all pb-2">
              {lang === 'EN' ? 'View All Courses' : 'সকল কোর্স দেখুন'} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {COURSES.map((course, idx) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl hover:shadow-red-500/10 transition-all group flex flex-col text-center hover-lift"
              >
                <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-[#C1121F] mb-8 mx-auto group-hover:bg-[#C1121F] group-hover:text-white transition-all shadow-sm">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-zinc-900 dark:text-white tracking-tight">{course.title[lang]}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8 leading-relaxed font-medium flex-grow line-clamp-3">{course.description[lang]}</p>
                <div className="flex items-center justify-between pt-8 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="text-left">
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block uppercase font-black tracking-widest mb-1">{lang === 'EN' ? 'Investment' : 'মূল্য'}</span>
                    <span className="text-2xl font-black text-[#C1121F]">{course.price}</span>
                  </div>
                  <Link to={`/checkout/${course.id}`} className="p-4 bg-zinc-900 dark:bg-zinc-800 text-white rounded-2xl hover:bg-[#C1121F] transition-all shadow-lg active:scale-95">
                    <ArrowRight className="w-6 h-6" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-zinc-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-zinc-900 dark:text-white tracking-tight">{lang === 'EN' ? 'Trusted by Students' : 'ছাত্রছাত্রীদের বিশ্বস্ত'}</h2>
            <div className="flex justify-center items-center gap-1.5 text-yellow-500">
              <Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={idx}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                className="p-10 bg-zinc-50 dark:bg-zinc-900/40 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden text-center md:text-left hover-lift"
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-9xl chinese-font dark:text-white pointer-events-none">赞</div>
                <p className="text-xl italic text-zinc-600 dark:text-zinc-300 mb-10 leading-relaxed font-medium relative z-10">"{t.content[lang]}"</p>
                <div className="flex flex-col md:flex-row items-center gap-5 relative z-10">
                  <img src={t.avatar} className="w-14 h-14 rounded-2xl object-cover grayscale" alt={t.name} />
                  <div>
                    <h4 className="font-black text-zinc-900 dark:text-white">{t.name}</h4>
                    <p className="text-[10px] text-[#C1121F] uppercase font-black tracking-[0.2em]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Centered */}
      <section className="py-24 px-4 bg-white dark:bg-zinc-950 transition-colors">
        <div className="max-w-6xl mx-auto bg-[#C1121F] rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-red-900/20 flex flex-col items-center">
          <div className="absolute top-0 right-0 p-12 opacity-10 text-[30rem] chinese-font pointer-events-none select-none">书</div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-10 leading-tight tracking-tight relative z-10">
            {lang === 'EN' ? 'Ready to Master Chinese?' : 'চাইনিজ শিখতে প্রস্তুত?'}
          </h2>
          
          <p className="text-2xl opacity-90 mb-14 max-w-2xl mx-auto font-medium relative z-10 leading-relaxed">
            {lang === 'EN' 
              ? 'Join 1,000+ students and professionals who have unlocked new careers with us.' 
              : '১,০০০+ ছাত্র এবং পেশাদারদের সাথে যোগ দিন যারা আমাদের সাথে নতুন ক্যারিয়ার শুরু করেছেন।'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10 w-full sm:w-auto">
            <Link to="/quiz" className="px-12 py-5 bg-white text-[#C1121F] rounded-[1.5rem] font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3">
              <Sparkles className="w-5 h-5" />
              {lang === 'EN' ? 'Start Free Quiz' : 'ফ্রি কুইজ শুরু করুন'}
            </Link>
            <Link to="/register" className="px-12 py-5 bg-black/20 backdrop-blur-md border border-white/20 rounded-[1.5rem] font-black uppercase tracking-widest text-sm hover:bg-black/30 transition-all flex items-center justify-center">
              {lang === 'EN' ? 'Enroll Registry' : 'এখনই নিবন্ধন করুন'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
