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
import { Router } from '@angular/router';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';
import { CostumerFormService } from 'src/app/services/customers-form.service';
import { CustomersService } from 'src/app/services/customers.service';
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
    private customersService: CustomersService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.form = this.costumerFormService.getCostumerForm();
  }

  getFormGroup(groupName: string) {
    return this.form.get(groupName) as FormGroup;
  }
  getSubFormGroup(groupName: string, subGroupName: string) {
    return this.form.get(groupName)?.get(subGroupName) as FormGroup;
  }
  submitNewUser() {
    const costumer = this.form.value;
    const date = new Date();
    this.form.get('dob')?.patchValue({
      date: costumer.dob.date.toISOString(),
      age: date.getFullYear() - costumer.dob.date.get('year'),
    });
    this.form.get('location')?.get('street')?.patchValue({
      name: costumer.location.street,
      number: '1'
    });
    this.form.get('id')?.patchValue({
      number: Math.floor((Math.random() * 1000))
    });
    this.customersService.addNewCostumer(this.form.value);
    this.router.navigateByUrl('/customers');
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
