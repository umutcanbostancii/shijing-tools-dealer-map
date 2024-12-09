export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export interface District {
  city: string;
  district: string;
  latitude: number;
  longitude: number;
}

export interface Dealer {
  city: string;
  district: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface DealersData {
  cities: City[];
  districts: District[];
  dealers: Dealer[];
}
