import {
  Component,
  OnInit,
  AfterViewChecked,
  Input,
  ViewChild,
} from "@angular/core";
import { DashboardService } from "../../dashboard.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as _ from "lodash";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  user: string;
  userType: string;
  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router
  ) {
    console.log(this.zones);
  }
  title = "Productivity";
  loadingData: boolean;
  loading: boolean;
  selectedZone: any = {};
  selectedRegion: any = {};
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  regions: any = [];
  selectedBrand: any = {};
  dashboardData: any = {};
  brandList: any = [];
  stores: any = [];
  sortOrder = true;
  sortBy: "m_code";
  projectType = "";
  selectedStore: any = {};
  endDate = new Date();
  zones: any = [];
  tableData: any = [];
  isBaModule: boolean;
  isBaModule1: boolean;
  
  ngOnInit() {
    this.projectType = localStorage.getItem("projectType");
   this.userType = localStorage.getItem("user_type");
    debugger;
    if (
      
      this.projectType == "NIVEA" ||
      this.projectType == "NDN" ||
      this.projectType == "DALDA"||
      this.projectType == "SAMSUNG"||
      this.projectType == "PILOT_BA" ||
      this.projectType == "DIPITT"
    ) {
      this.isBaModule = true;
    }
    else if (this.projectType == "NFL" && this.userType!=='9')
    {this.isBaModule = true;}
    else if (this.projectType == "NDN_KT")
    {
      this.isBaModule1 = true;
    }
    else{

    }
  }
}
