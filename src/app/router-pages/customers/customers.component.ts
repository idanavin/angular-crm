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
    this.customers = this.getCustomersByPage();
  }

  ngOnInit(): void {}

  getCustomersByPage(): Promise<RandomUser[]> {
    return this.customersService.getCustomersByPage(
      this.customersPerPage,
      this.page,
      this.sort
    );
  }

  loadRandomUsers(event: PageEvent): void {
    this.page = event.pageIndex;
    this.customersPerPage = event.pageSize;
    this.customers = this.getCustomersByPage();
  }

  sortData(event: Sort): void {
    this.sort = event;
    this.customers = this.getCustomersByPage();
  }

  goToNewCostumer(): void {
    this.selected = [];
    this.customersService.setCustomersToEdit([]);
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

  editSelected(): void {
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
    this.customers = this.getCustomersByPage();
    this.selected = undefined;
  }

  opendDeleteDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        header: 'DIALOG_HEAD_DELETE',
        content: 'DIALOG_CONTENT_DELETE',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.deleteSelected();
    });
  }

  setCustomersAmount(): void {
    this.customers.then(
      (customers) => (this.amountOfCustomers = customers.length + 10)
    );
  }

  setFilteredCustomers(filteredCustomers: RandomUser[]): void {
    if (filteredCustomers.length) {
      this.page = 0;
      this.selected = [];
      this.customers = new Promise((resolve) => resolve(filteredCustomers))
    } else {
      this.customers = this.getCustomersByPage();
    }
  }
}
