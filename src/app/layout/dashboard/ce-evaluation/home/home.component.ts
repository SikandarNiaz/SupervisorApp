import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CeEvaluationService } from "../ce-evaluation.service";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { ResizeEvent } from "angular-resizable-element";
import { Config } from "src/assets/config";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  data: any = [];
  // ip = environment.ip;

  ip: any = Config.BASE_URI;
  loading = false;
  selectedShop: any = {};

  @ViewChild("childModal", { static: true }) childModal: ModalDirective;
  @ViewChild("remarksModal", { static: true }) remarksModal: ModalDirective;
  @ViewChild("sosModal", { static: true }) sosModal: ModalDirective;
  @ViewChild("evaluationRemarksModal", { static: true }) evaluationRemarksModal: ModalDirective;

  score: any = 0;
  isChecked = 0;

  indexList: any = [];
  surveyId: any = 0;
  remarksList: any = [];
  existingRemarks: any = [];
  selectedRemarks: any = true;
  selectedRemarksList: any = [];
  evaluationRemarks: any = [];
  selectedCriteria: any = {};
  evaluationStatus = -1;
  evaluationArray: any = [];
  productList: any = [];
  msl: any;
  availabilityCount: number;
  selectedEvaluationRemark = -1;
  j = -1;
  i = 0;
  p: any = {};
  cloneArray: any = [];
  isFromShop = true;
  rotationDegree = 0;
  userType: any;
  isEditable: any = false;
  selectedIndex = -1;
  survey: any;
  criteriaDesireScore: any = 0;
  totalAchieveScore = 0;
  MSLCount: number;
  isCritical = true;
  isNoNCritical = false;
  isDragging = false;
  selectedSoS: any = {};
  productivityCount: any;
  reevaluatorRole: any;
  evaluatorRole: any;
  selectedRemarkArray: any = [];
  surveyType: any = -1;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoutes: ActivatedRoute,
    private httpService: CeEvaluationService,
    private evaluationService: CeEvaluationService,
    private readonly location: Location
  ) {
    this.surveyId;

    this.activatedRoutes.queryParams.subscribe((q) => {
      if (q.location) {
        this.isFromShop = false;
      }
    });

    this.activatedRoutes.params.subscribe((params) => {
      this.p = params;
      this.surveyId = params.id;
      this.surveyType = params.type;

      const obj = {
        surveyId: this.surveyId,
        surveyType: this.surveyType,
        userTypeId: localStorage.getItem("user_type"),
        // userId:localStorage.getItem('user_id')
      };

      this.getData(obj);
    });
  }
  value = 5;
  options: any = {
    showTicksValues: true,
    stepsArray: [{ value: 1 }],
  };

  createTickForSlider(maxTicks) {
    const result: any = [];

    for (let index = 0; index < maxTicks.score; index++) {
      result.push({ value: index });
    }
    this.options.stepsArray = result;
  }

  ngOnInit() {
    this.availabilityCount = 0;
    this.location.replaceState("/details/");
    this.userType = localStorage.getItem("user_type");
    this.reevaluatorRole = localStorage.getItem("Reevaluator");
    this.evaluatorRole = localStorage.getItem("Evaluator");
  }
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }

  showEvaluationRemarksModal() {
    this.evaluationRemarksModal.show();
  }

  onResizeEnd(event: ResizeEvent): void {
    // console.log('Element was resized', event);
    this.isDragging = !this.isDragging;
  }

  rotateImage() {
    if (this.rotationDegree === 360) {
      this.rotationDegree = 90;
    } else {
      this.rotationDegree += 90;
    }
  }

  getData(obj) {
    this.httpService.getShopDetails(obj).subscribe(
      (data) => {
        if (data) {
          this.data = data;
          this.survey = this.data.shopDetails.surveyDetails;
          document.title =
            this.survey.username + " - " + this.survey.surveyor.fullName;
          // tslint:disable-next-line:triple-equals
          if (this.data.criteria && this.userType == this.evaluatorRole) {
            this.evaluationArray = this.data.criteria;
            this.cloneArray = this.evaluationArray.slice();
          }
          this.remarksList = this.data.remarks;
        }
      },
      (error) => {}
    );
  }

  setRemarksForReEvaluation() {
    if (this.existingRemarks.length > 0) {
      for (const element1 of this.existingRemarks) {
        for (const element of this.cloneArray) {
          if (element1.criteriaId === element.id) {
            if (this.cloneArray[this.i].remarkId) {
              this.cloneArray[this.i].remarkId.push(element1.id);
              this.i++;
            } else {
              this.cloneArray[this.i].remarkId = [];
              this.cloneArray[this.i].remarkId.push(element1.id);
              this.i++;
            }
          } else {
            this.i++;
          }
        }
        this.i = 0;
      }
    }
  }

  checkEvaluatedRemarks() {
    if (this.existingRemarks.length > 0) {
      this.existingRemarks.forEach((element1) => {
        if (element1.id > 0) {
          const obj = {
            id: element1.id,
            description: element1.description,
            criteriaId: element1.criteriaId,
            remarkType: element1.remarkType,
            isChecked: element1.isChecked,
          };
          this.remarksList.forEach((element) => {
            const i = this.remarksList.findIndex((e) => e.id === element1.id);
            if (i !== -1) {
              this.remarksList.splice(i, 1, obj);
            }
          });
        }
      });
    }
  }

  calculateMSLAgain(products) {
    this.msl = this.data.msl;
    localStorage.setItem("productList", JSON.stringify(products));
    this.productList = localStorage.getItem("productList");

    this.availabilityCount = Math.round(this.getMSLNAvailbilityCount(products)); // Math.round(this.getAvailabilityCount(products));
  }

  getMSLNAvailbilityCount(products) {
    const pro = [];
    const msl = [];
    products.forEach((p) => {
      let obj = {};
      if (p.MSL === "Yes" && p.available_sku === 1) {
        obj = {
          available_sku: p.available_sku,
          MSL: p.MSL,
        };
        pro.push(obj);
      }

      if (p.MSL === "Yes") {
        msl.push(p);
      }
    });
    this.MSLCount = msl.length;

    const MSLScore = (pro.length / this.MSLCount) * 10;
    return MSLScore;
  }
  getAvailabilityCount(products) {
    if (!products) {
      products = localStorage.getItem("productList");
    }
    const pro = products.map((p) => p.available_sku);
    const sum = pro.reduce((a, v) => a + v);
    return (sum / pro.length) * this.msl;
  }

  getCriteriaWithRemarks(remarks, criteria) {
    const obj = {
      remarkId: remarks,
      id: criteria.id,
      title: criteria.title,
      score: criteria.score,
      isChecked: 1,
    };
    this.cloneArray.forEach((element) => {
      const i = this.cloneArray.findIndex((e) => e.id === criteria.id);
      this.cloneArray.splice(i, 1, obj);
    });
    this.selectedRemarkArray = remarks;
    this.evaluationStatus = 2;
    // this.subtractScore(this.selectedCriteria);
    // this.evaluationArray.push(obj);
    console.log("evaluation array clone", this.cloneArray);
    // this.updateAchieveScore(criteria.id);
    this.hideRemarksModal();
    this.selectedRemarks = "";
    this.selectedRemarksList = [];
    this.criteriaDesireScore = 0;
  }

  checkboxChange(event, id) {
    console.log("checkbox event", !event.checked, id);

    if (!event.checked) {
      this.selectedRemarksList.push(id);
    } else {
      for (let i = 0; i < this.selectedRemarksList.length; i++) {
        if (this.selectedRemarksList[i] === id) {
          this.selectedRemarksList.splice(i, 1);
        }
      }
    }
    // this.selectedRemarksList.pop(id)

    console.log("remarks list", this.selectedRemarksList);
  }

  updateAchieveScore(id) {
    for (let index = 0; index < this.cloneArray.length; index++) {
      const element = this.cloneArray[index];
      const aScore = element.achievedScore;

      if (element.id === id) {
        this.cloneArray[index].achievedScore =
          this.criteriaDesireScore > 0 ? this.criteriaDesireScore : aScore;
      }
    }
    this.totalAchieveScore = this.getTotalAchieveScore();
  }

  getTotalAchieveScore() {
    let score = 0;
    this.cloneArray.forEach((element) => {
      if (element.totalAchievedScore) {
        score = element.totalAchievedScore;
        delete element.totalAchievedScore;
        return score;
      } else {
        if (element.achievedScore >= 0) {
          score = score + element.achievedScore;
        }
      }
    });

    return score;
  }

  subtractScore(criteria) {
    this.totalAchieveScore =
      this.criteriaDesireScore > 0
        ? this.totalAchieveScore -
          Math.abs(criteria.score - this.criteriaDesireScore)
        : this.totalAchieveScore - Math.abs(criteria.achievedScore);
  }

  isAnyCriteriaCheck() {
    let result = false;
    this.cloneArray.forEach((element) => {
      if (element.isChecked) {
        result = true;
      }
    });

    return result;
  }

  counter(event, criteria, index) {
    this.selectedIndex = index;
    this.j = index;
    // console.dir(event.checked)
    if (event.checked) {
      this.indexList.push(index);

      this.selectedCriteria = criteria;
      // tslint:disable-next-line:triple-equals
      if (criteria.type != 1) {
        this.showRemarksModal();
      } else {
        this.selectedRemarkArray = [];
        this.evaluationStatus = 1;
      }
    } else {
      this.evaluationStatus = -1;
    }
  }

  cancelCriteriaSelection() {
    const inputs: any = document.querySelectorAll(".checkbox");
    for (let j = 0; j < inputs.length; j++) {
      if (this.selectedCriteria.id === inputs[j].id) {
        inputs[j].checked = false;
      }
    }
    const criteria = this.selectedCriteria;
    this.totalAchieveScore = this.totalAchieveScore + Math.abs(criteria.score);
    const i = this.indexList.indexOf(this.selectedIndex);
    this.indexList.splice(i, 1);

    if (this.evaluationArray.length > 0) {
      const obj = {
        remarkId: [],
        id: criteria.id,
        title: criteria.title,
        score: criteria.score,
        type: criteria.type,
        isChecked: 0,
      };
      const e = this.evaluationArray.findIndex((i) => i.id === criteria.id);
      this.cloneArray.splice(e, 1, obj);
      console.log(
        "unchecked evaluation array,using cancel button",
        this.cloneArray
      );
    }
    this.selectedRemarkArray = [];
    this.j = -1;
    this.evaluationStatus = -1;
    this.hideRemarkModalForCancelOption();
  }
  checkForCritical(criteria) {
    if (criteria.id === 14) {
      this.isCritical = true;
      this.isNoNCritical = false;
    } else {
      const result = this.isAnyCriteriaCheck();
      if (!result) {
        this.isNoNCritical = false;
      }
      this.isCritical = true;
    }
  }
  calculateScore() {
    this.score;
    this.data.criteria.map((c) => {
      if (c.score > 0) {
        this.score += c.score;
      }
    });
    // this.score=this.score-(this.msl);

    console.log("total score is", this.score);
  }

  // makeScoreZero(){
  //   let result=[];
  //   this.cloneArray.forEach(element => {

  //     if()

  //   });
  // }
  evaluateShop() {
    const user_id = localStorage.getItem("user_id");
    this.loading = true;
    const req = true;

    if (req) {
      // tslint:disable-next-line:triple-equals
      const obj = {
        criteria: this.selectedRemarkArray,
        surveyId: this.surveyId,
        evaluatorId: user_id,
        status: this.evaluationStatus,
      };

      this.evaluationService.evaluateShop(obj).subscribe(
        (data: any) => {
          // console.log('evaluated shop data',data);
          this.loading = false;
          // tslint:disable-next-line:triple-equals
          if (data.success == "true") {
            this.toastr.success("shop evaluated successfully ");
            this.evaluationArray = [];
            this.cloneArray = [];
            this.indexList = [];
            setTimeout(() => {
              window.close();
            }, 2000);
          } else {
            this.toastr.error(data.errorMessage, "Error");
          }
        },
        (error) => {
          // console.log('evaluated shop error',error)
          // window.close()
          this.loading = false;
          this.toastr.error(error.message, "Error");
        }
      );
    }
  }

  checkForSlectedRemarks(list) {
    let result = 1;
    if (list.length > 0) {
      result = 2;
    }

    return result;
  }
  updateSoS() {
    if (this.selectedSoS.total_com_height <= 0) {
      this.toastr.warning("Height must be greater than zero.");
    } else {
      this.hideSoSModal();
    }

    const obj = {
      userId: parseInt(localStorage.getItem("user_id")),
      width: parseInt(this.selectedSoS.total_width),
      com_width: parseInt(this.selectedSoS.total_com_width),
      merchandiserId: parseInt(this.selectedSoS.merchandiser_survey_id),
    };

    console.log("final SoS object", obj);
    this.httpService.updateSOS(obj).subscribe(
      (data: any) => {
        if (data.success) {
          this.toastr.info("SOS width is updated");
        }
        // alert(data)
      },
      (error) => {
        // alert(error)
      }
    );
  }

  showChildModal(shop): void {
    this.selectedShop = shop;
    this.rotationDegree = 0;
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  showSoSModal(item): void {
    console.log("output item", item);
    this.selectedSoS = item;
    this.sosModal.show();
  }

  hideSoSModal(): void {
    this.sosModal.hide();
  }

  showRemarksModal() {
    this.criteriaDesireScore = 0;
    this.remarksModal.show();
  }

  hideRemarkModalForCancelOption() {
    if (this.selectedCriteria.isEditable) {
      this.subtractScore(this.selectedCriteria);
    }

    // this.updateAchieveScore(this.selectedCriteria.id)
    this.remarksModal.hide();
  }
  hideRemarksModal() {
    if (this.selectedCriteria.isEditable) {
      this.subtractScore(this.selectedCriteria);
    }

    // this.updateAchieveScore(this.selectedCriteria.id)
    // if(this.selectedRemarksList.length>0)
    this.remarksModal.hide();
    // else{
    //   this.toastr.info(`please select remarks for "${this.selectedCriteria.title}"`)
    // }
  }
  singleCheckboxChange(id) {
    this.selectedEvaluationRemark = id;
  }

  hideRemarksModalWithNoChange() {
    this.evaluationRemarksModal.hide();
  }
}
