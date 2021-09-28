import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMenuItemComponent } from './custom-menu-item.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    CustomMenuItemComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule
  ],
  exports: [CustomMenuItemComponent]
})
export class CustomMenuItemModule { }
