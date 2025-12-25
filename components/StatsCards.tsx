
import React from 'react';
import { DistributionRecord } from '../types';

interface Props {
  records: DistributionRecord[];
}

const StatsCards: React.FC<Props> = ({ records }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-gray-400 text-sm font-medium mb-1">کل توزیع شده</div>
        <div className="text-3xl font-black text-blue-600">{records.length} <span className="text-sm font-normal text-gray-400">عدد</span></div>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-gray-400 text-sm font-medium mb-1">امروز</div>
        <div className="text-3xl font-black text-green-600">
          {records.filter(r => new Date(r.timestamp).toDateString() === new Date().toDateString()).length}
        </div>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-gray-400 text-sm font-medium mb-1">آخرین فعالیت</div>
        <div className="text-lg font-bold text-gray-700">
          {records.length > 0 ? new Date(records[records.length - 1].timestamp).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }) : '---'}
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
