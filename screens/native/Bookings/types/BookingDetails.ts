import { Booking } from './Booking';

export interface BookingDetails extends Booking {
  // Spa information
  spaImage: any; // Image source (require() or URI)
  spaRating: number; // Float rating (e.g., 4.5)
  spaDetails: string; // Description/details about the spa
  
  // Location coordinates for map
  latitude: number;
  longitude: number;
  
  // Therapist information
  therapistName: string;
  therapistTitle: string; // e.g., "Certified Massage Therapist"
  
  // Payment information
  bookingId: string;
  paidBy: 'Cash' | 'E-Wallet';
}
