import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Car, ChevronLeft, Droplet, Crosshair, Loader2, FileText } from 'lucide-react';
import { ServiceRequest } from '../types';

interface MaintenanceFormProps {
  onSubmit: (data: ServiceRequest) => void;
  onCancel: () => void;
  initialData: {
    phone: string;
    name: string;
    carBrand: string;
  };
}

export const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [address, setAddress] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [carBrand, setCarBrand] = useState(initialData.carBrand || '');
  const [comment, setComment] = useState('');

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("您的瀏覽器不支持地理位置功能");
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Simple reverse geocoding using OpenStreetMap Nominatim API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.display_name) {
            setAddress(data.display_name);
          } else {
             setAddress(`${latitude}, ${longitude}`);
          }
        } catch (error) {
          console.error("Geocoding error:", error);
           setAddress(`${position.coords.latitude}, ${position.coords.longitude}`);
           alert("無法獲取詳細地址，已填入座標。");
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsLoadingLocation(false);
        alert("無法獲取位置。請確保已允許位置權限。");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!address || !date || !time || !carBrand || !comment) {
      alert('請填寫所有必填欄位 (Please fill in all required fields)');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [yearStr, monthStr, dayStr] = date.split('-');
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);
    const day = parseInt(dayStr);
    const selectedDateObj = new Date(year, month - 1, day);
    const currentYear = today.getFullYear();

    if (year < currentYear || year > currentYear + 2) {
       alert(`日期年份不正確。`);
       return;
    }

    if (selectedDateObj < today) {
        alert('預約日期不能是過去的日子');
        return;
    }

    if (address.trim().length < 4) {
         alert('請輸入更詳細的地址');
         return;
    }
    
    // Construction
    const requestData: ServiceRequest = {
      serviceId: 'oil-change',
      address,
      date,
      time,
      carBrand,
      contactName: initialData.name,
      contactPhone: initialData.phone,
      photoBase64: null,
      comment
    };

    // Communication Trigger (WhatsApp)
    const message = `
🔧 *新預約: 汽車定期保養*
---------------------------
👤 *客戶:* ${initialData.name} (${initialData.phone})
🚗 *車輛:* ${carBrand}
📍 *地點:* ${address}
📅 *日期:* ${date}
🕒 *時間:* ${time}
📝 *詳情:* ${comment}
---------------------------
請盡快確認預約。
`.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/85296151351?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');

    // Finalize
    onSubmit(requestData);
  };

  return (
    <div className="min-h-screen bg-brand-bg pb-20">
      {/* Header */}
      <div className="bg-brand-primary p-4 text-white flex items-center sticky top-0 z-40 shadow-lg">
        <button onClick={onCancel} className="mr-3 p-1 hover:bg-white/20 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold">預約汽車定期保養</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto space-y-5 mt-2">
        
        {/* Service Info Card */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-brand-light space-y-4">
          <h3 className="font-bold text-brand-dark flex items-center border-b border-pink-50 pb-2">
            <MapPin className="w-4 h-4 mr-2" /> 服務地點及時間
          </h3>
          
          <div>
            <label className="text-xs font-bold text-gray-500 ml-1 mb-1 block">服務地址 (或上門位置)</label>
            <div className="flex gap-2">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="輸入地點"
                  className="flex-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-light focus:border-brand-primary outline-none"
                />
            </div>
             <button 
                type="button"
                onClick={handleGetLocation}
                disabled={isLoadingLocation}
                className="mt-2 w-full flex items-center justify-center space-x-2 bg-brand-light text-brand-primary py-3 rounded-xl text-sm font-bold border border-pink-200 hover:bg-pink-100 active:scale-95 transition-all shadow-sm"
              >
                {isLoadingLocation ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Crosshair className="w-4 h-4" />
                )}
                <span>📍 使用當前位置 Use Current Location</span>
              </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 ml-1">日期</label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-9 pr-2 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-light outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 ml-1">時間</label>
               <div className="relative mt-1">
                <Clock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-9 pr-2 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-light outline-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Car Info Card */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-brand-light space-y-4">
           <h3 className="font-bold text-brand-dark flex items-center border-b border-pink-50 pb-2">
            <Car className="w-4 h-4 mr-2" /> 車輛資料
          </h3>

          <div>
            <label className="text-xs font-bold text-gray-500 ml-1">車輛品牌</label>
            <input
              type="text"
              value={carBrand}
              onChange={(e) => setCarBrand(e.target.value)}
              placeholder="例如: BMW 320i"
              className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-light focus:border-brand-primary outline-none"
            />
          </div>
        </div>

        {/* Comment Box */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-brand-light space-y-4">
           <h3 className="font-bold text-brand-dark flex items-center border-b border-pink-50 pb-2">
            <FileText className="w-4 h-4 mr-2" /> 保養/維修詳情
          </h3>

          <div>
            <label className="text-xs font-bold text-gray-500 ml-1">需要甚麼服務?</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="例如: 更換機油, 檢查剎車皮..."
              rows={4}
              className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-light focus:border-brand-primary outline-none resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-200 flex items-center justify-center space-x-2 active:scale-95 transition-transform mt-4"
        >
          <Droplet className="w-5 h-5" />
          <span>預約保養 (Book Service)</span>
        </button>

      </form>
    </div>
  );
};