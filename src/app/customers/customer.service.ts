import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { Customer, CustomerResponse } from './customer.model';
import { pageSize } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customersUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  getCustomers(payload: {
    search: string;
    index: number;
  }): Observable<CustomerResponse> {
    return this.http
      .get<CustomerResponse>(this.customersUrl, {
        params: { q: payload.search, _page: payload.index, _limit: pageSize },
        observe: 'response',
      })
      .pipe(
        map((resp: HttpResponse<CustomerResponse>): CustomerResponse => {
          const customers = resp.body;
          const newCustomers: any = [];
          return {
            data: newCustomers.concat(customers),
            total: Number(resp.headers.get('X-Total-Count')),
          };
        })
      );
  }

  getCustomerById(payload: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.customersUrl}/${payload}`);
  }

  createCustomer(payload: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, payload);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(
      `${this.customersUrl}/${customer.id}`,
      customer
    );
  }

  deleteCustomer(payload: number) {
    return this.http.delete(`${this.customersUrl}/${payload}`);
  }
}
