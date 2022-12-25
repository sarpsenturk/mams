import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from 'rxjs/operators'

import {environment} from "../environments/environment";
import {AuthService} from "./auth.service";
import {IAPIResult} from "../interfaces/api";
import {Patient} from "../interfaces/patient";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient, private auth: AuthService) {
  }

  public create(first_name: string,
                last_name: string,
                contact_phone: string,
                contact_email: string,
                birthdate: string) {
    return this.http.post<IAPIResult<{ patientId: number }>>(
      `${environment.apiUrl}/patient/create`,
      {first_name, last_name, contact_phone, contact_email, birthdate},
      {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${this.auth.authToken}`}}
    ).pipe(map(response => response.result))
  }

  public search(first_name: string,
                last_name: string,
                contact_phone: string,
                contact_email: string) {
    let params = new HttpParams().appendAll({
      'first_name': first_name,
      'last_name': last_name,
      'contact_phone': contact_phone,
      'contact_email': contact_email
    })
    return this.http.get<IAPIResult<Patient[]>>(`${environment.apiUrl}/patient/search`,
      {
        headers: {'Authorization': `Bearer ${this.auth.authToken}`},
        params
      }
    ).pipe(map(response => response.result))
  }
}
