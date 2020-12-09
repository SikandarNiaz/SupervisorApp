import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  hideSideBar = false; // make default value to false after completing SMS manager;
  isTableauRequest = false;

  constructor(public router: Router) {}

  ngOnInit() {
    // Hide Side Bar for Tableau Urls
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        // tslint:disable-next-line:triple-equals
        if (
          e.url == "/dashboard/performance-dashboard" ||
          e.url == "/dashboard/productivity-dashboard" ||
          e.url == "/dashboard/sale-analysis-dashboard" ||
          e.url == "/dashboard/pgjordan-summary-dashboard" ||
          e.url == "/dashboard/census-productivity-dashboard"
        ) {
          this.hideSideBar = true;
          this.isTableauRequest = true;
        }
      });

    // For Shop Detail Page , Hide Side Bar
    let url: any = new Array();
    url = this.router.url.split(/[?/]/);
    const t: any = url.find((d) => d === "merchandiserAttendanceDetail");
    const r: any = url.find((d) => d === "details");
    if (t || r) {
      this.hideSideBar = true;
    }
  }

  hideBarStatus() {
    if (this.hideSideBar === true) {
      this.hideSideBar = false;
    } else {
      this.hideSideBar = true;
    }
  }
}
