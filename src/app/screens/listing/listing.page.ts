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
  filteredFoods: Food[] = [];
  selectedCategory: string = 'Todo';
  isSearching: boolean = false;

  constructor(private foodService: FoodService, private router: Router) {}

  ngOnInit() {
    this.getCategories();
    this.foodService.getFoods().subscribe((data) => {
      this.foods = data;
      this.applyFilter();
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
        label: 'pajatoquilla',
        image: 'assets/images/icons/paja.png',
        active: false,
      },
      {
        id: 3,
        label: 'totora',
        image: 'assets/images/icons/totora.png',
        active: false,
      },
      {
        id: 4,
        label: 'Despues',
        image: 'assets/images/icons/oferta.png',
        active: false,
      },
    ];
  }

  applyFilter() {
    if (this.selectedCategory === 'Todo') {
      this.filteredFoods = this.foods;
    } else {
      this.filteredFoods = this.foods.filter(food => food.category === this.selectedCategory);
    }
  }

  selectCategory(category: Category) {
    this.selectedCategory = category.label;
    this.categories.forEach(cat => cat.active = false);
    category.active = true;
    this.applyFilter();
  }

  onSearchChanged(searchTerm: string) {
    if (searchTerm) {
      this.isSearching = true;
      this.filteredFoods = this.foods.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.isSearching = false;
      this.applyFilter();
    }
  }

  goToDetailPage(id: string) {
    this.router.navigate(['detail', id]);
  }
}
