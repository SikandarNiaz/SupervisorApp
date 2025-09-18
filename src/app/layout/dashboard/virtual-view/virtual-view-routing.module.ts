import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { VoTrackingComponent } from './vo-tracking/vo-tracking.component';
import { DataTrackingComponent } from './data-tracking/data-tracking.component';
import { UnvisistedMapComponent } from './unvisisted-map/unvisisted-map.component';
import { CapturedShopsComponent } from './captured-shops/captured-shops.component';
import { VoLiveTrackingComponent } from './vo-live-tracking/vo-live-tracking.component';
import { RouteTrackerComponent } from './route-tracker/route-tracker.component';
import { NdnVoLiveTrackingComponent } from './ndn-vo-live-tracking/ndn-vo-live-tracking-component';
import { NdnRouterTrackerComponent } from './ndn-router-tracker/ndn-router-tracker.component';
import { PtcRouteTrackerComponent } from './ptc-router-tracker/ptc-router-tracker.component';
import { TransmedVoLiveTrackingComponent } from './transmed-tracking/transmed-vo-live-tracking.component';
import { TransmedRouteTrackerComponent } from './transmed-router-tracker/transmed-router-tracker.component';
import { CensusRouteTrackerComponent } from './census-router-tracker/census-router-tracker-component';
const routes: Routes = [
  { path: '',redirectTo:'list' ,pathMatch:'full' },
  { path: 'list', component:MainComponent,
children:[
  { path: '', redirectTo:'tracking',pathMatch:'full'},
  { path: 'tracking',component:VoTrackingComponent },
  { path: 'data-tracking',component:DataTrackingComponent },
  { path: 'unvisisted-map',component:UnvisistedMapComponent },
  { path: 'captured-shops',component:CapturedShopsComponent },
  { path: 'vo-live-tracking',component:VoLiveTrackingComponent },
  { path: 'route-tracker',component:RouteTrackerComponent },
  {
    path:"ndn-VoLiveTracking",
    component:NdnVoLiveTrackingComponent
          },
          {
            path:"ndn-routerTracker",
            component:NdnRouterTrackerComponent
                  },
  {
    path:"ptc-routerTracking",
    component:PtcRouteTrackerComponent
  },
  { path: 'transmed-tracking',component:TransmedVoLiveTrackingComponent },
  { path: 'transmed-routerTracking',component:TransmedRouteTrackerComponent },
  { path: 'census-routerTracking',component:CensusRouteTrackerComponent },              

  // { path: 'vo-live-tracking/:surveyorId', component: VoLiveTrackingComponent }
  
] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualViewRoutingModule { }
