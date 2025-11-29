
import React from 'react';
import { AppData } from '../types';
import { motion } from 'framer-motion';
import { Scale, FileText, Users, Landmark, UserX, Mail, Layers, AlertCircle } from 'lucide-react';

interface Props {
  data: AppData;
}

export const IntroSlide: React.FC<Props> = ({ data }) => {
  const stats = data.آمار_کل;
  
  // Highlighting the massive circulating volume
  const heroStat = {
    label: "حجم کلی پرونده‌های در گردش",
    val: "۲۱ میلیون",
    unit: stats.حجم_کلی_پرونده_های_در_گردش_سالانه.واحد,
    desc: stats.حجم_کلی_پرونده_های_در_گردش_سالانه.توضیح
  };

  const cards = [
    {
      label: "پرونده‌های یکتای سالانه",
      val: stats.تعداد_پرونده_های_یکتا_سالانه.مقدار_تقریبی?.toLocaleString(),
      unit: "پرونده",
      subtext: "ورودی کل کشور",
      icon: Scale,
      color: "blue"
    },
    {
      label: "بدون وکیل",
      val: stats.درصد_پرونده_های_بدون_وکیل.میانگین_تقریبی + "%",
      unit: "کاربران",
      subtext: "تقریباً ۹ نفر از ۱۰ نفر",
      icon: UserX,
      color: "rose"
    },
    {
      label: "نرخ سازش شوراها",
      val: stats.پرونده_های_منتهی_به_سازش_در_شورا_۱۴۰۳.درصد_سازش + "%",
      unit: "موفقیت",
      subtext: "پرونده‌های قابل صلح",
      icon: Users,
      color: "emerald"
    },
    {
      label: "ورودی تهران ۱۴۰۲",
      val: stats.پرونده_های_دادگستری_تهران_۱۴۰۲.ورودی?.toLocaleString(),
      unit: "پرونده",
      subtext: "استان تهران",
      icon: Landmark,
      color: "indigo"
    },
    {
      label: "نسبت اظهارنامه به دعوا",
      val: stats.نسبت_اظهارنامه_به_دادخواست.نسبت_اظهارنامه_به_دادخواست,
      unit: "نسبت",
      subtext: "۱ اظهارنامه به ۳ دادخواست",
      icon: Mail,
      color: "amber",
      hasWarning: true
    },
    {
      label: "تبدیل اظهارنامه به دعوا",
      val: stats.نرخ_تبدیل_اظهارنامه_به_دادخواست.درصد + "%",
      unit: "نرخ تبدیل",
      subtext: "۳۰٪ پیگیری قضایی می‌کنند",
      icon: FileText,
      color: "cyan",
      hasWarning: true
    }
  ];

  return (
    <div className="flex flex-col h-full justify-start space-y-6 pt-2">
      
      {/* Hero Stat Section */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden shrink-0"
      >
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -translate-x-10 -translate-y-10" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="bg-white/10 p-4 rounded-xl">
               <Layers className="w-8 h-8 text-blue-300" />
             </div>
             <div>
               <h3 className="text-blue-200 text-sm font-bold mb-1">{heroStat.label}</h3>
               <div className="text-4xl md:text-5xl font-black tracking-tight">{heroStat.val}</div>
               <div className="text-xs text-slate-400 mt-1">{heroStat.unit}</div>
             </div>
          </div>
          <div className="text-sm text-slate-300 max-w-lg leading-relaxed text-right border-r border-slate-600 pr-4">
            {heroStat.desc}
          </div>
        </div>
      </motion.div>

      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.2 }}
         className="text-center py-2"
      >
        <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
          داده‌های آماری نشان می‌دهد که با وجود حجم عظیم ۲۱ میلیونی پرونده‌ها، 
          <span className="font-bold text-rose-600 mx-1">۸۸٪</span> 
          مراجعان بدون وکیل وارد سیستم می‌شوند. این شکاف بزرگ، فرصت طلایی برای مداخله هوشمند در مراحل اولیه (اظهارنامه) است.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-8 overflow-y-auto custom-scrollbar pr-1">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col relative overflow-visible group hover:shadow-md transition-shadow"
            >
              <div className={`absolute top-0 right-0 w-1 h-full bg-${card.color}-500 transition-all group-hover:w-1.5`} />
              
              {/* Warning Tooltip */}
              {card.hasWarning && (
                <div className="absolute top-3 left-3 z-20">
                  <div className="relative flex items-center justify-center group/tooltip">
                    <AlertCircle className="w-5 h-5 text-amber-400 cursor-help opacity-80 hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-full left-0 mb-2 w-max max-w-[180px] p-2 bg-slate-800 text-white text-[10px] rounded-lg shadow-xl opacity-0 translate-y-1 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-hover/tooltip:translate-y-0 transition-all duration-200 text-center z-30 pointer-events-none">
                      منبعی برای این آمار موجود نیست
                      <div className="absolute top-full left-2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-start mb-3">
                 <div className={`p-2.5 bg-${card.color}-50 rounded-lg`}>
                   <Icon className={`w-6 h-6 text-${card.color}-600`} />
                 </div>
                 <div className="text-right">
                    <div className="text-3xl font-black text-slate-800 tracking-tight">
                        {card.val}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 mt-1">{card.unit}</div>
                 </div>
              </div>
              
              <h3 className="text-slate-700 font-bold text-base mb-1">{card.label}</h3>
              <p className="text-slate-400 text-xs">{card.subtext}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
