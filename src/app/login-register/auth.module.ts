import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegisterComponent } from './login-register.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageModule } from '../language/language.module';
import { InputModule } from '../shared/form/input/input.module';
import { FormErrorsModule } from '../shared/form/form-errors/form-errors.module';



@NgModule({
  declarations: [LoginRegisterComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    LanguageModule,
    InputModule,
    FormErrorsModule
  ],
  exports: [LoginRegisterComponent, LoginComponent, RegisterComponent]
})
export class AuthModule { }
