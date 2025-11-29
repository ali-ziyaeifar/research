

import React from 'react';
import { AppData, FlowNode } from '../types';
import { motion } from 'framer-motion';
import { Bot, Zap, User } from 'lucide-react';

interface Props {
  data: AppData;
}

export const FlowSlide: React.FC<Props> = ({ data }) => {
  const { "گره‌ها": nodes, نقاط_ورود_پیشنهادی_دستیار_هوشمند } = data.فلوچارت_فرایند_رسیدگی;
  const { نقطه_ورود_اصلی, نقطه_ورود_کمکی_اول, نقطه_ورود_کمکی_دوم, توضیح } = نقاط_ورود_پیشنهادی_دستیار_هوشمند;

  const getEntryStatus = (nodeId: string) => {
    if (nodeId === نقطه_ورود_اصلی) return { label: 'اصلی', color: 'violet', rank: 1 };
    if (nodeId === نقطه_ورود_کمکی_اول) return { label: 'کمکی ۱', color: 'indigo', rank: 2 };
    if (nodeId === نقطه_ورود_کمکی_دوم) return { label: 'کمکی ۲', color: 'blue', rank: 3 };
    return null;
  };

  return (
    <div className="h-full flex flex-col">
      {/* AI Recommendation Banner */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 bg-gradient-to-r from-violet-700 to-indigo-600 rounded-xl p-5 text-white shadow-lg shrink-0"
      >
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-full shrink-0">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">نقاط ورود پیشنهادی هوش مصنوعی</h3>
             <ul className="space-y-1 text-sm text-violet-100 list-disc list-inside opacity-90">
               {توضیح.map((r, i) => (
                 <li key={i}>{r}</li>
               ))}
             </ul>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar relative pb-12">
        <div className="absolute top-4 bottom-4 right-[27px] w-0.5 bg-slate-200" />
        
        <div className="space-y-6 relative z-10">
          {nodes.map((node: FlowNode, idx: number) => {
             const entryStatus = getEntryStatus(node.شناسه);
             
             return (
              <motion.div
                key={node.شناسه}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 group"
              >
                {/* Step Indicator */}
                <div className={`
                  flex-shrink-0 w-14 h-14 rounded-full border-4 flex items-center justify-center font-bold text-lg shadow-sm z-10
                  ${entryStatus 
                    ? `bg-${entryStatus.color}-100 border-${entryStatus.color}-500 text-${entryStatus.color}-700` 
                    : node.شناسه.startsWith('مرحله_۰') || node.شناسه.startsWith('مرحله_۱')
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-600'
                      : 'bg-white border-slate-300 text-slate-500'
                  }
                `}>
                  {entryStatus ? <Zap size={24} fill="currentColor" /> : idx + 1}
                </div>

                {/* Content Card */}
                <div className={`flex-1 p-5 rounded-xl border shadow-sm relative transition-all ${
                  entryStatus 
                    ? `bg-${entryStatus.color}-50 border-${entryStatus.color}-200 ring-1 ring-${entryStatus.color}-300` 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}>
                  {entryStatus && (
                    <div className={`absolute -top-3 left-4 bg-${entryStatus.color}-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md font-bold`}>
                       نقطه ورود {entryStatus.label}
                    </div>
                  )}

                  <div className="flex justify-between items-start">
                    <h3 className={`font-bold text-lg ${entryStatus ? `text-${entryStatus.color}-900` : 'text-slate-800'}`}>
                      {node.برچسب}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{node.توضیح}</p>
                  
                  {node.نکته && (
                    <div className="mt-3 flex items-center gap-2 text-xs bg-rose-50 text-rose-700 p-2 rounded border border-rose-100">
                      <User size={14} />
                      <span className="font-bold">{node.نکته}</span>
                    </div>
                  )}

                  {node.آمار_مرتبط && Object.keys(node.آمار_مرتبط).length > 0 && (
                     <div className="mt-3 pt-3 border-t border-slate-200/50 flex flex-wrap gap-4">
                       {Object.entries(node.آمار_مرتبط).map(([k, v]) => (
                           <div key={k} className="text-xs">
                             <span className="text-slate-500 block">{k.replace(/_/g, ' ')}</span>
                             <span className="font-bold text-slate-800 text-sm">{v}</span>
                           </div>
                       ))}
                     </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};