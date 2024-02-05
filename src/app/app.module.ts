import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/components/containers/main/main.component';
import { SideNavComponent } from './main/components/features/side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './main/components/features/table/table.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './main/components/features/users/users.component';
import { SitesComponent } from './main/components/features/sites/sites.component';
import { SessionsComponent } from './main/components/features/sessions/sessions.component';
import { SubpagesComponent } from './main/components/features/subpages/subpages.component';
import { EventsComponent } from './main/components/features/events/events.component';
import { AccountComponent } from './main/components/features/account/account-settings/account.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './main/components/features/account/login/login.component';
import { ForgotPasswordComponent } from './main/components/features/account/forgot-password/forgot-password.component';
import { CreateAccountComponent } from './main/components/features/account/create-account/create-account.component';
import { MatSortModule } from '@angular/material/sort';
import { HeaderComponent } from './main/components/features/header/header.component';
import { DashboardComponent } from './main/components/features/dashboard/dashboard.component';
import { PersonalInfoComponent } from './main/components/features/account/account-settings/personal-info/personal-info.component';
import { NewPasswordComponent } from './main/components/features/account/account-settings/new-password/new-password.component';
import { GuestsComponent } from './main/components/features/guests/guests.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'sites', component: SitesComponent },
      { path: 'sessions', component: SessionsComponent },
      { path: 'subpages', component: SubpagesComponent },
      { path: 'events', component: EventsComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'guests', component: GuestsComponent },
      { path: 'account', component: AccountComponent },
    ],
  },

  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SideNavComponent,
    TableComponent,
    UsersComponent,
    SitesComponent,
    SessionsComponent,
    SubpagesComponent,
    EventsComponent,
    AccountComponent,
    LoginComponent,
    ForgotPasswordComponent,
    CreateAccountComponent,
    HeaderComponent,
    DashboardComponent,
    PersonalInfoComponent,
    NewPasswordComponent,
    GuestsComponent
  ],
  imports: [
    BrowserModule,

    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  exports: [RouterModule],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
