import {Component} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public user = {
    staff_id: 7,
    first_name: 'Banu',
    last_name: 'Arslan',
    email: 'dr.banuarslann@gmail.com'
  }

  public isEditing = false
  public hasChanged = false

  onChange() {
    this.hasChanged = true
  }

  toggleEditing() {
    this.isEditing = !this.isEditing
  }
}
