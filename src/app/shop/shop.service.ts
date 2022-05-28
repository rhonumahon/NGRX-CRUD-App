import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Category, Shop } from './shop.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private shopUrl = 'http://localhost:3000/shop';
  private categoriesUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getShop(): Observable<Shop> {
    return this.http.get<Shop>(this.shopUrl);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }
}
