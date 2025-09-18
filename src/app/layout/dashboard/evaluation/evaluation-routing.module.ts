import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { EvaluationDetailComponent } from "./evaluation-detail/evaluation-detail.component";
import { FlaggedShopsListComponent } from "./flagged-shops-list/flagged-shops-list.component";
import { ASMHomeComponent } from "./asm-home/asm-home.component";

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },
  {
    path: "list",
    component: MainPageComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: EvaluationDetailComponent },
      { path: "flagged-shops", component: FlaggedShopsListComponent }, // ---------> View For AM Shops
      { path: "details/:id", component: HomeComponent },
      { path: "details/:id/:notEditable", component: HomeComponent },
      { path: 'details/:id/:notEditable/:type', component: HomeComponent },
      { path: "details-asm/:id", component: ASMHomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationRoutingModule {}
