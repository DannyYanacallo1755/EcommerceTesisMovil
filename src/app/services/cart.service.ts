import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { ProductService } from './product.service';
import { ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>([]);

  constructor(
    private productService: ProductService,
    private toastCtrl: ToastController
  ) {}

  getCart() {
    return this.items$.asObservable();
  }

  async addToCart(newItem: CartItem) {
    const items = this.items$.getValue();
    const itemExists = items.find(item => item.id === newItem.id);

    if (itemExists) {
      await this.presentToast('El producto ya ha sido añadido al carrito');
    } else {
      this.items$.next([...items, newItem]);
      await this.presentToast('Producto añadido al carrito');
    }
  }

  removeItem(id: string) {
    this.items$.next(this.items$.getValue().filter(item => item.id !== id));
  }

  async changeQty(quantity: number, id: string) {
    const items = this.items$.getValue();
    const index = items.findIndex(item => item.id === id);

    if (index !== -1) {
      try {
        const product = await this.productService.getProductById(id).toPromise();

        if (!product) {
          await this.presentToast('Producto no encontrado');
          return;
        }

        const newQuantity = items[index].quantity + quantity;

        if (newQuantity > product.stock) {
          await this.presentToast('De momento no contamos con más stock de este producto');
        } else if (newQuantity <= 0) {
          this.removeItem(id);
        } else {
          items[index].quantity = newQuantity;
          this.items$.next(items);
        }
      } catch (error) {
        await this.presentToast('Error al obtener información del producto');
        console.error(error);
      }
    }
  }

  getTotalAmount() {
    return this.items$.pipe(
      map((items: CartItem[]) => {
        let total = 0;
        items.forEach((item: CartItem) => {
          total += item.quantity * item.price;
        });
        return total;
      })
    );
  }

  private async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
