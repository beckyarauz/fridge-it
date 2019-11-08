import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {SharedModule} from '../../shared/shared.module';
import {ProfileRoutingModule} from './profile-routing.module';
import {MatButtonModule, MatCardModule, MatTableModule, MatTabsModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    CdkTableModule,
    MatTabsModule
  ]
})
export class ProfileModule { }
