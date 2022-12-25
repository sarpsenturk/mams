import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ReplaySubject} from "rxjs";
import {map} from "rxjs/operators"
import {User} from "../interfaces/user";
import {IAPIResult} from "../interfaces/api";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static readonly TOKEN_STORAGE_NAME = 'token'
  private token: string | null;
  private userSubject = new ReplaySubject<User | null>()

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem(AuthService.TOKEN_STORAGE_NAME)
    this.getUserWithToken()
  }

  public get user() {
    return this.userSubject.asObservable()
  }

  public get isAuthenticated(): boolean {
    return this.token !== null
  }

  public login(email: string, password: string) {
    return this.http.post<IAPIResult<{ token: string }>>(
      `${environment.apiUrl}/auth/login`,
      {email, password},
      {headers: {'Content-Type': 'application/json'}}
    ).pipe(
      map(response => {
        const {token} = response.result
        this.token = token
        localStorage.setItem(AuthService.TOKEN_STORAGE_NAME, token)
        this.getUserWithToken()
        return token
      })
    )
  }

  public logout() {
    this.token = null
    localStorage.removeItem(AuthService.TOKEN_STORAGE_NAME)
    this.userSubject.next(null)
    this.router.navigate(['/auth'])
  }

  private getUserWithToken() {
    if (!this.token) {
      this.userSubject.next(null)
      return
    }

    this.http.get<IAPIResult<User>>(
      `${environment.apiUrl}/auth/self`,
      {headers: {'Authorization': `Bearer ${this.token}`}})
      .subscribe({
        next: response => {
          const user = response.result
          this.userSubject.next(user)
        },
        error: err => {
          console.error(err)
          this.userSubject.next(null)
        }
      })
  }
}
