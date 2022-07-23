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
import { NgxDocViewerModule } from 'ngx-doc-viewer2';
import { NotesModule } from '../notes/notes.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AccordionModule } from 'primeng/accordion';
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';



@NgModule({
  declarations: [
    CoursedetailComponent,
  ],
  imports: [
    CommonModule,
    TabViewModule,
    CalendarModule,
    InputTextModule,
    YouTubePlayerModule,
    NgxDocViewerModule,
    CarouselModule,
    SplitterModule,
    AccordionModule,
    ToolbarModule,
    ButtonModule,
    OverlayPanelModule,
    FormsModule,
    VirtualScrollerModule,
    NotesModule,
    CourseDetailRoutingModule
  ]
})
export class CoursedetailModule {

}
