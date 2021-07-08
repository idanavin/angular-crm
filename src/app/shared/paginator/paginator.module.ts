import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';



@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl, deps: [TranslateService],
      useFactory: (translateService: TranslateService) => new PaginatorComponent(translateService).getPaginatorIntl()
    }
  ],
  exports: [
    PaginatorComponent
  ]
})
export class PaginatorModule { }
