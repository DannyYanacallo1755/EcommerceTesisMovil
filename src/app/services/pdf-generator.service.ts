import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { CartItem } from '../models/cart-item.model';
import { ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  downloadLink: string | null = null;

  constructor(private toastCtrl: ToastController, private storage: AngularFireStorage) {}

  async generateCartPdf(cartItems: CartItem[], totalAmount: number) {
    const documentDefinition = this.getDocumentDefinition(cartItems, totalAmount);

    try {
      pdfMake.createPdf(documentDefinition).getBlob(async (blob: Blob) => {
        const filePath = `cart_pdfs/Cart_${new Date().getTime()}.pdf`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, blob);

        task.snapshotChanges().pipe(
          finalize(async () => {
            const downloadURL = await fileRef.getDownloadURL().toPromise();
            console.log('File available at', downloadURL);
            this.presentToast('El PDF se generó correctamente. Por favor revisa la parte de abajo');
            this.downloadLink = downloadURL; // Asigna el enlace a la propiedad downloadLink
          })
        ).subscribe();
      });
    } catch (error) {
      console.error('Error generating PDF: ', error);
      this.presentToast('Error al generar el PDF.');
    }
  }

  private getDocumentDefinition(cartItems: CartItem[], totalAmount: number) {
    return {
      content: [
        { text: 'Carrito de Compras', style: 'header' },
        this.getItemsTable(cartItems),
        { text: 'Total: $' + totalAmount.toFixed(2), style: 'total' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        tableHeader: {
          bold: true,
        },
        total: {
          margin: [0, 20, 0, 0],
          fontSize: 16,
          bold: true
        }
      }
    };
  }

  private getItemsTable(cartItems: CartItem[]) {
    return {
      table: {
        widths: ['*', 'auto', 'auto', 'auto'],
        body: [
          [
            { text: 'Producto', style: 'tableHeader' },
            { text: 'Cantidad', style: 'tableHeader' },
            { text: 'Precio', style: 'tableHeader' },
            { text: 'Subtotal', style: 'tableHeader' }
          ],
          ...cartItems.map(item => [item.name, item.quantity, item.price, (item.quantity * item.price).toFixed(2)])
        ]
      }
    };
  }

  private async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000, // Incrementa la duración para que el usuario tenga tiempo de copiar el enlace
      position: 'top',
    });
    toast.present();
  }
}
