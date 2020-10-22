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
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
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
  ngOnInit() {
    this.projectType = localStorage.getItem("projectType");
    //  NO SUMMARY AVAILABLE IN SOME PROJECTS SCOPE
    if (this.projectType != "PGJORDAN" && this.projectType != "PMI_CENSUS") {
      this.getZoneList();
      this.getStores();
      this.getSurveyorsAndBrands();
      this.getDashboardData();
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
    this.getDashboardData();
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
      zoneId: this.selectedZone.id || -1,
      regionId: this.selectedRegion.id || -1,
      shopId: this.selectedStore.id || -1,
      brandId: this.selectedBrand.id || -1,
    };

    this.httpService.getBAList(obj).subscribe((data: any) => {
      // console.log('merchandiser list for evaluation',data);
      if (data) {
        this.tableData = data;
      }
      this.loading = false;
    });
  }
  getDashboardData() {
    this.loadingData = true;
    const obj = {
      startDate: moment(this.startDate).format("YYYY-MM-DD"),
      endDate: moment(this.endDate).format("YYYY-MM-DD"),
      zoneId: this.selectedZone.id || -1,
      regionId: this.selectedRegion.id || -1,
      shopId: this.selectedStore.id || -1,
      brandId: this.selectedBrand.id || -1,
    };
    this.loading = true;
    this.getTabsData();
    this.httpService.getDashboardStats(obj).subscribe((data: any) => {
      this.loadingData = false;
      if (data) {
        this.dashboardData = data;
      }
      this.loading = false;
    });
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
      `${environment.hash}dashboard/merchandiserAttendanceDetail?surveyorId=${
        item.id
      }&startDate=${this.modifyDate(this.startDate)}&endDate=${this.modifyDate(
        this.endDate
      )}`,
      "_blank"
    );
  }

  getStores() {
    this.getDashboardData();
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
