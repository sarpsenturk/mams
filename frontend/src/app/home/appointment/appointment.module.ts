import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppointmentRoutingModule} from './appointment-routing.module';
import {AppointmentComponent} from './appointment.component';
import {CreateComponent} from './create/create.component';
import {MatTabsModule} from "@angular/material/tabs";
import {SearchComponent} from './search/search.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";


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
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class AppointmentModule {
}
