import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMenuItemComponent } from './custom-menu-item.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    CustomMenuItemComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [CustomMenuItemComponent]
})
export class CustomMenuItemModule { }
