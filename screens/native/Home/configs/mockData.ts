import { SpecialDeal, Service, TopRatedSalon } from '../types/Home';

// Mock data for special deals
export const specialDeals: SpecialDeal[] = [
  { id: '1', title: 'Get Special Discount.', discount: '40', tag: 'Limited time!' },
  { id: '2', title: 'Summer Sale', discount: '30', tag: 'New' },
  { id: '3', title: 'Weekend Special', discount: '25', tag: 'Hot' },
];

// Mock data for services
export const services: Service[] = [
  { id: '1', name: 'Filipino', image: require('../../../../assets/home-massage-spain.jpg') },
  { id: '2', name: 'Swedish', image: require('../../../../assets/home-massage-spain.jpg') },
  { id: '3', name: 'Shiatsu', image: require('../../../../assets/home-massage-spain.jpg') },
  { id: '4', name: 'Thai', image: require('../../../../assets/home-massage-spain.jpg') },
  { id: '5', name: 'Aromatherapy', image: require('../../../../assets/home-massage-spain.jpg') },
];

// Mock data for top rated salons
export const topRatedSalons: TopRatedSalon[] = [
  { id: '1', name: 'Salon Elite', rating: 4.8, location: 'Talamban, Cebu', image: require('../../../../assets/salon.jpg') },
  { id: '2', name: 'Beauty Haven', rating: 4.9, location: 'Banilad, Cebu', image: require('../../../../assets/salon.jpg') },
  { id: '3', name: 'Style Studio', rating: 4.7, location: 'Mandaue City, Cebu', image: require('../../../../assets/salon.jpg') },
  { id: '4', name: 'Glamour House', rating: 4.8, location: 'Lapu-Lapu City, Cebu', image: require('../../../../assets/salon.jpg') },
];
