import {
  Component,
  OnInit,
  AfterViewChecked,
  Input,
  ViewChild,
  ViewChildren,
  ɵSWITCH_COMPILE_NGMODULE__POST_R3__,
} from "@angular/core";
import { DashboardService } from "../../dashboard.service";
import * as moment from "moment";
import { subscribeOn } from "rxjs/operators";
import { Router } from "@angular/router";
import { DashboardDataService } from "../../dashboard-data.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { MatTableDataSource } from "@angular/material";
import { environment } from "src/environments/environment";
import { NgModel } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap";
import * as _ from "lodash";
import { config } from "src/assets/config";

@Component({
  selector: "app-assign-shops",
  templateUrl: "./assign-shops.component.html",
  styleUrls: ["./assign-shops.component.scss"],
})
export class AssignShopsComponent implements OnInit {
  @ViewChildren("checked") private myCheckbox: any;
  @ViewChild("childModal") childModal: ModalDirective;
  @ViewChild("shopInfoModal") shopInfoModal: ModalDirective;
  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    private dataService: DashboardDataService
  ) {
    this.zones = JSON.parse(localStorage.getItem("zoneList"));
  }
  tableData: any = [];
  configFile = config;
  ip: any = this.configFile.ip;
  title = "Assign Shops";
  zones: any = [];
  loadingData: boolean;
  regions: any = [];
  programs: any = [];
  surveyors: any = [];
  selectedShops = [];
  selectedZone: any = {};
  selectedProgram = -1;
  selectedSurveyor = -1;
  selectedRegion: any = {};
  regionId = -1;
  response: any = "";
  loadingReportMessage = false;
  tabsData: any;
  loading = false;
  sortOrder = true;
  sortBy: "m_code";
  shopId: Number;
  selectedItem: any = {};
  panelOpenState = false;

  ngOnInit() {}
  zoneChange() {
    this.loadingData = true;
    this.selectedRegion.id = -1;
    this.httpService.getRegion(this.selectedZone.id).subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.regions = res;
        } else {
          this.clearLoading();

          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }

        setTimeout(() => {
          this.loadingData = false;
        }, 500);
      },
      (error) => {
        this.clearLoading();
      }
    );
  }

  setSelectedItem(item) {
    this.selectedItem = item;
  }

  getTabsData() {
    this.loadingData = true;
    this.loading = true;
    const obj: any = {
      zoneId: this.selectedZone.id ? this.selectedZone.id : -1,
      regionId: this.selectedRegion.id ? this.selectedRegion.id : -1,
    };

    this.httpService.getShopData(obj).subscribe(
      (data) => {
        this.loadingData = false;
        const res: any = data;
        if (res) {
          this.tabsData = data;
        }
        this.loading = false;
      },
      (error) => {
        this.clearLoading();

        console.log(error, "home error");
      }
    );
  }

  clearLoading() {
    this.loading = false;
    this.loadingData = false;
    this.loadingReportMessage = false;
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

  showChildModal(shopId): void {
    this.shopId = shopId;
    this.loadPrograms();
    this.childModal.show();
  }

  hideChildModal() {
    this.selectedSurveyor = -1;
    this.selectedProgram = -1;
    this.programs = [];
    this.surveyors = [];
    this.childModal.hide();
  }

  showShopInfoModal(): void {
    this.shopInfoModal.show();
  }

  hideShopInfoModal() {
    this.shopInfoModal.hide();
  }

  loadPrograms() {
    this.loadingData = true;
    this.httpService.getPrograms().subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.programs = res;
        } else {
          this.clearLoading();

          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }

        setTimeout(() => {
          this.loadingData = false;
        }, 500);
      },
      (error) => {
        this.clearLoading();
      }
    );
  }

  getSurveyors() {
    this.loadingData = true;
    this.httpService
      .getSurveyors(
        this.selectedProgram,
        this.selectedZone.id || -1,
        this.selectedRegion.id || -1
      )
      .subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.surveyors = res;
          } else {
            this.clearLoading();

            this.toastr.info(
              "Something went wrong,Please retry",
              "Connectivity Message"
            );
          }

          setTimeout(() => {
            this.loadingData = false;
          }, 500);
        },
        (error) => {
          this.clearLoading();
        }
      );
  }

  // checkUncheckAll(event) {
  //   if (event.checked == true) {
  //     for (let i = 0; i < this.tabsData.length; i++) {
  //       this.selectedShops.push(this.tabsData[i].id);
  //     }
  //     for (let index = 0; index < this.myCheckbox._results.length; index++) {
  //       this.myCheckbox._results[index]._checked = true;
  //     }
  //   } else {
  //     for (let i = 0; i < this.tabsData.length; i++) {
  //       this.selectedShops = [];
  //     }
  //     for (let index = 0; index < this.myCheckbox._results.length; index++) {
  //       this.myCheckbox._results[index]._checked = false;
  //     }
  //   }
  //   console.log(this.selectedShops);
  // }

  // checkUncheckSingle(event, item) {
  //   if (!event.checked) {
  //     this.selectedShops.push(item.id);
  //   } else {
  //     const i = this.selectedShops.indexOf(item.id);
  //     this.selectedShops.splice(i, 1);
  //   }

  //   console.log(this.selectedShops);
  // }

  AssignShops() {
    const obj = {
      shopId: this.shopId,
      surveyorId: this.selectedSurveyor,
      programId: this.selectedProgram,
      action: 1,
    };
    this.loadingData = true;
    this.httpService.ActiveDeactiveShops(obj).subscribe((data) => {
      if (data) {
        this.response = data;
        this.getTabsData();
        this.hideChildModal();
        this.selectedShops = [];
        if (this.response.length > 0) {
          this.loadingData = false;
          this.toastr.success(this.response, "Success");
        }
      } else {
        this.loadingData = false;
        this.childModal.hide();
        this.toastr.error("There is an error in ur file!!");
      }
    });
  }

  DeactivateRoute(shopId, surveyorId) {
    const obj = {
      shopId: shopId,
      surveyorId: surveyorId,
      programId: this.selectedProgram,
      action: 2,
    };
    this.loadingData = true;
    this.httpService.ActiveDeactiveShops(obj).subscribe((data) => {
      if (data) {
        this.response = data;
        this.getTabsData();
        this.hideChildModal();
        this.selectedShops = [];
        if (this.response.length > 0) {
          this.loadingData = false;
          this.toastr.success(this.response, "Success");
        }
      } else {
        this.loadingData = false;
        this.childModal.hide();
        this.toastr.error("There is an error in ur file!!");
      }
    });
  }

  getTaggings(shop) {}

  asIsOrder(a, b) {
    return 1;
  }
}
