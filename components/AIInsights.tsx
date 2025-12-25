
import React, { useState } from 'react';
import { DistributionRecord } from '../types';
import { getAIReport } from '../services/geminiService';

interface Props {
  records: DistributionRecord[];
}

const AIInsights: React.FC<Props> = ({ records }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (records.length === 0) return;
    setLoading(true);
    const result = await getAIReport(records);
    setReport(result);
    setLoading(false);
  };

  return (
    <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 mb-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-purple-800">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        <h3 className="font-bold">تحلیل هوشمند (Gemini)</h3>
      </div>

      {!report ? (
        <div className="space-y-4">
          <p className="text-sm text-purple-700 opacity-80 leading-relaxed">
            سیستم هوش مصنوعی می‌تواند بر اساس زمان‌های ثبت شده، گزارشی از روند توزیع و پیشنهادات مدیریتی ارائه دهد.
          </p>
          <button
            onClick={handleGenerate}
            disabled={loading || records.length === 0}
            className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:bg-gray-300 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                در حال تحلیل...
              </>
            ) : (
              'دریافت گزارش تحلیل هوشمند'
            )}
          </button>
        </div>
      ) : (
        <div className="text-sm text-purple-900 leading-7 animate-in fade-in zoom-in-95">
          <div className="whitespace-pre-wrap">{report}</div>
          <button 
            onClick={() => setReport(null)}
            className="mt-4 text-xs font-bold text-purple-600 hover:underline"
          >
            بروزرسانی گزارش
          </button>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
