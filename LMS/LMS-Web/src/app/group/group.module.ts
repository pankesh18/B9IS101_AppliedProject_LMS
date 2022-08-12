import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group/group.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GroupComponent
  ],
  imports: [
    CommonModule,
    MultiSelectModule,
    FormsModule,
    GroupRoutingModule
  ]
})
export class GroupModule { }
