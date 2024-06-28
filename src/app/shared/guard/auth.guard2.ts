import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import * as moment from "moment";
import { Location } from "@angular/common";

@Injectable()
export class AuthGuard2 implements CanActivate {
    constructor(private router: Router,private location: Location) {}

    canActivate() {
        
        var t = moment(new Date).format('YYYY-MM-DD');
        var st = localStorage.getItem('today');
        var storedProjectType = localStorage.getItem("projectType");
        console.log("Auth Guard",storedProjectType)
        // if (t > st) this.router.navigate(['/login']);
        if (localStorage.getItem('isLoggedin') && t <= st
        || this.location.path().indexOf("/details/") > -1 || this.location.path().indexOf("/list/home") > -1 || this.location.path().indexOf("/dashboard/ndn-interception-summary") > -1
        || this.location.path().indexOf("/dashboard/shopper-engagement") > -1 || this.location.path().indexOf("/dashboard/spin-the-wheel-reward") > -1 ) {
            return true;
        }
        if (storedProjectType == 'PMI_AUDIT') {
            this.router.navigate(['/admin-login']);
        }else{
        this.router.navigate(['/login']);
        }
        return false;
    }
}
