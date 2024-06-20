import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Food[] = [];

  getWishlist(): Food[] {
    return this.wishlist;
  }

  addToWishlist(food: Food) {
    if (!this.isInWishlist(food)) {
      this.wishlist.push(food);
    }
  }

  removeFromWishlist(food: Food) {
    this.wishlist = this.wishlist.filter(item => item._id !== food._id);
  }

  isInWishlist(food: Food): boolean {
    return this.wishlist.some(item => item._id === food._id);
  }
}
