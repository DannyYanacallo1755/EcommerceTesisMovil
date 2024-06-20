// src/app/services/pdf-generator.service.ts
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { CartItem } from 'src/app/models/cart-item.model';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  async generateInvoice(cartItems: CartItem[], products: Product[], totalAmount: number) {
    console.log('generateInvoice called');
    let orderNumber = localStorage.getItem('orderNumber');
    if (!orderNumber) {
      orderNumber = '1';
    } else {
      orderNumber = (parseInt(orderNumber) + 1).toString();
    }
    localStorage.setItem('orderNumber', orderNumber);

    const doc = new jsPDF();

    // Adding store logo
    const logoUrl = 'assets/images/icons/Logocafe.png'; // Ruta a la imagen en la carpeta assets
    const img = await this.getImage(logoUrl);
    if (img) {
      console.log('Logo image loaded');
      doc.addImage(img, 'PNG', 10, 10, 50, 20);
    } else {
      console.warn('Logo image not found');
    }

    // Adding store information
    doc.setFontSize(20);
    doc.text('Factura de Compra', 70, 25);

    doc.setFontSize(12);
    doc.text('Artesanias Jimenez', 10, 40);
    doc.text('Dirección: Antonio de Ulloa N23-49 y Mercadillo', 10, 45);
    doc.text('Teléfono: +593 98 832 5130', 10, 50);
    doc.text('Correo: ', 10, 55);

    // Adding order number
    doc.setFontSize(14);
    doc.text(`Orden de Compra No: ${orderNumber}`, 10, 65);

    let y = 80;
    doc.setFontSize(14);
    doc.text('Detalles de la factura', 10, y);

    y += 10;
    doc.setFontSize(12);
    doc.text('Productos', 10, y);
    doc.text('Titulo', 50, y);
    doc.text('Precio', 90, y);
    doc.text('Cantidad', 110, y);
    doc.text('Total', 150, y);
    y += 10;

    cartItems.forEach((item) => {
      const product = products.find(p => p.id === parseInt(item.id));
      if (product) {
        doc.text(product.name, 10, y);
        doc.text(product.title, 50, y);
        doc.text(`$${product.new_price.toFixed(2)}`, 90, y);
        doc.text(`${item.quantity}`, 110, y);
        doc.text(`$${(product.new_price * item.quantity).toFixed(2)}`, 150, y);
        y += 10;
      }
    });

    y += 10;
    doc.setFontSize(14);
    doc.text(`Total: $${totalAmount.toFixed(2)}`, 10, y);

    // Adding footer
    doc.setFontSize(10);
    doc.text('Gracias por su compra!', 10, y + 20);

    console.log('Saving PDF');
    doc.save(`factura_${orderNumber}.pdf`);
  }

  private getImage(url: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => {
        console.error('Failed to load image');
        resolve(null);
      };
    });
  }
}
