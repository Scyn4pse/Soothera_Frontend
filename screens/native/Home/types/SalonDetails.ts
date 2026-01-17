import { ImageSourcePropType } from 'react-native';
import { TopRatedSalon } from './Home';

export interface Therapist {
  id: string;
  name: string;
  title: string;
  image: ImageSourcePropType;
  rating: number;
}

export interface Review {
  userName: string;
  rating: number;
  comment: string;
  date?: Date | string;
}

export interface SalonDetails extends TopRatedSalon {
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  operatingHours: string;
  distance: string;
  reviewCount: number;
  therapists: Therapist[];
  reviews: Review[];
  phoneNumber?: string;
  facebookUrl?: string;
}
