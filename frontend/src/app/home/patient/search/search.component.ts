import {Component} from '@angular/core';
import {Patient} from "../../../interfaces/patient";
import {PatientService} from "../../../services/patient.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private patient: PatientService,
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
    const values = this.searchForm.value
    this.patient.search(values.first_name!,
      values.last_name!, values.contact_phone!, values.contact_email!)
      .subscribe({
        next: patients => this.results = patients,
        error: err => console.error(err)
      })
  }
}
