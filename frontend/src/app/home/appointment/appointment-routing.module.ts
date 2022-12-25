import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppointmentComponent} from './appointment.component';
import {CreateComponent} from "./create/create.component";
import {SearchComponent} from "./search/search.component";

const routes: Routes = [
  {
    path: '',
    component: AppointmentComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'search'
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule {
}
