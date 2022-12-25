import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import {CreateComponent} from "./create/create.component";
import {SearchComponent} from "./search/search.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'create-staff',
        component: CreateComponent
      },
      {
        path: 'search-staff',
        component: SearchComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'search-staff'
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
