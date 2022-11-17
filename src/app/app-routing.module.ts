import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// routes
import { LoginComponent } from './views/login/login.component'
import { TemplatesComponent } from './views/templates/templates.component'
import { TestsComponent } from './views/tests/tests.component'
import { ResultsComponent } from './views/results/results.component'
import { ReportsComponent } from './views/reports/reports.component'
import { UsersComponent } from './views/users/users.component'
import { ContactsComponent } from './views/contacts/contacts.component';

const routes: Routes = [
  { component: LoginComponent, path: '' },
  { component: TemplatesComponent, path: 'templates' },
  { component: TestsComponent, path: 'pending' },
  { component: ContactsComponent, path: 'contacts' },
  { component: ResultsComponent, path: 'results/:id/:userId' },
  { component: ReportsComponent, path: 'reports/:userId/:isFlat/:doctor' },
  { component: UsersComponent, path: 'users' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
