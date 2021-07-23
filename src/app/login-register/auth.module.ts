import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegisterComponent } from './login-register.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material-module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginRegisterComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [LoginRegisterComponent, LoginComponent, RegisterComponent]
})
export class AuthModule { }
