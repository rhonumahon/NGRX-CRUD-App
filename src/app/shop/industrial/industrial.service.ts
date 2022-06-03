import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IIndustrial } from "./industrial.model";


@Injectable()
export class IndustrialService {
    industrialUrl = 'http://localhost:3000/industrial'
    constructor(private http: HttpClient){}

    getIndustrial(): Observable<IIndustrial[]> {
        return this.http.get<IIndustrial[]>(this.industrialUrl);
    }

    createIndustrial(payload: any): Observable<IIndustrial> {
        return this.http.post<IIndustrial>(this.industrialUrl, payload);
    }

    updateIndustrial(payload: any): Observable<IIndustrial> {
        return this.http.patch<IIndustrial>(`${this.industrialUrl}/${payload.id}`, payload);
    }
}