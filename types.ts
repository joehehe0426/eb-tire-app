import React, { ReactNode } from 'react';

export enum AppView {
  REGISTRATION = 'REGISTRATION',
  USER_PROFILE = 'USER_PROFILE',
  DASHBOARD = 'DASHBOARD',
  EMERGENCY_FORM = 'EMERGENCY_FORM',
  EMERGENCY_LOCATION_STEP = 'EMERGENCY_LOCATION_STEP', // Intermediate step for location
  SERVICE_FORM = 'SERVICE_FORM',
  MAINTENANCE_FORM = 'MAINTENANCE_FORM',
  REVIEW_FORM = 'REVIEW_FORM',
  REPAIR_HISTORY = 'REPAIR_HISTORY',
  RIM_DESIGN = 'RIM_DESIGN',
  SUCCESS = 'SUCCESS',
  REPAIR_LOCATION = 'REPAIR_LOCATION'
}

export enum TirePosition {
  FRONT_LEFT = '左前輪 (Front Left)',
  FRONT_RIGHT = '右前輪 (Front Right)',
  REAR_LEFT = '左後輪 (Rear Left)',
  REAR_RIGHT = '右後輪 (Rear Right)'
}

export interface UserProfile {
  phoneNumber: string;
  name?: string;
  carBrand?: string;
  licensePlate?: string;
  isVerified: boolean;
}

export interface EmergencyRequest {
  name: string;
  carBrand: string;
  tirePosition: TirePosition | '';
  photoBase64: string | null;
  aiAnalysis?: string;
}

export interface ServiceRequest {
  serviceId: string;
  address: string;
  date: string;
  time: string;
  carBrand: string;
  tireWidth?: string;
  tireAspectRatio?: string;
  tireDiameter?: string;
  contactName: string;
  contactPhone: string;
  photoBase64: string | null;
  comment?: string;
}

export interface ReviewRequest {
  rating: number;
  comment: string;
  photo: string | null;
  timestamp?: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: ReactNode;
  isEmergency: boolean;
}

export interface RepairRecord {
  id: string;
  timestamp: number; // For sorting
  dateStr: string;
  serviceType: string;
  carBrand: string;
  details: string;
  status: 'Completed' | 'Pending' | 'Processing' | 'Cancelled';
  amount?: string;
}