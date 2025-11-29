
import React from 'react';
import { AppData, VerticalScoreConfig, RiskConfig } from '../types';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, TrendingUp, AlertOctagon, BrainCircuit } from 'lucide-react';

interface Props {
  data: AppData;
}

export const MvpSlide: React.FC<Props> = ({ data }) => {
  const { ماتریس_امتیازدهی, پیشنهاد_نسخه_اول, تحلیل_ریسک } = data;
  const scores = Object.values(ماتریس_امتیازدهی.امتیاز_به_ورتیکال_ها);
  const criteriaKeys = Object.keys(ماتریس_امتیازدهی.فاکتورها);

  return (
    <div className="h-full overflow-y-auto custom-scrollbar pr-2 pb-10">
      
      {/* 1. Scoring Matrix */}
      <section className="mb-10">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp className="text-blue-600" /> ماتریس انتخاب هوشمند (Scoring Matrix)
        </h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-4 rounded-tr-xl min-w-[150px]">خوشه / ورتیکال</th>
                {criteriaKeys.map(k => (
                  <th key={k} className="p-4 whitespace-nowrap font-semibold" title={ماتریس_امتیازدهی.فاکتورها[k].توضیح_کوتاه}>
                     {ماتریس_امتیازدهی.فاکتورها[k].عنوان.split(' ')[0]}
                     <span className="block text-[10px] font-normal opacity-70">
                       {k === 'تناسب_با_کاربر_بدون_وکیل' ? 'تناسب کاربر' : k === 'عمق_پیش_از_دعوا' ? 'عمق پیش‌دعوا' : ''}
                     </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scores.map((scoreConfig: VerticalScoreConfig) => {
                const isSelected = scoreConfig.کد_ورتیکال === پیشنهاد_نسخه_اول.ورتیکال_منتخب.کد_ورتیکال;
                return (
                  <tr key={scoreConfig.کد_ورتیکال} className={`border-t border-slate-100 transition-colors ${isSelected ? 'bg-blue-50/60' : ''}`}>
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{scoreConfig.عنوان}</div>
                      {isSelected && <span className="inline-block mt-1 text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full">انتخاب نهایی</span>}
                    </td>
                    <td className="p-4">{scoreConfig.امتیازات_از_۱_تا_۵.حجم_پرونده}</td>
                    <td className="p-4 text-rose-600 font-bold">{scoreConfig.امتیازات_از_۱_تا_۵.پیچیدگی_و_حساسیت}</td>
                    <td className="p-4 text-emerald-600 font-bold">{scoreConfig.امتیازات_از_۱_تا_۵.عمق_پیش_از_دعوا}</td>
                    <td className="p-4">{scoreConfig.امتیازات_از_۱_تا_۵.پتانسیل_اتوماسیون}</td>
                    <td className="p-4 text-amber-600">{scoreConfig.امتیازات_از_۱_تا_۵.اصطکاک_با_وکلا}</td>
                    <td className="p-4">{scoreConfig.امتیازات_از_۱_تا_۵.ریسک_آسیب}</td>
                    <td className="p-4">{scoreConfig.امتیازات_از_۱_تا_۵.شفافیت_قواعد}</td>
                    <td className="p-4 text-blue-600 font-bold">{scoreConfig.امتیازات_از_۱_تا_۵.تناسب_با_کاربر_بدون_وکیل}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* 2. MVP Winner Card */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-20 -translate-y-20 blur-3xl" />
          
          <div className="flex items-start gap-4 mb-8 relative z-10">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm shadow-inner">
              <Star fill="currentColor" className="text-yellow-400 w-8 h-8" />
            </div>
            <div>
               <div className="text-blue-200 text-sm font-bold mb-1 uppercase tracking-wider">MVP پیشنهادی</div>
               <h2 className="text-2xl font-bold leading-tight">{پیشنهاد_نسخه_اول.ورتیکال_منتخب.عنوان}</h2>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
             <div>
                <h4 className="font-bold text-blue-100 mb-3 text-sm flex items-center gap-2">
                   <CheckCircle2 size={16} /> چرا این حوزه؟
                </h4>
                <ul className="space-y-2">
                  {پیشنهاد_نسخه_اول.دلایل_انتخاب.map((reason, i) => (
                    <li key={i} className="text-sm text-blue-50/90 pl-4 border-r-2 border-blue-400/30">
                      {reason}
                    </li>
                  ))}
                </ul>
             </div>

             <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                <h4 className="font-bold text-blue-100 mb-3 text-sm flex items-center gap-2">
                   <BrainCircuit size={16} /> استراتژی محصول
                </h4>
                <ul className="space-y-2">
                   {پیشنهاد_نسخه_اول.نقاط_ورود_در_فلوچارت.map((p, i) => (
                     <li key={i} className="text-xs text-blue-50 leading-relaxed">
                        • {p}
                     </li>
                   ))}
                </ul>
             </div>
          </div>
        </motion.div>

        {/* 3. Detailed Risks Analysis */}
        <div className="space-y-4">
           <h3 className="font-bold text-rose-800 flex items-center gap-2 text-lg">
             <AlertOctagon className="w-6 h-6" /> تحلیل و مدیریت ریسک
           </h3>
           
           <div className="grid grid-cols-1 gap-4">
             {Object.entries(تحلیل_ریسک.انواع_ریسک).map(([key, config], idx) => {
               const risk = config as RiskConfig;
               return (
                 <div key={key} className="bg-white p-5 rounded-xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-rose-700 text-base">
                        {risk.عنوان}
                      </span>
                      <span className="bg-rose-50 text-rose-600 text-xs px-2 py-1 rounded font-bold">
                        اهمیت: {risk.اهمیت}
                      </span>
                   </div>
                   <p className="text-slate-600 text-sm mb-3">{risk.توضیح}</p>
                   
                   <div className="bg-slate-50 p-3 rounded-lg text-xs border border-slate-100">
                     <strong className="block text-slate-700 mb-1">راهکار کاهش (Mitigation):</strong>
                     <ul className="list-disc list-inside space-y-1 text-slate-500">
                       {risk.راهکارهای_کاهش.map((m, i) => <li key={i}>{m}</li>)}
                     </ul>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

      </div>
    </div>
  );
};
