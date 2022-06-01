import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IPersonal } from "./personal.model";

@Injectable()
export class PersonalService {
private personalUrl = 'http://localhost:3000/personal'

constructor(private http: HttpClient){
} 

getPersonal(): Observable<IPersonal[]> {
    return this.http.get<IPersonal[]>(this.personalUrl);
  }
}