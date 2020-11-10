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
import { config } from "src/assets/config";

@Component({
  selector: "app-flagged-shops",
  templateUrl: "./flagged-shops-list.component.html",
  styleUrls: ["./flagged-shops-list.component.scss"],
})
export class FlaggedShopsListComponent implements OnInit {
  @ViewChildren("checked") private myCheckbox: any;
  @ViewChild("childModal") childModal: ModalDirective;
  constructor(
    private toastr: ToastrService,
    private httpService: EvaluationService,
    public router: Router
  ) {}
  tableData: any = [];
  title = "Visited Shops";
  loadingData: boolean;
  regions: any = [];
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
  remarkList: any = [];
  selectedRemark: any = {};

  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();

  ngOnInit() {
    this.loadSurveyors();
    this.loadRemarks();
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
      remarkId: this.selectedRemark.id || -1,
      startDate: moment(this.startDate).format("YYYY-MM-DD"),
      endDate: moment(this.endDate).format("YYYY-MM-DD"),
    };
    this.loadingData = true;
    this.httpService.getFlaggedShops(obj).subscribe((data) => {
      if (data) {
        this.loadingData = false;
        this.shopList = data;
      } else {
        this.loadingData = false;
        this.toastr.success(this.response, "No Data Found");
      }
    });
  }

  loadSurveyors() {
    this.loadingData = true;

    this.httpService
      .getSurveyors(-1, -1, localStorage.getItem("surveyorId") || -1)
      .subscribe(
        (data) => {
          const res: any = data;
          if (res) {
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

  loadRemarks() {
    this.loadingData = true;

    this.httpService.getRemarks().subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.remarkList = res;
          this.selectedRemark = this.remarkList[0];
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
}
