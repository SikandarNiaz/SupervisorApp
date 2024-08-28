import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardService } from "../layout/dashboard/dashboard.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { HttpErrorResponse } from "@angular/common/http";
import { Config } from "src/assets/config";
import { DecryptionService } from "../decryption.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
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
pmida:boolean=false;
  projectName: any;
  pmirm: boolean = true;
  email: any;
  notOnOrAfter: any;
  samlLoginForm: { userName: any; notOnOrAfter: any; angularRequest: string; };
  hitTime: string | number | Date;
  constructor(
    private router: Router,
    private httpService: DashboardService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private decryptionService: DecryptionService
  ) {}

  ngOnInit() {
    this.hideCookieBanner();
    localStorage.clear();
      this.getProjectNameData();
    const hostName = window.location.hostname;
    console.log("Host Name ",hostName)
    this.pmida = hostName?.indexOf("pmida") >= 0 || hostName?.indexOf("localhost") >= 0;
    // debugger;
    // localStorage.clear();
    this.route.queryParams.subscribe(params => {
      // console.log('Received query params:', params); 

      Object.keys(params).forEach(key => {
        const decryptedKey = this.decryptionService.decrypt(decodeURIComponent(key));
        // console.log(`Decrypted Key: ${decryptedKey}`);

        const encryptedValue = params[key];
        // console.log(`Encrypted Value: ${encryptedValue}`); 

        const decryptedValue = this.decryptionService.decrypt(decodeURIComponent(encryptedValue));
        // console.log(`Decrypted Value for ${decryptedKey}: ${decryptedValue}`); 

        switch (decryptedKey) {
          case 'email': 
            this.email = decryptedValue;
            break;
          case 'notOnOrAfter': 
            this.notOnOrAfter = decryptedValue;
            break;
          case 'currentTime': 
            this.hitTime = decryptedValue;
            break;
          default:
            break;
        }
      });

      // console.log("Final Decrypted Email:", this.email);
      // console.log("Final Decrypted Not On Or After:", this.notOnOrAfter);
      // console.log("Final Decrypted Current Time:", this.hitTime);

      if (this.notOnOrAfter !== "" &&this.notOnOrAfter !== null && this.notOnOrAfter !== undefined) {
        // Check if notOnOrAfter is within one minute from currentTime
        const hitTime = new Date(this.hitTime).getTime();
        const currentTime = new Date().getTime();
        const timeDifference =   currentTime - hitTime
        // debugger;
        if (timeDifference <= 20000 && timeDifference >= 0) { // 60000 milliseconds = 1 minute
          this.samlLoginForm = {
            userName: this.email,
            notOnOrAfter: this.notOnOrAfter,
            angularRequest: "Y",
          };
          this.onLogin(this.samlLoginForm);
        } else {
          console.log("Token Expired");
          // Handle the case where notOnOrAfter is not within one minute from the current time
        }
      }
    });
  }
  private hideCookieBanner(): void {
    const cookieBanner = document.querySelector('.ot-sdk-container') as HTMLElement;
    if (cookieBanner) {
      cookieBanner.style.display = 'none';
    }
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
        localStorage.setItem("regionId", res.user.regionIds);
        localStorage.setItem("projectType", res.projectType);
        var storedProjectType = localStorage.getItem("projectType");
        debugger;
        if (storedProjectType === 'RECKITT_CENSUS') {
          debugger;
          localStorage.setItem("zoneId", res.user.zone_id);
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
  checkProjectType() {
    debugger;
    this.projectType = localStorage.getItem("projectType");
    if (this.projectType === 'PMI_AUDIT') {
      // this.pmida = true;
      // this.injectScript();
    }
  }

  getProjectNameData(){
    debugger;
    this.loadingData = true;
    this.httpService.getProjectName().subscribe(
      (data) => {
        console.log('Data received:', data);
        const res: any = data;

        localStorage.setItem("projectType", res.projectType);
        var storedProjectType = localStorage.getItem("projectType");
        this.projectType=storedProjectType;
        if(storedProjectType === 'PMI_AUDIT'){
          this.pmida=true;
          // this.injectScript();
        }
         console.log("Project Name",storedProjectType,this.pmida);
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
    debugger;
    this.httpService.samlLogin().subscribe(
        (data: string) => {
            debugger;
            console.log("Received redirect URL: " + data);
            if (data && data.trim() !== '') {
              const redirectUrl = data.replace('redirect:', '');
              window.location.replace(data);

            } else {
                console.error("Invalid redirect URL: ", data);
                
            }
        },
        (error) => {
            console.error("SAML Login error: ", error);
            console.error("Status: ", error.status);
            console.error("Status Text: ", error.statusText);
            console.error("Message: ", error.message);
           
        }
    );
}

}
