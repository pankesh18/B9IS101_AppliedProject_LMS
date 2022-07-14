import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StudentDashComponent } from './student-dash/student-dash.component';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MeetingsComponent } from './meetings/meetings.component';



@NgModule({
  declarations: [
    DashboardComponent,
    StudentDashComponent,
    MeetingsComponent,
    
  ],
  imports: [
    CommonModule,
    CarouselModule,
    CardModule,
    ButtonModule,
    FormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
