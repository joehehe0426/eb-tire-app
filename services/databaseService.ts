/**
 * Database Service for EB Rescue App
 * Uses Supabase (PostgreSQL) to store customer and order data
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize Supabase client
let supabase: ReturnType<typeof createClient> | null = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

interface UserData {
  phone_number: string;
  name?: string;
  car_brand?: string;
  license_plate?: string;
  is_verified?: boolean;
}

interface OrderData {
  phone_number: string;
  service_type: string;
  contact_name?: string;
  contact_phone?: string;
  car_brand?: string;
  address?: string;
  date?: string;
  time?: string;
  tire_width?: string;
  tire_aspect_ratio?: string;
  tire_diameter?: string;
  tire_position?: string;
  comment?: string;
  photo_base64?: string | null;
  ai_analysis?: string;
  status?: string;
}

interface EmergencyData {
  phone_number: string;
  contact_name: string;
  car_brand: string;
  tire_position: string;
  photo_base64?: string | null;
  ai_analysis?: string;
  location_sent?: boolean;
}

interface ReviewData {
  phone_number?: string;
  name?: string;
  rating: number;
  comment: string;
  photo_base64?: string | null;
}

/**
 * Check if Supabase is configured
 */
const isConfigured = (): boolean => {
  const configured = !!(supabase && SUPABASE_URL && SUPABASE_ANON_KEY);
  if (!configured) {
    console.warn('⚠️ Supabase not configured:', {
      hasUrl: !!SUPABASE_URL,
      hasKey: !!SUPABASE_ANON_KEY,
      hasClient: !!supabase
    });
  }
  return configured;
};

/**
 * Save or update user registration data
 */
export const saveUser = async (userData: UserData): Promise<{ success: boolean; error?: string }> => {
  if (!isConfigured() || !supabase) {
    console.warn('Supabase not configured, skipping database save');
    return { success: false, error: 'Database not configured' };
  }

  try {
    // Try to update first, then insert if not exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('phone_number')
      .eq('phone_number', userData.phone_number)
      .single();

    if (existingUser) {
      // Update existing user
      const { error } = await supabase
        .from('users')
        .update({
          ...userData,
          updated_at: new Date().toISOString()
        })
        .eq('phone_number', userData.phone_number);

      if (error) throw error;
    } else {
      // Insert new user
      const { error } = await supabase
        .from('users')
        .insert({
          ...userData,
          is_verified: userData.is_verified ?? true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    }

    console.log('✅ User saved successfully:', userData.phone_number);
    return { success: true };
  } catch (error) {
    console.error('❌ Error saving user:', error);
    if (error && typeof error === 'object' && 'message' in error) {
      console.error('Error details:', error);
    }
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Save order/service request
 */
export const saveOrder = async (orderData: OrderData): Promise<{ success: boolean; error?: string; orderId?: string }> => {
  if (!isConfigured() || !supabase) {
    console.warn('Supabase not configured, skipping database save');
    return { success: false, error: 'Database not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        ...orderData,
        status: orderData.status || 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (error) throw error;

    console.log('✅ Order saved successfully:', data?.id);
    return { success: true, orderId: data?.id };
  } catch (error) {
    console.error('❌ Error saving order:', error);
    if (error && typeof error === 'object' && 'message' in error) {
      console.error('Error details:', error);
    }
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Save emergency request
 */
export const saveEmergencyRequest = async (emergencyData: EmergencyData): Promise<{ success: boolean; error?: string; requestId?: string }> => {
  if (!isConfigured() || !supabase) {
    console.warn('Supabase not configured, skipping database save');
    return { success: false, error: 'Database not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('emergency_requests')
      .insert({
        ...emergencyData,
        location_sent: emergencyData.location_sent || false,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (error) throw error;

    console.log('✅ Emergency request saved successfully:', data?.id);
    return { success: true, requestId: data?.id };
  } catch (error) {
    console.error('❌ Error saving emergency request:', error);
    if (error && typeof error === 'object' && 'message' in error) {
      console.error('Error details:', error);
    }
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Update emergency request when location is sent
 */
export const updateEmergencyLocationSent = async (requestId: string): Promise<{ success: boolean; error?: string }> => {
  if (!isConfigured() || !supabase || !requestId) {
    return { success: false, error: 'Database not configured or missing request ID' };
  }

  try {
    const { error } = await supabase
      .from('emergency_requests')
      .update({
        location_sent: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error updating emergency request:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Save review
 */
export const saveReview = async (reviewData: ReviewData): Promise<{ success: boolean; error?: string }> => {
  if (!isConfigured() || !supabase) {
    console.warn('Supabase not configured, skipping database save');
    return { success: false, error: 'Database not configured' };
  }

  try {
    const { error } = await supabase
      .from('reviews')
      .insert({
        ...reviewData,
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    console.log('✅ Review saved successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Error saving review:', error);
    if (error && typeof error === 'object' && 'message' in error) {
      console.error('Error details:', error);
    }
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Get user by phone number
 */
export const getUserByPhone = async (phoneNumber: string): Promise<UserData | null> => {
  if (!isConfigured() || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('phone_number', phoneNumber)
      .single();

    if (error) return null;

    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
