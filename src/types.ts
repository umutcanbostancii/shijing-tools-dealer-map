export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export interface District {
  city: string;
  district: string | null;
  latitude: number;
  longitude: number;
}

export interface Dealer {
  city: string;
  district: string | null;
  name: string;
  latitude: number;
  longitude: number;
}

export interface DealersData {
  cities: City[];
  districts: District[];
  dealers: Dealer[];
}
