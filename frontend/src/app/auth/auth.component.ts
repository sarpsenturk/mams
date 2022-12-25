import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../services/auth.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private router: Router) {
  }

  loginForm = this.fb.group({
    email: ['', Validators.email],
    password: ''
  })
  loginError: string | null = null

  public get email() {
    return this.loginForm.get('email')
  }

  public get password() {
    return this.loginForm.get('password')
  }

  public get emailError() {
    if (this.email) {
      const email = this.email
      if (email.hasError('email')) {
        return "Invalid email"
      }
    }
    return ""
  }

  onSubmit() {
    const values = this.loginForm.value
    this.auth.login(values.email || "", values.password || "")
      .subscribe({
        next: token => {
          if (token) {
            this.loginError = null
            this.router.navigate(['/home'])
          }
        },
        error: (err) => {
          console.error(err)
          this.loginError = err.error.msg
        }
      })
  }
}
