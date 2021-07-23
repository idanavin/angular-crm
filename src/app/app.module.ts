import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './router-pages/dashboard/dashboard.component';
import { CustomersComponent } from './router-pages/customers/customers.component';
import { ProfileComponent } from './router-pages/profile/profile.component';
import { CustomerListComponent } from './router-pages/customers/customer-list/customer-list.component';
import { SharedModule } from './shared/shared.module';
import { LanguageModule } from './language/language.module';
import { HeadCardsComponent } from './router-pages/customers/head-cards/head-cards.component';
import { CustomersInputComponent } from './router-pages/customers-input/customers-input.component';
import { SearchInputComponent } from './router-pages/customers/search-input/search-input.component';
import { LocationComponent } from './router-pages/customers-input/location/location.component';
import { ProductsComponent } from './router-pages/products/products.component';
import { ProductsListComponent } from './router-pages/products/products-list/products-list.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material-module';
import { MainModule } from './main/main.module';
import { AuthModule } from './login-register/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomersComponent,
    ProfileComponent,
    CustomerListComponent,
    HeadCardsComponent,
    CustomersInputComponent,
    SearchInputComponent,
    LocationComponent,
    ProductsComponent,
    ProductsListComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    LanguageModule,
    MaterialModule,
    MainModule,
    AuthModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
