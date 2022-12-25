import {Component} from '@angular/core';
import {PatientService} from "../../../services/patient.service";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  constructor(private patient: PatientService,
              private fb: FormBuilder,
              private notification: NotificationService) {
  }

  patientForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    contact_phone: ['', Validators.required],
    contact_email: ['', [Validators.required, Validators.email]],
    birthdate: ['', Validators.required]
  })

  createError: string | null = null

  public get firstName() {
    return this.patientForm.get('first_name')
  }

  public get lastName() {
    return this.patientForm.get('last_name')
  }

  public get phone() {
    return this.patientForm.get('contact_phone')
  }

  public get email() {
    return this.patientForm.get('contact_email')
  }

  public get birthdate() {
    return this.patientForm.get('birthdate')
  }

  public getError(name: string, control: AbstractControl<string | null, string | null> | null) {
    if (control) {
      if (control.hasError('required')) {
        return `${name} is required`
      }
      if (control.hasError('email')) {
        return `${name} must be a valid email`
      }
    }
    return ""
  }

  onSubmit() {
    const values = this.patientForm.value
    const date = new Date(values.birthdate!)
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    this.patient.create(
      values.first_name!,
      values.last_name!,
      values.contact_phone!,
      values.contact_email!,
      dateString!
    ).subscribe({
      next: created => {
        this.patientForm.reset()
        this.notification.notify(`Created patient with ID ${created.patientId}`)
        this.createError = null
      },
      error: err => {
        console.error(err)
        this.createError = err.error.msg
      }
    })
  }
}
