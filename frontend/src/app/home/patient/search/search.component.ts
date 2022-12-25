import {Component} from '@angular/core';
import {Patient} from "../../../interfaces/patient";
import {PatientService} from "../../../services/patient.service";
import {FormBuilder} from "@angular/forms";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private patient: PatientService,
              private notification: NotificationService,
              private fb: FormBuilder) {
  }

  searchForm = this.fb.group({
    first_name: '',
    last_name: '',
    contact_phone: '',
    contact_email: ''
  })

  public results: Patient[] = []
  public displayColumns = [
    'patient_id',
    'first_name',
    'last_name',
    'contact_phone',
    'contact_email',
    'birthdate',
    'actions'
  ]

  get firstName() {
    return this.searchForm.get('firstName')
  }

  public onSubmit() {
    this.patient.search(this.searchForm.value)
      .subscribe({
        next: patients => {
          this.results = patients
          if (patients.length === 0)
            this.notification.notify("No patients matching search was found")
        },
        error: err => console.error(err)
      })
  }

  public delete(patient: Patient) {
    const patientId = patient.patient_id
    this.patient.delete(patientId).subscribe({
      next: () => {
        this.notification.notify(`Deleted patient with ID ${patientId}`)
        this.onSubmit()
      }
    })
  }
}
