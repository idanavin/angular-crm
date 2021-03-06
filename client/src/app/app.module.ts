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
import { OrdersComponent } from './router-pages/orders/orders.component';
import { OrdersListComponent } from './router-pages/orders/orders-list/orders-list.component';
import { DashboardCardComponent } from './router-pages/dashboard/dashboard-card/dashboard-card.component';
import { CustomersSortComponent } from './router-pages/customers/customers-sort/customers-sort.component';
import { CustomersFiltersComponent } from './router-pages/customers/customers-filters/customers-filters.component';
import { CustomersFilterComponent } from './router-pages/customers/customers-filters/customers-filter/customers-filter.component';
import { CustomersFilterSlideComponent } from './router-pages/customers/customers-filters/customers-filter-slide/customers-filter-slide.component';
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
    OrdersComponent,
    OrdersListComponent,
    DashboardCardComponent,
    CustomersSortComponent,
    CustomersFiltersComponent,
    CustomersFilterComponent,
    CustomersFilterSlideComponent,
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
