
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, ChevronRight, ArrowLeft, Video, 
  Lock, BookOpen, Clock, CheckCircle2, Volume2, Maximize2, ShieldAlert
} from 'lucide-react';
import { Language, User, Lesson, Course, Enrollment } from '../types';
import { COURSES } from '../constants';

interface Props {
  lang: Language;
  user: User;
}

const LessonPage: React.FC<Props> = ({ lang, user }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SECURITY CHECK: Strictly derive authorization from global enrollments
    const allEnrollments: Enrollment[] = JSON.parse(localStorage.getItem('huayu_enrollments') || '[]');
    const userEnrollment = allEnrollments.find(e => e.userId === user.id && e.courseId === courseId);
    
    if (!userEnrollment || userEnrollment.status !== 'approved') {
      setIsAuthorized(false);
      setLoading(false);
      return;
    }

    const foundCourse = COURSES.find(c => c.id === courseId);
    if (!foundCourse) {
      navigate('/dashboard');
      return;
    }
    setCourse(foundCourse);
    setIsAuthorized(true);

    // Fetch lessons
    const allLessons: Lesson[] = JSON.parse(localStorage.getItem('huayu_lessons') || '[]');
    const courseLessons = allLessons
      .filter(l => l.courseId === courseId && l.status === 'published')
      .sort((a, b) => a.order - b.order);
    
    setLessons(courseLessons);
    if (courseLessons.length > 0) {
      setCurrentLesson(courseLessons[0]);
    }
    setLoading(false);
  }, [courseId, user.id, navigate]);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#C1121F]/20 border-t-[#C1121F] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthorized === false) {
    return (
      <div className="max-w-2xl auto px-4 py-24 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-zinc-900 p-12 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl"
        >
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 mx-auto mb-8">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">{lang === 'EN' ? 'Access Restricted' : 'অ্যাক্সেস সীমাবদ্ধ'}</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-10 text-lg">
            {lang === 'EN' 
              ? 'You do not have active approval for this course. Please complete payment or wait for admin review.' 
              : 'এই কোর্সের জন্য আপনার কাছে কোনো সক্রিয় অনুমোদন নেই। দয়া করে পেমেন্ট সম্পন্ন করুন অথবা এডমিন পর্যবেক্ষণের জন্য অপেক্ষা করুন।'}
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-10 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-xl"
          >
            {lang === 'EN' ? 'Return to Dashboard' : 'ড্যাশবোর্ডে ফিরে যান'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col lg:flex-row">
      {/* Sidebar: Lesson List */}
      <aside className="w-full lg:w-96 bg-white dark:bg-zinc-900 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-auto lg:h-[calc(100vh-64px)] sticky top-16 z-20">
        <div className="p-8 border-b border-zinc-100 dark:border-zinc-800">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-[#C1121F] font-bold text-xs uppercase tracking-widest mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> {lang === 'EN' ? 'Back to Portal' : 'পোর্টাল ফিরে যান'}
          </button>
          <h2 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white leading-tight">{course?.title[lang]}</h2>
          <div className="flex items-center gap-3 py-1.5 px-3 bg-zinc-50 dark:bg-zinc-800 w-fit rounded-lg border border-zinc-100 dark:border-zinc-700">
            <BookOpen className="w-3.5 h-3.5 text-[#C1121F]" />
            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{lessons.length} {lang === 'EN' ? 'Curriculum Units' : 'শিক্ষা ইউনিট'}</span>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto scroll-hide p-6 space-y-3">
          {lessons.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => setCurrentLesson(lesson)}
              className={`w-full text-left p-5 rounded-3xl border-2 transition-all flex items-start gap-4 ${
                currentLesson?.id === lesson.id 
                ? 'bg-[#C1121F] border-[#C1121F] text-white shadow-xl shadow-red-500/20 translate-x-2' 
                : 'bg-zinc-50 dark:bg-zinc-800/50 border-transparent hover:border-zinc-200 dark:hover:border-zinc-700'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${
                currentLesson?.id === lesson.id ? 'bg-white/20' : 'bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800'
              }`}>
                {idx + 1}
              </div>
              <div className="flex-grow pt-0.5 text-zinc-900 dark:text-zinc-100">
                <p className="font-bold text-sm leading-tight mb-2">{lesson.title}</p>
                <div className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${
                  currentLesson?.id === lesson.id ? 'opacity-80' : 'text-zinc-400'
                }`}>
                  <Video className="w-3 h-3" />
                  <span>{lang === 'EN' ? 'Premium Video' : 'প্রিমিয়াম ভিডিও'}</span>
                </div>
              </div>
              {currentLesson?.id === lesson.id && <Play className="w-4 h-4 ml-auto fill-current mt-3" />}
            </button>
          ))}

          {lessons.length === 0 && (
            <div className="py-20 text-center text-zinc-400 px-6">
               <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="w-6 h-6 opacity-20" />
               </div>
               <p className="text-sm font-bold uppercase tracking-widest opacity-60">No Lessons Released</p>
               <p className="text-xs mt-2 font-medium">Please check back later for updates.</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content: Premium Player Area */}
      <main className="flex-grow p-4 md:p-12 overflow-y-auto scroll-hide">
        <AnimatePresence mode="wait">
          {currentLesson ? (
            <motion.div
              key={currentLesson.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-6xl auto pb-24"
            >
              <header className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-green-200 dark:border-green-800/30">
                    Active Study Session
                  </div>
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    Lesson {lessons.indexOf(currentLesson) + 1} of {lessons.length}
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">{currentLesson.title}</h1>
              </header>

              <div className="aspect-video w-full rounded-[3rem] overflow-hidden bg-black shadow-2xl border-4 border-white dark:border-zinc-800 mb-12 relative group">
                {currentLesson.videoUrl.includes('youtube.com') || currentLesson.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={currentLesson.videoUrl.replace('watch?v=', 'embed/')}
                    className="w-full h-full"
                    title={currentLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video 
                    src={currentLesson.videoUrl} 
                    className="w-full h-full object-contain" 
                    controls 
                    poster="https://picsum.photos/seed/instruction/1280/720?grayscale"
                  />
                )}
                
                <div className="absolute top-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-4 bg-black/60 backdrop-blur-xl text-white rounded-full hover:bg-[#C1121F] transition-all shadow-lg border border-white/10"><Volume2 className="w-5 h-5" /></button>
                   <button className="p-4 bg-black/60 backdrop-blur-xl text-white rounded-full hover:bg-[#C1121F] transition-all shadow-lg border border-white/10"><Maximize2 className="w-5 h-5" /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                 <div className="xl:col-span-2 bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-6 mb-10 pb-8 border-b border-zinc-100 dark:border-zinc-800">
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-red-100 dark:bg-red-900/20 rounded-[1.25rem] flex items-center justify-center text-[#C1121F]">
                             <CheckCircle2 className="w-8 h-8" />
                          </div>
                          <div>
                             <p className="font-black text-lg text-zinc-900 dark:text-white leading-none mb-1">{lang === 'EN' ? 'Authorized Access' : 'অনুমোদিত অ্যাক্সেস'}</p>
                             <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-black">Secure Learning Protocol</p>
                          </div>
                       </div>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                       <h3 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Instructional Guidance</h3>
                       <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                          Welcome to your unit in <strong>{course?.title[lang]}</strong>. 
                          Please watch this instruction video at least twice. First for general understanding, and second for detailed vocabulary tracking. 
                          Ensure your audio is clear to capture the precise tones of each character introduced.
                       </p>
                       <div className="p-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border border-zinc-100 dark:border-zinc-700">
                          <h4 className="font-bold mb-4 text-[#C1121F] uppercase tracking-widest text-xs">Recommended Next Steps</h4>
                          <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                             <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Review the Radicals mentioned at 04:20</li>
                             <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Complete the Unit 1 Practice Quiz in Resources</li>
                             <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Record yourself pronouncing the key dialogue</li>
                          </ul>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="bg-zinc-950 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                       <div className="absolute -bottom-8 -right-8 text-8xl chinese-font opacity-10">书</div>
                       <h4 className="text-xl font-bold mb-6">{lang === 'EN' ? 'Quick Tools' : 'দ্রুত টুলস'}</h4>
                       <div className="space-y-3">
                          <button className="w-full p-5 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold text-left flex items-center justify-between group transition-all">
                             Download PDF Guide
                             <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                          <button className="w-full p-5 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold text-left flex items-center justify-between group transition-all">
                             Vocabulary List
                             <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                          <button className="w-full p-5 bg-[#C1121F] hover:bg-red-700 rounded-2xl text-sm font-black flex items-center justify-center gap-3 transition-all mt-6 shadow-xl shadow-red-900/40">
                             {lang === 'EN' ? 'Finish Lesson' : 'লেসন সম্পন্ন করুন'}
                          </button>
                       </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800">
                       <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Course Instructor</p>
                       <div className="flex items-center gap-4">
                          <img src="https://i.ibb.co.com/w3Q2J8G/1000127502.jpg" className="w-12 h-12 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-800" alt="Instructor" />
                          <div>
                             <p className="font-bold text-zinc-900 dark:text-white">Md. Masud Rana</p>
                             <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest">Chinese Language Teacher</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-[60vh] flex items-center justify-center">
               <div className="text-center max-w-sm">
                  <div className="w-24 h-24 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center auto mb-8 shadow-xl">
                     <Play className="w-10 h-10 text-[#C1121F] fill-current" />
                  </div>
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">{lang === 'EN' ? 'Prepare for Excellence' : 'উৎকর্ষের জন্য প্রস্তুত হোন'}</h2>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-8">{lang === 'EN' ? 'Please select a unit from the curriculum sidebar to begin your training session.' : 'আপনার প্রশিক্ষণ সেশন শুরু করতে কারিকুলাম সাইডবার থেকে একটি ইউনিট নির্বাচন করুন।'}</p>
                  <div className="h-1 w-20 bg-[#C1121F] auto rounded-full"></div>
               </div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default LessonPage;
