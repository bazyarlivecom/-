
import React, { useState, useEffect, useRef } from 'react';
import { isValidNationalId } from '../utils/validation';
import { StatusType, DistributionRecord, Product } from '../types';
import { findAllByNationalId, saveRecords } from '../services/storage';

interface Props {
  onSuccess: () => void;
  products: Product[];
}

const NationalIdForm: React.FC<Props> = ({ onSuccess, products }) => {
  const [nationalId, setNationalId] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState<StatusType>(StatusType.IDLE);
  const [personRecords, setPersonRecords] = useState<DistributionRecord[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCheck = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!isValidNationalId(nationalId)) {
      setStatus(StatusType.INVALID_ID);
      return;
    }

    const records = findAllByNationalId(nationalId);
    setPersonRecords(records);
    setStatus(StatusType.CHECKED);
    
    if (records.length > 0) {
      setFullName(records[0].fullName);
    } else {
      setFullName('');
    }
    setSelectedProductIds([]);
  };

  const handleToggleProduct = (productId: string) => {
    setSelectedProductIds(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleRegister = () => {
    if (!fullName.trim() || selectedProductIds.length === 0) return;

    const newRecords: DistributionRecord[] = selectedProductIds.map(pid => ({
      id: Math.random().toString(36).substr(2, 9),
      nationalId,
      productId: pid,
      productName: products.find(p => p.id === pid)?.name || 'کالای نامشخص',
      fullName,
      timestamp: Date.now(),
    }));

    saveRecords(newRecords);
    setStatus(StatusType.IDLE);
    setNationalId('');
    setFullName('');
    setSelectedProductIds([]);
    onSuccess();
    inputRef.current?.focus(); // Re-focus for next person
  };

  // Keyboard support: Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (status === StatusType.IDLE) {
        handleCheck();
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 mb-8 transition-all">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
          <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
          ثبت توزیع جدید
        </h2>
        <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full font-bold">
          سرعت کاربر: فعال
        </span>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-3">کد ملی گیرنده را وارد کنید</label>
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              maxLength={10}
              value={nationalId}
              onKeyDown={handleKeyPress}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                setNationalId(val);
                if(status !== StatusType.IDLE) setStatus(StatusType.IDLE);
                if(val.length === 10) {
                   // Automatic check when length is 10 for speed
                   // handleCheck(); // Optional: remove if annoying
                }
              }}
              className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-none focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all text-2xl tracking-[0.3em] font-mono text-center"
              placeholder="0000000000"
            />
            <button
              onClick={() => handleCheck()}
              className="px-8 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center"
            >
              بررسی
            </button>
          </div>
        </div>

        {status === StatusType.INVALID_ID && (
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold animate-pulse flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            کد ملی وارد شده معتبر نیست
          </div>
        )}

        {status === StatusType.CHECKED && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
            {products.length === 0 ? (
              <div className="p-6 bg-yellow-50 text-yellow-800 rounded-2xl border border-yellow-100 text-center">
                ⚠️ هیچ کالایی تعریف نشده است.
              </div>
            ) : (
              <>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <label className="block text-sm font-bold text-gray-400 mb-3">نام کامل گیرنده</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border-none focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg font-bold"
                    placeholder="مثال: علی محمدی"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                   {products.map(product => {
                      const received = personRecords.find(r => r.productId === product.id);
                      const isSelected = selectedProductIds.includes(product.id);
                      
                      return (
                        <div 
                          key={product.id}
                          onClick={() => !received && handleToggleProduct(product.id)}
                          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center ${
                            received 
                              ? 'bg-orange-50/50 border-orange-100 opacity-60 cursor-not-allowed grayscale' 
                              : isSelected 
                                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                                : 'bg-white border-gray-100 hover:border-blue-200'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${received ? 'bg-orange-500 text-white' : isSelected ? 'bg-white text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                              {received ? '✓' : isSelected ? '✓' : ''}
                            </div>
                            <span className="font-black text-lg">{product.name}</span>
                          </div>
                          
                          <div className={`text-xs font-bold ${isSelected ? 'text-white' : received ? 'text-orange-600' : 'text-gray-400'}`}>
                            {received ? 'قبلاً دریافت شده' : isSelected ? 'انتخاب شده' : 'آماده دریافت'}
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="flex gap-4">
                   <button
                    onClick={() => setStatus(StatusType.IDLE)}
                    className="flex-1 py-5 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                  >
                    انصراف
                  </button>
                  <button
                    onClick={handleRegister}
                    disabled={selectedProductIds.length === 0 || !fullName.trim()}
                    className="flex-[2] py-5 bg-green-600 text-white rounded-2xl font-bold text-xl hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 transition-all shadow-xl shadow-green-100"
                  >
                    تایید و ثبت نهایی ({selectedProductIds.length})
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NationalIdForm;
