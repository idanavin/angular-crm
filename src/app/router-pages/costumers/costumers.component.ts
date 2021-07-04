import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { CostumersService } from '../../services/costumers.service';

@Component({
  selector: 'app-costumers',
  templateUrl: './costumers.component.html',
  styleUrls: ['./costumers.component.scss'],
})
export class CostumersComponent implements OnInit {
  costumers: Promise<RandomUser[]>;
  page: number = 0;
  costumersPerPage: number = 5;
  amountOfCostumers: number = 50;
  sort: Sort = { active: 'unsorted', direction: '' };
  selected?: MatListOption[];

  constructor(
    public readonly costumersService: CostumersService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.costumersService.loadLocalstorage();
    this.costumers = this.costumersService.getCostumersByPage(
      this.costumersPerPage,
      this.page,
      this.sort
    );
  }

  ngOnInit(): void {}

  getCostumersByPage(): void {
    this.costumers = this.costumersService.getCostumersByPage(
      this.costumersPerPage,
      this.page,
      this.sort
    );
  }

  loadRandomUsers(event: PageEvent) {
    this.page = event.pageIndex;
    this.costumersPerPage = event.pageSize;
    this.getCostumersByPage();
  }

  sortData(event: Sort) {
    this.sort = event;
    this.getCostumersByPage();
  }

  goToNewCostumer(): void {
    this.router.navigateByUrl('/costumers/add');
  }

  getSelectedUsers(): RandomUser[] {
    return this.selected?.map((listOption) => listOption.value as RandomUser)!;
  }

  haveSelected(): boolean {
    const selected = this.getSelectedUsers();
    if (!selected || selected.length <= 0) return true;
    else return false;
  }

  editSelcted(): void {
    const usersToEdit: RandomUser[] = this.getSelectedUsers();
    if (!usersToEdit) return;
    this.costumersService.setCostumersToEdit(usersToEdit);
    this.router.navigateByUrl('/costumers/edit');
  }

  onSelections(costumers: MatListOption[]): void {
    this.selected = costumers;
  }

  deleteSelected() {
    const usersToDelete: RandomUser[] = this.getSelectedUsers();
    if (!usersToDelete) return;
    this.costumersService.removeCostumers(usersToDelete);
    this.getCostumersByPage();
    this.selected = undefined;
  }

  opendDeleteDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        header: 'Delete Users',
        content: 'Are you sure you want to DELETE all?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.deleteSelected();
    });
  }
}
