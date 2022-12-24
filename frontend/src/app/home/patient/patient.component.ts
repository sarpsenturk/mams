import {Component} from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  activeLink: string = ''
  links = ['search', 'create']

  constructor() {
  }
}
