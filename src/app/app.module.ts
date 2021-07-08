import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './router-pages/dashboard/dashboard.component';
import { CustomersComponent } from './router-pages/customers/customers.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { ProfileComponent } from './router-pages/profile/profile.component';
import { LoginComponent } from './login-register/login/login.component';
import { RegisterComponent } from './login-register/register/register.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { CustomerListComponent } from './router-pages/customers/customer-list/customer-list.component';
import { NewCustomersComponent } from './router-pages/customers/new-customers/new-customers.component';
import { CustomersEditComponent } from './router-pages/customers/customers-edit/customers-edit.component';
import { SharedModule } from './shared/shared.module';
import { LanguageModule } from './language/language.module';
import { HeadCardsComponent } from './router-pages/customers/head-cards/head-cards.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, data: { animation: 'home' } },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { animation: 'profile' },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { animation: 'dashboard' },
  },
  {
    path: 'customers',
    component: CustomersComponent,
    data: { animation: 'customers' },
  },
  {
    path: 'customers/add',
    component: NewCustomersComponent,
    data: { animation: 'newcostumer' },
  },
  {
    path: 'customers/edit',
    component: CustomersEditComponent,
    data: { animation: 'customersedit' },
  },
  { path: '**', component: NotFoundComponent, data: { animation: 'notFound' } }, // Wildcard route for a 404 page
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    CustomersComponent,
    NavbarComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    LoginRegisterComponent,
    CustomerListComponent,
    NewCustomersComponent,
    CustomersEditComponent,
    HeadCardsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSortModule,
    MatGridListModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    HttpClientModule,
    SharedModule,
    LanguageModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
