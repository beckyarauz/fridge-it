import { Component, OnInit } from '@angular/core';
import {DataService, UserService} from '../../core/services';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  transactions: any[];
  isLoggedIn = false;
  balanceTransactions: {type: string, balanceDelta: number}[] = [];
  balanceDisplayedColumns = ['type', 'balanceDelta'];
  purchaseTransactions: {type: string, product: string, balanceDelta: number}[] = [];


  purchaseDisplayedColumns: string[] = [ 'type', 'product', 'balanceDelta'];
  purchaseDataSource = this.purchaseTransactions;
  balanceDataSource = this.balanceTransactions;

  user: object;

  constructor(
    private userService: UserService,
    private dataService: DataService
  ) { }

  async ngOnInit() {
    this.isLogged().subscribe(
      data => {
        this.user = this.userService.getCurrentUser();
        // this.userService.getUserTransactions().subscribe(tran => {
        //   this.transactions = tran;
        // });
        this.transactions = this.userService.getUserTransactions();
        this.transactions.forEach(t => {
          t.type === 'purchase' ?
            this.purchaseTransactions.push(t) :
            this.balanceTransactions.push(t);
        });
        this.isLoggedIn = data.isLogged;
        this.updateData(this.isLoggedIn);
      },
      error => console.log(error.message)
    );

  }

  updateData(value: boolean) {
    this.dataService.updateData(value);
  }

  isLogged() {
    return this.userService.isLogged();
  }

}
