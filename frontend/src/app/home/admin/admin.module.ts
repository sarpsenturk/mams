import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {MatTabsModule} from "@angular/material/tabs";
import { CreateComponent } from './create/create.component';
import { SearchComponent } from './search/search.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    AdminComponent,
    CreateComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class AdminModule { }
