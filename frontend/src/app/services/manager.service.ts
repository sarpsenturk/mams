import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {IAPIResult} from "../interfaces/api";
import {Manager} from "../interfaces/manager";
import {environment} from "../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(private http: HttpClient, private auth: AuthService) {
  }

  public fromName(fullName: string) {
    const params = new HttpParams().set('name', fullName)
    return this.http.get<IAPIResult<Manager[]>>(
      `${environment.apiUrl}/staff/manager/from_name`,
      {headers: {'Authorization': `Bearer ${this.auth.authToken}`}, params}
    ).pipe(map(response => response.result))
  }
}
