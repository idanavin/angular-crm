import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';
import { CostumerFormService } from 'src/app/services/customers-form.service';
import { CustomersService } from 'src/app/services/customers.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-customers-edit',
  templateUrl: './customers-edit.component.html',
  styleUrls: ['./customers-edit.component.scss'],
})
export class CustomersEditComponent implements OnInit, OnDestroy {
  customers?: RandomUser[];
  currentEditingIndex: number = 0;
  form: FormGroup;

  constructor(
    private customersService: CustomersService,
    private costumerFormService: CostumerFormService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.form = this.costumerFormService.getCostumerForm();
  }

  ngOnInit(): void {
    this.customers = this.customersService.customersToEdit();
    this.setCostumerInForm();
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

  setCostumerInForm(): void {
    if (this.customers) {
      const curCostumer = this.customers[this.currentEditingIndex];
      this.form.patchValue({ ...curCostumer });
    }
  }

  setEditingCostumer(index: number): void {
    this.saveCurrent();
    this.currentEditingIndex = index;
    this.setCostumerInForm();
  }

  saveCurrent(): void {
    this.setAgeForBirthday()
    if (this.customers) this.customers[this.currentEditingIndex] = this.form.value
  }

  setAgeForBirthday() {
    const date = new Date();
    const costumerDOBYear: number = this.costumerFormService.getMoment(this.form.value.dob.date)
    const age = date.getFullYear() - costumerDOBYear;
    this.form.get('dob')?.patchValue({
      age: age
    })
  }

  submitEditUsers(): void {
    this.customersService.findAndReplaceEdited(this.customers!)
    this.router.navigateByUrl('/customers');
  }

  openDialog(): void {
    this.saveCurrent();
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { header: 'Edit Users', content: 'Are you sure you want to edit all?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.submitEditUsers();
    });
  }
}
