import { Component, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { EvaluationService } from "../evaluation.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgModel } from "@angular/forms";
import { environment } from "src/environments/environment";
import { Alert } from "selenium-webdriver";
import { config } from "src/assets/config";
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: "app-evaluation-detail",
  templateUrl: "./evaluation-detail.component.html",
  styleUrls: ["./evaluation-detail.component.scss"],
})
export class EvaluationDetailComponent implements OnInit {
  // ip = environment.ip;
  @ViewChild("childModal") childModal: ModalDirective;
  configFile = config;
  title = "Visited Shops";
  ip: any = this.configFile.ip;
  tableData: any = [];
  loading: boolean;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();
  surveyorList: any = [];
  selectedSurveyor: any = [];
  zones: any = [];
  regions: any = [];
  selectedZone: any = {};
  selectedRegion: any = {};
  selectedItem: any = {};
  userType: any;
  amRole: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: EvaluationService,
    private activeRoute: ActivatedRoute
  ) {
    this.zones = JSON.parse(localStorage.getItem("zoneList"));
    if (this.zones.length > 0) {
      this.selectedZone = this.zones[0];
    }
  }

  ngOnInit() {
    this.loadSurveyors();
    this.amRole = localStorage.getItem("amRole");
    this.userType = localStorage.getItem("user_type");
    const that = this;
    document.addEventListener("visibilitychange", function (e) {
      console.log(document.hidden);
      if (!document.hidden && that.selectedSurveyor.length > 0) {
        that.getSurveyShopDetails();
      }
    });
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
  loadSurveyors() {
    this.loading = true;

    this.httpService
      .getSurveyors(
        this.selectedZone.id || -1,
        this.selectedRegion.id || -1,
        localStorage.getItem("surveyorId") || -1
      )
      .subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.surveyorList = res;
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

  getSurveyShopDetails() {
    this.loading = true;
    const obj = {
      startDate: moment(this.startDate).format("YYYY-MM-DD"),
      endDate: moment(this.endDate).format("YYYY-MM-DD"),
      surveyorId: this.arrayMaker(this.selectedSurveyor),
      zoneId: this.selectedZone.id || -1,
      regionId: this.selectedRegion.id || -1,
    };
    this.httpService.getBADataForEvaluation(obj).subscribe(
      (data) => {
        // console.log(data);
        this.tableData = data;
        if (this.tableData.length === 0) {
          this.loading = false;
          this.toastr.info("No record found.");
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
    // Sending notEditable Param if shop is already Evaluated (Shop cant be evaluated Twice)
    if (item.evaluation_status == "N") {
      window.open(
        `${environment.hash}dashboard/evaluation/list/details/${item.survey_id}`,
        "_blank"
      );
    } else {
      window.open(
        `${environment.hash}dashboard/evaluation/list/details/${item.survey_id}/${item.m_code}`,
        "_blank"
      );
    }
  }

  zoneChange() {
    this.loadSurveyors();
    this.loading = true;
    this.httpService.getRegion(this.selectedZone.id).subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.regions = res;
          if (this.regions.length > 0) {
            this.selectedRegion = this.regions[0];
          }
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
