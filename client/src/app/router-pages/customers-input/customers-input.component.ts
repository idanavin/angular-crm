import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';
import { CustomersFormService } from 'src/app/services/customers-form.service';
import { CustomersService } from 'src/app/services/customers.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
@Component({
  selector: 'app-customers-input',
  templateUrl: './customers-input.component.html',
  styleUrls: ['./customers-input.component.scss'],
})
export class CustomersInputComponent implements OnInit {
  customers?: RandomUser[];
  currentEditingIndex: number = 0;
  form: FormGroup;

  constructor(
    private customersService: CustomersService,
    private customersFormService: CustomersFormService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.form = this.customersFormService.getCustomersForm();
  }

  ngOnInit(): void {
    this.customers = this.customersService.customersToEdit();
    this.setCustomerInForm();
  }

  ngOnDestroy(): void {
    this.customers = [];
  }

  getFormGroup(groupName: any): FormGroup {
    return this.form.get(groupName) as FormGroup;
  }

  getSubFormGroup(groupName: string, subGroupName: string): FormGroup {
    return this.form.get(groupName)?.get(subGroupName) as FormGroup;
  }

  setCustomerInForm(): void {
    if (this.customers) {
      const curCustomer = this.customers[this.currentEditingIndex];
      this.form.patchValue({ ...curCustomer });
    }
  }

  setEditingCostumer(index: number): void {
    this.saveCurrent();
    this.currentEditingIndex = index;
    this.setCustomerInForm();
  }

  saveCurrent(): void {
    this.setAgeForBirthday();
    if (this.customers)
      this.customers[this.currentEditingIndex] = this.form.value;
  }

  setAgeForBirthday() {
    const date = new Date();
    const customerDOBYear: number = this.customersFormService.getMoment(
      this.form.value.dob.date
    );
    const age = date.getFullYear() - customerDOBYear;
    this.form.get('dob')?.patchValue({
      age: age,
    });
  }

  submitEditUsers(): void {
    this.customersService.findAndReplaceEdited(this.customers!);
    this.router.navigateByUrl('/customers');
  }

  openEditDialog(): void {
    this.saveCurrent();
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { header: 'DIALOG_HEAD_EDIT', content: 'DIALOG_CONTENT_EDIT' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.submitEditUsers();
    });
  }

  openAddNewDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { header: 'DIALOG_HEAD_NEW', content: 'DIALOG_CONTENT_NEW' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.submitNewUser();
    });
  }

  submitNewUser() {
    const customer = this.form.value;
    this.setAgeForBirthday();
    this.form.get('location')?.get('street')?.patchValue({
      name: customer.location.street,
      number: '1',
    });
    this.form.get('id')?.patchValue({
      number: Math.floor(Math.random() * 1000),
    });
    this.customersService.addNewCustomers(this.form.value);
    this.router.navigateByUrl('/customers');
  }

  navigateToCustomers(): void {
    this.router.navigateByUrl('/customers');
  }
}
