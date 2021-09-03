import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatRadioModule,
  MatCheckboxModule,
  MatMenuModule,
} from "@angular/material";
import { MatGridListModule } from "@angular/material/grid-list";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
} from "@angular/material/datepicker";

import { StatModule } from "../../shared/modules/stat/stat.module";
import { CollapseModule } from "../../shared/modules/collapse/collapse.module";
import { SkeletonLoaderModule } from "../../shared/modules/skeleton/skeleton-loader/skeleton-loader.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./innerComponents/home/home.component";
import { FilterBarComponent } from "./innerComponents/filter-bar/filter-bar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShopDetailComponent } from "./innerComponents/shop-detail/shop-detail.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { ChartsModule as Ng2Charts } from "ng2-charts";
import { MatTooltipModule } from "@angular/material/tooltip";
import { UpdatePasswordComponent } from "./user/update-password/update-password.component";
import { RawDataComponent } from "./raw-data/raw-data.component";
import { MatTableComponent } from "./innerComponents/mat-table/mat-table.component";
import { Ng2OrderModule } from "ng2-order-pipe";
import { ButtonsModule } from "ngx-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { BsDropdownModule } from "ngx-bootstrap";
import { EmailManagerComponent } from "./innerComponents/email-manager/email-manager.component";
import { MessageStatusListComponent } from "./innerComponents/email-manager/childComponents/message-status-list/message-status-list.component";
import { AddNewMessageComponent } from "./innerComponents/email-manager/childComponents/add-new-message/add-new-message.component";
import { UploadRoutesComponent } from "./innerComponents/upload-routes/upload-routes.component";
import { AddEditGroupComponent } from "./innerComponents/email-manager/childComponents/add-edit-group/add-edit-group.component";
import { TableauHelperComponent } from "./Tableau/tableau-helper/tableau-helper.component";
import { DashboardTableauComponent } from "./Tableau/dashboard-tableau/dashboard-tableau.component";
import { ProductivityTableauComponent } from "./Tableau/productivity-tableau/productivity-tableau.component";
import { SkuDashboardComponent } from "./Tableau/sku-dashboard/sku-dashboard.component";
import { AssignShopsComponent } from "./innerComponents/assign-shops/assign-shops.component";
import { MerchandiserAttendenceDetailComponent } from "./innerComponents/merchandiser-attendence-detail/merchandiser-attendence-detail.component";
import { InterceptionSummaryComponent } from "./innerComponents/interception-summary/interception-summary.component";
import { CcProductivityReportComponent } from "./innerComponents/cc-productivity-report/cc-productivity-report.component";
import { DailyContactReportComponent } from "./innerComponents/daily-contact-report/daily-contact-report.component";
import { CeRawDataComponent } from "./innerComponents/ce-raw-data/ce-raw-data.component";
import { ExportDataReportComponent } from "./innerComponents/export-data-report/export-data-report.component";
import { BaAttendanceComponent } from "./innerComponents/ba-attendance/ba-attendance.component";
import { AccordionModule } from "ngx-bootstrap";
import { MatExpansionModule } from "@angular/material/expansion";
import { SaleAnalysisDashboardComponent } from "./Tableau/sale-analysis-dashboard/sale-analysis-dashboard.component";
import { PgjordanDashboardComponent } from "./Tableau/pgjordan-dashboard/pgjordan-dashboard.component";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { CensusProductivityDashboardComponent } from "./Tableau/census-productivity-dashboard/census-productivity-dashboard.component";
import { CensusSurveyDashboardComponent } from "./Tableau/census-survey-dashboard/census-survey-dashboard.component";
import { MerchandiserListComponent } from "./innerComponents/merchandiser-list/merchandiser-list.component";
import { AssignTargetComponent } from './innerComponents/assign-target/assign-target.component';
@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    DashboardRoutingModule,
    MatGridListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    StatModule,
    MatCardModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    ModalModule.forRoot(),
    Ng2Charts,
    Ng2OrderModule,
    ButtonsModule.forRoot(),
    NgxPaginationModule,
    MatRadioModule,
    MatCheckboxModule,
    BsDropdownModule.forRoot(),
    MatMenuModule,
    ReactiveFormsModule,
    SkeletonLoaderModule,
    CollapseModule,
    AccordionModule,
    MatExpansionModule,
    NgxMatSelectSearchModule,
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    FilterBarComponent,
    ShopDetailComponent,
    UpdatePasswordComponent,
    RawDataComponent,
    MatTableComponent,
    EmailManagerComponent,
    MessageStatusListComponent,
    AddNewMessageComponent,
    UploadRoutesComponent,
    AddEditGroupComponent,
    TableauHelperComponent,
    DashboardTableauComponent,
    ProductivityTableauComponent,
    SkuDashboardComponent,
    AssignShopsComponent,
    MerchandiserAttendenceDetailComponent,
    InterceptionSummaryComponent,
    CcProductivityReportComponent,
    DailyContactReportComponent,
    CeRawDataComponent,
    ExportDataReportComponent,
    BaAttendanceComponent,
    SaleAnalysisDashboardComponent,
    PgjordanDashboardComponent,
    CensusProductivityDashboardComponent,
    CensusSurveyDashboardComponent,
    MerchandiserListComponent,
    AssignTargetComponent,
  ],
})
export class DashboardModule {}
