import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { LanguageModule } from 'src/app/language/language.module';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let de: DebugElement;
  let dialogRef: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [CommonModule, MatDialogModule, MatButtonModule, LanguageModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    dialogRef = {
      close: () => {},
    };
    component.data = {
      header: '',
      content: '',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeAll(() => {

    component.data = {
      header: 'Dialog title',
      content: 'Dialog content',
    };

    it('should have a title', () => {
      const title = 'Dialog title';
      de = fixture.debugElement.query(By.css('.mat-dialog-title'));
      expect(component.data.header).toBe(title);
      expect(de.nativeElement.textContent).toBe(title);
    });
  
    it('should have a content', () => {
      const content = 'Dialog content';
      de = fixture.debugElement.query(By.css('.mat-dialog-content'));
      expect(component.data.content).toBe(content);
      expect(de.nativeElement.textContent).toBe(content);
    });

  });

  it('should emit a close event when clicking on the close button', () => {
    spyOn(dialogRef, 'close');
    de = fixture.debugElement.query(By.css('.mat-dialog-actions button'));
    de.triggerEventHandler('click', null);
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
