import {Component} from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  public activeLink = ''
  public links = [
    'create',
    'search'
  ]
}
