import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AppView, EmergencyRequest, ServiceRequest, RepairRecord, ReviewRequest } from './types';
import { CheckCircle, MessageCircle, MapPin, AlertTriangle, ArrowRight, Star, MessageSquareHeart, Loader2 } from 'lucide-react';

// Lazy load components to reduce initial bundle size
const Header = lazy(() => import('./components/Header').then(module => ({ default: module.Header })));
const Registration = lazy(() => import('./components/Registration').then(module => ({ default: module.Registration })));
const Dashboard = lazy(() => import('./components/Dashboard').then(module => ({ default: module.Dashboard })));
const EmergencyForm = lazy(() => import('./components/EmergencyForm').then(module => ({ default: module.EmergencyForm })));
const UserProfile = lazy(() => import('./components/UserProfile').then(module => ({ default: module.UserProfile })));
const ServiceForm = lazy(() => import('./components/ServiceForm').then(module => ({ default: module.ServiceForm })));
const MaintenanceForm = lazy(() => import('./components/MaintenanceForm').then(module => ({ default: module.MaintenanceForm })));
const RepairLocation = lazy(() => import('./components/RepairLocation').then(module => ({ default: module.RepairLocation })));
const ReviewForm = lazy(() => import('./components/ReviewForm').then(module => ({ default: module.ReviewForm })));
const RepairHistory = lazy(() => import('./components/RepairHistory').then(module => ({ default: module.RepairHistory })));
const RimDesignForm = lazy(() => import('./components/RimDesignForm').then(module => ({ default: module.RimDesignForm })));

// Lightweight loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 text-brand-primary">
    <Loader2 className="w-10 h-10 animate-spin mb-3 text-pink-500" />
    <p className="text-sm font-bold animate-pulse text-pink-400 tracking-wider">LOADING...</p>
  </div>
);

const App: React.FC = () => {
  // --- State Management ---
  
  // Phone Number (Membership)
  const [userPhone, setUserPhone] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('eb_rescue_user_phone') || '';
    }
    return '';
  });

  // User Profile Data
  const [userProfileData, setUserProfileData] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('eb_rescue_user_profile');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  // Repair History Data
  const [repairHistory, setRepairHistory] = useState<RepairRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('eb_rescue_repair_history');
      if (stored) return JSON.parse(stored);
      return [];
    }
    return [];
  });

  // Current View Navigation
  const [currentView, setCurrentView] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      const phone = localStorage.getItem('eb_rescue_user_phone');
      const profile = localStorage.getItem('eb_rescue_user_profile');
      
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
      localStorage.setItem('eb_rescue_repair_history', JSON.stringify(repairHistory));
    }
  }, [repairHistory]);

  // --- Handlers ---

  const handleRegistrationSuccess = async (phone: string) => {
    localStorage.setItem('eb_rescue_user_phone', phone);
    setUserPhone(phone);
    
    // Save to database (non-blocking)
    try {
      const { saveUser } = await import('./services/databaseService');
      await saveUser({ phone_number: phone, is_verified: true });
    } catch (error) {
      console.error('Failed to save registration to database:', error);
      // Continue even if database save fails
    }
    
    // If profile exists, go to dashboard, else go to profile creation
    if (userProfileData) {
      setCurrentView(AppView.DASHBOARD);
    } else {
      setCurrentView(AppView.USER_PROFILE);
    }
  };

  const handleProfileSave = async (data: { name: string; carBrand: string; licensePlate: string }) => {
    const fullProfile = { ...data, phoneNumber: userPhone, isVerified: true };
    localStorage.setItem('eb_rescue_user_profile', JSON.stringify(fullProfile));
    setUserProfileData(fullProfile);
    
    // Save to database (non-blocking)
    try {
      const { saveUser } = await import('./services/databaseService');
      await saveUser({
        phone_number: userPhone,
        name: data.name,
        car_brand: data.carBrand,
        license_plate: data.licensePlate,
        is_verified: true
      });
    } catch (error) {
      console.error('Failed to save profile to database:', error);
      // Continue even if database save fails
    }
    
    setCurrentView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    localStorage.removeItem('eb_rescue_user_phone');
    localStorage.removeItem('eb_rescue_user_profile'); 
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
      // Premium feature - coming soon
      alert('AI 輪圈改色功能即將推出，敬請期待！\n\n此功能將為尊貴會員專享。');
      return;
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

  const handleServiceFormSubmit = async (data: ServiceRequest) => {
    console.log("Service Data Submitted:", data);
    setLastServiceRequest(data);
    setLastRequest(null);
    setLastReview(null);

    // Save to database (non-blocking)
    try {
      const { saveOrder } = await import('./services/databaseService');
      await saveOrder({
        phone_number: data.contactPhone,
        service_type: data.serviceId === 'oil-change' ? 'maintenance' : 'tire_change',
        contact_name: data.contactName,
        contact_phone: data.contactPhone,
        car_brand: data.carBrand,
        address: data.address,
        date: data.date,
        time: data.time,
        tire_width: data.tireWidth,
        tire_aspect_ratio: data.tireAspectRatio,
        tire_diameter: data.tireDiameter,
        photo_base64: data.photoBase64,
        comment: data.comment,
        status: 'pending'
      });
    } catch (error) {
      console.error('Failed to save order to database:', error);
      // Continue even if database save fails
    }

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
  
  const handleLocationSent = async () => {
    // First, get user's current location
    let locationInfo = '';
    let googleMapsLink = '';
    
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
        });
        
        const { latitude, longitude } = position.coords;
        
        // Create Google Maps link
        googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        
        // Try to get address from coordinates (reverse geocoding)
        try {
          const geocodeResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=zh-HK,zh,en`
          );
          const geocodeData = await geocodeResponse.json();
          
          if (geocodeData && geocodeData.display_name) {
            locationInfo = `📍 *我的位置:*\n${geocodeData.display_name}\n\n`;
          }
        } catch (geocodeError) {
          console.warn('Geocoding failed, using coordinates:', geocodeError);
        }
        
        // Always include coordinates and Google Maps link
        locationInfo += `📍 *座標位置:*\n緯度: ${latitude.toFixed(6)}\n經度: ${longitude.toFixed(6)}\n\n`;
        locationInfo += `🗺️ *地圖連結:*\n${googleMapsLink}\n\n`;
        
      } catch (locationError) {
        console.error('Location error:', locationError);
        locationInfo = "📍 *位置信息:*\n無法自動獲取位置，請在 WhatsApp 中手動發送您的位置。\n\n";
      }
    } else {
      locationInfo = "📍 *位置信息:*\n您的瀏覽器不支持位置功能，請在 WhatsApp 中手動發送您的位置。\n\n";
    }
    
    // Build comprehensive WhatsApp message with all emergency details
    let message = "🚨 *緊急救援請求 - 爆呔緊急維修*\n";
    message += "━━━━━━━━━━━━━━━━━━━━\n\n";
    
    let requestId: string | undefined;
    
    if (lastRequest) {
      message += `👤 *聯絡人:* ${lastRequest.name}\n`;
      message += `🚗 *車輛品牌/型號:* ${lastRequest.carBrand}\n`;
      message += `🔘 *受損輪胎位置:* ${lastRequest.tirePosition}\n\n`;
      
      if (lastRequest.aiAnalysis) {
        message += `🤖 *AI 初步分析:*\n${lastRequest.aiAnalysis}\n\n`;
      }
      
      if (lastRequest.photoBase64) {
        message += `📷 *已上傳輪胎照片*\n\n`;
      }

      // Save to database (non-blocking)
      try {
        const { saveEmergencyRequest } = await import('./services/databaseService');
        const result = await saveEmergencyRequest({
          phone_number: userPhone,
          contact_name: lastRequest.name,
          car_brand: lastRequest.carBrand,
          tire_position: lastRequest.tirePosition,
          photo_base64: lastRequest.photoBase64,
          ai_analysis: lastRequest.aiAnalysis,
          location_sent: false
        });
        if (result.success && result.requestId) {
          requestId = result.requestId;
        }
      } catch (error) {
        console.error('Failed to save emergency request to database:', error);
        // Continue even if database save fails
      }
    }
    
    // Add location information
    message += locationInfo;
    message += "━━━━━━━━━━━━━━━━━━━━\n";
    message += "⏰ 收到請求後，我們會立即安排師傅前往救援。\n\n";
    message += "💡 *提示:* 您也可以在 WhatsApp 中點擊「附件」→「位置」→「分享實時位置」來發送更精確的位置。";
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/85296151351?text=${encodedMessage}`;
    
    // Open WhatsApp with all details including location
    window.open(whatsappUrl, '_blank');
    
    // Update database when location is sent
    if (requestId) {
      try {
        const { updateEmergencyLocationSent } = await import('./services/databaseService');
        await updateEmergencyLocationSent(requestId);
      } catch (error) {
        console.error('Failed to update emergency request:', error);
      }
    }
    
    // Create history record
    if (lastRequest) {
      const newRecord: RepairRecord = {
        id: `emergency-${Date.now()}`,
        timestamp: Date.now(),
        dateStr: new Date().toLocaleDateString(),
        serviceType: '爆呔緊急維修 (Emergency Rescue)',
        carBrand: lastRequest.carBrand,
        details: `${lastRequest.tirePosition} - ${lastRequest.name}`,
        status: 'Pending'
      };
      setRepairHistory(prev => [newRecord, ...prev]);
    }
    
    // Proceed to success screen after sending location
    setCurrentView(AppView.SUCCESS);
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-gray-900">
       {currentView !== AppView.REGISTRATION && (
         <Suspense fallback={null}>
            <Header />
         </Suspense>
       )}
       
       <Suspense fallback={<PageLoader />}>
         {currentView === AppView.REGISTRATION && (
            <Registration onVerify={handleRegistrationSuccess} />
         )}
         
         {currentView === AppView.USER_PROFILE && (
            <UserProfile phone={userPhone} onSave={handleProfileSave} />
         )}

         {currentView === AppView.DASHBOARD && (
            <Dashboard 
                userProfile={userProfileData}
                onServiceSelect={handleServiceSelect}
                onLogout={handleLogout}
                onViewHistory={() => setCurrentView(AppView.REPAIR_HISTORY)}
            />
         )}
         
         {currentView === AppView.EMERGENCY_FORM && (
            <EmergencyForm 
                onSubmit={handleEmergencySubmit}
                onCancel={() => setCurrentView(AppView.DASHBOARD)}
            />
         )}

         {currentView === AppView.EMERGENCY_LOCATION_STEP && (
            <div className="flex flex-col items-center justify-center h-screen p-6 text-center space-y-6">
                <div className="bg-brand-light p-6 rounded-full animate-pulse">
                    <MapPin className="w-12 h-12 text-brand-primary" />
                </div>
                <h2 className="text-2xl font-bold text-brand-dark">最後一步: 發送位置</h2>
                <p className="text-gray-600">
                    點擊下方按鈕，我們會自動獲取您的位置並透過 WhatsApp 發送給我們，以便師傅準確抵達。
                </p>
                <button 
                    onClick={handleLocationSent}
                    className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 hover:bg-[#128C7E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <MessageCircle className="w-6 h-6" />
                    <span>獲取位置並打開 WhatsApp</span>
                </button>
                <button 
                    onClick={() => setCurrentView(AppView.DASHBOARD)}
                    className="text-gray-400 text-sm underline"
                >
                    暫不發送 / 返回
                </button>
            </div>
         )}

         {currentView === AppView.SERVICE_FORM && userProfileData && (
            <ServiceForm 
                initialData={{
                    phone: userProfileData.phoneNumber,
                    name: userProfileData.name || '',
                    carBrand: userProfileData.carBrand || ''
                }}
                onSubmit={handleServiceFormSubmit}
                onCancel={() => setCurrentView(AppView.DASHBOARD)}
            />
         )}

         {currentView === AppView.MAINTENANCE_FORM && userProfileData && (
            <MaintenanceForm 
                initialData={{
                    phone: userProfileData.phoneNumber,
                    name: userProfileData.name || '',
                    carBrand: userProfileData.carBrand || ''
                }}
                onSubmit={handleServiceFormSubmit}
                onCancel={() => setCurrentView(AppView.DASHBOARD)}
            />
         )}

         {currentView === AppView.REPAIR_LOCATION && (
            <RepairLocation onBack={() => setCurrentView(AppView.DASHBOARD)} />
         )}

         {currentView === AppView.RIM_DESIGN && (
            <RimDesignForm onBack={() => setCurrentView(AppView.DASHBOARD)} />
         )}

         {currentView === AppView.REVIEW_FORM && userProfileData && (
            <ReviewForm 
                initialData={{ name: userProfileData.name || 'User' }}
                onSubmit={async (data) => {
                    console.log("Review", data);
                    setLastReview(data);
                    
                    // Save to database (non-blocking)
                    try {
                      const { saveReview } = await import('./services/databaseService');
                      await saveReview({
                        phone_number: userProfileData.phoneNumber,
                        name: userProfileData.name,
                        rating: data.rating,
                        comment: data.comment,
                        photo_base64: data.photo
                      });
                    } catch (error) {
                      console.error('Failed to save review to database:', error);
                      // Continue even if database save fails
                    }
                    
                    setCurrentView(AppView.SUCCESS);
                }}
                onCancel={() => setCurrentView(AppView.DASHBOARD)}
            />
         )}

         {currentView === AppView.REPAIR_HISTORY && (
            <RepairHistory 
                history={repairHistory}
                onBack={() => setCurrentView(AppView.DASHBOARD)}
            />
         )}

         {currentView === AppView.SUCCESS && (
            <div className="flex flex-col items-center justify-center h-screen p-8 text-center bg-white">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">提交成功!</h2>
                <p className="text-gray-500 mb-8">
                    我們已收到您的請求，客服將會盡快聯絡您確認細節。
                </p>
                <button 
                    onClick={() => setCurrentView(AppView.DASHBOARD)}
                    className="w-full bg-brand-primary text-white py-3 rounded-2xl font-bold shadow-lg shadow-pink-200"
                >
                    返回主頁
                </button>
            </div>
         )}
       </Suspense>
    </div>
  );
};

export default App;