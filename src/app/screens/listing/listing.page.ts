import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  categories: Category[] = [];
  foods: Food[] = [];

  constructor(private foodService: FoodService, private router: Router) {}

  ngOnInit() {
    this.getCategories();
    this.foodService.getFoods().subscribe((data) => {
      this.foods = data;
    });
  }

  getCategories() {
    this.categories = [
      {
        id: 1,
        label: 'Todo',
        image: 'assets/images/icons/all.png',
        active: true,
      },
      {
        id: 2,
        label: 'Nuevo',
        image: 'assets/images/icons/nuevo.png',
        active: false,
      },
      {
        id: 3,
        label: 'Popular',
        image: 'assets/images/icons/popular.png',
        active: false,
      },
      {
        id: 4,
        label: 'Ofertas',
        image: 'assets/images/icons/oferta.png',
        active: false,
      },
    ];
  }

  goToDetailPage(id: string) {
    this.router.navigate(['detail', id]);
  }
}
