import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IIndustrial } from "./state/industrial.state";


@Injectable()
export class IndustrialService {
    industrialUrl = 'http://localhost:3000/industrial'
    constructor(private http: HttpClient){}

    getIndustrial(): Observable<IIndustrial[]> {
        return this.http.get<IIndustrial[]>(this.industrialUrl);
      }
}