import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { CartItem } from 'src/app/models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  async generateCartPdf(cartItems: CartItem[], totalAmount: number) {
    const doc = new jsPDF();
    const img = new Image();
    img.src = 'assets/images/icons/Logocafe.png';  // Ruta de tu logotipo

    img.onload = () => {
      // Adding store logo
      doc.addImage(img, 'PNG', 10, 10, 50, 20);

      // Adding store information
      doc.setFontSize(20);
      doc.text("Factura de Compra", 70, 25);

      doc.setFontSize(12);
      doc.text("Artesanias Jimenez", 10, 40);
      doc.text("Dirección: Antonio de Ulloa N23-49 y Mercadillo", 10, 45);
      doc.text("Teléfono: +593 98 832 5130", 10, 50);
      doc.text("Correo: info@artesaniasjimenez.com", 10, 55); // Añade el correo

      // Adding order number
      let orderNumber = localStorage.getItem('orderNumber');
      if (!orderNumber) {
        orderNumber = '1';
      } else {
        orderNumber = (parseInt(orderNumber) + 1).toString();
      }
      localStorage.setItem('orderNumber', orderNumber);

      doc.setFontSize(14);
      doc.text(`Orden de Compra No: ${orderNumber}`, 10, 65);

      let y = 80;
      doc.setFontSize(14);
      doc.text("Detalles de la factura", 10, y);

      y += 10;
      doc.setFontSize(12);
      doc.text("Productos", 10, y);
      
      doc.text("Precio", 90, y);
      doc.text("Cantidad", 110, y);
      doc.text("Total", 150, y);
      y += 10;

      cartItems.forEach((item) => {
        doc.text(item.name, 10, y);
        doc.text(`$${item.price.toFixed(2)}`, 90, y);
        doc.text(`${item.quantity}`, 110, y);
        doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 150, y);
        y += 10;
      });

      y += 10;
      doc.setFontSize(14);
      doc.text(`Total: $${totalAmount.toFixed(2)}`, 10, y);

      // Adding footer
      doc.setFontSize(10);
      doc.text("Gracias por su compra!", 10, y + 20);

      doc.save(`factura_${orderNumber}.pdf`);
    };
  }
}
