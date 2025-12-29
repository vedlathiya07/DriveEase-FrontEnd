
export type Role = 'user' | 'owner' | null;

export interface Car {
  id: string;
  name: string;
  type: string;
  pricePerDay: number;
  availability: 'Available' | 'Rented' | 'Maintenance';
  image: string;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuel: 'Petrol' | 'Diesel' | 'Electric';
  owner: string;
  rating: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export interface Booking {
  id: string;
  carId: string;
  carName: string;
  status: 'Ongoing' | 'Completed' | 'Upcoming';
  date: string;
  totalPrice: number;
  imageBefore?: string;
  imageAfter?: string;
}

export interface NearbyService {
  id: string;
  name: string;
  type: 'Petrol' | 'EV' | 'Wash' | 'Cafe';
  distance: string;
}
