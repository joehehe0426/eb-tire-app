import React, { useState, useRef } from 'react';
import { MessageSquareHeart, Star, Send, X, Camera } from 'lucide-react';

interface ReviewFormProps {
  onCancel: () => void;
  onSubmit: (data: { rating: number; comment: string; photo: string | null }) => void;
  initialData: {
    name: string;
  };
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onCancel, onSubmit, initialData }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    onSubmit({ rating, comment, photo });
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* Header */}
      <div className="bg-brand-primary p-4 text-white flex items-center shadow-lg sticky top-0 z-40">
        <button onClick={onCancel} className="mr-3 p-1 hover:bg-white/20 rounded-full transition-colors">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold">評價服務 (Review)</h2>
      </div>

      <div className="p-6 max-w-lg mx-auto w-full flex-1 flex flex-col justify-center">
        
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-pink-100 text-center">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <MessageSquareHeart className="w-10 h-10 text-brand-primary" />
          </div>

          <h3 className="text-2xl font-black text-brand-dark mb-2">您滿意嗎?</h3>
          <p className="text-gray-500 mb-8 text-sm">
            Hi {initialData.name}, 請為我們的服務評分。<br/>
            您的意見能讓我們做得更好！
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Star Rating */}
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(null)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star 
                    className={`w-10 h-10 ${
                      star <= (hoveredStar || rating)
                        ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm'
                        : 'text-gray-200 fill-gray-100'
                    }`} 
                  />
                </button>
              ))}
            </div>
            <p className="text-brand-primary font-bold text-lg h-6">
              {['', '非常不滿意', '不滿意', '普通', '滿意', '非常滿意!'][hoveredStar || rating]}
            </p>

            {/* Photo Upload Section */}
            <div className="text-left">
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
                        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 hover:text-brand-primary hover:border-brand-primary hover:bg-pink-50 transition-all group"
                    >
                        <div className="bg-gray-50 p-2 rounded-full mr-2 group-hover:bg-white transition-colors">
                            <Camera className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold">上傳照片 (Add Photo)</span>
                    </button>
                ) : (
                    <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-gray-200 shadow-sm group">
                        <img src={photo} alt="Review" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
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

            {/* Comment Area */}
            <div className="relative">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="有什麼想告訴我們嗎? (選填)"
                rows={4}
                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-brand-light rounded-2xl outline-none resize-none transition-all focus:bg-white text-gray-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-200 flex items-center justify-center space-x-2 active:scale-95 transition-transform hover:bg-brand-primary"
            >
              <Send className="w-5 h-5" />
              <span>提交評價</span>
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};