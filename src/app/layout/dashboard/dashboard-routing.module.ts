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
import { DataAvailabilityComponent } from "./data-availability/data-availability.component";
import { EmailManagerComponent } from "./innerComponents/email-manager/email-manager.component";
import { UploadRoutesComponent } from "./innerComponents/upload-routes/upload-routes.component";
import { SingleRouteDetailComponent } from "./innerComponents/upload-routes/routes-inner-pages/single-route-detail/single-route-detail.component";
import { ShopsForSingleRouteComponent } from "./innerComponents/upload-routes/routes-inner-pages/shops-for-single-route/shops-for-single-route.component";
import { UploadRoutesNewComponent } from "./innerComponents/upload-routes-new/upload-routes-new.component";
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
      { path: "brand_sku_oos", component: DataAvailabilityComponent },
      { path: "sms_manager", component: EmailManagerComponent },
      { path: "upload_routes/route_list", component: UploadRoutesComponent },
      {
        path: "upload_routes/single_route_details",
        component: SingleRouteDetailComponent,
      },
      {
        path: "upload_routes/shops_for_single_route",
        component: ShopsForSingleRouteComponent,
      },
      { path: "upload_routes_new", component: UploadRoutesNewComponent },
      { path: "productivity-dashboard", component: DashboardTableauComponent },
      {
        path: "performance-dashboard",
        component: ProductivityTableauComponent,
      },
      { path: "sku-dashboard", component: SkuDashboardComponent },
      { path: "assign-shops", component: AssignShopsComponent },
      { path: "shop-details", component: AssignShopsComponent },
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
        path: "census-productivity-dashboard",
        component: CensusProductivityDashboardComponent,
      },
    ],
  },
  // { path: 'shop_detail/:id', component: ShopDetailComponent },
  { path: "shop_detail/:id", component: ShopDetailComponent },

  {
    path: "evaluation",
    loadChildren: "./evaluation/evaluation.module#EvaluationModule",
  },
  {
    path: "ce_evaluation",
    loadChildren: "./ce-evaluation/ce-evaluation.module#CeEvaluationModule",
  },
  {
    path: "ce_supervisor_evaluation",
    loadChildren: "./ce-evaluation/ce-evaluation.module#CeEvaluationModule",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
