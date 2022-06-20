import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filter, first, map, Observable, shareReplay } from 'rxjs';
import { CarBrands, Shop } from '../shop/shop.model';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  activeTab = 'sharedReplay';
  carBrands = 'http://localhost:3000/carBrands';
  shopUrl = 'http://localhost:3000/shop';
  newCars$: Observable<CarBrands[]>;
  oldCars$: Observable<CarBrands[]>;
  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    const carss = this.getCars().pipe(
      shareReplay()
    )
    this.newCars$ = carss.pipe(
      map(i => i.filter(caro => caro.id < 3)),
    )

    this.oldCars$ = carss.pipe(
      map(i => i.filter(caro => caro.id >= 3)),
    )

    this.newCars$.subscribe(i => console.log(i)
    )

    this.oldCars$.subscribe(a => console.log(a)
    )
  }



  getCars(): Observable<CarBrands[]> {
    return this.http.get<CarBrands[]>(this.carBrands);
  }

  getShop(): Observable<Shop> {
    return this.http.get<Shop>(this.shopUrl);
  }

}
