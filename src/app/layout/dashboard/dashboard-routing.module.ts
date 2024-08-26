import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { AuthGuard } from "src/app/shared/guard";
import { DashboardGuard } from "./dashboard.guard";
import { HomeComponent } from "./innerComponents/home/home.component";
import { pathToFileURL } from "url";
import { ShopDetailComponent } from "./innerComponents/shop-detail/shop-detail.component";
import { UpdatePasswordComponent } from "./user/update-password/update-password.component";
import { RawDataComponent } from "./raw-data/raw-data.component";
import { EmailManagerComponent } from "./innerComponents/email-manager/email-manager.component";
import { UploadRoutesComponent } from "./innerComponents/upload-routes/upload-routes.component";
import { DashboardTableauComponent } from "./Tableau/dashboard-tableau/dashboard-tableau.component";
import { ProductivityTableauComponent } from "./Tableau/productivity-tableau/productivity-tableau.component";
import { SkuDashboardComponent } from "./Tableau/sku-dashboard/sku-dashboard.component";
import { AssignShopsComponent } from "./innerComponents/assign-shops/assign-shops.component";
import { MerchandiserAttendenceDetailComponent } from "./innerComponents/merchandiser-attendence-detail/merchandiser-attendence-detail.component";
import { InterceptionSummaryComponent } from "./innerComponents/interception-summary/interception-summary.component";
import { DailyContactReportComponent } from "./innerComponents/daily-contact-report/daily-contact-report.component";
import { CcProductivityReportComponent } from "./innerComponents/cc-productivity-report/cc-productivity-report.component";
import { CeRawDataComponent } from "./innerComponents/ce-raw-data/ce-raw-data.component";
import { ExportDataReportComponent } from "./innerComponents/export-data-report/export-data-report.component";
import { BaAttendanceComponent } from "./innerComponents/ba-attendance/ba-attendance.component";
import { SaleAnalysisDashboardComponent } from "./Tableau/sale-analysis-dashboard/sale-analysis-dashboard.component";
import { PgjordanDashboardComponent } from "./Tableau/pgjordan-dashboard/pgjordan-dashboard.component";
import { CensusProductivityDashboardComponent } from "./Tableau/census-productivity-dashboard/census-productivity-dashboard.component";
import { CensusSurveyDashboardComponent } from "./Tableau/census-survey-dashboard/census-survey-dashboard.component";
import { MerchandiserListComponent } from "./innerComponents/merchandiser-list/merchandiser-list.component";
import { AssignTargetComponent } from "./innerComponents/assign-target/assign-target.component";
import { TableauHelperComponent } from "./Tableau/tableau-helper/tableau-helper.component";
import { UpdateSupervisorAttendenceComponent } from "./innerComponents/update-supervisor-attendence/update-supervisor-attendence.component";
import { UpdateGiftComponent } from "./innerComponents/update-gift/update-gift.component";
import { DashboardDataComponent } from "./dashboard-data/dashboard-data.component";
import { importType } from "@angular/compiler/src/output/output_ast";
import { AddPrizeStwComponent } from "./innerComponents/add-prize-stw/add-prize-stw.component";
import { ManageSurveyorsComponent } from "./innerComponents/manage-surveyors/manage-surveyors.component";
import { ShowFieldsComponent} from "./innerComponents/display-fields/display-fields.component";
import { ShowStockDataComponent } from "./innerComponents/show-stock-data/show-stock-data.component";
import { ShowSwapDataComponent } from "./innerComponents/swap-data.component/swap-data.component";
import { UpdateKTSupervisorAttendenceKissanComponent } from "./innerComponents/update-kt-supervisor-attendance-kissan/update-kt-supervisor-attendance-kissan.component";
import { UpdateKTSupervisorAttendenceCGSComponent } from "./innerComponents/update-kt-supervisor-attendance-CGS/update-kt-supervisor-attendance-CGS.component";
import { UpdateSwapDataComponent } from "src/app/update-swap-data/update-swap-data.component";
import { SectionTenViewComponent } from "./innerComponents/section-ten-view/section-ten-view.component";
import { SectionElevenViewComponent } from "./innerComponents/section-eleven-view/section-eleven-view.component";
import { UpdateStockDataComponent } from "src/app/update-stock-data/update-stock-data.component";
import { KTInterceptionData } from "./innerComponents/kt-interception-detail/kt-interception-detail.component";
import { SamsungClaimManagementOPDComponent } from "./innerComponents/samsung-claims-management-opd/samsung-claims-management-opd-component";
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


const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "update_password", component: UpdatePasswordComponent },
      { path: "raw_data", component: RawDataComponent },
      { path: "sms_manager", component: EmailManagerComponent },
      { path: "upload_routes", component: UploadRoutesComponent },
      { path: "productivity-dashboard", component: DashboardTableauComponent },
      { path: "section_detail", component: SectionTenViewComponent },
      { path: "section_detail_1", component: SectionElevenViewComponent },
      { path: 'app-rm-stock-assign', component: RmStockAssignComponent },
      { path: 'app-rm-stock-return', component: RmStockReturnComponent },
      { path: "app-stock-issue-to-rm", component: StockIssueToRmComponent},
      { path: "app-stock-return-from-rm", component: StockReturnFromRmComponent},
      
      
      
      {
        path: "performance-dashboard",
        component: ProductivityTableauComponent,
      },
      { path: "manage_surveyors", component: ManageSurveyorsComponent },
      { path: "sku-dashboard", component: SkuDashboardComponent },
      { path: "assign-shops", component: AssignShopsComponent },
      { path: "shop-details", component: AssignShopsComponent },
      {
        path: "ndnInterceptionSummaryDetailComponent",
        component: NDNInterceptionSummaryDetailComponent,
      },
      {
        path: "merchandiserAttendanceDetail",
        component: MerchandiserAttendenceDetailComponent,
      },
      { path: "interception-status", component: InterceptionSummaryComponent },
      { path: "daily-contact-report", component: DailyContactReportComponent },
      {
        path: "cc-productivity-report",
        component: CcProductivityReportComponent,
      },
      { path: "ce-raw-data", component: CeRawDataComponent },
      { path: "export-data", component: ExportDataReportComponent },
      { path: "raw_data/:reportId", component: RawDataComponent },
      { path: "attendance-detail", component: BaAttendanceComponent },
      {
        path: "sale-analysis-dashboard",
        component: SaleAnalysisDashboardComponent,
      },
      {
        path: "pgjordan-summary-dashboard",
        component: PgjordanDashboardComponent,
      },
          
           {
        path: "app-upload-merchandising-shop-task",
        component: UploadMerchandisingShopTaskComponent,
      },
      {
        path: "census-productivity-dashboard",
        component: CensusProductivityDashboardComponent,
      },
      {
        path: "census-survey-dashboard",
        component: CensusSurveyDashboardComponent,
      },
      {
        path: "shop-target",
        component: AssignTargetComponent,
      },
      { path: "merchandiser_List", component: MerchandiserListComponent },
      {
        path: "update-supervisor-attendence",
        component: UpdateSupervisorAttendenceComponent,
      },
      {
        path: "spin-the-wheel-reward",
        component: AddPrizeStwComponent,
      },
      { path: "dashboard_data", component: DashboardDataComponent },
      { path: "dashboard_data/:reportId", component: DashboardDataComponent },
      {
        path: "update-gift",
        component: UpdateGiftComponent,
      },
      {
        path: "display-fields",
        component: ShowFieldsComponent,
      },
      {
        path: "stock-data",
        component: ShowStockDataComponent,
      },
      {
        path: "swap-data",
        component: ShowSwapDataComponent,
      },
      {
        path: "update-kt-supervisor-attendance-kissan",
        component: UpdateKTSupervisorAttendenceKissanComponent,
      },
      {
        path: "update-kt-supervisor-attendance-CGS",
        component: UpdateKTSupervisorAttendenceCGSComponent,
      },
      { path: 'update-swap-data', component: UpdateSwapDataComponent, },
      { path: 'update-stock-data', component: UpdateStockDataComponent, },
      {
        path: "view-kt-interception-data",
        component: KTInterceptionData,
      },
      { path: "samsung-claim-management-opd", component: SamsungClaimManagementOPDComponent },
      { path: "samsung-claim-images/:id", component: SectionClaimImagesComponent },
      {
        path:"view-kt-interception-evaluation",
        component:KtInterceptionEvaluationComponent
        
              },
      { path: "kt-day-start", component: KTDayStartData },
      { path: "kt-attendance-evaluation", component: KtAttendanceEvaluation },

      { path: "payroll-process", component: PayrollProcessComponent },
      { path: "payroll-unprocess", component: PayrollUnprocessComponent },
      // {path: 'app-admin-login-pmi', component:  AdminLoginPmiComponent},
      
    ],
  },
  // { path: 'shop_detail/:id', component: ShopDetailComponent },
  { path: "shop_detail/:id", component: ShopDetailComponent },

  {
    path: "evaluation",
    loadChildren: () => import('./evaluation/evaluation.module').then(m => m.EvaluationModule),
  },
  {
    path: "tableau",
    component: TableauHelperComponent,
  },
  {
    path: "ce_evaluation",
    loadChildren: () => import('./ce-evaluation/ce-evaluation.module').then(m => m.CeEvaluationModule),
  },
  {
    path: "ce_supervisor_evaluation",
    loadChildren: () => import('./ce-evaluation/ce-evaluation.module').then(m => m.CeEvaluationModule),
  },
  {
    path: "ce_shoptarget",
    loadChildren: () => import('./ce-shoptarget/ce-shoptarget.module').then(m => m.CeShoptargetModule),
  },
  {
    path: "virtual_view",
    loadChildren: () =>
      import("./virtual-view/virtual-view.module").then(
        (m) => m.VirtualViewModule
      ),
  },
  { path: "ndn-interception-summary", component: NDNInterceptionSummaryComponent },
  { path: "zsm-redflag-shops", component: BulkApproveShopsComponent },
  { path: "market-intelligence", component: MarketIntelligenceComponent },
  { path: "market-intelligence-detail", component: MarketIntelligenceDetailComponent },
  { path: "tl-stock-distribution", component: ShowTLDistributionStockDataComponent },
  { path: "tl-swapped-distribution", component: ShowTLDistributionSwappedDataComponent },
  { path: "random-selfies", component: RandomSelfiesComponent },
  { path: "shopper-engagement", component: ShopperEngagementComponent },
  { path: "push-notification", component: PushNotificationComponent },
  { path: "UploadTarget-Vs-AcheivementComponent", component: UploadTargetVsAchievementComponent },
  {
    path: "app-upload-distribution-assets",
    component:  UploadDistributionAssetsComponent,
  },
  {
    path: "app-new-screen",
    component:  NewScreenComponent,
  },
  {
    path: "app-manage-emails",
    component:  ManageEmailsComponent,
  },
  {
    path: "app-pmi-home",
    component:  PmiHomeComponent,
  },
  {
    path: "app-pmi-home-detail",
    component:  PmiHomeDetailComponent,
  },
  {
    path: "app-upload-training",
    component:  UploadTrainingComponent,
  },
  // {
  //   path: "app-rm-stock-assign",
  //   component:  RmStockAssignComponent,
  // },
  // {
  //   path: "app-rm-stock-return",
  //   component:  RmStockReturnComponent,
  // },
  {
    path: "app-stock-management-summery",
    component: StockManagementSummeryComponent,
  },
  {
    path: "app-rm-distributor-summary",
    component: RmDistributorSummaryComponent,
  },
  
  {
    path: "app-stock-issue-to-rm",
    component: StockIssueToRmComponent,
  },
  {
    path: "app-stock-return-from-rm",
    component: StockReturnFromRmComponent,
  },
  {
    path: "app-manage-ptc-file",
    component: ManagePtcFileComponent,
  },
  {
    path: "app-supervisor-evaluation-page",
    component: SupervisorEvaluationPageComponent,
  },
  {
    path: "app-upload-surveyor-routes",
    component: UploadSurveyorRoutesComponent,
  },
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
