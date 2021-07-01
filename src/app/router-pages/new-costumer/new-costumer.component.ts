import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CostumerFormService } from 'src/app/services/costumer-form.service';

@Component({
  selector: 'app-new-costumer',
  templateUrl: './new-costumer.component.html',
  styleUrls: ['./new-costumer.component.scss']
})
export class NewCostumerComponent implements OnInit {

  date = new FormControl(new Date());
  form: FormGroup;

  constructor(private costumerFormService: CostumerFormService) { 
    this.form = this.costumerFormService.sharedForm();
  }

  ngOnInit(): void {
    
  }

}
