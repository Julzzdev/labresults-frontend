import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// routes
import {LoginComponent} from './views/login/login.component'
import {TemplatesComponent} from './views/templates/templates.component'
import {TestsComponent} from './views/tests/tests.component'

const routes: Routes = [
  {component:LoginComponent, path:''},
  {component:TemplatesComponent, path:'templates'},
  {component:TestsComponent, path:'tests'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
