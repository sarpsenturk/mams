import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {IAPIResult} from "../interfaces/api";
import {environment} from "../environments/environment";
import {map} from "rxjs/operators";
import {Doctor} from "../interfaces/doctor";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private http: HttpClient, private auth: AuthService) {
  }

  public fromName(fullName: string) {
    const params = new HttpParams().set('name', fullName)
    return this.http.get<IAPIResult<Doctor[]>>(
      `${environment.apiUrl}/staff/doctor/from_name`,
      {headers: {'Authorization': `Bearer ${this.auth.authToken}`}, params}
    ).pipe(
      map(response => response.result)
    )
  }
}
