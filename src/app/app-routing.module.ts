import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// routes
import {LoginComponent} from './views/login/login.component'
import {TemplatesComponent} from './views/templates/templates.component'
import {TestsComponent} from './views/tests/tests.component'
import {ResultsComponent} from './views/results/results.component'
import {ReportsComponent} from './views/reports/reports.component'
import {UsersComponent} from './views/users/users.component'

const routes: Routes = [
  {component:LoginComponent, path:''},
  {component:TemplatesComponent, path:'templates'},
  {component:TestsComponent, path:'tests'},
  {component:ResultsComponent,path:'results/:id/:userId'},
  {component:ReportsComponent,path:'reports/:id/:userId'},
  {component:UsersComponent,path:'users'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
