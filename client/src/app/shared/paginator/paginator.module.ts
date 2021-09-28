import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LanguageModule } from 'src/app/language/language.module';



@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    LanguageModule
  ],
  exports: [
    PaginatorComponent
  ]
})
export class PaginatorModule { }
