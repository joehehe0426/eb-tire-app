import React, { useState, useRef } from 'react';
import { Camera, Send, X, AlertTriangle, Loader2 } from 'lucide-react';
import { TirePosition, EmergencyRequest } from '../types';
import { analyzeTireImage } from '../services/geminiService';

interface EmergencyFormProps {
  onSubmit: (data: EmergencyRequest) => void;
  onCancel: () => void;
}

export const EmergencyForm: React.FC<EmergencyFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [tirePosition, setTirePosition] = useState<TirePosition | ''>('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setPhoto(base64);
        
        // Trigger AI Analysis
        setIsAnalyzing(true);
        const feedback = await analyzeTireImage(base64);
        setAiFeedback(feedback);
        setIsAnalyzing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !carBrand || !tirePosition) {
      alert('請填寫所有必填欄位');
      return;
    }
    onSubmit({
      name,
      carBrand,
      tirePosition,
      photoBase64: photo,
      aiAnalysis: aiFeedback || undefined
    });
  };

  return (
    <div className="min-h-screen bg-brand-bg pb-20">
      <div className="bg-brand-accent p-4 text-white flex items-center sticky top-0 z-40 shadow-lg border-b border-brand-dark/20">
        <button onClick={onCancel} className="mr-4 p-2 hover:bg-white/20 rounded-full transition-colors">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          爆呔緊急維修表格
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto space-y-4 mt-2">
        
        {/* Photo Section */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-brand-light">
          <label className="block text-sm font-bold text-gray-800 mb-3 flex justify-between items-center">
            輪胎狀況照片 
            <span className="text-brand-primary text-xs bg-brand-light px-2.5 py-1 rounded-full border border-pink-200 font-bold">AI 智能分析</span>
          </label>
          
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {!photo ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-48 border-2 border-dashed border-brand-primary/30 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:bg-pink-50 hover:border-brand-primary transition-all group bg-gray-50/50"
            >
              <div className="bg-white p-4 rounded-full mb-3 group-hover:bg-brand-light shadow-sm transition-colors">
                <Camera className="w-8 h-8 text-brand-primary" />
              </div>
              <span className="font-bold text-brand-primary">拍攝受損輪胎</span>
              <span className="text-xs text-gray-400 mt-1">點擊開啟相機</span>
            </button>
          ) : (
            <div className="space-y-3">
              <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-black shadow-md border-2 border-brand-light">
                <img src={photo} alt="Tire condition" className="w-full h-full object-contain" />
                <button
                  type="button"
                  onClick={() => setPhoto(null)}
                  className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full hover:bg-brand-red transition-colors backdrop-blur-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* AI Analysis Feedback Box */}
              <div className="bg-white border-l-4 border-brand-primary p-4 rounded-xl shadow-sm relative overflow-hidden bg-gradient-to-r from-pink-50 to-white">
                <div className="flex items-center text-brand-primary font-bold mb-2 text-sm">
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      正在分析輪胎狀況...
                    </>
                  ) : (
                    <>
                      <span className="mr-2 text-lg">🤖</span>
                      AI 初步評估
                    </>
                  )}
                </div>
                {!isAnalyzing && aiFeedback && (
                  <p className="text-gray-700 leading-relaxed text-sm pl-1">
                    {aiFeedback}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Text Fields */}
        <div className="bg-white p-5 rounded-3xl shadow-sm space-y-5 border border-brand-light">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">聯絡人稱呼</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如: 陳先生"
              className="w-full p-3.5 border border-pink-100 rounded-xl focus:ring-4 focus:ring-brand-light focus:border-brand-primary outline-none transition-all bg-gray-50/30 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">車輛品牌/型號</label>
            <input
              type="text"
              value={carBrand}
              onChange={(e) => setCarBrand(e.target.value)}
              placeholder="例如: Toyota Corolla"
              className="w-full p-3.5 border border-pink-100 rounded-xl focus:ring-4 focus:ring-brand-light focus:border-brand-primary outline-none transition-all bg-gray-50/30 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">受損輪胎位置</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(TirePosition).map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => setTirePosition(pos)}
                  className={`p-3.5 text-sm rounded-xl border transition-all duration-200 font-medium ${
                    tirePosition === pos
                      ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-pink-200 transform scale-[1.02]'
                      : 'bg-gray-50 text-gray-600 border-transparent hover:bg-pink-50 hover:border-brand-light hover:text-brand-primary'
                  }`}
                >
                  {pos.split(' (')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-300 flex items-center justify-center space-x-2 active:scale-95 transition-transform border-b-4 border-brand-accent hover:bg-brand-accent hover:border-brand-dark"
        >
          <Send className="w-5 h-5" />
          <span>立即呼叫救援</span>
        </button>
      </form>
    </div>
  );
};