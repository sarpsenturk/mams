import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../environments/environment";
import {IAPIResult} from "../interfaces/api";
import {Staff} from "../interfaces/staff";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  constructor(private http: HttpClient, private auth: AuthService) {
  }

  public search(query: any) {
    const params = new HttpParams().appendAll(query)
    return this.http.get<IAPIResult<Staff[]>>(
      `${environment.apiUrl}/staff/search`,
      {headers: {'Authorization': `Bearer ${this.auth.authToken}`}, params}
    ).pipe(map(response => response.result))
  }

  public delete(staffId: number) {
    return this.http.delete(
      `${environment.apiUrl}/staff/${staffId}`,
      {headers: {'Authorization': `Bearer ${this.auth.authToken}`}}
    )
  }
}
