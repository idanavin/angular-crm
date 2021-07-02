import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    MatInputModule
  ],
  exports: [
    InputComponent
  ]
})
export class InputModule { }
