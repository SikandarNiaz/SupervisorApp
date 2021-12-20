import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DashboardService } from "../layout/dashboard/dashboard.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { HttpErrorResponse } from "@angular/common/http";
import { Config } from "src/assets/config";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  background_color = Config.login_theme_color;
  login_logo = Config.login_logo;
  supPlaceHolder: any;
  loginForm: any = {
    userName: "",
    password: "",
    angularRequest: "Y",
  };
  loading = false;
  constructor(
    private router: Router,
    private httpService: DashboardService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    localStorage.clear();
  }

  onLogin(loginForm: any) {
    this.loading = true;
    // console.log(loginForm);

    this.httpService.login(loginForm).subscribe(
      (data: Response) => {
        const res: any = data;
        localStorage.setItem("isLoggedin", "true");
        localStorage.setItem("today", moment(new Date()).format("YYYY-MM-DD"));
        localStorage.setItem("user_id", res.user.user_id);
        localStorage.setItem("user_type", res.user.typeID);
        localStorage.setItem("user_name", res.user.userName);
        localStorage.setItem(
          "regionId",
          res.user.regionId == 0 ? -1 : res.user.regionId
        );
        localStorage.setItem(
          "zoneId",
          res.user.zone_id == 0 ? -1 : res.user.zone_id
        );
        localStorage.setItem(
          "surveyorId",
          res.user.surveyorId == 0 ? -1 : res.user.surveyorId
        );
        localStorage.setItem("menu", JSON.stringify(res.list));
        localStorage.setItem("Evaluator", res.Evaluator);
        localStorage.setItem("projectType", res.projectType);
        localStorage.setItem("amRole", res.amRole);
        localStorage.setItem(
          "labelProperties",
          JSON.stringify(res.labelProperties)
        );
        this.router.navigate(["/dashboard"]);

        setTimeout(() => {
          this.loading = false;
        }, 30000);
      },
      (error: any) => {
        debugger;
        this.toastr.error("Incorrect Username or Password", "Login Status");
        console.log("error", error);
        this.loading = false;
      }
    );
  }
  // setPlaceHolders(projectType) {
  //   if (projectType == "NFL") {
  //     this.zonePlaceHolder = "Cluster";
  //     this.regionPlaceHolder = "City";
  //     this.resourcePlaceHolder = "B";
  //     this.supPlaceHolder = "Supervisor";
  //   } else if (projectType == "NDN") {
  //     this.zonePlaceHolder = "Region";
  //     this.regionPlaceHolder = "Territory";
  //     this.resourcePlaceHolder = "BA";
  //     this.supPlaceHolder = "Supervisor";
  //   } else if (projectType == "PMI_CENSUS") {
  //     this.zonePlaceHolder = "Zone";
  //     this.regionPlaceHolder = "Region";
  //     this.resourcePlaceHolder = "BDE";
  //     this.supPlaceHolder = "AM";
  //   } else {
  //     this.zonePlaceHolder = "Zone";
  //     this.regionPlaceHolder = "Region";
  //     this.resourcePlaceHolder = "Surveyor";
  //     this.supPlaceHolder = "Supervisor";
  //   }
  //   localStorage.setItem("zonePlaceHolder", this.zonePlaceHolder);
  //   localStorage.setItem("regionPlaceHolder", this.regionPlaceHolder);
  //   localStorage.setItem("resourcePlaceHolder", this.resourcePlaceHolder);
  //   localStorage.setItem("supPlaceHolder", this.supPlaceHolder);
  // }
}
