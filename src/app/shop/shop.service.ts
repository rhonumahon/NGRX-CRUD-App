import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Shop } from './shop.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private shopUrl = 'http://localhost:3000/shop';

  constructor(private http: HttpClient) {}

  getShop(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.shopUrl);
  }
}
