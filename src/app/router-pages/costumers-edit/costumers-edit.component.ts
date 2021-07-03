import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';
import { CostumerFormService } from 'src/app/services/costumer-form.service';
import { CostumersService } from 'src/app/services/costumers.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-costumers-edit',
  templateUrl: './costumers-edit.component.html',
  styleUrls: ['./costumers-edit.component.scss'],
})
export class CostumersEditComponent implements OnInit, OnDestroy {
  costumers?: RandomUser[];
  currentEditingIndex: number = 0;
  form: FormGroup;

  constructor(
    private costumersService: CostumersService,
    private costumerFormService: CostumerFormService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.form = this.costumerFormService.getCostumerForm();
  }

  ngOnInit(): void {
    this.costumers = this.costumersService.costumersToEdit();
    this.setCostumerInForm();
  }

  ngOnDestroy(): void {
    this.costumers = [];
  }

  getFormGroup(groupName: any): FormGroup {
    return this.form.get(groupName) as FormGroup;
  }

  getSubFormGroup(groupName: string, subGroupName: string): FormGroup {
    return this.form.get(groupName)?.get(subGroupName) as FormGroup;
  }

  setCostumerInForm(): void {
    if (this.costumers) {
      const curCostumer = this.costumers[this.currentEditingIndex];
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
    if (this.costumers) this.costumers[this.currentEditingIndex] = this.form.value
  }

  setAgeForBirthday() {
    const date = new Date();
    const currentCostumerDOB: Date = this.form.value.dob.date as Date
    const age = date.getFullYear() - currentCostumerDOB.getFullYear();
    this.form.get('dob')?.patchValue({
      age: age
    })
  }

  submitEditUsers(): void {
    this.costumersService.findAndReplaceEdited(this.costumers!)
    this.router.navigateByUrl('/costumers');
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
