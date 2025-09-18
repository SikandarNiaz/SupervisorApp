import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSliderModule } from "@angular/material/slider";
import { NgxImageZoomModule } from "ngx-image-zoom";
import { NgxPaginationModule } from "ngx-pagination";
import { ResizableModule } from "angular-resizable-element";
import { Ng5SliderModule } from "ng5-slider";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
import { TabsModule } from "ngx-bootstrap/tabs";

import { VirtualViewRoutingModule } from "./virtual-view-routing.module";
import { VoTrackingComponent } from "./vo-tracking/vo-tracking.component";
import { DataTrackingComponent } from "./data-tracking/data-tracking.component";
import { UnvisistedMapComponent } from "./unvisisted-map/unvisisted-map.component";
import { CapturedShopsComponent } from "./captured-shops/captured-shops.component";
import { VoLiveTrackingComponent } from "./vo-live-tracking/vo-live-tracking.component";
import { RouteTrackerComponent } from "./route-tracker/route-tracker.component";
import { MainComponent } from "./main/main.component";
import { AgmCoreModule } from "@agm/core";
// @ts-ignore
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
// @ts-ignore
import { AgmJsMarkerClustererModule } from "@agm/js-marker-clusterer";
import { AgmDirectionModule } from "agm-direction";
import { Ng2OrderModule } from "ng2-order-pipe";
import { NdnVoLiveTrackingComponent } from "./ndn-vo-live-tracking/ndn-vo-live-tracking-component";
import { NdnRouterTrackerComponent } from "./ndn-router-tracker/ndn-router-tracker.component";
import { PtcRouteTrackerComponent } from "./ptc-router-tracker/ptc-router-tracker.component";
import { TransmedVoLiveTrackingComponent } from "./transmed-tracking/transmed-vo-live-tracking.component";
import { TransmedRouteTrackerComponent } from "./transmed-router-tracker/transmed-router-tracker.component";
import { CensusRouteTrackerComponent } from "./census-router-tracker/census-router-tracker-component";

@NgModule({
  declarations: [VoTrackingComponent,DataTrackingComponent,UnvisistedMapComponent,RouteTrackerComponent, CapturedShopsComponent,VoLiveTrackingComponent,MainComponent,NdnVoLiveTrackingComponent,NdnRouterTrackerComponent,PtcRouteTrackerComponent,
    TransmedVoLiveTrackingComponent,TransmedRouteTrackerComponent,CensusRouteTrackerComponent
  ],
  imports: [
    CommonModule,
    VirtualViewRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    MatRadioModule,
    AccordionModule.forRoot(),
    MatCardModule,
    MatCheckboxModule,
    Ng2OrderModule,
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
    MatListModule,
    MatMenuModule,
    MatDatepickerModule,
    AgmCoreModule,
    AgmSnazzyInfoWindowModule,
    AgmJsMarkerClustererModule,
    AgmDirectionModule,
    TabsModule,
  ],
})
export class VirtualViewModule {}
