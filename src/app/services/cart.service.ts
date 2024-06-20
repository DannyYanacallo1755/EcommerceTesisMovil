import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>([]);

  constructor(private toastCtrl: ToastController) {}

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

  changeQty(quantity: number, id: string) {
    const items = this.items$.getValue();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index].quantity += quantity;
      this.items$.next(items);
    }
  }

  getTotalAmount() {
    return this.items$.pipe(
      map(items => {
        let total = 0;
        items.forEach(item => {
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
