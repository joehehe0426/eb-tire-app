import React, { useState } from 'react';
import { Smartphone, CheckCircle, MapPin } from 'lucide-react';

interface RegistrationProps {
  onVerify: (phone: string) => void;
}

export const Registration: React.FC<RegistrationProps> = ({ onVerify }) => {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'INPUT' | 'VERIFY'>('INPUT');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    if (phone.length < 8) return;
    setLoading(true);
    
    // Simulate SMS Network Delay
    setTimeout(() => {
      setLoading(false);
      setStep('VERIFY');
      // In production, the SMS is sent via backend. 
      // For testing purposes, the code is silently logged to console.
      console.log(`[System] SMS Sent to ${phone}. Code: 8888`);
    }, 1500);
  };

  const handleVerify = () => {
    // Hardcoded check for internal testing/admin access
    if (code === '8888') {
      onVerify(phone);
    } else {
      alert("驗證碼錯誤 (Invalid Code)");
    }
  };

  return (
    <div className="flex flex-col h-full bg-brand-bg">
      {/* Company Info Area */}
      <div className="bg-gradient-to-b from-brand-primary to-brand-accent text-white p-8 text-center rounded-b-[3rem] shadow-xl mb-8 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-10 -translate-y-10 blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-dark/20 rounded-full translate-x-10 translate-y-10 blur-xl"></div>
        
        <div className="relative z-10">
          {/* Logo Container - Adjusted for better aspect ratio */}
          <div className="h-32 w-full flex items-center justify-center mb-4">
             <div className="h-full w-auto relative">
                <img 
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt="EB Rescue App Logo" 
                  className="h-full w-auto object-contain drop-shadow-xl filter"
                />
             </div>
          </div>
          {/* Text is hidden/minimized if logo contains text, but kept for structure */}
          <h2 className="text-3xl font-black mb-1 tracking-wider drop-shadow-md hidden">EB</h2>
          <h3 className="text-lg font-bold mb-3 tracking-widest uppercase opacity-90 text-pink-100">呔妹 24小時換呔服務</h3>
          
          <div className="flex items-center justify-center text-brand-dark text-sm mt-3 bg-white/95 rounded-full py-1.5 px-5 inline-flex mx-auto shadow-sm backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-brand-primary" />
            <p className="font-bold">香港觀塘偉業街169號</p>
          </div>
        </div>
      </div>

      <div className="px-6 flex-1 max-w-md mx-auto w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
          {step === 'INPUT' ? '會員登記 / 登入' : '輸入驗證碼'}
        </h3>

        {step === 'INPUT' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 pl-1">手提電話號碼</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-3.5 text-brand-primary w-5 h-5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="請輸入 8 位數字電話"
                  className="w-full pl-10 pr-4 py-3.5 border border-pink-200 rounded-2xl focus:ring-4 focus:ring-brand-light focus:border-brand-primary outline-none transition-all bg-white shadow-sm"
                />
              </div>
            </div>
            <button
              onClick={handleSendCode}
              disabled={loading || phone.length < 8}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-200 transition-all active:scale-95 ${
                loading || phone.length < 8
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-brand-primary text-white hover:bg-brand-accent'
              }`}
            >
              {loading ? '發送中...' : '獲取驗證碼'}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
             <div className="text-center mb-4 text-gray-600 bg-pink-50 py-3 rounded-xl border border-pink-100">
               已發送驗證碼至 <br/><span className="font-bold text-brand-primary text-lg">{phone}</span>
             </div>
             
             <div className="flex justify-center space-x-3">
               {[0, 1, 2, 3].map((_, i) => (
                 <input
                   key={i}
                   type="text"
                   maxLength={1}
                   value={code[i] || ''}
                   onChange={(e) => {
                     const val = e.target.value;
                     if (!/^\d*$/.test(val)) return;
                     const newCode = code.split('');
                     newCode[i] = val;
                     setCode(newCode.join('').slice(0, 4));
                     
                     // Auto focus next
                     if (val && i < 3) {
                       const nextInput = document.querySelector(`input[name=code-${i + 1}]`) as HTMLInputElement;
                       if (nextInput) nextInput.focus();
                     }
                   }}
                   name={`code-${i}`}
                   className="w-14 h-16 text-center text-3xl font-bold text-brand-primary border-2 border-pink-100 rounded-xl focus:border-brand-primary focus:ring-4 focus:ring-brand-light outline-none bg-white shadow-sm transition-all"
                 />
               ))}
             </div>
             
             <button
              onClick={handleVerify}
              disabled={code.length < 4}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95 ${
                code.length < 4
                ? 'bg-gray-200 text-gray-400'
                : 'bg-brand-primary text-white hover:bg-brand-accent shadow-pink-200'
              }`}
            >
              <CheckCircle className="w-6 h-6" />
              <span>確認登入</span>
            </button>
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => setStep('INPUT')}
                className="w-full text-center text-gray-400 text-sm hover:text-brand-primary transition-colors font-medium"
              >
                返回修改電話
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Decorative footer */}
      <div className="py-4 text-center text-xs text-brand-primary/40 font-medium">
        EB Rescue App v1.0
      </div>
    </div>
  );
};