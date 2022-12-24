import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public results = [
    {
      appointment_id: 1,
      doctor_first_name: 'Ayca',
      doctor_last_name: 'Cakmak',
      room_number: 1005,
      date_time: '2022-12-24 12:30:00'
    }
  ]
  public displayColumns = [
    'appointment_id',
    'doctor',
    'room_number',
    'date_time',
    'actions'
  ]
}
