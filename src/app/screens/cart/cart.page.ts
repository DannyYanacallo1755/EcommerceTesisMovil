import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems$: Observable<CartItem[]> = new Observable();
  totalAmount$: Observable<number> = new Observable();

  constructor(
    private cartService: CartService,
    private alertCtrl: AlertController,
    private pdfGeneratorService: PdfGeneratorService
  ) {}

  ngOnInit() {
    this.cartItems$ = this.cartService.getCart();
    this.totalAmount$ = this.cartService.getTotalAmount();
  }

  onIncrease(item: CartItem) {
    this.cartService.changeQty(1, item.id);
  }

  onDecrease(item: CartItem) {
    if (item.quantity === 1) this.removeFromCart(item);
    else this.cartService.changeQty(-1, item.id);
  }

  async removeFromCart(item: CartItem) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Estás seguro de que quieres eliminar el producto?',
      buttons: [
        {
          text: 'Si',
          handler: () => this.cartService.removeItem(item.id),
        },
        {
          text: 'No',
        },
      ],
    });

    alert.present();
  }

  async generatePdf() {
    this.cartItems$.subscribe(cartItems => {
      this.totalAmount$.subscribe(totalAmount => {
        if (cartItems && totalAmount !== undefined) {
          this.pdfGeneratorService.generateCartPdf(cartItems, totalAmount);
        }
      });
    });
  }
}
