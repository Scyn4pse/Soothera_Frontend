import { SpecialDeal, Service, TopRatedSalon } from '../types/Home';

// Mock data for special deals
export const specialDeals: SpecialDeal[] = [
  { id: '1', title: 'Get Special Discount.', discount: '40', tag: 'Limited time!' },
  { id: '2', title: 'Summer Sale', discount: '30', tag: 'New' },
  { id: '3', title: 'Weekend Special', discount: '25', tag: 'Hot' },
];

// Mock data for services
export const services: Service[] = [
  { 
    id: '1', 
    name: 'Filipino Massage', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 1200,
    description: 'Traditional Filipino massage technique using deep pressure and stretching',
    duration: ['60 mins', '90 mins', '120 mins']
  },
  { 
    id: '2', 
    name: 'Swedish Massage', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 1500,
    description: 'Gentle, relaxing massage with long, flowing strokes',
    duration: ['30 mins', '60 mins', '90 mins']
  },
  { 
    id: '3', 
    name: 'Shiatsu Massage', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 1800,
    description: 'Japanese pressure point massage for energy flow and relaxation',
    duration: ['60 mins', '90 mins']
  },
  { 
    id: '4', 
    name: 'Thai Massage', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 2000,
    description: 'Traditional Thai massage with stretching and acupressure',
    duration: ['60 mins', '90 mins', '120 mins']
  },
  { 
    id: '5', 
    name: 'Aromatherapy Massage', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 1600,
    description: 'Therapeutic massage with essential oils for relaxation',
    duration: ['30 mins', '60 mins']
  },
];

// Mock data for top rated salons
export const topRatedSalons: TopRatedSalon[] = [
  { id: '1', name: 'Salon Elite', rating: 4.8, location: 'Talamban, Cebu', image: require('../../../../assets/salon.jpg') },
  { id: '2', name: 'Beauty Haven', rating: 4.9, location: 'Banilad, Cebu', image: require('../../../../assets/salon.jpg') },
  { id: '3', name: 'Style Studio', rating: 4.7, location: 'Mandaue City, Cebu', image: require('../../../../assets/salon.jpg') },
  { id: '4', name: 'Glamour House', rating: 4.8, location: 'Lapu-Lapu City, Cebu', image: require('../../../../assets/salon.jpg') },
];
