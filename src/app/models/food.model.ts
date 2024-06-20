export interface Food {
  _id: string;  // Usar el ID de MongoDB
  name: string;
  image: string;
  category: string;
  new_price: number;
  old_price: number;
  avilable: boolean;
  stock: number;
  description: string;
  date: Date;
}
