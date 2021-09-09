import {
  Component,
  OnInit,
  AfterViewChecked,
  Input,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { EvaluationService } from "../evaluation.service";
import * as moment from "moment";
import { subscribeOn } from "rxjs/operators";
import { Router } from "@angular/router";
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
import { Config } from "src/assets/config";

@Component({
  selector: "app-flagged-shops",
  templateUrl: "./flagged-shops-list.component.html",
  styleUrls: ["./flagged-shops-list.component.scss"],
})
export class FlaggedShopsListComponent implements OnInit {
  @ViewChildren("checked") private myCheckbox: any;
  @ViewChild("childModal") childModal: ModalDirective;
  labels: any;
  constructor(
    private toastr: ToastrService,
    private httpService: EvaluationService,
    public router: Router
  ) {
    this.zones = JSON.parse(localStorage.getItem("zoneList"));
    this.userType = localStorage.getItem("user_type");
    this.evaluatorRole = localStorage.getItem("Evaluator");
    this.amRole = localStorage.getItem("amRole");
    this.maxDate.setDate(this.maxDate.getDate() - 1);
    this.startDate.setDate(this.startDate.getDate() - 1);
    this.endDate.setDate(this.endDate.getDate() - 1);
    this.labels=JSON.parse(localStorage.getItem("labelProperties"));
  }
  tableData: any = [];
  title = "Visited Shops";
  loadingData: boolean;
  surveyorList: any = [];
  selectedShops = [];
  selectedSurveyor: any = [];
  response: any = "";
  loadingReportMessage = false;
  tabsData: any = [];
  loading = false;
  sortOrder = true;
  shopList: any = [];
  sortBy: "m_code";
  shopRemarkList: any = [];
  flagRemarkList: any = [];
  selectedShopRemark: any = {};
  selectedFlagRemark: any = {};

  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();

  zones: any = [];
  regions: any = [];
  selectedZone: any = {};
  selectedRegion: any = {};

  userType: any;
  evaluatorRole: any;
  amRole: any;

  ngOnInit() {
    this.loadSurveyors();
    this.loadFlagRemarks();
    this.loadShopRemarks();
    const that = this;
    document.addEventListener("visibilitychange", function (e) {
      console.log(document.hidden);
      if (!document.hidden && that.selectedSurveyor.length > 0) {
        that.loadFlaggedShops();
      }
    });
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

  checkUncheckAll(event) {
    if (event.checked == true) {
      for (let i = 0; i < this.tabsData.length; i++) {
        this.selectedShops.push(this.tabsData[i].id);
      }
      for (let index = 0; index < this.myCheckbox._results.length; index++) {
        this.myCheckbox._results[index]._checked = true;
      }
    } else {
      for (let i = 0; i < this.tabsData.length; i++) {
        this.selectedShops = [];
      }
      for (let index = 0; index < this.myCheckbox._results.length; index++) {
        this.myCheckbox._results[index]._checked = false;
      }
    }
    console.log(this.selectedShops);
  }

  checkUncheckSingle(event, item) {
    if (!event.checked) {
      this.selectedShops.push(item.id);
    } else {
      const i = this.selectedShops.indexOf(item.id);
      this.selectedShops.splice(i, 1);
    }

    console.log(this.selectedShops);
  }

  loadFlaggedShops() {
    const obj = {
      surveyorId: this.arrayMaker(this.selectedSurveyor),
      shopRemarkId: this.selectedShopRemark.id || -1,
      flagRemarkId: this.selectedFlagRemark.id || -1,
      startDate: moment(this.startDate).format("YYYY-MM-DD"),
      endDate: moment(this.endDate).format("YYYY-MM-DD"),
    };
    this.loadingData = true;
    this.httpService.getFlaggedShops(obj).subscribe(
      (data) => {
        this.shopList = data;
        if (this.shopList.length === 0) {
          this.loadingData = false;
          this.toastr.info("No record found.");
        }
        this.loadingData = false;
      },
      (error) => {
        this.toastr.info("There was some error extracting the Data.");
        this.loadingData = false;
      }
    );
  }

  loadSurveyors() {
    this.loadingData = true;

    this.httpService
      .getSurveyors(
        this.selectedZone.id || localStorage.getItem("zoneId"),
        this.selectedRegion.id || localStorage.getItem("regionId"),
        localStorage.getItem("surveyorId")
          ? localStorage.getItem("surveyorId") == null
            ? -1
            : localStorage.getItem("surveyorId")
          : -1
      )
      .subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.loadingData = false;
            this.surveyorList = res;
          } else {
            this.loadingData = false;
            this.toastr.info(
              "Something went wrong,Please retry",
              "Connectivity Message"
            );
          }
        },
        (error) => {
          this.loadingData = false;
        }
      );
  }

  loadFlagRemarks() {
    this.loadingData = true;

    this.httpService.getFlagRemarks().subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.flagRemarkList = res;
          this.selectedFlagRemark = this.flagRemarkList[0];
          this.loadingData = false;
        } else {
          this.loadingData = false;

          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  loadShopRemarks() {
    this.loadingData = true;

    this.httpService.getShopRemarks().subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.shopRemarkList = res;
          this.selectedShopRemark = this.shopRemarkList[0];
          this.loadingData = false;
        } else {
          this.loadingData = false;

          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  arrayMaker(arr) {
    const all = arr.filter((a) => a === "all");
    const result: any = [];
    if (all[0] === "all") {
      arr = this.surveyorList;
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

  goToEvaluationPage(item) {
    window.open(
      `${environment.hash}dashboard/evaluation/list/details/${item.survey_id}?flagId=${item.flag_id}`,
      "_blank"
    );
  }

  zoneChange() {
    this.loadingData = true;
    this.httpService.getRegion(this.selectedZone.id).subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.regions = res;
          if (this.regions.length > 0) {
            this.selectedRegion = this.regions[0];
          }
        } else {
          this.loadingData = false;

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
        this.loadingData = false;
      }
    );
  }
}
