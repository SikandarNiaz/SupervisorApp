import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { HomeComponent } from './home/home.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { AccordionModule } from 'ngx-bootstrap';
import { MatCardModule, MatFormFieldModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import {NgxPaginationModule} from 'ngx-pagination';
import { ResizableModule } from 'angular-resizable-element';
import { Ng5SliderModule } from 'ng5-slider';
import {MatInputModule} from '@angular/material/input';
import { EvaluationDetailComponent } from './evaluation-detail/evaluation-detail.component';
import { MatButtonModule, MatIconModule, MatTableModule, MatSelectModule, MatNativeDateModule,
   MatMenuModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import { SectionOneViewComponent } from './section-one-view/section-one-view.component';
import { SectionFourViewComponent } from './section-four-view/section-four-view.component';
import { SectionTwoViewComponent } from './section-two-view/section-two-view.component';
import { SectionThreeViewComponent } from './section-three-view/section-three-view.component';


@NgModule({
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    MatRadioModule,
    AccordionModule.forRoot(),
    MatCardModule,
    MatCheckboxModule,
    MatSliderModule,
    NgxImageZoomModule.forRoot(),
    NgxPaginationModule,
    ResizableModule,
    Ng5SliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule, MatIconModule, MatTableModule, MatSelectModule, MatNativeDateModule,
   MatMenuModule,MatDatepickerModule
  ],
  declarations: [HomeComponent, MainPageComponent, EvaluationDetailComponent, SectionOneViewComponent, SectionFourViewComponent, SectionTwoViewComponent, SectionThreeViewComponent]
})
export class EvaluationModule { }
