import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, map } from 'rxjs';
import { pageSize } from '../shared/constants';
import { Roles } from './model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private rolesUrl = 'http://localhost:3000/roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.rolesUrl);
  }
}
