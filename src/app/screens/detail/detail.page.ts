import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { Food } from 'src/app/models/food.model';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {
  id!: string;
  food!: Food;
  routeSub!: Subscription;
  isInWishlist: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private toastCtrl: ToastController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.routeSub = this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = idParam;
        this.loadProductDetails();
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadProductDetails() {
    this.foodService.getFood(this.id).subscribe(
      food => {
        this.food = food;
        this.isInWishlist = this.wishlistService.isInWishlist(this.food);
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error fetching food:', error);
      }
    );
  }

  addItemToCart() {
    if (this.food) {
      const cartItem: CartItem = {
        id: this.food._id,
        name: this.food.name,
        price: this.food.new_price,
        image: this.food.image || '',
        quantity: 1,
      };

      this.cartService.addToCart(cartItem);
      
    }
  }

  toggleWishlist() {
    if (this.food) {
      if (this.isInWishlist) {
        this.wishlistService.removeFromWishlist(this.food);
        this.presentToast('Producto eliminado de la lista de deseos');
      } else {
        this.wishlistService.addToWishlist(this.food);
        this.presentToast('Producto añadido a la lista de deseos');
      }
      this.isInWishlist = !this.isInWishlist;
      this.cdr.detectChanges();
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      mode: 'ios',
      duration: 1000,
      position: 'top',
    });

    toast.present();
  }
}
