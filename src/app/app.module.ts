import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
//views
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
import { MasterService } from './services/master.service'
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    NgxQRCodeModule,
    MatSlideToggleModule
  ],
  providers: [MasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
