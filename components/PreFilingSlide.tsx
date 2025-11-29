
import React, { useState } from 'react';
import { AppData, PreFilingToolConfig, SubCategory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Users, Briefcase, Building, FileBadge, AlertTriangle, CheckCircle, ArrowLeft, Info } from 'lucide-react';

interface Props {
  data: AppData;
}

const VERTICAL_CONFIG: Record<string, { label: string, icon: any, color: string }> = {
  'حقوقی': { label: 'حقوقی / مدنی', icon: Scale, color: 'blue' },
  'تجاری': { label: 'تجاری', icon: Briefcase, color: 'indigo' },
  'خانواده': { label: 'خانواده', icon: Users, color: 'rose' },
  'اداری': { label: 'اداری', icon: Building, color: 'amber' },
  'کیفری': { label: 'کیفری', icon: AlertTriangle, color: 'red' },
  'ثبتی': { label: 'ثبتی', icon: FileBadge, color: 'emerald' },
};

export const PreFilingSlide: React.FC<Props> = ({ data }) => {
  const matrix = data.ابزارهای_پیش_از_دعوا_به_تفکیک;
  const verticals = Object.keys(matrix);
  const [activeVertical, setActiveVertical] = useState('حقوقی');

  const ActiveIcon = VERTICAL_CONFIG[activeVertical]?.icon || Scale;
  const activeColor = VERTICAL_CONFIG[activeVertical]?.color || 'blue';

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          {verticals.map((v) => {
            const config = VERTICAL_CONFIG[v];
            const isActive = activeVertical === v;
            const Icon = config.icon;
            
            return (
              <button
                key={v}
                onClick={() => setActiveVertical(v)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-all ${
                  isActive 
                    ? `bg-${config.color}-100 text-${config.color}-700 shadow-sm font-bold` 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Icon size={18} />
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVertical}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {Object.entries(matrix[activeVertical]).map(([subCatKey, config], idx) => {
               const toolConfig = config as PreFilingToolConfig;
               // Attempt to resolve friendly title via Case Tree, finding matching code
               let title = subCatKey;
               const mainCat = data.درخت_دعاوی_بر_اساس_ماهیت[activeVertical];
               if (mainCat) {
                 const found = (Object.values(mainCat['زیرگروه‌ها']) as SubCategory[]).find(s => s.کد === subCatKey);
                 if (found) title = found.عنوان;
               }

               return (
               <div key={idx} className={`bg-white rounded-xl p-5 border-t-4 border-${activeColor}-500 shadow-sm flex flex-col`}>
                 <h4 className="font-bold text-slate-800 text-lg mb-4 pb-2 border-b border-slate-100 min-h-[3rem] flex items-center">
                    {title}
                 </h4>
                 
                 <div className="flex-1">
                    {toolConfig.ابزارها && toolConfig.ابزارها.length > 0 ? (
                      <ul className="space-y-3 mb-4">
                        {toolConfig.ابزارها.map((tool, tIdx) => (
                          <li key={tIdx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <CheckCircle className={`w-5 h-5 text-${activeColor}-500 shrink-0`} />
                            <span className="text-slate-700 font-medium">{tool}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-slate-400 text-sm italic flex items-center gap-2 p-3 bg-slate-50 rounded-lg mb-4">
                        <AlertTriangle size={16} />
                        بدون ابزار پیشادعوای مشخص
                      </div>
                    )}
                 </div>

                 {toolConfig.توضیح && (
                   <div className={`mt-auto text-xs text-${activeColor}-800 bg-${activeColor}-50 p-3 rounded-lg border border-${activeColor}-100 leading-relaxed flex gap-2`}>
                      <Info size={14} className="shrink-0 mt-0.5" />
                      {toolConfig.توضیح}
                   </div>
                 )}
               </div>
            )})}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3 text-sm text-blue-800 shrink-0">
        <div className="bg-blue-200 p-1 rounded-full shrink-0">
          <ArrowLeft size={16} />
        </div>
        <p>
           تحلیل ابزارها نشان می‌دهد حوزه‌های <b>مدنی</b> و <b>تجاری</b> بیشترین تنوع را در ابزارهای جایگزین (ADR) و اخطارهای رسمی (اظهارنامه) دارند که خوراک اصلی مدل هوش مصنوعی هستند.
        </p>
      </div>
    </div>
  );
};
