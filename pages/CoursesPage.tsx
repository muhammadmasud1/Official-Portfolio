
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Clock, BarChart, CheckCircle2, LayoutDashboard } from 'lucide-react';
import { Language, User, Enrollment } from '../types';
import { COURSES } from '../constants';
import { useNavigate } from 'react-router-dom';

interface Props { 
  lang: Language; 
  user: User | null;
}

const CoursesPage: React.FC<Props> = ({ lang, user }) => {
  const navigate = useNavigate();
  const [userEnrollments, setUserEnrollments] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      const saved: Enrollment[] = JSON.parse(localStorage.getItem('huayu_enrollments') || '[]');
      const courseIds = saved
        .filter(e => e.userId === user.id && (e.status === 'approved' || e.status === 'pending'))
        .map(e => e.courseId);
      setUserEnrollments(courseIds);
    } else {
      setUserEnrollments([]);
    }
  }, [user]);

  const handleEnroll = (courseId: string) => {
    navigate(`/checkout/${courseId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          {lang === 'EN' ? 'Master Chinese Step-by-Step' : 'ধাপে ধাপে চাইনিজ শিখুন'}
        </h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
          {lang === 'EN' 
            ? 'Structured HSK-aligned courses designed for Bangladeshi learners.' 
            : 'বাংলাদেশি শিক্ষার্থীদের জন্য বিশেষভাবে ডিজাইন করা স্ট্রাকচার্ড HSK কোর্স।'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSES.map((course, idx) => {
          const isEnrolled = userEnrollments.includes(course.id);
          const courseImage = course.image || `https://picsum.photos/seed/${course.id}/800/600`;
          
          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden group hover:shadow-2xl hover:shadow-red-500/5 transition-all"
            >
              <div className="h-56 bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                <img 
                  src={courseImage} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  alt={course.title[lang]} 
                />
                <div className="absolute top-6 left-6 bg-[#C1121F] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
                  {course.level}
                </div>
                {isEnrolled && (
                  <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-zinc-900/90 px-6 py-2 rounded-2xl flex items-center gap-2 border border-white/20 shadow-xl">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-xs font-black uppercase tracking-widest">{lang === 'EN' ? 'Purchased' : 'ক্রয় করা হয়েছে'}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#C1121F] transition-colors">{course.title[lang]}</h3>
                <p className="text-zinc-500 text-sm mb-8 leading-relaxed line-clamp-3">{course.description[lang]}</p>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
                    <Clock className="w-4 h-4 text-[#C1121F]" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
                    <BarChart className="w-4 h-4 text-[#C1121F]" />
                    <span>{lang === 'EN' ? 'HSK Certified' : 'HSK সার্টিফাইড'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-[#C1121F]" />
                    <span>{lang === 'EN' ? 'Lifetime Access' : 'আজীবন অ্যাক্সেস'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{lang === 'EN' ? 'Investment' : 'বিনিয়োগ'}</span>
                    <span className="text-2xl font-black text-[#C1121F]">{course.price}</span>
                  </div>
                  
                  {isEnrolled ? (
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="px-6 py-4 bg-zinc-900 dark:bg-zinc-800 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-zinc-950 transition-all flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      {lang === 'EN' ? 'Go to Learning' : 'শিক্ষা শুরু করুন'}
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleEnroll(course.id)}
                      className="px-8 py-4 bg-[#C1121F] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 active:scale-95"
                    >
                      {lang === 'EN' ? 'Enroll Now' : 'এনরোল করুন'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-24 p-12 lg:p-20 bg-zinc-950 rounded-[4rem] text-center border border-zinc-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 text-[20rem] chinese-font opacity-5 pointer-events-none">教</div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            {lang === 'EN' ? 'Looking for Specialized Training?' : 'বিশেষায়িত প্রশিক্ষণ খুঁজছেন?'}
          </h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto font-medium">
            {lang === 'EN' 
              ? 'We offer bespoke 1-on-1 private coaching for corporate executives and industry-specific Chinese training for technical projects.' 
              : 'আমরা কর্পোরেট নির্বাহীদের জন্য ১-অন-১ প্রাইভেট কোচিং এবং প্রযুক্তিগত প্রকল্পের জন্য বিশেষায়িত চাইনিজ প্রশিক্ষণ প্রদান করি।'}
          </p>
          <button className="px-12 py-5 bg-white text-zinc-950 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#C1121F] hover:text-white transition-all shadow-xl">
            {lang === 'EN' ? 'Inquire for Private Coaching' : 'প্রাইভেট কোচিংয়ের জন্য যোগাযোগ'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;