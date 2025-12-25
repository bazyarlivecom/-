
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { getProducts, addProduct, deleteProduct, updateProduct } from '../services/storage';

interface Props {
  onChanged: () => void;
}

const ProductManagement: React.FC<Props> = ({ onChanged }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleAdd = () => {
    if (!newName.trim()) return;
    addProduct(newName);
    setNewName('');
    const updated = getProducts();
    setProducts(updated);
    onChanged();
  };

  const handleDelete = (id: string) => {
    if (confirm('آیا از حذف این کالا اطمینان دارید؟ (سوابق قبلی باقی می‌مانند)')) {
      deleteProduct(id);
      const updated = getProducts();
      setProducts(updated);
      onChanged();
    }
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setEditName(p.name);
  };

  const handleUpdate = () => {
    if (editingId && editName.trim()) {
      updateProduct(editingId, editName);
      setEditingId(null);
      const updated = getProducts();
      setProducts(updated);
      onChanged();
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        مدیریت کالاها
      </h3>

      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={newName} 
          onChange={e => setNewName(e.target.value)}
          placeholder="نام کالای جدید..."
          className="w-full px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
        />
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 shadow-lg shadow-purple-100"
        >
          افزودن
        </button>
      </div>

      <div className="space-y-2">
        {products.map(p => (
          <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group hover:bg-gray-100 transition-colors">
            {editingId === p.id ? (
              <div className="flex gap-2 w-full">
                <input 
                  autoFocus
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full px-2 py-1 rounded border text-sm"
                />
                <button onClick={handleUpdate} className="text-green-600 font-bold text-xs">ذخیره</button>
                <button onClick={() => setEditingId(null)} className="text-gray-400 text-xs">لغو</button>
              </div>
            ) : (
              <>
                <span className="text-sm font-bold text-gray-700">{p.name}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(p)} className="p-1.5 text-blue-500 hover:bg-blue-100 rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
