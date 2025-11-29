

import React, { useState } from 'react';
import { AppData, Category, SubCategory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertCircle, Gavel, Briefcase, Users, FileBadge, Building, Info } from 'lucide-react';

interface Props {
  data: AppData;
}

const CategoryIcon = ({ code }: { code: string }) => {
  // Mapping updated to match new Farsi codes or partial matches
  if (code.includes('کیفری')) return <AlertCircle />;
  if (code.includes('حقوقی')) return <Gavel />;
  if (code.includes('خانواده')) return <Users />;
  if (code.includes('اداری')) return <Building />;
  if (code.includes('ثبتی')) return <FileBadge />;
  if (code.includes('تجاری')) return <Briefcase />;
  return <Gavel />;
};

export const CategoriesSlide: React.FC<Props> = ({ data }) => {
  const tree = data.درخت_دعاوی_بر_اساس_ماهیت;
  const categories = Object.values(tree) as Category[];
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (code: string) => {
    setExpanded(expanded === code ? null : code);
  };

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar pb-10">
      <div className="grid grid-cols-1 gap-4">
        {categories.map((cat, idx) => {
          return (
            <motion.div
              key={cat.کد}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white rounded-xl shadow-sm border ${
                expanded === cat.کد ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200'
              } transition-all duration-300`}
            >
              <button
                onClick={() => toggle(cat.کد)}
                className="w-full flex items-center justify-between p-5 text-right focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${expanded === cat.کد ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                    <CategoryIcon code={cat.کد} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{cat.عنوان}</h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-1 text-right">{cat.توضیح}</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expanded === cat.کد ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {expanded === cat.کد && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-slate-50 rounded-b-xl border-t border-slate-100"
                  >
                    <div className="p-5 grid grid-cols-1 xl:grid-cols-2 gap-4">
                      {Object.values(cat['زیرگروه‌ها']).map((sub: SubCategory) => (
                        <div key={sub.کد} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                          <h4 className="font-bold text-slate-700 mb-2 border-b border-slate-100 pb-2 flex justify-between">
                            {sub.عنوان}
                          </h4>
                          
                          {/* Examples */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {sub['نمونه‌ها'].map((ex, i) => (
                              <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200">
                                {ex}
                              </span>
                            ))}
                          </div>

                          {/* Stats */}
                          {Object.keys(sub.آمار).length > 0 ? (
                            <div className="mt-3 space-y-2">
                              {Object.entries(sub.آمار).map(([statKey, statDetail], i) => (
                                <div key={i} className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-xs">
                                   <div className="flex justify-between items-center mb-1">
                                     <span className="font-bold text-blue-800">{statKey.replace(/_/g, ' ')}</span>
                                     <span className="bg-white px-2 py-0.5 rounded text-blue-600 font-bold border border-blue-100">
                                       {statDetail.مقدار?.toLocaleString() || statDetail.مقدار_تقریبی?.toLocaleString() || 0} {statDetail.واحد}
                                     </span>
                                   </div>
                                   {statDetail.توضیح && (
                                     <div className="text-blue-600/80 leading-relaxed mt-1 flex gap-1">
                                       <Info size={12} className="mt-0.5 shrink-0" />
                                       {statDetail.توضیح}
                                     </div>
                                   )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="mt-2 text-xs text-slate-400 italic">آمار دقیق برای این زیرگروه در دسترس نیست.</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};