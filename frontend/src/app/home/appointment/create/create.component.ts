import {Component} from '@angular/core';
import {PatientService} from "../../../services/patient.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Observable, of, startWith} from "rxjs";
import {Patient} from "../../../interfaces/patient";
import {switchMap} from "rxjs/operators";
import {Doctor} from "../../../interfaces/doctor";
import {DoctorService} from "../../../services/doctor.service";
import {formatDatetime} from "../../../utils/format-datetime";
import {AppointmentService} from "../../../services/appointment.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  constructor(private patient: PatientService,
              private doctor: DoctorService,
              private appointment: AppointmentService,
              private notification: NotificationService,
              private fb: FormBuilder) {
  }

  createForm = this.fb.group({
    patient: new FormControl<string | Patient>('', Validators.required),
    doctor: new FormControl<string | Doctor>('', Validators.required),
    date: new FormControl<Date>(new Date()),
    time: ['', [Validators.required, Validators.pattern(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)]]
  })

  filteredPatients: Observable<Patient[]> = of([])
  filteredDoctors: Observable<Doctor[]> = of([])

  ngOnInit() {
    this.filteredPatients = this.createForm.get('patient')!.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        const name = typeof value === 'string' ? value : ''
        return this.patient.fromName(name)
      })
    )
    this.filteredDoctors = this.createForm.get('doctor')!.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        const name = typeof value === 'string' ? value : ''
        return this.doctor.fromName(name)
      })
    )
  }

  renderPatient(patient: Patient) {
    return patient && patient.first_name ?
      `${patient.first_name} ${patient.last_name}` :
      ''
  }

  renderDoctor(doctor: Doctor) {
    return doctor && doctor.first_name ?
      `${doctor.first_name} ${doctor.last_name}` :
      ''
  }

  onSubmit() {
    const values = this.createForm.value
    const patientId = typeof values.patient === 'string' ? -1 : values.patient!.patient_id
    const doctorId = typeof values.doctor === 'string' ? -1 : values.doctor!.doctor_id
    const time = values.time!.split(':')
    let date = values.date!
    date.setHours(Number(time[0]))
    date.setMinutes(Number(time[1]))
    date.setSeconds(Number(time[2]))
    const dateTime = formatDatetime(date)
    this.appointment.create(patientId, doctorId, dateTime).subscribe({
      next: value => {
        this.notification.notify(`Created appointment with ID ${value.appointmentId}`)
      },
      error: httpError => {
        const {error} = httpError
        if (error['msg'])
          this.notification.notify(`Error: ${error['msg']}`)
      }
    })
  }
}
