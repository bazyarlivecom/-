
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NationalIdForm from './components/NationalIdForm';
import StatsCards from './components/StatsCards';
import RecordsList from './components/RecordsList';
import AIInsights from './components/AIInsights';
import ProductManagement from './components/ProductManagement';
import { getRecords, getProducts } from './services/storage';
import { DistributionRecord, Product, ViewType } from './types';

const App: React.FC = () => {
  const [records, setRecords] = useState<DistributionRecord[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeView, setActiveView] = useState<ViewType>('DASHBOARD');

  const refreshData = () => {
    setRecords(getRecords());
    setProducts(getProducts());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'DASHBOARD':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <StatsCards records={records} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecordsList records={records} />
              <div className="space-y-6">
                <AIInsights records={records} />
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl">
                  <h3 className="text-xl font-bold mb-4">خوش آمدید</h3>
                  <p className="text-blue-100 leading-relaxed mb-6">
                    این سیستم برای مدیریت دقیق و سریع توزیع کالاها طراحی شده است. از منوی سمت راست برای ناوبری سریع استفاده کنید.
                  </p>
                  <button 
                    onClick={() => setActiveView('INQUIRY')}
                    className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                  >
                    شروع استعلام جدید
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'INQUIRY':
        return (
          <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
             <NationalIdForm onSuccess={refreshData} products={products} />
          </div>
        );
      case 'HISTORY':
        return (
          <div className="animate-in fade-in duration-500">
            <RecordsList records={records} />
          </div>
        );
      case 'SETTINGS':
        return (
          <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
            <ProductManagement onChanged={refreshData} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 lg:p-10">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around p-3 z-50">
        <button onClick={() => setActiveView('DASHBOARD')} className={`p-2 rounded-xl ${activeView === 'DASHBOARD' ? 'text-blue-600 bg-blue-50' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        </button>
        <button onClick={() => setActiveView('INQUIRY')} className={`p-2 rounded-xl ${activeView === 'INQUIRY' ? 'text-blue-600 bg-blue-50' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </button>
        <button onClick={() => setActiveView('HISTORY')} className={`p-2 rounded-xl ${activeView === 'HISTORY' ? 'text-blue-600 bg-blue-50' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        </button>
      </div>
    </div>
  );
};

export default App;
