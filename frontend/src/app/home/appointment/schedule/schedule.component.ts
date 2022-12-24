import {Component} from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
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
  public selectedDate = new Date()
}
