
import React, { useState } from 'react';
import { APP_DATA } from './data';
import { IntroSlide } from './components/IntroSlide';
import { CategoriesSlide } from './components/CategoriesSlide';
import { FlowSlide } from './components/FlowSlide';
import { PreFilingSlide } from './components/PreFilingSlide';
import { MvpSlide } from './components/MvpSlide';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the presentation structure based on the flat data object
const SLIDES = [
  { id: 'intro', title: 'نمای کلی و آمار کلان', component: IntroSlide },
  { id: 'tree', title: 'درخت دعاوی و دسته‌بندی', component: CategoriesSlide },
  { id: 'flow', title: 'فلوچارت فرایند و نقاط ورود AI', component: FlowSlide },
  { id: 'pre_filing', title: 'ابزارهای پیشادعوا به تفکیک', component: PreFilingSlide },
  { id: 'mvp', title: 'تحلیل ریسک و انتخاب MVP', component: MvpSlide },
];

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = SLIDES.length;
  const currentSlideConfig = SLIDES[currentSlideIndex];

  const nextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) setCurrentSlideIndex(curr => curr + 1);
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(curr => curr - 1);
  };

  const RenderComponent = currentSlideConfig.component;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row overflow-hidden font-['Vazirmatn']">
      
      {/* Sidebar Navigation (Desktop) */}
      <div className="hidden md:flex flex-col w-72 bg-slate-900 text-white p-6 shadow-2xl z-20 shrink-0">
        <div className="mb-8 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-black leading-tight text-blue-400 mb-3">عریضه نویس</h1>
          <p className="text-xs text-slate-300 leading-relaxed opacity-90">
            بررسی اجمالی پرونده‌های قضائی ایران و انتخاب شاخه مناسب برای ساختن نسخه ابتدایی دستیار هوشمند حقوقی
          </p>
          <p className="text-[10px] text-slate-500 mt-3 font-mono">
            نسخه {APP_DATA.فراداده.نسخه}
          </p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-full text-right px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                currentSlideIndex === idx 
                  ? 'bg-blue-600 text-white shadow-lg translate-x-1 font-bold' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {slide.title}
            </button>
          ))}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-slate-700 space-y-2">
           <div className="text-[10px] text-slate-500">منابع:</div>
           {APP_DATA.فراداده.منابع_اصلی.map((src, i) => (
             <div key={i} className="text-[10px] text-slate-400 leading-tight">• {src}</div>
           ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Mobile Header */}
        <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-md z-20">
          <span className="font-bold text-sm truncate">{currentSlideConfig.title}</span>
          <div className="flex gap-2 items-center">
             <span className="text-xs bg-slate-700 px-2 py-1 rounded">{currentSlideIndex + 1} / {totalSlides}</span>
          </div>
        </div>

        {/* Slide Content */}
        <main className="flex-1 relative bg-slate-50 p-4 md:p-8 overflow-hidden">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            
            {/* Header inside slide */}
            <div className="mb-6 flex items-baseline justify-between">
               <h2 className="text-2xl md:text-3xl font-black text-slate-800">{currentSlideConfig.title}</h2>
               <div className="hidden md:block text-slate-400 text-sm">اسلاید {currentSlideIndex + 1} از {totalSlides}</div>
            </div>

            {/* Dynamic Body */}
            <div className="flex-1 min-h-0 relative">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={currentSlideConfig.id}
                   initial={{ opacity: 0, y: 15 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -15 }}
                   transition={{ duration: 0.3 }}
                   className="h-full"
                 >
                   {/* Pass the entire data object; components will pick what they need */}
                   <RenderComponent data={APP_DATA} />
                 </motion.div>
               </AnimatePresence>
            </div>
          </div>
        </main>

        {/* Footer Navigation Controls */}
        <div className="bg-white border-t border-slate-200 p-4 shadow-[0_-5px_15px_rgba(0,0,0,0.02)] z-20">
           <div className="max-w-7xl mx-auto flex justify-between items-center">
             <button 
               onClick={prevSlide}
               disabled={currentSlideIndex === 0}
               className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
             >
               <ChevronRight size={18} />
               <span className="font-medium">قبلی</span>
             </button>

             {/* Mobile Progress Dots */}
             <div className="flex md:hidden gap-1.5">
                {SLIDES.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentSlideIndex ? 'bg-blue-600' : 'bg-slate-200'}`} />
                ))}
             </div>

             <button 
               onClick={nextSlide}
               disabled={currentSlideIndex === totalSlides - 1}
               className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
             >
               <span className="font-bold">بعدی</span>
               <ChevronLeft size={18} />
             </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default App;
