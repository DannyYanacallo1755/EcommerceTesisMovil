export interface Product {
    id: number;
    name: string;
    image: string;
    category: string;
    new_price: number;
    old_price: number;
    available: boolean;
    stock: number;
    description: string;
    date: Date;
    title: string; // Cambia esto a obligatorio
    price: number; // Cambia esto a obligatorio
  }
  