import {Component} from '@angular/core';
import {Appointment} from "../../../interfaces/appointment";
import {AppointmentService} from "../../../services/appointment.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public results: Appointment[] = []

  constructor(private appointment: AppointmentService,
              private fb: FormBuilder) {
  }

  searchForm = this.fb.group({
    patient: this.fb.group({
      first_name: '',
      last_name: ''
    }),
    doctor: this.fb.group(
      {
        first_name: '',
        last_name: ''
      }
    ),
    date: ''
  })

  onSubmit(){
    this.appointment.search(this.searchForm.value).subscribe({
      next: appointments => this.results = appointments
    })
  }

  public readonly displayColumns = [
    'appointment_id',
    'doctor',
    'room_number',
    'date_time',
    'actions'
  ]
}
