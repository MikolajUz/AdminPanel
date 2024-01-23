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

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'sites', component: SitesComponent },
  { path: 'sessions', component: SessionsComponent },
  { path: 'subpages', component: SubpagesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'signIn', component: SignInComponent },
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
