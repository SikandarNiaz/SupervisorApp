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
  url: any;

  constructor(public router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.url = e.url;
        // tslint:disable-next-line:triple-equals
        if (
          e.url == "/dashboard/performance-dashboard" ||
          e.url == "/dashboard/productivity-dashboard" ||
          e.url == "/dashboard/sale-analysis-dashboard"
        ) {
          this.hideSideBar = true;
        }
      });
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
