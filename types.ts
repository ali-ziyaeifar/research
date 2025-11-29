

export interface StatDetail {
  مقدار?: number;
  مقدار_تقریبی?: number;
  تعداد_سازش?: number;
  درصد_سازش?: number;
  ورودی?: number;
  مختومه?: number;
  حداقل?: number;
  حداکثر?: number;
  میانگین_تقریبی?: number;
  نسبت_اظهارنامه_به_دادخواست?: string;
  درصد?: number;
  واحد?: string;
  واحد_درصد?: string;
  توضیح?: string;
  منبع?: string;
  نکته?: string;
}

export interface OverallStats {
  حجم_کلی_پرونده_های_در_گردش_سالانه: StatDetail;
  تعداد_پرونده_های_یکتا_سالانه: StatDetail;
  پرونده_های_ارجاعی_به_شورای_حل_اختلاف_در_سال_۱۴۰۳: StatDetail;
  پرونده_های_منتهی_به_سازش_در_شورا_۱۴۰۳: StatDetail;
  پرونده_های_دادگستری_تهران_۱۴۰۲: StatDetail;
  درصد_پرونده_های_بدون_وکیل: StatDetail;
  نسبت_اظهارنامه_به_دادخواست: StatDetail;
  نرخ_تبدیل_اظهارنامه_به_دادخواست: StatDetail;
}

export interface SubCategory {
  کد: string;
  عنوان: string;
  "نمونه‌ها": string[];
  آمار: Record<string, StatDetail>;
  داده_موجود_نیست?: boolean;
}

export interface Category {
  کد: string;
  عنوان: string;
  توضیح: string;
  "زیرگروه‌ها": Record<string, SubCategory>;
}

export interface CaseTree {
  [key: string]: Category;
}

export interface FlowNode {
  شناسه: string;
  برچسب: string;
  توضیح: string;
  نکته?: string;
  "کاربرد_در_دسته‌ها"?: Record<string, string[]>;
  آمار_مرتبط?: Record<string, any>;
}

export interface Flowchart {
  "گره‌ها": FlowNode[];
  "یال‌ها": string[][];
  نقاط_ورود_پیشنهادی_دستیار_هوشمند: {
    نقطه_ورود_اصلی: string;
    نقطه_ورود_کمکی_اول: string;
    نقطه_ورود_کمکی_دوم: string;
    توضیح: string[];
  };
}

export interface PreFilingToolConfig {
  ابزارها: string[];
  توضیح: string;
}

export interface PreFilingMap {
  [verticalKey: string]: Record<string, PreFilingToolConfig>;
}

export interface ScoreFactor {
  عنوان: string;
  توضیح_کوتاه: string;
  توضیح_تفصیلی: string;
  نمونه: string;
}

export interface ScoringFactors {
  [key: string]: ScoreFactor;
}

export interface VerticalScoreConfig {
  کد_ورتیکال: string;
  عنوان: string;
  دسته_های_زیرمجموعه?: string[];
  امتیازات_از_۱_تا_۵: {
    حجم_پرونده: number;
    پیچیدگی_و_حساسیت: number;
    عمق_پیش_از_دعوا: number;
    پتانسیل_اتوماسیون: number;
    اصطکاک_با_وکلا: number;
    ریسک_آسیب: number;
    شفافیت_قواعد: number;
    تناسب_با_کاربر_بدون_وکیل: number;
  };
  توضیح: string;
}

export interface ScoringSystem {
  فاکتورها: ScoringFactors;
  امتیاز_به_ورتیکال_ها: Record<string, VerticalScoreConfig>;
}

export interface MvpRecommendation {
  ورتیکال_منتخب: {
    کد_ورتیکال: string;
    عنوان: string;
    دسته_های_منتخب: string[];
  };
  دلایل_انتخاب: string[];
  نقاط_ورود_در_فلوچارت: string[];
}

export interface RiskConfig {
  عنوان: string;
  توضیح: string;
  اهمیت: string;
  راهکارهای_کاهش: string[];
}

export interface RiskAnalysis {
  انواع_ریسک: Record<string, RiskConfig>;
}

export interface AppData {
  فراداده: {
    عنوان: string;
    نسخه: string;
    زبان: string;
    منابع_اصلی: string[];
  };
  آمار_کل: OverallStats;
  درخت_دعاوی_بر_اساس_ماهیت: CaseTree;
  فلوچارت_فرایند_رسیدگی: Flowchart;
  ابزارهای_پیش_از_دعوا_به_تفکیک: Record<string, Record<string, PreFilingToolConfig>>;
  ماتریس_امتیازدهی: ScoringSystem;
  پیشنهاد_نسخه_اول: MvpRecommendation;
  تحلیل_ریسک: RiskAnalysis;
}