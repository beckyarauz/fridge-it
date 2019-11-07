import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinksComponent } from './drinks.component';
import { DrinksRoutingModule } from './drinks-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatTableModule} from '@angular/material';
@NgModule({
  declarations: [DrinksComponent],
  imports: [
    CommonModule,
    SharedModule,
    DrinksRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule
  ]
})
export class DrinksModule { }
