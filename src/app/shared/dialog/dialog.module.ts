import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LanguageModule } from 'src/app/language/language.module';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, LanguageModule],
  exports: [DialogComponent],
})
export class DialogModule {}
