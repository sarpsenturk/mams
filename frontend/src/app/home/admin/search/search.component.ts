import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Staff} from "../../../interfaces/staff";
import {StaffService} from "../../../services/staff.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private staff: StaffService,
              private notification: NotificationService,
              private fb: FormBuilder) {
  }

  results: Staff[] = []
  searchForm = this.fb.group({
    first_name: '',
    last_name: '',
    email: '',
    is_admin: 0
  })

  readonly displayColumns = [
    'staff_id',
    'first_name',
    'last_name',
    'email',
    'is_admin',
    'actions'
  ]

  onSubmit() {
    let values = {...this.searchForm.value}
    values.is_admin = values.is_admin ? 1 : 0
    this.staff.search(values).subscribe({
      next: staff => {
        this.results = staff
        if (staff.length === 0)
          this.notification.notify('No staff matching search was found')
      },
      error: httpError => {
        const {error} = httpError
        if (error['msg'])
          this.notification.notify(`Error: ${error['msg']}`)
      }
    })
  }

  delete(staff: Staff) {
    const staffId = staff.staff_id
    this.staff.delete(staffId).subscribe({
      next: () => {
        this.notification.notify(`Deleted staff with ID ${staffId}`)
        this.onSubmit()
      },
      error: httpError => {
        const {error} = httpError
        if (error['msg'])
          this.notification.notify(`Error: ${error['msg']}`)
      }
    })
  }
}
