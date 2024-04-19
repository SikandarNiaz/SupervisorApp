import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";

import { EvaluationRoutingModule } from "./evaluation-routing.module";
import { HomeComponent } from "./home/home.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { MatCardModule } from "@angular/material/card";
import {  MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSliderModule } from "@angular/material/slider";
import { NgxImageZoomModule } from "ngx-image-zoom";
import { NgxPaginationModule } from "ngx-pagination";
import { ResizableModule } from "angular-resizable-element";
import { Ng5SliderModule } from "ng5-slider";
import { MatInputModule } from "@angular/material/input";
import { EvaluationDetailComponent } from "./evaluation-detail/evaluation-detail.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
import { SectionOneViewComponent } from "./section-one-view/section-one-view.component";
import { SectionFourViewComponent } from "./section-four-view/section-four-view.component";
import { SectionTwoViewComponent } from "./section-two-view/section-two-view.component";
import { SectionThreeViewComponent } from "./section-three-view/section-three-view.component";
import { FlaggedShopsListComponent } from "./flagged-shops-list/flagged-shops-list.component";
import { Ng2OrderModule } from "ng2-order-pipe";
import { ASMHomeComponent } from "./asm-home/asm-home.component";

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
    NgxImageZoomModule,
    NgxPaginationModule,
    ResizableModule,
    Ng5SliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatNativeDateModule,
    MatMenuModule,
    MatDatepickerModule,
    Ng2OrderModule,
  ],
  declarations: [
    HomeComponent,
    MainPageComponent,
    EvaluationDetailComponent,
    SectionOneViewComponent,
    SectionFourViewComponent,
    SectionTwoViewComponent,
    SectionThreeViewComponent,
    FlaggedShopsListComponent,
    ASMHomeComponent,
  ],
})
export class EvaluationModule {}
