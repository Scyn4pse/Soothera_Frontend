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
    name: 'Hilot', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 200,
    description: 'Traditional Filipino healing massage using warmed banana leaves and virgin coconut oil to soothe muscles and relieve tension.',
    duration: ['30 mins', '60 mins', '90 mins']
  },
  { 
    id: '2', 
    name: 'Dagdagay', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 200,
    description: 'An ancient Filipino foot massage technique that uses bamboo sticks to stimulate pressure points.',
    duration: ['30 mins', '45 mins']
  },
  { 
    id: '3', 
    name: 'Bentosa (Cupping)', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 400,
    description: 'A traditional method using heated cups to create suction on the skin, drawing out toxins and improving blood flow.',
    duration: ['30 mins', '60 mins']
  },
  { 
    id: '4', 
    name: 'Swedish Massage', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 250,
    description: 'The most common type of massage, known for relaxation and improving circulation with long, flowing strokes.',
    duration: ['30 mins', '60 mins', '90 mins']
  },
  { 
    id: '5', 
    name: 'Shiatsu', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 300,
    description: 'A Japanese massage that uses pressure with fingers, thumbs, and palms on acupuncture points to balance energy flow.',
    duration: ['60 mins', '90 mins']
  },
  { 
    id: '6', 
    name: 'Thai Massage', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 350,
    description: 'An ancient healing system combining acupressure, Indian Ayurvedic principles, and assisted yoga postures.',
    duration: ['60 mins', '90 mins', '120 mins']
  },
  { 
    id: '7', 
    name: 'Aromatherapy Massage', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 600,
    description: 'Uses essential oils in conjunction with a gentle massage to enhance relaxation and therapeutic benefits.',
    duration: ['60 mins', '75 mins']
  },
  { 
    id: '8', 
    name: 'Hot Stone Massage', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 650,
    description: 'Smooth, heated stones are placed on the body and used as massage tools to deeply relax muscles.',
    duration: ['60 mins', '75 mins']
  },
  { 
    id: '9', 
    name: 'Combination Massage', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 750,
    description: 'Combines techniques from multiple massage styles to address individual needs and preferences.',
    duration: ['60 mins', '90 mins']
  },
  { 
    id: '10', 
    name: 'Head, Neck, and Shoulder Massage', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 350,
    description: 'Focused relief for tension and stress in the upper body, ideal for quick relaxation.',
    duration: ['30 mins', '45 mins']
  },
  { 
    id: '11', 
    name: 'Foot Massage / Reflexology', 
    image: require('../../../../assets/home-massage-spain.jpg'),
    price: 200,
    description: 'Therapeutic massage focusing on pressure points in the feet to promote overall body wellness.',
    duration: ['35 mins', '45 mins']
  },
];

// Mock data for top rated salons
export const topRatedSalons: TopRatedSalon[] = [
  { 
    id: '1', 
    name: 'Salon Elite', 
    rating: 4.8, 
    location: 'Talamban, Cebu', 
    image: require('../../../../assets/salon.jpg'),
    services: ['Swedish Massage', 'Thai Massage', 'Aromatherapy', 'Hot Stone Massage']
  },
  { 
    id: '2', 
    name: 'Beauty Haven', 
    rating: 4.9, 
    location: 'Banilad, Cebu', 
    image: require('../../../../assets/salon.jpg'),
    services: ['Hilot', 'Shiatsu', 'Foot Massage', 'Head, Neck, and Shoulder Massage']
  },
  { 
    id: '3', 
    name: 'Style Studio', 
    rating: 4.7, 
    location: 'Mandaue City, Cebu', 
    image: require('../../../../assets/salon.jpg'),
    services: ['Dagdagay', 'Bentosa (Cupping)', 'Combination Massage', 'Swedish Massage']
  },
  { 
    id: '4', 
    name: 'Glamour House', 
    rating: 4.8, 
    location: 'Lapu-Lapu City, Cebu', 
    image: require('../../../../assets/salon.jpg'),
    services: ['Thai Massage', 'Aromatherapy', 'Hot Stone Massage', 'Shiatsu']
  },
  { 
    id: '5', 
    name: 'Serenity Spa', 
    rating: 4.9, 
    location: 'IT Park, Cebu', 
    image: require('../../../../assets/salon.jpg'),
    services: ['Aromatherapy', 'Hot Stone Massage', 'Swedish Massage', 'Thai Massage']
  },
  { 
    id: '6', 
    name: 'Zen Wellness Center', 
    rating: 4.6, 
    location: 'Ayala Center, Cebu', 
    image: require('../../../../assets/salon.jpg'),
    services: ['Shiatsu', 'Combination Massage', 'Head, Neck, and Shoulder Massage', 'Foot Massage']
  },
  { 
    id: '7', 
    name: 'Tranquil Touch', 
    rating: 4.8, 
    location: 'SM City, Cebu', 
    image: require('../../../../assets/salon.jpg'),
    services: ['Hilot', 'Dagdagay', 'Bentosa (Cupping)', 'Swedish Massage']
  },
  { 
    id: '8', 
    name: 'Blissful Retreat', 
    rating: 4.7, 
    location: 'Robinsons, Cebu', 
    image: require('../../../../assets/salon.jpg'),
    services: ['Thai Massage', 'Aromatherapy', 'Hot Stone Massage', 'Combination Massage']
  },
  { 
    id: '9', 
    name: 'Harmony Spa', 
    rating: 4.9, 
    location: 'Crossroads, Cebu', 
    image: require('../../../../assets/salon.jpg'),
    services: ['Shiatsu', 'Swedish Massage', 'Foot Massage', 'Head, Neck, and Shoulder Massage']
  },
  { 
    id: '10', 
    name: 'Elegance Salon', 
    rating: 4.8, 
    location: 'JY Square, Cebu', 
    image: require('../../../../assets/salon.jpg'),
    services: ['Thai Massage', 'Hot Stone Massage', 'Aromatherapy', 'Hilot']
  },
];
