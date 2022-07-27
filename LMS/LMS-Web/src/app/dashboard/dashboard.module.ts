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
import { CalendarModule } from 'primeng/calendar';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { InputTextModule } from 'primeng/inputtext';
import { ZoomModule } from '../zoom/zoom.module';



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
    CalendarModule,
    InputTextModule,
    VirtualScrollerModule,
    ZoomModule,
    ButtonModule,
    FormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
