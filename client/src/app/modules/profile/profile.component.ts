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
  balanceTransactions: any[] = [];
  balanceDisplayedColumns = ['type', 'balanceDelta'];
  purchaseTransactions: any[] = [];

  purchaseDisplayedColumns: string[] = [ 'type', 'product', 'quantity', 'price'];
  purchaseDataSource;
  balanceDataSource = this.balanceTransactions;

  user: object;

  history: any;

  constructor(
    private userService: UserService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.isLogged().subscribe(
      data => {
        this.userService.getUser()
          .subscribe(info => {
            this.user = info;
          });

        this.userService.getUserTransactions()
          .subscribe(tran => {
            this.transactions = tran;
            this.transactions.forEach(t => {
              t.type === 'purchase' ?
                this.purchaseTransactions.push(t) :
                this.balanceTransactions.push(t);
            });
            this.purchaseDataSource = this.purchaseTransactions;
            this.isLoggedIn = data.isLogged;
            this.updateData(this.isLoggedIn);
          });
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
