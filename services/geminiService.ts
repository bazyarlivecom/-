
import { GoogleGenAI } from "@google/genai";
import { DistributionRecord } from "../types";

export const getAIReport = async (records: DistributionRecord[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const summary = records.map(r => ({
    product: r.productName,
    time: new Date(r.timestamp).getHours(),
    date: new Date(r.timestamp).toLocaleDateString('fa-IR')
  }));

  const prompt = `
    من یک لیست از توزیع چندین نوع کالا دارم. در مجموع ${records.length} تراکنش ثبت شده است.
    داده‌ها: ${JSON.stringify(summary.slice(-50))}.
    لطفاً یک گزارش تحلیلی کوتاه فارسی ارائه بده:
    ۱. محبوب‌ترین کالاها یا کالاهایی که بیشترین توزیع را داشته‌اند.
    ۲. تحلیل زمانی توزیع.
    ۳. پیشنهاد برای موجودی انبار بر اساس روند فعلی.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || 'خطا در تولید گزارش.';
  } catch (error) {
    return 'امکان تحلیل هوشمند در حال حاضر وجود ندارد.';
  }
};
