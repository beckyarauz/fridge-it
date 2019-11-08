import { Component, OnInit } from '@angular/core';
import {DataService, UserService} from '../../core/services';

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
