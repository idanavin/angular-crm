import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { RandomUser } from 'src/app/domain-layer/entities/random-users';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers: Promise<RandomUser[]>;
  page: number = 0;
  customersPerPage: number = 5;
  amountOfCustomers: number = 50;
  sort: Sort = { active: 'unsorted', direction: '' };
  selected?: MatListOption[];

  constructor(
    public readonly customersService: CustomersService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.customersService.loadLocalstorage();
    this.customers = this.customersService.getCustomersByPage(
      this.customersPerPage,
      this.page,
      this.sort
    );
  }

  ngOnInit(): void {}

  getCustomersByPage(): void {
    this.customers = this.customersService.getCustomersByPage(
      this.customersPerPage,
      this.page,
      this.sort
    );
  }

  loadRandomUsers(event: PageEvent) {
    this.page = event.pageIndex;
    this.customersPerPage = event.pageSize;
    this.getCustomersByPage();
  }

  sortData(event: Sort) {
    this.sort = event;
    this.getCustomersByPage();
  }

  goToNewCostumer(): void {
    this.router.navigateByUrl('/customers/add');
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
    this.customersService.setCustomersToEdit(usersToEdit);
    this.router.navigateByUrl('/customers/edit');
  }

  onSelections(customers: MatListOption[]): void {
    this.selected = customers;
  }

  deleteSelected() {
    const usersToDelete: RandomUser[] = this.getSelectedUsers();
    if (!usersToDelete) return;
    this.customersService.removeCustomers(usersToDelete);
    this.getCustomersByPage();
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