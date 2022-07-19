import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursedetailComponent } from './coursedetail/coursedetail.component';
import { CourseDetailRoutingModule } from './coursedetail-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { YouTubePlayerModule } from "@angular/youtube-player";



@NgModule({
  declarations: [
    CoursedetailComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    CalendarModule,
    InputTextModule,
    YouTubePlayerModule,
    CarouselModule,
    ButtonModule,
    FormsModule,
    VirtualScrollerModule,
    CourseDetailRoutingModule
  ]
})
export class CoursedetailModule {

}
