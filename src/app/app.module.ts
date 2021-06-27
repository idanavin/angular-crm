import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CostumersComponent } from './costumers/costumers.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ChartComponent } from './shared/chart/chart.component';
import { CustomAltComponent } from './shared/custom-alt/custom-alt.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'costumers', component: CostumersComponent },
  { path: '**', component: NotFoundComponent },  // Wildcard route for a 404 page
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
    LoginRegisterComponent
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
    MatPaginatorModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
