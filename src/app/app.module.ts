import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// material
import {MatButtonModule} from '@angular/material/button';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { LoginComponent } from './views/login/login.component';
import { TemplatesComponent } from './views/templates/templates.component';
import { CardTemplateComponent } from './views/templates/components/card-template/card-template.component';
import { TestsComponent } from './views/tests/tests.component';
import { CardTestComponent } from './views/tests/components/card-test/card-test.component';
import { ResultsComponent } from './views/results/results.component';
import { UsersComponent } from './views/users/users.component';
import { CardUserComponent } from './views/users/components/card-user/card-user.component';
import { ReportsComponent } from './views/reports/reports.component';
import { SettingsComponent } from './views/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    LoginComponent,
    TemplatesComponent,
    CardTemplateComponent,
    TestsComponent,
    CardTestComponent,
    ResultsComponent,
    UsersComponent,
    CardUserComponent,
    ReportsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
