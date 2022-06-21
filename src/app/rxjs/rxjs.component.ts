import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concat, concatMap, debounceTime, distinctUntilChanged, exhaustMap, filter, first, fromEvent, map, mergeMap, Observable, shareReplay, switchMap } from 'rxjs';
import { CarBrands, Shop } from '../shop/shop.model';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, AfterViewInit {
  form: FormGroup
  activeTab = 'sharedReplay';
  carBrands = 'http://localhost:3000/carBrands';
  shopUrl = 'http://localhost:3000/shop';
  newCars$: Observable<CarBrands[]>;
  oldCars$: Observable<CarBrands[]>;
  searchedCars$: Observable<CarBrands[]>;

  @ViewChild('submitButton') submitButton: ElementRef
  @ViewChild('searchInput') searchInput: ElementRef
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = fb.group({
      link: ['' ,Validators.required],
      category: ['' ,Validators.required]
    })
  }


  //----------------------------------------------------------shareReplay()------------------------------------------------
  // ngOnInit(): void {
  //   const carss = this.getCars().pipe(
  //     shareReplay()
  //   )
  //   this.newCars$ = carss.pipe(
  //     map(i => i.filter(caro => caro.id < 3)),
  //   )

  //   this.oldCars$ = carss.pipe(
  //     map(i => i.filter(caro => caro.id >= 3)),
  //   )

  //   this.newCars$.subscribe(i => console.log(i)
  //   )

  //   this.oldCars$.subscribe(a => console.log(a)
  //   )
  // }

  //----------------------------------------------------------concatMap()----------------------------

  // //waiting each obs to complete before merging the next
  // ngOnInit(): void {
  //   this.form.valueChanges.pipe(
  //     filter(() => this.form.valid),
  //     concatMap(changes => this.createCustomer(changes))
  //   ).subscribe()
  // }

    //---------------------------------------------------------mergeMap()----------------------------

  // //not waiting just merge each obs due to respective time
  // //creates an output observable with concurrently emits all values every given input observable
  // ngOnInit(): void {
  //   this.form.valueChanges.pipe(
  //     filter(() => this.form.valid),
  //     mergeMap(changes => this.createCustomer(changes))
  //   ).subscribe()
  // }

      //---------------------------------------------------------exhaustMap()----------------------------

  //will merge only if the projected obs is completed otherwise obs is ignored

  // ngOnInit(): void {
  // }

  // ngAfterViewInit(){
  //   fromEvent(this.submitButton.nativeElement, 'click').pipe(
  //     exhaustMap(() => this.createCustomer(this.form.value))
  //   ).subscribe();
  // }


  //--------------------------------debounceTime() and distinctUntilChanged() and switchMap()----------------------------
  //debounceTime - Emits a value from the source Observable only after a particular time span has passed without another source emission
  //  distinctUntilChanged - ignore duplicate obs input
  // switchMap - Projects each source value to an Observable which is merged in the output Observable, emitting values only from the most recently projected Observable.
  ngOnInit(): void {

  }

    ngAfterViewInit(){
    const srchCars$ = fromEvent<any>(this.searchInput.nativeElement, 'keyup')
      .pipe(
         map(event => event.target.value),
         debounceTime(400),
         distinctUntilChanged(),
         switchMap(search =>  this.getCarsBySearch(search))
    )

    const initialCars$ = this.getCarsBySearch();

    this.searchedCars$ = concat(initialCars$, srchCars$)
  }

  createCustomer(payload: CarBrands): Observable<CarBrands> {
    console.log(payload);
    return this.http.post<CarBrands>(this.carBrands, payload);
  }

  getCarsBySearch(search: string = ''): Observable<CarBrands[]> {
    return this.http.get<CarBrands[]>(`${this.carBrands}/?category=${search}`);
  }

  getCars(): Observable<CarBrands[]> {
    return this.http.get<CarBrands[]>(this.carBrands);
  }

  getShop(): Observable<Shop> {
    return this.http.get<Shop>(this.shopUrl);
  }

}
