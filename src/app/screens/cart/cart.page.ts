import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  private cartSubscription: Subscription = new Subscription();
  private totalAmountSubscription: Subscription = new Subscription();
  downloadLink: string | null = null;

  constructor(
    private cartService: CartService,
    private alertCtrl: AlertController,
    private pdfGeneratorService: PdfGeneratorService
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartSubscription = this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });

    this.totalAmountSubscription = this.cartService.getTotalAmount().subscribe((amount: number) => {
      this.totalAmount = amount;
    });
  }

  onIncrease(item: CartItem) {
    this.cartService.changeQty(1, item.id).then(() => this.loadCart());
  }

  onDecrease(item: CartItem) {
    this.cartService.changeQty(-1, item.id).then(() => this.loadCart());
  }

  async removeFromCart(item: CartItem) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Estás seguro de que quieres eliminar el producto?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.cartService.removeItem(item.id);
            this.loadCart();
          },
        },
        {
          text: 'No',
        },
      ],
    });

    alert.present();
  }

  async generatePdf() {
    this.downloadLink = null; // Reinicia el enlace antes de la generación
    await this.pdfGeneratorService.generateCartPdf(this.cartItems, this.totalAmount);

    // Asegúrate de esperar a que el enlace de descarga esté disponible
    setTimeout(() => {
      this.downloadLink = this.pdfGeneratorService.downloadLink; // Asigna el enlace
    }, 3000); // Ajusta el tiempo según sea necesario
  }

  openLink() {
    if (this.downloadLink) {
      window.open(this.downloadLink, '_blank');
    }
  }

  copyLink() {
    if (this.downloadLink) {
      navigator.clipboard.writeText(this.downloadLink).then(() => {
        console.log('Enlace copiado al portapapeles.');
      }).catch((error) => {
        console.error('Error al copiar enlace:', error);
      });
    }
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.totalAmountSubscription) {
      this.totalAmountSubscription.unsubscribe();
    }
  }
}
