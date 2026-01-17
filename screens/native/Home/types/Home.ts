import { ImageSourcePropType } from 'react-native';

export interface SpecialDeal {
  id: string;
  title: string;
  discount: string;
  tag: string;
}

export interface Service {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

export interface TopRatedSalon {
  id: string;
  name: string;
  rating: number;
  location: string;
  image: ImageSourcePropType;
}
