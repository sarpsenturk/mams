import {Component} from '@angular/core';
import {StaffService} from "../../../services/staff.service";
import {NotificationService} from "../../../services/notification.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {formatDate} from "../../../utils/format-date";
import {Observable, of, startWith} from "rxjs";
import {Manager} from "../../../interfaces/manager";
import {ManagerService} from "../../../services/manager.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  constructor(private staff: StaffService,
              private manager: ManagerService,
              private notification: NotificationService,
              private fb: FormBuilder) {
  }

  staffType = ['doctor', 'manager']

  createForm = this.fb.group({
    first_name: ['', [Validators.required, Validators.maxLength(50)]],
    last_name: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(250)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    is_admin: false,
    staff_type: ['', Validators.required],
    doctor: this.fb.group({
      room_number: 0,
      employment_start: '',
      manager: new FormControl<string | Manager>('')
    }),
    manager: this.fb.group({
      meeting_hours_begin: '',
      meeting_hours_end: ''
    })
  })

  filteredManagers: Observable<Manager[]> = of([])

  get selectedStaffType() {
    return this.createForm.get('staff_type')?.value
  }

  ngOnInit() {
    this.filteredManagers = this.createForm.get('doctor')!.get('manager')!.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        const name = typeof value === 'string' ? value : ''
        return this.manager.fromName(name)
      })
    )
    this.createForm.get('staff_type')?.valueChanges.subscribe({
      next: value => {
        if (!value)
          return
        const doctorGroup = this.createForm.get('doctor')!
        const roomNumber = doctorGroup.get('room_number')!
        const employmentStart = doctorGroup.get('employment_start')!
        const manager = doctorGroup.get('manager')!

        const managerGroup = this.createForm.get('manager')!
        const meetingHoursBeg = managerGroup.get('meeting_hours_begin')!
        const meetingHoursEnd = managerGroup.get('meeting_hours_end')!
        if (value === 'doctor') {
          meetingHoursBeg.clearValidators()
          meetingHoursEnd.clearValidators()
          roomNumber.setValidators([Validators.required, Validators.min(1000)])
          employmentStart.setValidators([Validators.required])
          manager.setValidators(Validators.required)
        } else if (value === 'manager') {
          roomNumber.clearValidators()
          employmentStart.clearValidators()
          manager.clearValidators()
          meetingHoursBeg.setValidators(Validators.required)
          meetingHoursEnd.setValidators(Validators.required)
        }
        roomNumber.updateValueAndValidity()
        employmentStart.updateValueAndValidity()
        manager.updateValueAndValidity()
        meetingHoursBeg.updateValueAndValidity()
        meetingHoursEnd.updateValueAndValidity()
      }
    })

  }

  renderManager(manager: Manager) {
    return manager && manager.first_name
      ? `${manager.first_name} ${manager.last_name}`
      : ''
  }

  onSubmit() {
    let values: any = {...this.createForm.value}
    if (values.staff_type === 'doctor') {
      values['room_number'] = values.doctor.room_number
      values['employment_start'] = formatDate(values.doctor.employment_start)
      values['manager_id'] = values.doctor.manager.manager_id
    } else if (values.staff_type === 'manager') {
      const beginTime = values.manager.meeting_hours_begin
      const endTime = values.manager.meeting_hours_end
      values['meeting_hours_begin'] = `${beginTime}:00`
      values['meeting_hours_end'] = `${endTime}:00`
    }
    delete values['doctor']
    delete values['manager']
    const staffType = values['staff_type']
    this.staff.create(values, staffType).subscribe({
      next: result => {
        this.notification.notify(`Created ${staffType} with ID ${result.staffId}`)
      },
      error: httpError => {
        const {error} = httpError
        if (error['msg'])
          this.notification.notify(`Error: ${error['msg']}`)
        console.error(httpError)
      }
    })
  }
}
