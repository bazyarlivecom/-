
import React from 'react';
import { DistributionRecord } from '../types';
import { formatPersianDate } from '../utils/validation';

interface Props {
  records: DistributionRecord[];
}

const RecordsList: React.FC<Props> = ({ records }) => {
  const sortedRecords = [...records].reverse().slice(0, 15);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
           <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          آخرین تراکنش‌های سیستم
        </h3>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">بروزرسانی زنده</span>
      </div>
      
      {records.length === 0 ? (
        <div className="p-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
          </div>
          <p className="text-gray-400 font-medium">هنوز هیچ توزیعی ثبت نشده است.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-black">نام کالا</th>
                <th className="px-6 py-4 font-black">گیرنده</th>
                <th className="px-6 py-4 font-black">کد ملی</th>
                <th className="px-6 py-4 font-black">زمان ثبت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sortedRecords.map((r) => (
                <tr key={r.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
                      {r.productName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-700 group-hover:text-blue-700 transition-colors">{r.fullName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-500 font-mono text-sm tracking-tighter">{r.nationalId}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {formatPersianDate(r.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecordsList;
