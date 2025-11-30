export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  portion?: string;
  category: string;
  photos?: string[];
  image: string; // для обратной совместимости
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
