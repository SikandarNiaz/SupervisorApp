import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule,} from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatGridListModule } from "@angular/material/grid-list";
import {NgxSpinnerService} from 'ngx-spinner';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepicker } from "@angular/material/datepicker";
import { MatSortModule } from '@angular/material/sort';



import {
  MatDatepickerModule,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

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
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { NgxPaginationModule } from "ngx-pagination";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
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
import { AccordionModule } from "ngx-bootstrap/accordion";
import { MatExpansionModule } from "@angular/material/expansion";
import { SaleAnalysisDashboardComponent } from "./Tableau/sale-analysis-dashboard/sale-analysis-dashboard.component";
import { PgjordanDashboardComponent } from "./Tableau/pgjordan-dashboard/pgjordan-dashboard.component";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { CensusProductivityDashboardComponent } from "./Tableau/census-productivity-dashboard/census-productivity-dashboard.component";
import { CensusSurveyDashboardComponent } from "./Tableau/census-survey-dashboard/census-survey-dashboard.component";
import { MerchandiserListComponent } from "./innerComponents/merchandiser-list/merchandiser-list.component";
import { AssignTargetComponent } from "./innerComponents/assign-target/assign-target.component";
import { UpdateSupervisorAttendenceComponent } from "./innerComponents/update-supervisor-attendence/update-supervisor-attendence.component";
import { UpdateGiftComponent } from "./innerComponents/update-gift/update-gift.component";
import { DashboardDataComponent } from "./dashboard-data/dashboard-data.component";
import { AddPrizeStwComponent } from './innerComponents/add-prize-stw/add-prize-stw.component';
import { ManageSurveyorsComponent } from "./innerComponents/manage-surveyors/manage-surveyors.component";
import { ManageMerchandiserComponent } from "./innerComponents/manage-surveyors/manage-merchandiser/manage-merchandiser.component";
import { SearchBoxComponent } from "./innerComponents/search-box/search-box.component";
import { ShowFieldsComponent} from "./innerComponents/display-fields/display-fields.component";
import { ShowStockDataComponent } from "./innerComponents/show-stock-data/show-stock-data.component";
import { ShowSwapDataComponent } from "./innerComponents/swap-data.component/swap-data.component";
import { NgxImageZoomModule } from "ngx-image-zoom";
import { UpdateKTSupervisorAttendenceKissanComponent } from "./innerComponents/update-kt-supervisor-attendance-kissan/update-kt-supervisor-attendance-kissan.component";
import { UpdateKTSupervisorAttendenceCGSComponent } from "./innerComponents/update-kt-supervisor-attendance-CGS/update-kt-supervisor-attendance-CGS.component";
import { SectionTenViewComponent } from "./innerComponents/section-ten-view/section-ten-view.component";
import { SectionElevenViewComponent } from "./innerComponents/section-eleven-view/section-eleven-view.component";
import { KTInterceptionData } from "./innerComponents/kt-interception-detail/kt-interception-detail.component";
import { SamsungClaimManagementOPDComponent } from "./innerComponents/samsung-claims-management-opd/samsung-claims-management-opd-component";
import { LightboxModule } from "ngx-lightbox";
import { SectionClaimImagesComponent } from "./innerComponents/section-claim-images/section-claim-images.component";
import { KtInterceptionEvaluationComponent } from "./innerComponents/kt-interception-evaluation/kt-interception-evaluation-component";
import { NDNInterceptionSummaryComponent } from "./innerComponents/ndn-interception-summary/ndn-interception-summary-component";
import { NDNInterceptionSummaryDetailComponent } from "./innerComponents/ndn-interception-summary-detail/ndn-interception-summary-detail-component";
import { KTDayStartData } from "./innerComponents/kt-day-start-detail/kt-day-start-detail.component";
import { KtAttendanceEvaluation } from "./innerComponents/kt-attendance-evaluation/kt-attendance-evaluation.component";
import { BulkApproveShopsComponent } from "./innerComponents/bulk-approve-shops/bulk-approve-shops.component";
import { MarketIntelligenceComponent } from "./innerComponents/market-intelligence/market-intelligence.component";
import { PayrollProcessComponent } from "./innerComponents/payroll-process/payroll-process.component";
import { PayrollUnprocessComponent } from "./innerComponents/payroll-unprocess/payroll-unprocess.component";
import { ShowTLDistributionStockDataComponent } from "./innerComponents/show-TL-distribution-stock-data/show-TL-distribution-stock-data.component";
import { ShowTLDistributionSwappedDataComponent } from "./innerComponents/show-TL-distribution-swapped-data/show-TL-distribution-swapped-data.component";
import { MarketIntelligenceDetailComponent } from "./innerComponents/market-intelligence-detail/market-intelligence-detail.component";
import { RandomSelfiesComponent } from "./innerComponents/random-selfies/random-selfies.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadMerchandisingShopTaskComponent } from "src/app/upload-merchandising-shop-task/upload-merchandising-shop-task.component";
import { PushNotificationComponent } from "./innerComponents/push-notification/push-notification.component";
import { ShopperEngagementComponent } from "./innerComponents/shopper-engagement/shopper-engagement.component";
import { NewScreenComponent } from "src/app/new-screen/new-screen.component";
import { UploadTargetVsAchievementComponent } from "src/app/upload-target-vs-achievement/upload-target-vs-achievement.component";
import { UploadDistributionAssetsComponent } from "src/app/upload-distribution-assets/upload-distribution-assets.component";
import { ManageEmailsComponent } from "src/app/manage-emails/manage-emails.component";
import { PmiHomeComponent } from "src/app/pmi-home/pmi-home.component";
import { PmiHomeDetailComponent } from "src/app/pmi-home-detail/pmi-home-detail.component";
import { UploadTrainingComponent } from "src/app/upload-training/upload-training.component";
import { RmStockAssignComponent } from "src/app/rm-stock-assign/rm-stock-assign.component";
import { RmStockReturnComponent } from "src/app/rm-stock-return/rm-stock-return.component";
import { StockManagementSummeryComponent } from "src/app/stock-management-summery/stock-management-summery.component";
import { StockIssueToRmComponent } from "src/app/stock-issue-to-rm/stock-issue-to-rm.component";
import { ManagePtcFileComponent } from "src/app/manage-ptc-file/manage-ptc-file.component";
import { SupervisorEvaluationPageComponent } from "src/app/supervisor-evaluation-page/supervisor-evaluation-page.component";
import { StockReturnFromRmComponent } from "src/app/stock-return-from-rm/stock-return-from-rm.component";
import { RmDistributorSummaryComponent } from "src/app/rm-distributor-summary/rm-distributor-summary.component";
import { UploadSurveyorRoutesComponent } from "src/app/upload-surveyor-routes/upload-surveyor-routes.component";




// import { AdminLoginPmiComponent } from "src/app/admin-login-pmi/admin-login-pmi.component";


@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatSortModule,
    DashboardRoutingModule,
    MatGridListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    NgbModule,
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
    NgxMaterialTimepickerModule,
    NgxImageZoomModule,
    LightboxModule,
    NgxSpinnerModule,
    MatTabsModule
  ],
  declarations: [
    SectionElevenViewComponent,
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
    UpdateSupervisorAttendenceComponent,
    DashboardDataComponent,
    AddPrizeStwComponent,
    UpdateGiftComponent,
    ManageSurveyorsComponent,
    ManageMerchandiserComponent,
    SearchBoxComponent,
    ShowFieldsComponent,
    ShowStockDataComponent,
    ShowSwapDataComponent,
    UpdateKTSupervisorAttendenceKissanComponent,
    UpdateKTSupervisorAttendenceCGSComponent,
    SectionTenViewComponent,
    KTInterceptionData,
    SamsungClaimManagementOPDComponent,
    SectionClaimImagesComponent,
    KtInterceptionEvaluationComponent,
    NDNInterceptionSummaryComponent,
    NDNInterceptionSummaryDetailComponent,
    KTDayStartData,
    KtAttendanceEvaluation,
  BulkApproveShopsComponent,
  MarketIntelligenceComponent,
  PayrollProcessComponent,
  PayrollUnprocessComponent,
  ShowTLDistributionStockDataComponent,
  ShowTLDistributionSwappedDataComponent,
  MarketIntelligenceDetailComponent,
  RandomSelfiesComponent, 
  UploadMerchandisingShopTaskComponent,
  PushNotificationComponent,
  ShopperEngagementComponent,
  NewScreenComponent,
  UploadTargetVsAchievementComponent,
  UploadDistributionAssetsComponent,
  ManageEmailsComponent,
  PmiHomeComponent,
  PmiHomeDetailComponent,
  UploadTrainingComponent,
  RmStockAssignComponent,
  RmStockReturnComponent,
  StockManagementSummeryComponent,
  StockIssueToRmComponent,
  ManagePtcFileComponent,
  SupervisorEvaluationPageComponent,
  StockReturnFromRmComponent,
  RmDistributorSummaryComponent,
  UploadSurveyorRoutesComponent

  
],
})
export class DashboardModule {}
