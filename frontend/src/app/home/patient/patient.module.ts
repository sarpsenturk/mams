import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatientRoutingModule} from './patient-routing.module';
import {PatientComponent} from './patient.component';
import {MatTabsModule} from "@angular/material/tabs";
import {SearchComponent} from './search/search.component';
import {CreateComponent} from './create/create.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PatientComponent,
    SearchComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule
  ],
})
export class PatientModule {
}
