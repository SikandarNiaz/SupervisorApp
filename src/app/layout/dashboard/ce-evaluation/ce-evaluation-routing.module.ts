import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainPageComponent } from './main-page/main-page.component';
import { EvaluationDetailComponent } from './evaluation-detail/evaluation-detail.component';

const routes: Routes = [
  { path: '',redirectTo:'list' ,pathMatch:'full' },
  { path: 'list', component:MainPageComponent,
children:[
  { path: '', redirectTo:'home',pathMatch:'full'},
  { path: 'home',component:EvaluationDetailComponent },
  { path: 'details/:id',component:HomeComponent },
  { path: 'details/:id/:type',component:HomeComponent },
] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CeEvaluationRoutingModule { }
