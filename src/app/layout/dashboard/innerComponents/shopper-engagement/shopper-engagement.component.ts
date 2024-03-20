import {
    Component,
    OnInit,
    AfterViewChecked,
    Input,
    ViewChild,
  } from "@angular/core";
  import { DashboardService } from "../../dashboard.service";
  import * as moment from "moment";
  import { Router } from "@angular/router";
  import { ToastrService } from "ngx-toastr";
  import * as _ from "lodash";
  import { environment } from "src/environments/environment";
  import { FlexLayoutModule } from '@angular/flex-layout';
import { interval } from "rxjs";
  @Component({
    selector: "app-shopper-engagement",
    templateUrl: "./shopper-engagement.component.html",
    styleUrls: ["./shopper-engagement.component.scss"],
  })
  export class ShopperEngagementComponent implements OnInit {
    dashboardStatsObj: any={};
    filteredList: any;
    constructor(
      private toastr: ToastrService,
      private httpService: DashboardService,
      public router: Router
    ) {
      this.labels = JSON.parse(localStorage.getItem("labelProperties"));
      if (!this.labels) {
        // Set default values
        this.labels = {
          surveyorLabel: "BA",
          zoneLabel: "Zone",
          regionLabel: "Region"
          // Add other default labels as needed
        };
      }
      console.log(this.zones);
    }
    labels: any;
    title = "Shopper Engagement";
    loadingData: boolean;
    loading: boolean;
    selectedZone: any = {};
    selectedRegion: any = {};
    successful: any = {};
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
    ngOnInit() {
      this.projectType = localStorage.getItem("projectType");
      this.getZoneList();
      this.getStores();
      this.getDashboardData();
      const refreshInterval = 10000;
      interval(refreshInterval).subscribe(() => {
        this.getTabsData();
      });
      if (this.projectType == "NFL") {
        this.getSurveyorsAndBrands();
      }
    }
  
    zoneChange() {
      this.loading = true;
      this.selectedRegion.id = -1;
      this.getDashboardData();
      this.httpService.getRegion(this.selectedZone.id).subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.regions = res;
          } else {
            this.loading = false;
            this.toastr.info(
              "Something went wrong,Please retry",
              "Connectivity Message"
            );
          }
          this.getStores();
  
          setTimeout(() => {
            this.loading = false;
          }, 500);
        },
        (error) => {
          this.loading = false;
        }
      );
    }
  
    regionChange() {
      this.loading = true;
      this.selectedStore.id = -1;
      this.httpService
        .getShops(this.selectedZone.id, this.selectedRegion.id)
        .subscribe(
          (data) => {
            const res: any = data;
            if (res) {
              this.stores = res;
            } else {
              this.loading = false;
  
              this.toastr.info(
                "Something went wrong,Please retry",
                "Connectivity Message"
              );
            }
  
            setTimeout(() => {
              this.loading = false;
            }, 500);
          },
          (error) => {
            this.loading = false;
          }
        );
    }
  
    getZoneList() {
      this.loading = true;
      this.httpService.getZone().subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.zones = res.zoneList;
          } else {
            this.loading = false;
  
            this.toastr.info(
              "Something went wrong,Please retry",
              "Connectivity Message"
            );
          }
  
          setTimeout(() => {
            this.loading = false;
          }, 500);
        },
        (error) => {
          this.loading = false;
        }
      );
    }
    getTabsData() {
      const obj = {
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
        zoneId: this.selectedZone.id
        ? this.selectedZone.id == -1
          ? localStorage.getItem("zoneId")
          : this.selectedZone.id
        : localStorage.getItem("zoneId"),
    regionId: this.selectedRegion.id
        ? this.selectedRegion.id == -1
          ? localStorage.getItem("regionId")
          : this.selectedRegion.id
        : localStorage.getItem("regionId"),
        shopId: this.selectedStore.id || -1,
        brandId: this.selectedBrand.id || -1,
      };
  
      this.httpService.getShopperEngagementList(obj).subscribe((data: any) => {
         console.log('Shopper Engagement',data);
        if (data) {
          this.tableData = data;
          this.getDashboardStats();
        }
        this.loading = false;
        this.loadingData=false;
      });
    }
    
    getDashboardStats() {
    //   this.dashboardStatsObj.PlannedStores = this.tableData.length
  
    this.dashboardStatsObj.PlannedStores = this.tableData.reduce((sum, item) => sum + item.PlannedStores, 0);
    this.dashboardStatsObj.ActiveStores = this.tableData
  .map((a) => parseInt(a.ActiveStores, 10) || 0)
  .reduce((a, b) => a + b, 0);
  this.dashboardStatsObj.FOCGiven = this.tableData
  .map((a) => parseInt(a.FOCGiven, 10) || 0)
  .reduce((a, b) => a + b, 0);
  this.dashboardStatsObj.FOCPlanned = this.tableData
  .map((a) => parseInt(a.FOCPlanned, 10) || 0)
  .reduce((a, b) => a + b, 0);

        // this.dashboardStatsObj.ActiveStores = this.tableData
        // .map((a) => a.ActiveStores).reduce((a, b) => a + b, 0);
        // this.dashboardStatsObj.FOCGiven = this.tableData
        // .map((a) => a.FOCGiven).reduce((a, b) => a + b, 0);
        // this.dashboardStatsObj.FOCPlanned = this.tableData
        // .map((a) => a.FOCPlanned).reduce((a, b) => a + b);
        
    //   this.dashboardStatsObj.Impressions = this.tableData
    //     .map((a) => a.Impressions)
    //     .reduce((a, b) => a + b, 0);
    //   this.dashboardStatsObj.Successful = this.tableData
    //     .map((a) => a.Successful)
    //     .reduce((a, b) => a + b, 0);
    //     this.dashboardStatsObj.Successful_per = (
    //       (this.dashboardStatsObj.Successful * 100) /
    //       this.dashboardStatsObj.Impressions
    //     ).toFixed();
        
    //     this.dashboardStatsObj.Successful=this.dashboardStatsObj.Successful+"("+this.dashboardStatsObj.Successful_per+"%)";
  
    //   this.dashboardStatsObj.successful_per_day = this.tableData
    //     .map((a) => a.successful_per_day)
    //     .reduce((a, b) => a + b, 0);
  
    //   this.dashboardStatsObj.TotalSale = this.tableData
    //     .map((a) => a.TotalSale)
    //     .reduce((a, b) => a + b, 0);
  
    //     this.dashboardStatsObj.unit_sale_per_day = this.tableData
    //     .map((a) => a.unit_sale_per_day)
    //     .reduce((a, b) => a + b, 0);
  
    //   if (this.projectType == "Coke_Audit") {
    //  this.setChartData();
    //   }
    }
    
    getDashboardData() {
      this.loadingData = true;
      const obj = {
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
        zoneId:this.selectedZone.id
        ? this.selectedZone.id == -1
          ? localStorage.getItem("zoneId")
          : this.selectedZone.id
        : localStorage.getItem("zoneId"),
        regionId:this.selectedRegion.id
        ? this.selectedRegion.id == -1
          ? localStorage.getItem("regionId")
          : this.selectedRegion.id
        : localStorage.getItem("regionId"),
        shopId: this.selectedStore.id || -1,
        brandId: this.selectedBrand.id || -1,
      };
      this.loading = true;
      this.getTabsData();
      // this.httpService.getDashboardStats(obj).subscribe((data: any) => {
      //   this.loadingData = false;
      //   if (data) {
      //     this.dashboardData = data;
      //   }
      //   this.loading = false;
      // });
    }
  
    getArrowType(key) {
      if (key === this.sortBy) {
        return this.sortOrder ? "arrow_upward" : "arrow_downward";
      } else {
        return "";
      }
    }
    sortIt(key) {
      this.sortBy = key;
      this.sortOrder = !this.sortOrder;
    }
    modifyDate(date) {
      return moment(date).format("YYYY-MM-DD");
    }
  
    goToNewPage(item) {
      window.open(
        `${environment.hash}dashboard/spin-the-wheel-reward?regionId=${
          item.id
        }&startDate=${this.modifyDate(this.startDate)}&endDate=${this.modifyDate(
          this.endDate
        )}`,
        "_blank"
      );
    }
  
    getStores() {
      this.loading = true;
      this.httpService
        .getShops(this.selectedZone.id || -1, this.selectedRegion.id || -1)
        .subscribe(
          (data) => {
            const res: any = data;
            if (res) {
              this.stores = res;
            } else {
              this.loading = false;
  
              this.toastr.info(
                "Something went wrong,Please retry",
                "Connectivity Message"
              );
            }
  
            setTimeout(() => {
              this.loading = false;
            }, 500);
          },
          (error) => {
            this.loading = false;
          }
        );
    }
    getSurveyorsAndBrands() {
      this.loading = true;
  
      this.httpService.getSurveyorsAndBrands().subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.brandList = res.brandList;
          } else {
            this.loading = false;
  
            this.toastr.info(
              "Something went wrong,Please retry",
              "Connectivity Message"
            );
          }
  
          setTimeout(() => {
            this.loading = false;
          }, 500);
        },
        (error) => {
          this.loading = false;
        }
      );
    }
  }
  