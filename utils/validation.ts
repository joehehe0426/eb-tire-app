/**
 * Input validation utilities
 */

export const validatePhoneNumber = (phone: string): { valid: boolean; error?: string } => {
  const cleaned = phone.replace(/\s+/g, '');
  
  if (!cleaned) {
    return { valid: false, error: '請輸入電話號碼' };
  }

  // Hong Kong phone numbers: 8 digits, optionally starting with country code
  const hkPhoneRegex = /^(\+?852)?[2-9]\d{7}$/;
  
  if (!hkPhoneRegex.test(cleaned)) {
    return { valid: false, error: '請輸入有效的香港電話號碼 (8位數字)' };
  }

  return { valid: true };
};

export const validateName = (name: string): { valid: boolean; error?: string } => {
  const trimmed = name.trim();
  
  if (!trimmed) {
    return { valid: false, error: '請輸入姓名' };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: '姓名至少需要2個字符' };
  }

  if (trimmed.length > 50) {
    return { valid: false, error: '姓名不能超過50個字符' };
  }

  return { valid: true };
};

export const validateAddress = (address: string): { valid: boolean; error?: string } => {
  const trimmed = address.trim();
  
  if (!trimmed) {
    return { valid: false, error: '請輸入地址' };
  }

  if (trimmed.length < 4) {
    return { valid: false, error: '請輸入更詳細的地址' };
  }

  if (trimmed.length > 200) {
    return { valid: false, error: '地址不能超過200個字符' };
  }

  return { valid: true };
};

export const validateCarBrand = (brand: string): { valid: boolean; error?: string } => {
  const trimmed = brand.trim();
  
  if (!trimmed) {
    return { valid: false, error: '請輸入車輛品牌' };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: '車輛品牌至少需要2個字符' };
  }

  return { valid: true };
};

export const validateLicensePlate = (plate: string): { valid: boolean; error?: string } => {
  // Optional field, so empty is valid
  if (!plate.trim()) {
    return { valid: true };
  }

  // Basic validation for HK license plates
  const trimmed = plate.trim().toUpperCase();
  
  if (trimmed.length < 2 || trimmed.length > 8) {
    return { valid: false, error: '請輸入有效的車牌號碼' };
  }

  return { valid: true };
};

export const validateDate = (dateStr: string): { valid: boolean; error?: string } => {
  if (!dateStr) {
    return { valid: false, error: '請選擇日期' };
  }

  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(date.getTime())) {
    return { valid: false, error: '無效的日期格式' };
  }

  if (date < today) {
    return { valid: false, error: '日期不能是過去的日子' };
  }

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 2);
  
  if (date > maxDate) {
    return { valid: false, error: '日期不能超過2年後' };
  }

  return { valid: true };
};

export const validateTime = (timeStr: string, dateStr?: string): { valid: boolean; error?: string } => {
  if (!timeStr) {
    return { valid: false, error: '請選擇時間' };
  }

  // If date is today, check if time is in the future
  if (dateStr) {
    const selectedDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate.getTime() === today.getTime()) {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const selectedTime = new Date();
      selectedTime.setHours(hours, minutes, 0, 0);
      const now = new Date();

      if (selectedTime < now) {
        return { valid: false, error: '時間不能是過去的時間' };
      }
    }
  }

  return { valid: true };
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

