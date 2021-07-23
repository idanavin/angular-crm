import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material-module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../login-register/auth.module';

@NgModule({
  declarations: [MainComponent, NavbarComponent],
  imports: [CommonModule, MaterialModule, RouterModule, TranslateModule, AuthModule],
  exports: [MainComponent, NavbarComponent],
})
export class MainModule {}
