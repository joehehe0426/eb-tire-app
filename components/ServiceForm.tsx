import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Clock, Car, Disc, ChevronLeft, Send, Crosshair, Loader2, Camera, X } from 'lucide-react';
import { ServiceRequest } from '../types';

interface ServiceFormProps {
  onSubmit: (data: ServiceRequest) => void;
  onCancel: () => void;
  initialData: {
    phone: string;
    name: string;
    carBrand: string;
  };
}

// Comprehensive Tire Configuration
const TIRE_DATA: Record<string, { ratios: string[], diameters: string[] }> = {
    "155": {
        "ratios": ["55", "60", "65", "70", "80"],
        "diameters": ["12", "13", "14", "15"]
    },
    "165": {
        "ratios": ["50", "55", "60", "65", "70", "80"],
        "diameters": ["13", "14", "15"]
    },
    "175": {
        "ratios": ["50", "55", "60", "65", "70", "80"],
        "diameters": ["13", "14", "15", "16"]
    },
    "185": {
        "ratios": ["50", "55", "60", "65", "70", "75", "80"],
        "diameters": ["14", "15", "16"]
    },
    "195": {
        "ratios": ["45", "50", "55", "60", "65", "70", "75", "80"],
        "diameters": ["14", "15", "16", "17"]
    },
    "205": {
        "ratios": ["40", "45", "50", "55", "60", "65", "70", "75"],
        "diameters": ["15", "16", "17", "18"]
    },
    "215": {
        "ratios": ["35", "40", "45", "50", "55", "60", "65", "70", "75"],
        "diameters": ["16", "17", "18", "19"]
    },
    "225": {
        "ratios": ["35", "40", "45", "50", "55", "60", "65", "70", "75"],
        "diameters": ["16", "17", "18", "19", "20"]
    },
    "235": {
        "ratios": ["35", "40", "45", "50", "55", "60", "65", "70", "75", "80"],
        "diameters": ["17", "18", "19", "20", "21"]
    },
    "245": {
        "ratios": ["30", "35", "40", "45", "50", "55", "60", "65", "70", "75"],
        "diameters": ["17", "18", "19", "20", "21"]
    },
    "255": {
        "ratios": ["30", "35", "40", "45", "50", "55", "60", "65", "70", "75"],
        "diameters": ["17", "18", "19", "20", "21", "22"]
    },
    "265": {
        "ratios": ["30", "35", "40", "45", "50", "55", "60", "65", "70", "75"],
        "diameters": ["17", "18", "19", "20", "21", "22"]
    },
    "275": {
        "ratios": ["30", "35", "40", "45", "50", "55", "60", "65", "70"],
        "diameters": ["17", "18", "19", "20", "21", "22", "23"]
    },
    "285": {
        "ratios": ["30", "35", "40", "45", "50", "55", "60", "65", "70", "75"],
        "diameters": ["18", "19", "20", "21", "22", "23"]
    },
    "295": {
        "ratios": ["25", "30", "35", "40", "45", "50"],
        "diameters": ["19", "20", "21", "22"]
    },
    "305": {
        "ratios": ["25", "30", "35", "40", "45", "50"],
        "diameters": ["19", "20", "21", "22", "23"]
    },
    "315": {
        "ratios": ["25", "30", "35", "40", "70", "75"],
        "diameters": ["18", "19", "20", "21", "22", "23"]
    },
    "325": {
        "ratios": ["25", "30", "35", "40"],
        "diameters": ["19", "20", "21", "22", "23"]
    },
    "335": {
        "ratios": ["25", "30", "35"],
        "diameters": ["19", "20", "21", "22", "23"]
    },
    "345": {
        "ratios": ["25", "30", "35"],
        "diameters": ["19", "20", "21"]
    }
};

export const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [address, setAddress] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [carBrand, setCarBrand] = useState(initialData.carBrand || '');
  
  // Tire Info State
  const [tireWidth, setTireWidth] = useState('');
  const [aspectRatio, setAspectRatio] = useState('');
  const [tireDiameter, setTireDiameter] = useState('');
  const [availableRatios, setAvailableRatios] = useState<string[]>([]);
  const [availableDiameters, setAvailableDiameters] = useState<string[]>([]);

  // Photo State
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update available options when width changes
  useEffect(() => {
    if (tireWidth && TIRE_DATA[tireWidth]) {
      setAvailableRatios(TIRE_DATA[tireWidth].ratios);
      setAvailableDiameters(TIRE_DATA[tireWidth].diameters);
    } else {
      setAvailableRatios([]);
      setAvailableDiameters([]);
    }
    setAspectRatio(''); // Reset ratio when width changes
    setTireDiameter(''); // Reset diameter when width changes
  }, [tireWidth]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Check for empty required fields
    if (!address || !date || !time || !carBrand || !tireWidth || !aspectRatio || !tireDiameter) {
      alert('請填寫所有必填欄位 (Please fill in all required fields)');
      return;
    }

    // --- Data Validation Logic ---
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of day

    const [yearStr, monthStr, dayStr] = date.split('-');
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);
    const day = parseInt(dayStr);
    const selectedDateObj = new Date(year, month - 1, day);
    const currentYear = today.getFullYear();

    // 2. Year Validation (e.g., preventing 1111)
    if (year < currentYear || year > currentYear + 2) {
       alert(`日期年份不正確。請選擇 ${currentYear} 至 ${currentYear + 2} 年之間的日期。`);
       return;
    }

    // 3. Past Date Validation
    if (selectedDateObj < today) {
        alert('預約日期不能是過去的日子 (Date cannot be in the past)');
        return;
    }

    // 4. Time Validation (if today)
    if (selectedDateObj.getTime() === today.getTime()) {
        const now = new Date();
        const [hours, minutes] = time.split(':').map(Number);
        const selectedTimeDate = new Date();
        selectedTimeDate.setHours(hours, minutes, 0, 0);
        
        // Ensure selected time is in the future
        if (selectedTimeDate < now) {
            alert('預約時間不能是過去的時間 (Time cannot be in the past)');
            return;
        }
    }

    // 5. Address Length Validation
    if (address.trim().length < 4) {
         alert('請輸入更詳細的地址 (Please enter a valid address)');
         return;
    }
    
    // --- Data Construction ---
    const requestData = {
      serviceId: '24h-change',
      address,
      date,
      time,
      carBrand,
      tireWidth,
      tireAspectRatio: aspectRatio,
      tireDiameter,
      contactName: initialData.name,
      contactPhone: initialData.phone,
      photoBase64: photo
    };

    // --- Communication Trigger (WhatsApp + Email) ---
    const message = `
🛠️ *新預約: 24小時換呔服務*
---------------------------
👤 *客戶:* ${initialData.name} (${initialData.phone})
🚗 *車輛:* ${carBrand}
📍 *地點:* ${address}
📅 *日期:* ${date}
🕒 *時間:* ${time}
🔘 *輪胎:* ${tireWidth}/${aspectRatio} R${tireDiameter}
---------------------------
請盡快確認訂單。
`.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/85296151351?text=${encodedMessage}`;
    const mailtoUrl = `mailto:booking@ebtire.com?subject=New Tire Service Booking&body=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Attempt to open Email (small delay to allow browser to process first intent)
    setTimeout(() => {
        window.location.href = mailtoUrl;
    }, 800);

    // Finalize internal state
    onSubmit(requestData);
  };

  return (
    <div className="min-h-screen bg-brand-bg pb-20">
      {/* Header */}
      <div className="bg-brand-primary p-4 text-white flex items-center sticky top-0 z-40 shadow-lg">
        <button onClick={onCancel} className="mr-3 p-1 hover:bg-white/20 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold">預約 24小時換呔服務</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto space-y-5 mt-2">
        
        {/* Photo Upload Section (Select Photo) */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-brand-light">
          <label className="block text-sm font-bold text-gray-800 mb-3 flex justify-between items-center">
             輪胎/車輛照片 (選填)
          </label>
          
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {!photo ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 border-2 border-dashed border-brand-primary/30 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:bg-pink-50 hover:border-brand-primary transition-all group bg-gray-50/50"
            >
              <Camera className="w-8 h-8 text-brand-primary mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-brand-primary">點擊上傳照片</span>
              <span className="text-xs text-gray-400 mt-1">Select Photo</span>
            </button>
          ) : (
            <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-black shadow-md border-2 border-brand-light">
              <img src={photo} alt="Car/Tire Preview" className="w-full h-full object-contain" />
              <button
                type="button"
                onClick={() => setPhoto(null)}
                className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-full hover:bg-brand-red transition-colors backdrop-blur-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Service Info Card */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-brand-light space-y-4">
          <h3 className="font-bold text-brand-dark flex items-center border-b border-pink-50 pb-2">
            <MapPin className="w-4 h-4 mr-2" /> 服務地點及時間
          </h3>
          
          <div>
            <label className="text-xs font-bold text-gray-500 ml-1 mb-1 block">服務地址</label>
            <div className="flex gap-2">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="輸入街道名稱或大廈名稱"
                  className="flex-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-light focus:border-brand-primary outline-none"
                />
            </div>
             {/* One-click Location Button */}
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

        {/* Car & Tire Info Card */}
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

          <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100">
            <label className="block text-sm font-bold text-brand-dark mb-3 flex items-center">
              <Disc className="w-4 h-4 mr-2 text-brand-primary" />
              輪胎尺寸規格
            </label>
            
            <div className="grid grid-cols-3 gap-2">
              {/* Width Select */}
              <div>
                <label className="text-[10px] font-bold text-gray-500 mb-1 block uppercase tracking-wide">闊度</label>
                <select
                  id="width"
                  value={tireWidth}
                  onChange={(e) => setTireWidth(e.target.value)}
                  className="w-full p-3 bg-white border border-pink-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none text-gray-800 font-bold text-center appearance-none"
                >
                  <option value="">-</option>
                  {Object.keys(TIRE_DATA).map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>

              {/* Aspect Ratio Select - Dependent */}
              <div>
                 <label className="text-[10px] font-bold text-gray-500 mb-1 block uppercase tracking-wide">扁平比</label>
                 <select
                  id="aspectRatio"
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  disabled={!tireWidth}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-brand-primary outline-none font-bold text-center appearance-none transition-colors ${
                    !tireWidth 
                      ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-white border-pink-200 text-gray-800'
                  }`}
                >
                  <option value="">-</option>
                  {availableRatios.map((ratio) => (
                    <option key={ratio} value={ratio}>{ratio}</option>
                  ))}
                </select>
              </div>

              {/* Diameter Select - Dependent */}
              <div>
                 <label className="text-[10px] font-bold text-gray-500 mb-1 block uppercase tracking-wide">直徑 (R)</label>
                 <select
                  id="diameter"
                  value={tireDiameter}
                  onChange={(e) => setTireDiameter(e.target.value)}
                  disabled={!tireWidth}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-brand-primary outline-none font-bold text-center appearance-none transition-colors ${
                    !tireWidth 
                      ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-white border-pink-200 text-gray-800'
                  }`}
                >
                  <option value="">-</option>
                  {availableDiameters.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
             <p className="text-xs text-gray-400 mt-2 text-center">
                *請參考輪胎側面上的數字 (例如 205 / 55 R16)
            </p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-200 flex items-center justify-center space-x-2 active:scale-95 transition-transform mt-4"
        >
          <Send className="w-5 h-5" />
          <span>確認預約 (Confirm)</span>
        </button>

      </form>
    </div>
  );
};