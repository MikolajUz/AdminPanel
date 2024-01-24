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
import { TabsComponent } from './main/components/features/tabs/tabs.component';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './main/components/features/table/table.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './main/components/features/users/users.component';
import { SitesComponent } from './main/components/features/sites/sites.component';
import { SessionsComponent } from './main/components/features/sessions/sessions.component';
import { SubpagesComponent } from './main/components/features/subpages/subpages.component';
import { EventsComponent } from './main/components/features/events/events.component';
import { SignInComponent } from './main/components/features/sign-in/sign-in.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './main/components/features/sign-in/login/login.component';
import { ForgotPasswordComponent } from './main/components/features/sign-in/forgot-password/forgot-password.component';
import { CreateAccountComponent } from './main/components/features/sign-in/create-account/create-account.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'sites', component: SitesComponent },
  { path: 'sessions', component: SessionsComponent },
  { path: 'subpages', component: SubpagesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SideNavComponent,
    TabsComponent,
    TableComponent,
    UsersComponent,
    SitesComponent,
    SessionsComponent,
    SubpagesComponent,
    EventsComponent,
    SignInComponent,
    LoginComponent,
    ForgotPasswordComponent,
    CreateAccountComponent,
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
    MatPaginatorModule,
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  exports: [RouterModule],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
