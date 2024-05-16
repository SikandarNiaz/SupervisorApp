import { Component, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { CeShoptargetService } from "../ce-shoptarget.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgModel } from "@angular/forms";
import { environment } from "src/environments/environment";
import { Alert } from "selenium-webdriver";
import { Config } from "src/assets/config";
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
  selector: "app-evaluation-detail",
  templateUrl: "./evaluation-detail.component.html",
  styleUrls: ["./evaluation-detail.component.scss"],
})
export class EvaluationDetailComponent implements OnInit {
  // ip = environment.ip;
  @ViewChild("childModal", { static: true }) childModal: ModalDirective;
  configFile = Config;
  title = "Shop Target Update";
  ip: any = this.configFile.BASE_URI;
  tableData: any = [];
  loading: boolean;
  zones: any = [];
  selectedZone: any = {};
  regions: any = [];
  selectedRegion: any = {};
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();
  shopList: any = [];
  selectedShop: any = [];
  selectedItem: any = {};
  type = -1;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: CeShoptargetService,
    private activeRoute: ActivatedRoute
  ) {

    this.zones = JSON.parse(localStorage.getItem("zoneList"));
    this.type = 4;

  }

  ngOnInit() {

    this.getShops();
  }

  showChildModal(): void {
    this.childModal.show();
  }
  hideChildModal(): void {
    this.childModal.hide();
  }

  setSelectedItem(item) {
    this.selectedItem = item;
  }
  getShops() {
    this.loading = true;

    this.httpService
      .getShopByZoneAndRegion(
        this.selectedZone.id || -1,
        this.selectedRegion.id || -1
      )
      .subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.shopList = res;
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

  getShopTargetDetails() {
    this.loading = true;
    const obj = {
      shopId: this.arrayMaker(this.selectedShop),
      regionId: this.selectedRegion.id || -1,
      zoneId: this.selectedZone.id || -1,
      type: this.type,
    };
    this.httpService.getShopDataForUpdateTarget(obj).subscribe(
      (data) => {
        // console.log(data);
        this.tableData = data;
        if (this.tableData.length === 0) {
          this.loading = false;
          this.toastr.info("No record found.");
          setTimeout(() => {}, 3000);
        }
        this.loading = false;
      },
      (error) => {
        this.toastr.info("There was some error extracting the Data.");
        this.loading = false;
      }
    );
  }

  arrayMaker(arr) {
    const all = arr.filter((a) => a === "all");
    const result: any = [];
    if (all[0] === "all") {
      arr = this.shopList;
    }
    arr.forEach((e) => {
      result.push(e.id);
    });
    return result;
  }

  selectAll(select: NgModel, values) {
    select.update.emit(values);
  }

  deselectAll(select: NgModel) {
    select.update.emit([]);
  }

  equals(objOne, objTwo) {
    if (typeof objOne !== "undefined" && typeof objTwo !== "undefined") {
      return objOne.id === objTwo.id;
    }
  }

  goToUpdateTargetPage(item) {
      window.open(
        `${environment.hash}dashboard/ce_shoptarget/list/details/${item.id}/${this.type}`,
        "_blank"
      );

  }
  
  zoneChange() {
    this.loading = true;
    this.selectedRegion.id = -1;
    this.getShops();
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
