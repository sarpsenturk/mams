import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: User | null = null
  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    this.auth.user.subscribe(user => this.user = user)
  }
}
