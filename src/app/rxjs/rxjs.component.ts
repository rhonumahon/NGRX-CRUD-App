import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, combineLatest, combineLatestWith, concat, concatMap, debounceTime, delayWhen, distinctUntilChanged, exhaustMap, filter, first, fromEvent, map, mergeMap, Observable, retryWhen, shareReplay, startWith, Subject, switchMap, tap, throwError, timer } from 'rxjs';
import { CarBrands, Shop } from '../shop/shop.model';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit
//, AfterViewInit
{
  form: FormGroup
  activeTab = 'sharedReplay';
  carBrands = 'http://localhost:3000/carBrands';
  shopUrl = 'http://localhost:3000/shop';
  errorApi = 'http://localhost:3000/errorApi';
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


  //--------------------debounceTime()/throttleTime(), distinctUntilChanged() and switchMap()----------------------------

  // debounceTime - Emits a value from the source Observable only after a particular time span has passed without another source emission
  //  distinctUntilChanged - ignore duplicate obs input
  // switchMap - Projects each source value to an Observable which is merged in the output Observable, emitting values only from the most recently projected Observable.
  // ngOnInit(): void {
  //   //switching obs from one to another
  //   const cars$ = this.getCars();
  //   const shop$ = this.getShop();
  //   const combined$ = cars$.pipe(
  //     switchMap(car => {
  //       return shop$.pipe(
  //         tap( shop => {
  //           console.log('cars: ', car);
  //           console.log('shop: ', shop);

  //         }),
  //         map(shop => {
  //           return car.map(item => {
  //             const {...etc} = item;
  //             const shopTitle = shop.title;
  //             return {...etc, shopTitle}
  //           })
  //         })
  //       )
  //     })
  //   )

  //   combined$.subscribe(i => console.log(i, 'LOGS')
  //   );
  // }

  // ngAfterViewInit(){
  //   const srchCars$ = fromEvent<any>(this.searchInput.nativeElement, 'keyup')
  //     .pipe(
  //        map(event => event.target.value),
  //        debounceTime(400),
  //        distinctUntilChanged(),
  //        switchMap(search =>  this.getCarsBySearch(search))
  //   )

  //   const initialCars$ = this.getCarsBySearch();

  //   this.searchedCars$ = concat(initialCars$, srchCars$)
  // }
  //------using startWith()------
  //   ngAfterViewInit(){
  //     this.searchedCars$ = fromEvent<any>(this.searchInput.nativeElement, 'keyup')
  //     .pipe(
  //        map(event => event.target.value),
  //        startWith('Toyota'),
  //        debounceTime(400), // throttleTime(400),
  //        distinctUntilChanged(),
  //        switchMap(search =>  this.getCarsBySearch(search))
  //   )
  // }

  //--------------------------------------------- combineLatestWith()----------------------------

  // ngOnInit(): void {
  //   const cars$ = this.getCars();
  //   const shop$ = this.getShop();
  //   const combined$ = shop$.pipe(
  //     combineLatestWith(cars$),
  //     map(([shop, car]) => {
  //       return car.map(item => {
  //         const {...etc} = item;
  //         const shopTitle = shop.title;
  //         return {...etc, shopTitle}
  //       })
  //     })
  //       )
  //   combined$.subscribe(console.log
  //   );
  // }

  //------------------------------------error strategy-----------------------------------------
  // ngOnInit(): void {
  //   this.getError().pipe(
  //     tap(() => console.log("HTTP request executed")
  //     ),
  //     map(res => res),
  //     retryWhen(error => error.pipe(
  //       delayWhen(() => timer(2000))
  //     ))
  //   ).subscribe()
  // }

  //-------------------------------------RXJS SUBJECTS---------------------
  // ngOnInit(): void {
  //   const subject =  new Subject();
  //   const series$ = subject.asObservable();
  //   series$.subscribe(console.log)

  //   subject.next(1);
  //   subject.next(2);
  //   subject.next(3);
  //   subject.complete();
  // }

    //-------------------------------------RXJS SUBJECTS when to use it---------------------
  ngOnInit(): void {
    const subject =  new Subject();
    const series$ = subject.asObservable();
    series$.subscribe(sub => console.log('early sub: ' + sub))

    subject.next(1);
    subject.next(2);
    subject.next(3);
    //subject.complete();

    setTimeout(()=>{
      series$.subscribe(sub => console.log('late sub: ' + sub))

    },2000)
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

  getError() {
    return this.http.get<any>(this.errorApi);
  }

}
