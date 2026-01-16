import { BookingDetails } from '../types/BookingDetails';
import { BOOKING_STATUS } from '../types/Booking';

// Mock booking details data
// This extends the basic booking data with additional details needed for the details screen
export const bookingDetailsMap: Record<string, BookingDetails> = {
  '1': {
    id: '1',
    serviceName: 'Aromatherapy Massage',
    spaName: 'Tranquil Oasis Spa',
    status: BOOKING_STATUS.CONFIRMED,
    date: '01/20/2026',
    time: '10:00 AM - 11:00 AM',
    address: 'Talamban, Cebu City',
    price: 150.00,
    spaImage: require('../../../../assets/salon.jpg'),
    spaRating: 4.5,
    spaDetails: 'Experience ultimate relaxation at Tranquil Oasis Spa. Our professional therapists provide world-class massage services in a serene and peaceful environment. We use premium essential oils and techniques to ensure you leave feeling refreshed and rejuvenated.',
    latitude: 10.3157,
    longitude: 123.8854,
    therapistName: 'Maria Santos',
    therapistTitle: 'Certified Massage Therapist',
    bookingId: 'BK-2024-001',
    paidAmount: 75.00, // 50% of 150.00
  },
  '2': {
    id: '2',
    serviceName: 'Deep Tissue Therapy',
    spaName: 'Urban Retreat',
    status: BOOKING_STATUS.PENDING,
    date: '01/25/2026',
    time: '02:00 PM - 03:30 PM',
    address: 'Mandaue City, Cebu',
    price: 180.00,
    spaImage: require('../../../../assets/salon.jpg'),
    spaRating: 4.8,
    spaDetails: 'Urban Retreat offers a modern approach to wellness and relaxation. Our deep tissue therapy targets muscle tension and promotes healing. Located in the heart of Mandaue City, we provide convenient access to premium spa services.',
    latitude: 10.3236,
    longitude: 123.9223,
    therapistName: 'John Dela Cruz',
    therapistTitle: 'Certified Massage Therapist',
    bookingId: 'BK-2024-002',
    paidAmount: 90.00, // 50% of 180.00
  },
  '3': {
    id: '3',
    serviceName: 'Hot Stone Massage',
    spaName: 'Serenity Spa Center',
    status: BOOKING_STATUS.COMPLETED,
    date: '04/21/2024',
    time: '03:00 PM - 04:00 PM',
    address: 'Talamban, Cebu City',
    price: 120.00,
    spaImage: require('../../../../assets/salon.jpg'),
    spaRating: 4.6,
    spaDetails: 'Serenity Spa Center specializes in hot stone massage therapy. Our heated stones help to relax muscles, improve circulation, and provide deep relaxation. Our experienced therapists are trained in various massage techniques to meet your specific needs.',
    latitude: 10.3157,
    longitude: 123.8854,
    therapistName: 'Anna Garcia',
    therapistTitle: 'Certified Massage Therapist',
    bookingId: 'BK-2024-003',
    paidAmount: 60.00, // 50% of 120.00
  },
  '4': {
    id: '4',
    serviceName: 'Swedish Massage',
    spaName: 'The Royale Spa',
    status: BOOKING_STATUS.CANCELLED,
    date: '03/12/2024',
    time: '11:30 AM - 12:30 PM',
    address: 'Capitol Site, Cebu City',
    price: 95.00,
    spaImage: require('../../../../assets/salon.jpg'),
    spaRating: 4.7,
    spaDetails: 'The Royale Spa offers luxurious Swedish massage services in an elegant setting. Our classic Swedish massage technique uses long, flowing strokes to promote relaxation and relieve tension. Perfect for those seeking a gentle yet effective massage experience.',
    latitude: 10.3153,
    longitude: 123.8904,
    therapistName: 'Robert Tan',
    therapistTitle: 'Certified Massage Therapist',
    bookingId: 'BK-2024-004',
    paidAmount: 47.50, // 50% of 95.00
  },
};

// Helper function to get booking details by ID
export function getBookingDetails(bookingId: string): BookingDetails | undefined {
  return bookingDetailsMap[bookingId];
}
