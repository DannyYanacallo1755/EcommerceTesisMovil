import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { Food } from '../models/food.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  wishlist: Food[] = [];

  constructor(private wishlistService: WishlistService, private router: Router) {}
  ngOnInit() {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlist = this.wishlistService.getWishlist();
  }

  removeFromWishlist(food: Food) {
    this.wishlistService.removeFromWishlist(food);
    this.loadWishlist(); // Actualizar la lista después de eliminar un elemento
  }

  viewDetail(food: Food) {
    this.router.navigate(['/detail', food._id]);
  }
}
