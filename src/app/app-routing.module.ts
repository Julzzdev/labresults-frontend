import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// routes
import {LoginComponent} from './views/login/login.component'

const routes: Routes = [
  {component:LoginComponent, path:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
