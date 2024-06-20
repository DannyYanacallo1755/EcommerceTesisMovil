import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private baseUrl = 'https://backendtesisecommerce.onrender.com/api/products'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  getFood(id: string): Observable<Food> {
    return this.http.get<Food>(`${this.baseUrl}/${id}`);
  }

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.baseUrl);
  }
}
