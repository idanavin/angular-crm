import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';
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

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './router-pages/dashboard/dashboard.component';
import { CostumersComponent } from './router-pages/costumers/costumers.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { ProfileComponent } from './router-pages/profile/profile.component';
import { ChartComponent } from './shared/chart/chart.component';
import { CustomAltComponent } from './shared/custom-alt/custom-alt.component';
import { LoginComponent } from './login-register/login/login.component';
import { RegisterComponent } from './login-register/register/register.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { CostumerListComponent } from './router-pages/costumers/costumer-list/costumer-list.component';
import { NewCostumerComponent } from './router-pages/new-costumer/new-costumer.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, data: { animation: 'home' } },
  { path: 'profile', component: ProfileComponent, data: { animation: 'profile' } },
  { path: 'dashboard', component: DashboardComponent, data: { animation: 'dashboard' } },
  { path: 'costumers', component: CostumersComponent, data: { animation: 'costumers' } },
  { path: 'costumers/add', component: NewCostumerComponent, data: { animation: 'newcostumer' } },
  { path: '**', component: NotFoundComponent, data: { animation: 'notFound' } },  // Wildcard route for a 404 page
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    CostumersComponent,
    NavbarComponent,
    ProfileComponent,
    ChartComponent,
    CustomAltComponent,
    LoginComponent,
    RegisterComponent,
    LoginRegisterComponent,
    CostumerListComponent,
    NewCostumerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
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
    HttpClientModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
