import React from 'react';
import { MapPin, Navigation, ChevronLeft } from 'lucide-react';

interface RepairLocationProps {
  onBack: () => void;
}

export const RepairLocation: React.FC<RepairLocationProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* Header */}
      <div className="bg-brand-primary p-4 text-white flex items-center shadow-lg sticky top-0 z-50">
        <button 
          onClick={onBack} 
          className="mr-3 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold">補呔服務</h2>
      </div>

      <div className="flex-1 p-5 flex flex-col">
         
         <div className="bg-white p-6 rounded-3xl shadow-md border border-pink-100 w-full mb-6 text-center relative overflow-hidden">
            <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-brand-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">親臨維修中心</h3>
            <p className="text-gray-500 text-sm mb-4">Visit our shop for repair services</p>
            
            <div className="bg-gray-50 p-4 rounded-xl mb-5 text-left border border-gray-100">
               <p className="text-brand-dark font-bold text-lg">香港觀塘偉業街169號</p>
               <p className="text-gray-400 text-xs">169 Wai Yip St, Kwun Tong, Hong Kong</p>
            </div>
            
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=169+Wai+Yip+St,+Kwun+Tong,+Hong+Kong"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-full py-4 bg-[#4285F4] text-white rounded-xl font-bold shadow-md shadow-blue-200 hover:bg-blue-600 transition-all active:scale-95"
            >
              <Navigation className="w-5 h-5 mr-2" /> 
              Start Navigation
            </a>
         </div>

         {/* Map Embed */}
         <div className="w-full flex-1 min-h-[300px] rounded-3xl overflow-hidden shadow-inner border border-gray-200 bg-gray-100 relative">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230.69421600014905!2d114.21986283535662!3d22.311775478615193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340405d3a8c554af%3A0xd3a0cae3f623a51e!2sEBYU24CAR!5e0!3m2!1sen!2sjp!4v1763920238332!5m2!1sen!2sjp"
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             allowFullScreen 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             title="Shop Location"
             className="absolute inset-0 w-full h-full"
           ></iframe>
         </div>

         <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
                營業時間: 24小時 (24 Hours)
            </p>
         </div>

      </div>
    </div>
  );
};