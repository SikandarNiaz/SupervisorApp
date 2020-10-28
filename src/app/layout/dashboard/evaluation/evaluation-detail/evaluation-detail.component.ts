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
  title = "Evaluation";
  ip: any = this.configFile.ip;
  tableData: any = [];
  loading: boolean;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();
  surveyorList: any = [];
  selectedSurveyor: any = [];
  selectedItem: any = {};
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: EvaluationService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getSurveyorsAndBrands();
    const that = this;
    document.addEventListener("visibilitychange", function (e) {
      console.log(document.hidden);
      if (!document.hidden) {
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
  getSurveyorsAndBrands() {
    this.loading = true;

    this.httpService.getSurveyorsAndBrands().subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.surveyorList = res.surveyorList;
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
}
