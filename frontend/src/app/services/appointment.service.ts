import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";

import {AuthService} from "./auth.service";
import {IAPIResult} from "../interfaces/api";
import {Appointment} from "../interfaces/appointment";
import {environment} from "../environments/environment";
import {formatDate} from "../utils/format-date";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private http: HttpClient, private auth: AuthService) {
  }

  public search(query: any) {
    const params = new HttpParams()
      .appendAll(query.patient)
      .appendAll(query.doctor)
      .append('date', query.date ? formatDate(query.date) : '')
    console.log(query)
    return this.http.get<IAPIResult<Appointment[]>>(
      `${environment.apiUrl}/appointment/search`,
      {headers: {'Authorization': `Bearer ${this.auth.authToken}`}, params}
    ).pipe(map(response => response.result))
  }
}
