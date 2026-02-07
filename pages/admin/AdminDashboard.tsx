
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, FileText, Image as ImageIcon, Users, User as UserIcon,
  Plus, Search, Bell, LogOut, ChevronRight, Edit3, Trash2, Eye,
  BarChart3, Settings, X, Save, CheckCircle, FilePlus, Image, FileSearch, Video, PlayCircle, Wallet, List, ShoppingBag, Globe, Book as BookIcon, Sparkles
} from 'lucide-react';
import { Language, Course, Article, Enrollment, Lesson, BookOrder, Book, QuizQuestion } from '../../types';
import { COURSES, ARTICLES, BOOKS } from '../../constants';

interface Props { lang: Language; }

type Tab = 'overview' | 'courses' | 'lessons' | 'enrollments' | 'book_orders' | 'blog' | 'books' | 'quiz';

const AdminDashboard: React.FC<Props> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // States for data
  const [localCourses, setLocalCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('huayu_courses');
    return saved ? JSON.parse(saved) : COURSES;
  });

  const [localArticles, setLocalArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('huayu_articles');
    return saved ? JSON.parse(saved) : ARTICLES;
  });

  const [localBooks, setLocalBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('huayu_books');
    return saved ? JSON.parse(saved) : BOOKS;
  });

  const [localEnrollments, setLocalEnrollments] = useState<Enrollment[]>(() => {
    const saved = localStorage.getItem('huayu_enrollments');
    return saved ? JSON.parse(saved) : [];
  });

  const [localBookOrders, setLocalBookOrders] = useState<BookOrder[]>(() => {
    const saved = localStorage.getItem('huayu_book_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [localQuizQuestions, setLocalQuizQuestions] = useState<QuizQuestion[]>(() => {
    const saved = localStorage.getItem('huayu_quiz_questions');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal States
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Article | null>(null);

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<QuizQuestion | null>(null);

  // Sync to Storage
  useEffect(() => {
    localStorage.setItem('huayu_courses', JSON.stringify(localCourses));
    localStorage.setItem('huayu_articles', JSON.stringify(localArticles));
    localStorage.setItem('huayu_books', JSON.stringify(localBooks));
    localStorage.setItem('huayu_enrollments', JSON.stringify(localEnrollments));
    localStorage.setItem('huayu_book_orders', JSON.stringify(localBookOrders));
    localStorage.setItem('huayu_quiz_questions', JSON.stringify(localQuizQuestions));
  }, [localCourses, localArticles, localBooks, localEnrollments, localBookOrders, localQuizQuestions]);

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: { EN: 'Overview', BN: 'একনজরে' } },
    { id: 'courses', icon: BookOpen, label: { EN: 'Courses', BN: 'কোর্সসমূহ' } },
    { id: 'lessons', icon: List, label: { EN: 'Lessons', BN: 'লেসন' } },
    { id: 'books', icon: BookIcon, label: { EN: 'Books', BN: 'বইসমূহ' } },
    { id: 'enrollments', icon: Wallet, label: { EN: 'Enrollments', BN: 'এনরোলমেন্টস' } },
    { id: 'book_orders', icon: ShoppingBag, label: { EN: 'Orders', BN: 'অর্ডারসমূহ' } },
    { id: 'blog', icon: FilePlus, label: { EN: 'Blog', BN: 'ব্লগ' } },
    { id: 'quiz', icon: Sparkles, label: { EN: 'Quiz', BN: 'কুইজ' } },
  ];

  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const quizData: QuizQuestion = {
      id: editingQuiz?.id || 'q-' + Date.now(),
      question: formData.get('question') as string,
      options: [
        formData.get('opt0') as string,
        formData.get('opt1') as string,
        formData.get('opt2') as string,
        formData.get('opt3') as string,
      ],
      correctAnswer: parseInt(formData.get('correctAnswer') as string),
      explanation: formData.get('explanation') as string,
    };

    if (editingQuiz) {
      setLocalQuizQuestions(prev => prev.map(q => q.id === editingQuiz.id ? quizData : q));
    } else {
      setLocalQuizQuestions(prev => [...prev, quizData]);
    }
    setIsQuizModalOpen(false);
    setEditingQuiz(null);
  };

  const deleteQuiz = (id: string) => {
    if (confirm('Delete this question?')) {
      setLocalQuizQuestions(prev => prev.filter(q => q.id !== id));
    }
  };

  // Blog Handlers
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const blogData: Article = {
      id: editingBlog?.id || 'art-' + Date.now(),
      title: { 
        EN: formData.get('title_en') as string, 
        BN: formData.get('title_bn') as string 
      },
      excerpt: { 
        EN: formData.get('excerpt_en') as string, 
        BN: formData.get('excerpt_bn') as string 
      },
      content: { 
        EN: formData.get('content_en') as string || '', 
        BN: formData.get('content_bn') as string || '' 
      },
      category: formData.get('category') as string,
      image: formData.get('image') as string,
      videoUrl: formData.get('videoUrl') as string,
      type: formData.get('type') as any,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'published',
    };

    if (editingBlog) {
      setLocalArticles(prev => prev.map(a => a.id === editingBlog.id ? blogData : a));
    } else {
      setLocalArticles(prev => [blogData, ...prev]);
    }
    setIsBlogModalOpen(false);
    setEditingBlog(null);
  };

  const deleteBlog = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setLocalArticles(prev => prev.filter(a => a.id !== id));
    }
  };

  // Book Handlers
  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const bookData: Book = {
      id: editingBook?.id || 'book-' + Date.now(),
      title: { 
        EN: formData.get('title_en') as string, 
        BN: formData.get('title_bn') as string 
      },
      price: formData.get('price') as string,
      image: formData.get('image') as string,
      description: { 
        EN: formData.get('desc_en') as string, 
        BN: formData.get('desc_bn') as string 
      },
    };

    if (editingBook) {
      setLocalBooks(prev => prev.map(b => b.id === editingBook.id ? bookData : b));
    } else {
      setLocalBooks(prev => [...prev, bookData]);
    }
    setIsBookModalOpen(false);
    setEditingBook(null);
  };

  const deleteBook = (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      setLocalBooks(prev => prev.filter(b => b.id !== id));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <StatCard icon={BookOpen} label="Courses" value={localCourses.length} color="text-blue-500" />
          <StatCard icon={BookIcon} label="Total Books" value={localBooks.length} color="text-orange-500" />
          <StatCard icon={Wallet} label="Enrollments" value={localEnrollments.length} color="text-[#C1121F]" />
          <StatCard icon={ShoppingBag} label="Book Orders" value={localBookOrders.length} color="text-green-500" />
        </div>
      );
      case 'quiz': return (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Quiz Bank</h2>
            <button onClick={() => { setEditingQuiz(null); setIsQuizModalOpen(true); }} className="px-8 py-4 bg-[#C1121F] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" /> Add MCQ
            </button>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                <tr>
                  <th className="px-8 py-5">Question</th>
                  <th className="px-8 py-5">Options</th>
                  <th className="px-8 py-5">Correct</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {localQuizQuestions.map(q => (
                  <tr key={q.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="px-8 py-6 max-w-xs truncate font-bold">{q.question}</td>
                    <td className="px-8 py-6 text-xs text-zinc-500">{q.options.join(', ')}</td>
                    <td className="px-8 py-6"><span className="text-sm font-black text-green-600">{q.options[q.correctAnswer]}</span></td>
                    <td className="px-8 py-6 text-right space-x-2">
                      <button onClick={() => { setEditingQuiz(q); setIsQuizModalOpen(true); }} className="p-2 text-zinc-400 hover:text-blue-500"><Edit3 className="w-5 h-5" /></button>
                      <button onClick={() => deleteQuiz(q.id)} className="p-2 text-zinc-400 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      case 'books': return (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
             <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Library Assets</h2>
             <button 
                onClick={() => { setEditingBook(null); setIsBookModalOpen(true); }}
                className="px-8 py-4 bg-[#C1121F] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add New Book
             </button>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                <tr>
                  <th className="px-8 py-5">Book Details</th>
                  <th className="px-8 py-5">Price</th>
                  <th className="px-8 py-5">Language Support</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {localBooks.filter(b => b.title.EN.toLowerCase().includes(searchQuery.toLowerCase())).map(book => (
                  <tr key={book.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={book.image} className="w-12 h-16 rounded-xl object-cover border border-zinc-100 dark:border-zinc-800" alt="" />
                        <div>
                          <p className="font-bold text-sm leading-tight">{book.title.EN}</p>
                          <p className="text-[10px] text-zinc-500 mt-1">{book.title.BN}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-[#C1121F]">{book.price}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-[8px] font-black rounded uppercase">EN</span>
                        <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-[8px] font-black rounded uppercase">BN</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right space-x-2">
                      <button onClick={() => { setEditingBook(book); setIsBookModalOpen(true); }} className="p-2 text-zinc-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Edit3 className="w-5 h-5" /></button>
                      <button onClick={() => deleteBook(book.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-5 h-5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      case 'blog': return (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
             <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Blog Repository</h2>
             <button 
                onClick={() => { setEditingBlog(null); setIsBlogModalOpen(true); }}
                className="px-8 py-4 bg-[#C1121F] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> New Blog Post
             </button>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                <tr>
                  <th className="px-8 py-5">Post Content</th>
                  <th className="px-8 py-5">Type</th>
                  <th className="px-8 py-5">Category</th>
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {localArticles.filter(a => a.title.EN.toLowerCase().includes(searchQuery.toLowerCase())).map(article => (
                  <tr key={article.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={article.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                        <div>
                          <p className="font-bold text-sm leading-tight">{article.title.EN}</p>
                          <p className="text-[10px] text-zinc-500 mt-1">{article.title.BN}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center w-fit gap-1.5 ${
                        article.type === 'video' ? 'bg-red-100 text-red-700' : 
                        article.type === 'image' ? 'bg-blue-100 text-blue-700' : 
                        'bg-zinc-100 text-zinc-700'
                      }`}>
                        {article.type === 'video' ? <PlayCircle className="w-3 h-3" /> : article.type === 'image' ? <ImageIcon className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                        {article.type}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[11px] font-bold text-zinc-500">{article.category}</td>
                    <td className="px-8 py-6 text-[11px] font-mono">{article.date}</td>
                    <td className="px-8 py-6 text-right space-x-2">
                      <button onClick={() => { setEditingBlog(article); setIsBlogModalOpen(true); }} className="p-2 text-zinc-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Edit3 className="w-5 h-5" /></button>
                      <button onClick={() => deleteBlog(article.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-5 h-5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      case 'enrollments': return (
        <div className="space-y-8">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Finance Ledger</h2>
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                <tr>
                  <th className="px-8 py-5">User</th>
                  <th className="px-8 py-5">Course</th>
                  <th className="px-8 py-5">TxID</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {localEnrollments.filter(e => e.userName.toLowerCase().includes(searchQuery.toLowerCase())).map(enr => (
                  <tr key={enr.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold">{enr.userName}</p>
                      <p className="text-[10px] text-zinc-500">{enr.userEmail}</p>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium">{enr.courseName}</td>
                    <td className="px-8 py-6 font-mono text-xs">{enr.transactionId}</td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                        enr.status === 'approved' ? 'bg-green-100 text-green-700' : 
                        enr.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {enr.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right space-x-2">
                      {enr.status === 'pending' && (
                        <button onClick={() => handleApproveEnrollment(enr.id)} className="p-2 text-green-500 hover:bg-green-50 rounded-lg"><CheckCircle className="w-5 h-5" /></button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      case 'book_orders': return (
        <div className="space-y-8">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Book Sales Ledger</h2>
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                <tr>
                  <th className="px-8 py-5">User</th>
                  <th className="px-8 py-5">Books</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {localBookOrders.map(order => (
                  <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold">{order.userName}</p>
                      <p className="text-[10px] text-zinc-500">{order.userEmail}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-1">
                        {order.items.map(i => <span key={i.id} className="text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{i.title}</span>)}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                        order.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {order.status === 'pending' && (
                        <button onClick={() => handleApproveBookOrder(order.id)} className="p-2 text-green-500 hover:bg-green-50 rounded-lg"><CheckCircle className="w-5 h-5" /></button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      default: return <div className="p-20 text-center opacity-40">Tab section is under development</div>;
    }
  };

  const handleApproveEnrollment = (id: string) => {
    setLocalEnrollments(prev => prev.map(e => e.id === id ? { ...e, status: 'approved' } : e));
  };

  const handleApproveBookOrder = (id: string) => {
    setLocalBookOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'approved' } : o));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex">
      <aside className="w-72 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col fixed h-screen overflow-y-auto z-40">
        <div className="p-8 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#C1121F] rounded-xl flex items-center justify-center text-white font-bold chinese-font shadow-lg shadow-red-500/20">华</div>
          <span className="font-bold text-sm tracking-tight uppercase text-zinc-900 dark:text-white">Masud Admin</span>
        </div>

        <nav className="flex-grow py-8 px-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-sm transition-all ${
                activeTab === item.id 
                  ? 'bg-[#C1121F] text-white shadow-lg shadow-red-500/20' 
                  : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label[lang]}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-grow ml-72 p-10">
        <header className="mb-12 flex justify-between items-center">
           <div className="relative w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                placeholder="Search ledger or posts..." 
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-[#C1121F]/20 transition-all" 
              />
           </div>
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[#C1121F] font-black border border-zinc-200 dark:border-zinc-700">A</div>
           </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quiz Management Modal */}
      <AnimatePresence>
        {isQuizModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                  <h3 className="text-xl font-black uppercase tracking-tight">{editingQuiz ? 'Edit MCQ' : 'New Quiz Question'}</h3>
                  <button onClick={() => setIsQuizModalOpen(false)} className="p-3"><X /></button>
                </div>
                <form onSubmit={handleSaveQuiz} className="p-10 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Question</label>
                    <input name="question" defaultValue={editingQuiz?.question} required className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {['opt0', 'opt1', 'opt2', 'opt3'].map((name, i) => (
                      <div key={name} className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Option {i + 1}</label>
                        <input name={name} defaultValue={editingQuiz?.options[i]} required className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 outline-none font-bold" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Correct Answer Index (0-3)</label>
                    <input name="correctAnswer" type="number" min="0" max="3" defaultValue={editingQuiz?.correctAnswer || 0} required className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 outline-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Explanation (Bangla)</label>
                    <textarea name="explanation" defaultValue={editingQuiz?.explanation} rows={3} required className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 outline-none font-bold" />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => setIsQuizModalOpen(false)} className="px-6 py-2">Cancel</button>
                    <button type="submit" className="px-10 py-4 bg-zinc-900 text-white rounded-2xl font-bold">Save Question</button>
                  </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Blog Modal */}
      <AnimatePresence>
        {isBlogModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-tight">{editingBlog ? 'Edit Blog Post' : 'Compose New Insight'}</h3>
                <button onClick={() => setIsBlogModalOpen(false)} className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl hover:bg-zinc-100"><X className="w-6 h-6" /></button>
              </div>

              <form onSubmit={handleSaveBlog} className="flex-grow overflow-y-auto p-10 space-y-8 scroll-hide">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Post Format</label>
                    <select 
                      name="type" 
                      defaultValue={editingBlog?.type || 'article'}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm"
                    >
                      <option value="article">Article (Story + Content)</option>
                      <option value="image">Image Post (Visual Focus)</option>
                      <option value="video">Vlog / Video Post</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Topic Category</label>
                    <input 
                      name="category" 
                      defaultValue={editingBlog?.category}
                      required 
                      placeholder="e.g. HSK Preparation, Culture" 
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">English Title</label>
                    <input 
                      name="title_en" 
                      defaultValue={editingBlog?.title.EN}
                      required 
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Bengali Title</label>
                    <input 
                      name="title_bn" 
                      defaultValue={editingBlog?.title.BN}
                      required 
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Brief Excerpt (EN)</label>
                    <textarea 
                      name="excerpt_en" 
                      defaultValue={editingBlog?.excerpt.EN}
                      required 
                      rows={2} 
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Brief Excerpt (BN)</label>
                    <textarea 
                      name="excerpt_bn" 
                      defaultValue={editingBlog?.excerpt.BN}
                      required 
                      rows={2} 
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Featured Image URL</label>
                    <input 
                      name="image" 
                      defaultValue={editingBlog?.image}
                      required 
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Video URL (YouTube/MP4) - Optional</label>
                    <input 
                      name="videoUrl" 
                      defaultValue={editingBlog?.videoUrl}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Full Content (EN)</label>
                  <textarea 
                    name="content_en" 
                    defaultValue={editingBlog?.content?.EN}
                    rows={6} 
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Full Content (BN)</label>
                  <textarea 
                    name="content_bn" 
                    defaultValue={editingBlog?.content?.BN}
                    rows={6} 
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                  />
                </div>

                <div className="pt-8 flex justify-end gap-4">
                   <button type="button" onClick={() => setIsBlogModalOpen(false)} className="px-8 py-4 text-zinc-500 font-black uppercase tracking-widest text-[10px]">Cancel</button>
                   <button type="submit" className="px-10 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                      <Save className="w-4 h-4" /> Publish Post
                   </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Book Management Modal */}
      <AnimatePresence>
        {isBookModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-tight">{editingBook ? 'Revise Book Metadata' : 'Catalog New Book'}</h3>
                <button onClick={() => setIsBookModalOpen(false)} className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl hover:bg-zinc-100"><X className="w-6 h-6" /></button>
              </div>

              <form onSubmit={handleSaveBook} className="flex-grow overflow-y-auto p-10 space-y-8 scroll-hide">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Book Image URL</label>
                    <input 
                      name="image" 
                      defaultValue={editingBook?.image}
                      required 
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Price (e.g. ৳ 500)</label>
                    <input 
                      name="price" 
                      defaultValue={editingBook?.price}
                      required 
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Title (English)</label>
                    <input 
                      name="title_en" 
                      defaultValue={editingBook?.title.EN}
                      required 
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Title (Bengali)</label>
                    <input 
                      name="title_bn" 
                      defaultValue={editingBook?.title.BN}
                      required 
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Description (English)</label>
                  <textarea 
                    name="desc_en" 
                    defaultValue={editingBook?.description.EN}
                    rows={3} 
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Description (Bengali)</label>
                  <textarea 
                    name="desc_bn" 
                    defaultValue={editingBook?.description.BN}
                    rows={3} 
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-4 outline-none font-bold text-sm" 
                  />
                </div>

                <div className="pt-8 flex justify-end gap-4">
                   <button type="button" onClick={() => setIsBookModalOpen(false)} className="px-8 py-4 text-zinc-500 font-black uppercase tracking-widest text-[10px]">Cancel</button>
                   <button type="submit" className="px-10 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                      <Save className="w-4 h-4" /> Save Book
                   </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-6">
    <div className={`w-16 h-16 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center ${color}`}>
      <Icon className="w-8 h-8" />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">{label}</p>
      <h3 className="text-3xl font-black text-zinc-900 dark:text-white">{value}</h3>
    </div>
  </div>
);

export default AdminDashboard;
