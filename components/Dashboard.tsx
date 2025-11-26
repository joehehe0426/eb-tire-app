import React from 'react';
import { Wrench, Disc, AlertTriangle, Search, Droplet, Clock, LogOut, CreditCard, Star, MessageSquareHeart, ClipboardList, Palette } from 'lucide-react';
import { ServiceItem, UserProfile } from '../types';

interface DashboardProps {
  onServiceSelect: (serviceId: string) => void;
  userProfile: UserProfile | null;
  onLogout: () => void;
  onViewHistory: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onServiceSelect, userProfile, onLogout, onViewHistory }) => {
  const services: ServiceItem[] = [
    { 
      id: 'emergency-flat', 
      title: '爆呔緊急維修', 
      icon: <AlertTriangle className="w-8 h-8" />,
      isEmergency: true 
    },
    { 
      id: '24h-change', 
      title: '24小時換呔服務', 
      icon: <Clock className="w-6 h-6" />,
      isEmergency: false 
    },
    { 
      id: 'repair', 
      title: '補呔服務', 
      icon: <Disc className="w-6 h-6" />,
      isEmergency: false 
    },
    { 
      id: 'inspection', 
      title: '驗車服務', 
      icon: <Search className="w-6 h-6" />,
      isEmergency: false 
    },
    { 
      id: 'oil-change', 
      title: '預約汽車定期保養', 
      icon: <Droplet className="w-6 h-6" />,
      isEmergency: false 
    },
    // Rim design feature - Premium only (disabled for now)
    // { 
    //   id: 'rim-design', 
    //   title: 'AI 輪圈改色', 
    //   icon: <Palette className="w-6 h-6" />,
    //   isEmergency: false,
    //   isPremium: true
    // },
    { 
      id: 'review', 
      title: '評價服務', 
      icon: <MessageSquareHeart className="w-6 h-6" />,
      isEmergency: false 
    },
  ];

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      
      {/* Digital Membership Card */}
      <div className="mb-4 relative w-full aspect-[1.7] rounded-3xl shadow-xl overflow-hidden transform transition-transform hover:scale-[1.01]">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-primary to-brand-accent"></div>
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-brand-dark/40 rounded-full blur-2xl"></div>
        
        {/* Card Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
          
          {/* Absolute Top Left Logo */}
          <div className="absolute top-4 left-4 z-10">
              <img 
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Logo" 
                className="h-10 w-auto max-w-[100px] object-contain drop-shadow-md bg-white/10 rounded-lg backdrop-blur-sm p-1"
              />
          </div>

          {/* Top Row - Text/Badge on Right */}
          <div className="flex justify-end items-start w-full">
            <div className="text-right">
              <div className="flex items-center justify-end space-x-2 mb-1">
                 <span className="font-bold tracking-wider text-sm opacity-90">VIP MEMBER</span>
                 <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                 </div>
              </div>
              <h3 className="font-black text-2xl tracking-tight drop-shadow-md">EB RESCUE APP</h3>
            </div>
          </div>

          {/* Bottom Row - User Details */}
          <div className="space-y-4">
             <div className="flex items-end justify-between">
                <div>
                   <p className="text-[10px] text-pink-200 uppercase tracking-widest mb-0.5">Member Name</p>
                   <p className="font-bold text-lg tracking-wide shadow-black drop-shadow-sm">
                     {userProfile?.name || 'Guest User'}
                   </p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-pink-200 uppercase tracking-widest mb-0.5">Car Plate</p>
                   <p className="font-mono font-bold text-lg tracking-wider">
                     {userProfile?.licensePlate || '---'}
                   </p>
                </div>
             </div>

             <div className="flex items-end justify-between border-t border-white/20 pt-3">
                <div>
                  <p className="text-[10px] text-pink-200 uppercase tracking-widest mb-0.5">Vehicle Model</p>
                  <p className="font-medium text-sm text-white/90">
                    {userProfile?.carBrand || 'Unknown'}
                  </p>
                </div>
                 <div>
                  <p className="text-[10px] text-pink-200 uppercase tracking-widest mb-0.5">Phone</p>
                  <p className="font-mono font-medium text-sm text-white/90">
                    {userProfile?.phoneNumber}
                  </p>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* Action Buttons (History & Logout) */}
      <div className="flex justify-end gap-3 mb-6 px-2">
         <button 
            onClick={onViewHistory}
            className="text-xs text-brand-primary font-bold hover:bg-pink-50 flex items-center transition-colors bg-white px-3 py-2 rounded-xl border border-pink-100 shadow-sm"
          >
            <ClipboardList className="w-3.5 h-3.5 mr-1.5" /> 維修紀錄
          </button>
         <button 
            onClick={onLogout}
            className="text-xs text-gray-400 hover:text-brand-red flex items-center transition-colors bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" /> 登出
          </button>
      </div>


      <h3 className="text-brand-dark font-bold mb-4 px-1 flex items-center text-lg">
        <Wrench className="w-5 h-5 mr-2 text-brand-primary" />
        選擇服務
      </h3>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onServiceSelect(service.id)}
            className={`
              relative overflow-hidden rounded-3xl p-5 flex flex-col items-center justify-center text-center shadow-md transition-all active:scale-95 duration-200
              ${service.isEmergency 
                ? 'col-span-2 bg-gradient-to-r from-brand-accent to-brand-primary text-white py-10 shadow-pink-200 ring-4 ring-brand-light' 
                : 'bg-white text-gray-800 hover:bg-brand-light/50 border border-transparent hover:border-brand-light'
              }
            `}
          >
            {service.isEmergency && (
              <div className="absolute top-0 right-0 p-3">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold animate-pulse border border-white/40 shadow-sm">
                  SOS 緊急
                </span>
              </div>
            )}
            
            <div className={`mb-3 p-4 rounded-full shadow-inner ${
              service.isEmergency 
                ? 'bg-white/20 text-white' 
                : 'bg-brand-light text-brand-primary'
            }`}>
              {service.icon}
            </div>
            
            <span className={`font-bold tracking-wide ${service.isEmergency ? 'text-2xl drop-shadow-md' : 'text-sm text-gray-700'}`}>
              {service.title}
            </span>

            {service.isEmergency && (
              <span className="mt-3 text-white text-sm font-medium bg-black/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
                優先處理 • 最快抵達
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};