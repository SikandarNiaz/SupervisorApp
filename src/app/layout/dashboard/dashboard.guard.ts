import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from "@angular/common";
@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(private router: Router,private location: Location) {}

    canActivate() {
        if (localStorage.getItem('isLoggedin') || this.location.path().indexOf("/details/") > -1 || this.location.path().indexOf("/list/home") > -1
        || this.location.path().indexOf("/dashboard/ndn-interception-summary") > -1 || this.location.path().indexOf("/dashboard/shopper-engagement") > -1
        || this.location.path().indexOf("/dashboard/spin-the-wheel-reward") > -1)   {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
