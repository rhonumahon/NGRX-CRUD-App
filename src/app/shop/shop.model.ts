export interface Shop {
    title: string;
    description: string;
  }

export interface Category {
  id: number;
  category: string;
  link: string;
}

export interface CarBrands{
  id: number;
  category: string;
  link: string;
}

export interface IVehicle {
  cars: ICars[];
  isCarLoaded: boolean;
}

export interface ICars {
  id: number;
  category: string;
  link: string;
}
  