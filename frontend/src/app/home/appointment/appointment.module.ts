import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppointmentRoutingModule} from './appointment-routing.module';
import {AppointmentComponent} from './appointment.component';
import {CreateComponent} from './create/create.component';
import {MatTabsModule} from "@angular/material/tabs";
import {SearchComponent} from './search/search.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    AppointmentComponent,
    CreateComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
  ]
})
export class AppointmentModule {
}
