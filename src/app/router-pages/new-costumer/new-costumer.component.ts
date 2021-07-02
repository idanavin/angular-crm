import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterEvent } from '@angular/router';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';
import { CostumerFormService } from 'src/app/services/costumer-form.service';
import { CostumersService } from 'src/app/services/costumers.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-new-costumer',
  templateUrl: './new-costumer.component.html',
  styleUrls: ['./new-costumer.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class NewCostumerComponent {
  form: FormGroup;
  createdClient: RandomUser | undefined;

  constructor(
    private costumerFormService: CostumerFormService,
    private costumersService: CostumersService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.form = this.costumerFormService.getCostumerForm();
  }

  getFormGroup(groupName: any) {
    return this.form.get(groupName) as FormGroup;
  }
  submitNewUser() {
    const costumer = this.form.value;
    const date = new Date();
    this.form.get('dob')?.patchValue({
      date: costumer.dob.date.toISOString(),
      age: date.getFullYear() - costumer.dob.date.get('year'),
    });
    this.costumersService.addNewCostumer(this.form.value);
    this.router.navigateByUrl('/costumers');
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {header: 'Add new costumer', content: 'Are you sure'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.submitNewUser();
    });
  }
}
