import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CeShoptargetRoutingModule } from './ce-shoptarget-routing.module';

import {MatExpansionModule} from '@angular/material/expansion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import {NgxPaginationModule} from 'ngx-pagination';
import { ResizableModule } from 'angular-resizable-element';
import { Ng5SliderModule } from 'ng5-slider';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule,} from "@angular/material/menu";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import { MainPageComponent } from './main-page/main-page.component';
import { EvaluationDetailComponent } from './evaluation-detail/evaluation-detail.component';
import { HomeComponent } from './home/home.component';
import { SectionOneViewComponent } from './section-one-view/section-one-view.component';
import { SectionTwoViewComponent } from './section-two-view/section-two-view.component';
import { SectionThreeViewComponent } from './section-three-view/section-three-view.component';
import { SectionFourViewComponent } from './section-four-view/section-four-view.component';
import { SectionFiveViewComponent } from './section-five-view/section-five-view.component';
import { BarRatingModule } from 'ngx-bar-rating';

@NgModule({
  declarations: [MainPageComponent, EvaluationDetailComponent, HomeComponent, SectionOneViewComponent, SectionTwoViewComponent, SectionThreeViewComponent, SectionFourViewComponent, SectionFiveViewComponent],
  imports: [
    CommonModule,
    CeShoptargetRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    MatRadioModule,
    AccordionModule,
    MatCardModule,
    MatCheckboxModule,
    MatSliderModule,
    NgxImageZoomModule,
    NgxPaginationModule,
    ResizableModule,
    Ng5SliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule, MatIconModule, MatTableModule, MatSelectModule, MatNativeDateModule,
   MatMenuModule,MatDatepickerModule,
   BarRatingModule


  ]
})
export class CeShoptargetModule { }
