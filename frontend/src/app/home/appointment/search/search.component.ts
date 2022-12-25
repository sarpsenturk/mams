import {Component} from '@angular/core';
import {Appointment} from "../../../interfaces/appointment";
import {AppointmentService} from "../../../services/appointment.service";
import {FormBuilder} from "@angular/forms";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public results: Appointment[] = []

  constructor(private appointment: AppointmentService,
              private notification: NotificationService,
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

  onSubmit() {
    this.appointment.search(this.searchForm.value).subscribe({
      next: appointments => {
        this.results = appointments
        if (appointments.length === 0) {
          this.notification.notify('No appointments matching search was found')
        }
      }
    })
  }

  delete(appointment: Appointment) {
    const appointmentId = appointment.appointment_id
    this.appointment.delete(appointmentId).subscribe(() => {
      this.notification.notify(`Deleted appointment with ID ${appointmentId}`)
      this.onSubmit()
    })
  }

  public readonly displayColumns = [
    'appointment_id',
    'patient',
    'doctor',
    'room_number',
    'date_time',
    'actions'
  ]
}
