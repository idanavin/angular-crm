import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';
import { CostumerFormService } from 'src/app/services/costumer-form.service';
import { CostumersService } from 'src/app/services/costumers.service';

@Component({
  selector: 'app-costumers-edit',
  templateUrl: './costumers-edit.component.html',
  styleUrls: ['./costumers-edit.component.scss']
})
export class CostumersEditComponent implements OnInit {

  costumers?: RandomUser[]
  currentEditingIndex: number = 0;
  form: FormGroup;

  constructor(private costumersService: CostumersService, private costumerFormService: CostumerFormService) { 
    this.form = costumerFormService.getCostumerForm()
  }

  ngOnInit(): void {
    this.costumers = this.costumersService.CostumersToEdit;
    this.setCostumerInForm()
    console.log(this.costumers[0].location.street);
    
  }

  ngOnDestroy(): void {
    this.costumers = [];
  }

  getFormGroup(groupName: any) {
    return this.form.get(groupName) as FormGroup;
  }

  getSubFormGroup(groupName: string, subGroupName: string) {
    return this.form.get(groupName)?.get(subGroupName) as FormGroup;
  }

  setCostumerInForm() {
    if (this.costumers) {
      const curCostumer = this.costumers[this.currentEditingIndex]
      this.form.patchValue({...curCostumer})
    }
  }

  setEditingCostumer(index: number) {
    this.currentEditingIndex = index;
    this.setCostumerInForm();
  }

}
