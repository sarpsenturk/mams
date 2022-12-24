import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public results = [
    {
      patient_id: 1,
      first_name: "Sarp",
      last_name: "Senturk",
      contact_phone: "5345234766",
      contact_email: "sarpsenturk38@gmail.com",
      birthdate: "2001-12-11"
    },
    {
      patient_id: 2,
      first_name: "Alp",
      last_name: "Senturk",
      contact_phone: "5325980033",
      contact_email: "tolga@drtolgasenturk.com",
      birthdate: "2014-04-01"
    }
  ]
  public displayColumns = [
    'patient_id',
    'first_name',
    'last_name',
    'contact_phone',
    'contact_email',
    'birthdate',
    'actions'
  ]
}
