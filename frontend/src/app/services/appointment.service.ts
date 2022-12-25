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
    return this.http.get<IAPIResult<Appointment[]>>(
      `${environment.apiUrl}/appointment/search`,
      {headers: {'Authorization': `Bearer ${this.auth.authToken}`}, params}
    ).pipe(map(response => response.result))
  }

  public create(patient_id: number, doctor_id: number, date_time: string) {
    return this.http.post<IAPIResult<{ appointmentId: number }>>(
      `${environment.apiUrl}/appointment/create`,
      {patient_id, doctor_id, date_time},
      {headers: {'Authorization': `Bearer ${this.auth.authToken}`}}
    ).pipe(
      map(response => response.result)
    )
  }

  public delete(appointmentId: number) {
    return this.http.delete(
      `${environment.apiUrl}/appointment/${appointmentId}`,
      {headers: {'Authorization': `Bearer ${this.auth.authToken}`}})
  }
}
