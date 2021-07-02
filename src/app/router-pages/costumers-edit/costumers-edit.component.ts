import { Component, OnInit } from '@angular/core';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';
import { CostumersService } from 'src/app/services/costumers.service';

@Component({
  selector: 'app-costumers-edit',
  templateUrl: './costumers-edit.component.html',
  styleUrls: ['./costumers-edit.component.scss']
})
export class CostumersEditComponent implements OnInit {

  costumers?: RandomUser[]

  constructor(private costumersService: CostumersService) { }

  ngOnInit(): void {
    this.costumers = this.costumersService.CostumersToEdit
  }

}
