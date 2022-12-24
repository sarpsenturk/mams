import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientComponent} from './patient.component';
import {SearchComponent} from "./search/search.component";
import {CreateComponent} from "./create/create.component";

const routes: Routes = [
  {
    path: '',
    component: PatientComponent,
    children: [
      {
        path: 'search',
        component: SearchComponent,
        title: 'Patient Search'
      },
      {
        path: 'create',
        component: CreateComponent,
        title: 'Patient Create'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'search'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {
}
