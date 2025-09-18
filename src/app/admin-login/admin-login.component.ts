import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardService } from "../layout/dashboard/dashboard.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { HttpErrorResponse } from "@angular/common/http";
import { Config } from "src/assets/config";
@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.scss"],
})
export class AdminLoginComponent implements OnInit {
  background_color = Config.login_theme_color;
  login_logo = Config.login_logo;
  login_logo1 = Config.main_logo_velo;
  supPlaceHolder: any;
  loginForm: any = {
    userName: "",
    password: "",
    angularRequest: "Y",
  };
  projectType: any;
  loading = false;
  loadingData: boolean;
  projectName: any;
  pmirm: boolean = true;
  email: any;
  notOnOrAfter: any;
  samlLoginForm: { userName: any; notOnOrAfter: any; angularRequest: string; };
  constructor(
    private router: Router,
    private httpService: DashboardService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    localStorage.clear();
    this.getProjectNameData();
    const hostName = window.location.hostname;
    this.pmirm = hostName?.indexOf("pmida") >= 0 || hostName?.indexOf("localhost") >= 0;
    // debugger;
    // localStorage.clear();
    this.route.queryParams.subscribe((params) => {
      this.email = params["email"];
      this.notOnOrAfter = params["notOnOrAfter"];
      console.log("Email:", this.email);
      console.log("Not On Or After:", this.notOnOrAfter);

      if (this.notOnOrAfter !== null && this.notOnOrAfter !== undefined) {
        this.samlLoginForm = {
          userName: this.email,
          notOnOrAfter: this.notOnOrAfter,
          angularRequest: "Y",
        };
        this.onLogin(this.samlLoginForm);
      }
    });
   
  }

  onLogin(loginForm: any) {
    this.loading = true;
    // console.log(loginForm);

    this.httpService.login(loginForm).subscribe(
      (data: Response) => {
        console.log ("Login Data ",data)
        const res: any = data;
        localStorage.setItem("isLoggedin", "true");
        localStorage.setItem("today", moment(new Date()).format("YYYY-MM-DD"));
        localStorage.setItem("user_id", res.user.user_id);
        localStorage.setItem("user_type", res.user.typeID);
        localStorage.setItem("user_name", res.user.userName);
        localStorage.setItem("regionId", res.user.regionIds);
        localStorage.setItem("projectType", res.projectType);
        var storedProjectType = localStorage.getItem("projectType");
        debugger;
        if (storedProjectType === 'RECKITT_CENSUS'|| storedProjectType === 'PMI_CENSUS') {
          debugger;
          localStorage.setItem("zoneId", res.user.zone_id);
          localStorage.setItem("regionId", res.user.regionId);
        }else{
          localStorage.setItem("zoneId", res.user.zoneIds);
        }
        localStorage.setItem(
          "surveyorId",
          res.user.surveyorId == 0 ? -1 : res.user.surveyorId
        );
        localStorage.setItem("menu", JSON.stringify(res.list));
        localStorage.setItem("Evaluator", res.Evaluator);
        localStorage.setItem("AsmEvaluator", res.AsmEvaluator);
        localStorage.setItem("ReEvaluator", res.ReEvaluator);
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

  getProjectNameData(){
    this.loadingData = true;
    this.httpService.getProjectName().subscribe(
      (data) => {
        console.log('Data received:', data);
        const res: any = data;
        localStorage.setItem("projectType", res.projectType);
        var storedProjectType = localStorage.getItem("projectType");
        this.projectType=storedProjectType;
         console.log("Project Name",storedProjectType);
        if (res) {
          this.projectName = res;
          this.loadingData = false;
        } else {
          this.loadingData = false;
          this.toastr.info("Something went wrong, please retry", "Connectivity Message");
        }
      },
      (error) => {
        this.loadingData = false;
        this.toastr.error("Failed to load Project Name", "Error");
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
  samlLogin() {
    this.httpService.samlLogin().subscribe(
        (data: string) => {
            debugger;
            console.log("Received redirect URL: " + data);
            if (data && data.trim() !== '') {
              const redirectUrl = data.replace('redirect:', '');
              window.location.replace(data);

              // + '?_format=' + encodeURIComponent('text/plain')
              // Redirect if data is valid
            } else {
                console.error("Invalid redirect URL: ", data);
                // Handle the error condition, e.g., display an error message to the user
            }
        },
        (error) => {
            console.error("SAML Login error: ", error);
            console.error("Status: ", error.status);
            console.error("Status Text: ", error.statusText);
            console.error("Message: ", error.message);
            // Handle the error condition, e.g., display an error message to the user
        }
    );
}
// agreeToTerms = false;
// onCheckboxChange(event: any): void {
//   console.log("event: ",event);
//   console.log("event.checked: ",event?.checked);
//   this.agreeToTerms = event.checked;
//   if (this.agreeToTerms) {
//       window.open('https://www.pmiprivacy.com/global/en/consumer/', '_blank');
//   }
// }

// onCheckboxChangeNew(){
// // window.open('https://www.pmiprivacy.com/global/en/consumer/', '_blank');
// window.open('https://pmirm.rtdtradetracker.com/images/PMI%20Employee%20Privacy%20Statement.pdf', '_blank');
// }

}
