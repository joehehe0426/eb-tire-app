import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Registration } from './components/Registration';
import { Dashboard } from './components/Dashboard';
import { EmergencyForm } from './components/EmergencyForm';
import { UserProfile } from './components/UserProfile';
import { ServiceForm } from './components/ServiceForm';
import { MaintenanceForm } from './components/MaintenanceForm';
import { RepairLocation } from './components/RepairLocation';
import { ReviewForm } from './components/ReviewForm';
import { RepairHistory } from './components/RepairHistory';
import { RimDesignForm } from './components/RimDesignForm';
import { AppView, EmergencyRequest, ServiceRequest, RepairRecord, ReviewRequest } from './types';
import { CheckCircle, MessageCircle, MapPin, AlertTriangle, ArrowRight, Star, MessageSquareHeart } from 'lucide-react';

const App: React.FC = () => {
  // --- State Management ---
  
  // Phone Number (Membership)
  const [userPhone, setUserPhone] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('eb_tire_user_phone') || '';
    }
    return '';
  });

  // User Profile Data
  const [userProfileData, setUserProfileData] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('eb_tire_user_profile');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  // Repair History Data
  const [repairHistory, setRepairHistory] = useState<RepairRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('eb_tire_repair_history');
      if (stored) return JSON.parse(stored);
      // Optional: Add a dummy record for new users to see UI
      return [
        {
           id: 'demo-1',
           timestamp: Date.now() - 86400000 * 5, // 5 days ago
           dateStr: new Date(Date.now() - 86400000 * 5).toLocaleDateString(),
           serviceType: '定期保養 (Maintenance)',
           carBrand: 'Demo Car',
           details: 'Engine Oil Change',
           status: 'Completed',
           amount: '$1,200'
        }
      ];
    }
    return [];
  });

  // Current View Navigation
  const [currentView, setCurrentView] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      const phone = localStorage.getItem('eb_tire_user_phone');
      const profile = localStorage.getItem('eb_tire_user_profile');
      
      if (phone) {
        if (profile) return AppView.DASHBOARD;
        return AppView.USER_PROFILE; // Phone exists but no profile -> Go to profile
      }
    }
    return AppView.REGISTRATION;
  });

  const [lastRequest, setLastRequest] = useState<EmergencyRequest | null>(null);
  const [lastServiceRequest, setLastServiceRequest] = useState<ServiceRequest | null>(null);
  const [lastReview, setLastReview] = useState<ReviewRequest | null>(null);

  // Scroll to top whenever currentView changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Persist history whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('eb_tire_repair_history', JSON.stringify(repairHistory));
    }
  }, [repairHistory]);

  // --- Handlers ---

  const handleRegistrationSuccess = (phone: string) => {
    localStorage.setItem('eb_tire_user_phone', phone);
    setUserPhone(phone);
    
    // If profile exists, go to dashboard, else go to profile creation
    if (userProfileData) {
      setCurrentView(AppView.DASHBOARD);
    } else {
      setCurrentView(AppView.USER_PROFILE);
    }
  };

  const handleProfileSave = (data: { name: string; carBrand: string; licensePlate: string }) => {
    const fullProfile = { ...data, phoneNumber: userPhone, isVerified: true };
    localStorage.setItem('eb_tire_user_profile', JSON.stringify(fullProfile));
    setUserProfileData(fullProfile);
    setCurrentView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    localStorage.removeItem('eb_tire_user_phone');
    localStorage.removeItem('eb_tire_user_profile'); 
    // We optionally keep history or clear it. Let's keep it for UX or clear if security needed.
    // localStorage.removeItem('eb_tire_repair_history'); 
    setUserPhone('');
    setUserProfileData(null);
    setCurrentView(AppView.REGISTRATION);
  };

  const handleServiceSelect = (serviceId: string) => {
    if (serviceId === 'emergency-flat') {
      setCurrentView(AppView.EMERGENCY_FORM);
    } else if (serviceId === '24h-change') {
      setCurrentView(AppView.SERVICE_FORM);
    } else if (serviceId === 'repair') {
      setCurrentView(AppView.REPAIR_LOCATION);
    } else if (serviceId === 'oil-change') {
      setCurrentView(AppView.MAINTENANCE_FORM);
    } else if (serviceId === 'rim-design') {
      setCurrentView(AppView.RIM_DESIGN);
    } else if (serviceId === 'review') {
      setCurrentView(AppView.REVIEW_FORM);
    } else {
      alert(`已收到您的「${serviceId}」查詢，客服將會聯絡您。`);
    }
  };

  const handleEmergencySubmit = (data: EmergencyRequest) => {
    console.log("Emergency Data Submitted (Pending Location):", data);
    setLastRequest(data);
    setLastServiceRequest(null);
    setLastReview(null);
    setCurrentView(AppView.EMERGENCY_LOCATION_STEP);
  };

  const handleServiceFormSubmit = (data: ServiceRequest) => {
    console.log("Service Data Submitted:", data);
    setLastServiceRequest(data);
    setLastRequest(null);
    setLastReview(null);

    // Create History Record
    const newRecord: RepairRecord = {
      id: `svc-${Date.now()}`,
      timestamp: Date.now(),
      dateStr: new Date().toLocaleDateString(),
      serviceType: data.serviceId === 'oil-change' ? '汽車定期保養 (Maintenance)' : '24小時換呔 (Tire Change)',
      carBrand: data.carBrand,
      details: `${data.date} ${data.time} @ ${data.address}`,
      status: 'Pending'
    };
    setRepairHistory(prev => [newRecord, ...prev]);

    setCurrentView(AppView.SUCCESS);
  };
  
  const handleLocationSent = () => {
    // Open WhatsApp
    const whatsappUrl = "https://wa.me/85296151351?text=你好，這是我的實時位置 (Live Location)，我需要緊急救援。";
    window.open(whatsappUrl, '_blank');
    
    // Create History Record for Emergency
    if (lastRequest) {
      const newRecord: RepairRecord = {
        id: `sos-${Date.now()}`,
        timestamp: Date.now(),
        dateStr: new Date().toLocaleDateString(),
        serviceType: '緊急維修 (Emergency SOS)',
        carBrand: lastRequest.carBrand,
        details: `Tire: ${lastRequest.tirePosition}`,
        status: 'Processing'
      };
      setRepairHistory(prev => [newRecord, ...prev]);
    }

    // Move to confirmed state immediately after user initiates WhatsApp action
    setCurrentView(AppView.SUCCESS);
  };

  const handleReviewSubmit = (data: { rating: number; comment: string; photo: string | null }) => {
    setLastRequest(null);
    setLastServiceRequest(null);
    setLastReview(data);

    // Construct WhatsApp Message for Review
    const stars = '⭐'.repeat(data.rating);
    const text = `
🌟 *新評價 (New Review)*
---------------------------
👤 *客戶:* ${userProfileData?.name || 'Guest'}
📊 *評分:* ${stars} (${data.rating}/5)
💬 *意見:* ${data.comment || '無 (No comment)'}
---------------------------
(圖片已在 App 中上傳)
`.trim();
    
    const encoded = encodeURIComponent(text);
    // Open WhatsApp to "send" the review to customer service
    setTimeout(() => {
       window.open(`https://wa.me/85296151351?text=${encoded}`, '_blank');
    }, 1000);

    setCurrentView(AppView.SUCCESS);
  };

  // --- Render Logic ---

  const renderContent = () => {
    switch (currentView) {
      case AppView.REGISTRATION:
        return <Registration onVerify={handleRegistrationSuccess} />;
      
      case AppView.USER_PROFILE:
        return <UserProfile phone={userPhone} onSave={handleProfileSave} />;

      case AppView.DASHBOARD:
        return (
          <>
            <Header />
            <Dashboard 
              onServiceSelect={handleServiceSelect} 
              userProfile={userProfileData} 
              onLogout={handleLogout}
              onViewHistory={() => setCurrentView(AppView.REPAIR_HISTORY)}
            />
          </>
        );

      case AppView.REPAIR_HISTORY:
        return (
          <RepairHistory 
            history={repairHistory}
            onBack={() => setCurrentView(AppView.DASHBOARD)}
          />
        );

      case AppView.EMERGENCY_FORM:
        return (
          <EmergencyForm 
            onSubmit={handleEmergencySubmit} 
            onCancel={() => setCurrentView(AppView.DASHBOARD)} 
          />
        );

      case AppView.SERVICE_FORM:
        return (
          <ServiceForm
            onSubmit={handleServiceFormSubmit}
            onCancel={() => setCurrentView(AppView.DASHBOARD)}
            initialData={{
              phone: userPhone,
              name: userProfileData?.name || '',
              carBrand: userProfileData?.carBrand || ''
            }}
          />
        );

      case AppView.MAINTENANCE_FORM:
        return (
          <MaintenanceForm
            onSubmit={handleServiceFormSubmit}
            onCancel={() => setCurrentView(AppView.DASHBOARD)}
            initialData={{
              phone: userPhone,
              name: userProfileData?.name || '',
              carBrand: userProfileData?.carBrand || ''
            }}
          />
        );

      case AppView.RIM_DESIGN:
        return (
          <RimDesignForm onBack={() => setCurrentView(AppView.DASHBOARD)} />
        );

      case AppView.REPAIR_LOCATION:
        return (
          <RepairLocation onBack={() => setCurrentView(AppView.DASHBOARD)} />
        );

      case AppView.REVIEW_FORM:
        return (
          <ReviewForm
            onCancel={() => setCurrentView(AppView.DASHBOARD)}
            onSubmit={handleReviewSubmit}
            initialData={{
              name: userProfileData?.name || 'Customer'
            }}
          />
        );

      case AppView.EMERGENCY_LOCATION_STEP:
        return (
           <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 text-center">
             <div className="w-full max-w-sm">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto shadow-amber-100 shadow-xl animate-bounce">
                   <MapPin className="w-10 h-10 text-amber-600" />
                 </div>
                 
                 <h2 className="text-2xl font-black text-gray-900 mb-2">
                   只差一步! <br/>
                   <span className="text-brand-primary text-xl">必須發送位置</span>
                 </h2>
                 
                 <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                   您的資料已暫存。為了讓師傅準確找到您，請點擊下方按鈕，在 WhatsApp 發送 <span className="font-bold text-gray-900">「實時位置」</span> 以確認請求。
                 </p>

                 <div className="bg-white border-2 border-green-500/20 p-6 rounded-3xl shadow-xl relative overflow-hidden mb-6">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">必須 (Required)</div>
                    
                    <button
                      onClick={handleLocationSent}
                      className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 flex items-center justify-center space-x-3 hover:bg-[#128C7E] transition-all active:scale-95 group"
                    >
                      <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
                      <span>開啟 WhatsApp 發送位置</span>
                      <ArrowRight className="w-5 h-5 opacity-70" />
                    </button>
                    
                    <div className="mt-4 text-xs text-gray-400 font-medium">
                      點擊後將自動跳轉至 WhatsApp
                    </div>
                 </div>

                 <button
                    onClick={() => setCurrentView(AppView.EMERGENCY_FORM)}
                    className="text-gray-400 text-sm hover:text-gray-600 underline"
                 >
                    返回修改資料
                 </button>
             </div>
           </div>
        );

      case AppView.SUCCESS:
        // Determine which success state to show
        if (lastReview) {
           return (
             <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-6 shadow-pink-100 shadow-xl animate-in zoom-in duration-300">
                  <MessageSquareHeart className="w-12 h-12 text-brand-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  感謝您的評價!
                </h2>
                <p className="text-gray-500 mb-8 text-sm max-w-xs mx-auto">
                  我們已收到您的寶貴意見，如有需要，客服會透過 WhatsApp 跟進。
                </p>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 w-full max-w-sm mb-8 text-left space-y-4 relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                       <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                             <Star 
                                key={i} 
                                className={`w-5 h-5 ${i < lastReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
                             />
                          ))}
                       </div>
                       <span className="font-bold text-brand-primary text-lg">{lastReview.rating}.0</span>
                    </div>
                    
                    {lastReview.comment && (
                      <div>
                         <span className="text-xs text-gray-400 block mb-1">您的留言</span>
                         <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-xl italic">"{lastReview.comment}"</p>
                      </div>
                    )}

                    {lastReview.photo && (
                      <div>
                        <span className="text-xs text-gray-400 block mb-1">已上傳照片</span>
                        <div className="h-32 w-full rounded-xl overflow-hidden border border-gray-100">
                           <img src={lastReview.photo} alt="Review Upload" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}
                </div>

                <button
                  onClick={() => setCurrentView(AppView.DASHBOARD)}
                  className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-pink-200 hover:bg-brand-accent transition-all active:scale-95"
                >
                  返回主頁 (Back Home)
                </button>
             </div>
           );
        }

        const isEmergency = !!lastRequest;
        const serviceTitle = lastServiceRequest?.serviceId === 'oil-change' ? '汽車定期保養' : '24小時換呔服務';
        
        return (
          <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-8 text-center">
            
            {isEmergency ? (
               // Emergency Success State (Confirmed)
               <>
                 <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-red-100 shadow-xl">
                   <AlertTriangle className="w-12 h-12 text-red-600" />
                 </div>
                 <h2 className="text-3xl font-bold text-gray-900 mb-2">
                   求助請求已確認
                 </h2>
                 <p className="text-gray-500 mb-8 text-sm max-w-xs mx-auto">
                   我們已收到您的位置及資料，救援團隊將盡快出發。請保持電話暢通。
                 </p>

                 {/* Confirmation Box */}
                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100 w-full max-w-sm mb-8 text-left space-y-3">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
                       <span className="font-bold text-brand-dark">請求編號</span>
                       <span className="font-mono text-gray-500">#{Math.floor(Math.random() * 10000)}</span>
                    </div>
                    <div>
                       <span className="text-xs text-gray-400 block">聯絡電話</span>
                       <span className="font-bold text-gray-800">{userPhone}</span>
                    </div>
                     <div>
                       <span className="text-xs text-gray-400 block">車輛</span>
                       <span className="font-bold text-gray-800">{lastRequest.carBrand}</span>
                    </div>
                    {lastRequest.aiAnalysis && (
                       <div className="bg-pink-50 p-3 rounded-xl mt-2">
                          <span className="text-xs text-brand-primary font-bold block mb-1">AI 備註</span>
                          <span className="text-xs text-gray-600 line-clamp-2">{lastRequest.aiAnalysis}</span>
                       </div>
                    )}
                 </div>
               </>
            ) : (
               // Regular Service Success State
               <>
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-green-100 shadow-xl">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  預約已確認
                </h2>
                <p className="text-gray-500 mb-8 text-sm max-w-xs mx-auto">
                  我們已收到您的預約，客服將會在 30 分鐘內聯絡您確認細節。
                </p>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-green-100 w-full max-w-sm mb-8 text-left space-y-3">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
                       <span className="font-bold text-brand-dark">預約編號</span>
                       <span className="font-mono text-gray-500">#{Math.floor(Math.random() * 10000)}</span>
                    </div>
                    <div>
                       <span className="text-xs text-gray-400 block">服務項目</span>
                       <span className="font-bold text-gray-800">{serviceTitle}</span>
                    </div>
                    <div>
                       <span className="text-xs text-gray-400 block">預約時間</span>
                       <span className="font-bold text-gray-800">{lastServiceRequest?.date} {lastServiceRequest?.time}</span>
                    </div>
                     <div>
                       <span className="text-xs text-gray-400 block">服務地點</span>
                       <span className="font-bold text-gray-800">{lastServiceRequest?.address}</span>
                    </div>
                     <div>
                       <span className="text-xs text-gray-400 block">車輛</span>
                       <span className="font-bold text-gray-800">{lastServiceRequest?.carBrand}</span>
                    </div>
                    {lastServiceRequest?.comment && (
                      <div className="pt-2 border-t border-gray-50 mt-2">
                         <span className="text-xs text-gray-400 block">備註</span>
                         <span className="text-sm text-gray-600">{lastServiceRequest.comment}</span>
                      </div>
                    )}
                </div>
               </>
            )}
            
            <button
              onClick={() => setCurrentView(AppView.DASHBOARD)}
              className="px-8 py-3 bg-white text-brand-primary border-2 border-brand-primary rounded-xl font-bold shadow-sm hover:bg-pink-50 transition-colors"
            >
              返回主頁
            </button>
          </div>
        );

      default:
        return <Dashboard onServiceSelect={handleServiceSelect} userProfile={userProfileData} onLogout={handleLogout} onViewHistory={() => setCurrentView(AppView.REPAIR_HISTORY)} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
      {renderContent()}
    </div>
  );
};

export default App;