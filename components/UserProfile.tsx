import React, { useState } from 'react';
import { User, Car, FileText, Save } from 'lucide-react';

interface UserProfileProps {
  phone: string;
  onSave: (data: { name: string; carBrand: string; licensePlate: string }) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ phone, onSave }) => {
  const [name, setName] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !carBrand) {
      alert('請填寫姓名及車輛品牌');
      return;
    }
    onSave({ name, carBrand, licensePlate });
  };

  return (
    <div className="min-h-screen bg-brand-bg p-6 flex flex-col">
      <div className="mt-8 mb-8 text-center">
        <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
          <User className="w-10 h-10 text-brand-primary" />
        </div>
        <h2 className="text-2xl font-bold text-brand-dark">完善個人資料</h2>
        <p className="text-gray-500 text-sm mt-1">
          電話: {phone}<br/>
          請填寫基本資料以便我們提供服務
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-lg border border-pink-100 space-y-5 flex-1">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 pl-1">聯絡人稱呼 <span className="text-red-500">*</span></label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="陳大文"
              className="w-full pl-10 pr-4 py-3 border border-pink-100 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all bg-gray-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 pl-1">車輛品牌/型號 <span className="text-red-500">*</span></label>
          <div className="relative">
            <Car className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={carBrand}
              onChange={(e) => setCarBrand(e.target.value)}
              placeholder="Toyota Corolla"
              className="w-full pl-10 pr-4 py-3 border border-pink-100 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all bg-gray-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 pl-1">車牌號碼 (選填)</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="AB 1234"
              className="w-full pl-10 pr-4 py-3 border border-pink-100 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all bg-gray-50"
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-200 flex items-center justify-center space-x-2 active:scale-95 transition-transform"
          >
            <Save className="w-5 h-5" />
            <span>儲存資料</span>
          </button>
        </div>
      </form>
    </div>
  );
};