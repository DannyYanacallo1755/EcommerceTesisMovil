import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from 'src/app/models/food.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
})
export class FoodCardComponent {
  @Input() item!: Food;

  constructor(private router: Router, private cartService: CartService) {}

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
}
