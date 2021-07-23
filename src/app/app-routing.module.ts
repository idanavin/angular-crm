import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './router-pages/profile/profile.component';
import { DashboardComponent } from './router-pages/dashboard/dashboard.component';
import { ProductsComponent } from './router-pages/products/products.component';
import { CustomersComponent } from './router-pages/customers/customers.component';
import { CustomersInputComponent } from './router-pages/customers-input/customers-input.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrdersComponent } from './router-pages/orders/orders.component';

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
    path: 'products',
    component: ProductsComponent,
    data: { animation: 'products' },
  },
  {
    path: 'orders',
    component: OrdersComponent,
    data: { animation: 'animation' },
  },
  {
    path: 'customers',
    component: CustomersComponent,
    data: { animation: 'customers' },
  },
  {
    path: 'customers/add',
    component: CustomersInputComponent,
    data: { animation: 'newcostumer' },
  },
  {
    path: 'customers/edit',
    component: CustomersInputComponent,
    data: { animation: 'customersedit' },
  },
  { path: '**', component: NotFoundComponent, data: { animation: 'notFound' } }, // Wildcard route for a 404 page
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
