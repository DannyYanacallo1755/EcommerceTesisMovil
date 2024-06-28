import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from 'src/app/models/food.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
})
export class FoodCardComponent implements OnInit {
  @Input() item!: Food;
  truncatedTitle: string = '';

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.truncatedTitle = this.truncateTitle(this.item.name, 6); // Límite de palabras
  }

  navigateToDetail() {
    this.router.navigate(['/detail', this.item._id]);
  }

  addToCart() {
    const cartItem = {
      id: this.item._id,
      name: this.item.name,
      price: this.item.new_price,
      image: this.item.image,
      quantity: 1,
    };

    this.cartService.addToCart(cartItem);
  }

  truncateTitle(title: string, maxWords: number): string {
    const words = title.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return title;
  }
}
