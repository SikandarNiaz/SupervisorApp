import { KeyValuePipe } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Config } from "src/assets/config";


import { DashboardService } from "../../dashboard.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "section-ten-view",
  templateUrl: "./section-ten-view.component.html",
  styleUrls: ["./section-ten-view.component.scss"],
})
export class SectionTenViewComponent implements OnInit {
  @Input("data") data;
  @Input("evaluatorId") taggedEvaluatorId;
  // @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild("childModal") childModal: ModalDirective;
  @Output("showModal") showModal: any = new EventEmitter<any>();
  @Input("isEditable") isEditable: any;
  @Output("assetTypeId") assetTypeForEmit: any = new EventEmitter<any>();
  selectedShop: any = {};
  selectedImage: any = {};
  // ip=environment.ip;

  ip: any = Config.BASE_URI;
  hover = "hover";
  zoomOptions = {
    Mode: "hover",
  };
  changeColor: boolean;
  updatingMSL: boolean;
  selectedProduct: any = {};
  colorUpdateList: any = [];
  selectedSku: any;
  surveyId: any;
  evaluatorId: any;
  projectType: any;
  loadingData: boolean;
  loading = false;
  totalSos: any;
  achievedSos: any;
  achievedSosPercentage: any;

  formData: any;
  loadingModalButton: boolean;

  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    private keyValuePipe: KeyValuePipe,
    private activatedRoute: ActivatedRoute
  ) {
    this.evaluatorId = localStorage.getItem("user_id");
    this.projectType = localStorage.getItem("projectType");
    if (this.projectType == "Haleeb" || this.projectType == "Nivea") {
      this.isEditable == false;
    }

   
    this.activatedRoute.queryParams.subscribe((p) => {
      console.log("active params", p);
      this.surveyId = p.surveyId;
    });
  }

  ngOnInit() {
    this.isEditable = true;
    this.updateTextDataNew();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.data.currentValue) {
    //   this.data = changes.data.currentValue;
    //   this.formData = this.keyValuePipe.transform(this.data.formData) || [];
    //   this.calculateSos();
    //   this.selectedImage = this.data.imageList[0];
    // }
  }

  unsorted() {}

  setSelectedImage(img) {
    this.selectedImage = img;
  }

  showChildModal(shop): void {
    this.selectedShop = shop;
    this.showModal.emit(this.selectedShop);
    // this.childModal.show();
  }

  hideChildModal() {
    this.childModal.hide();
  }

  updateMultiOptionData(value, data) {
    this.loading = true;
    let selectedOption;
    for (const option of data.optionList) {
      if (value == option.id) {
        selectedOption = option;
        break;
      }
    }
    if (value != null) {
      if (this.isEditable) {
        const obj = {
          msdId: data.id,
          title: data.question,
          categoryTitle: this.data.sectionTitle,
          newValueId: selectedOption.id,
          newValue: data.title,
          type: 4,
          evaluatorId: this.evaluatorId,
        };

        this.httpService.ViewSwapDataNew(obj).subscribe((data: any) => {
          if (data.success) {
            this.loading = false;
            this.toastr.success("Data Updated Successfully");
            // const key = data.msdId;
            // this.formData.forEach((e) => {
            //   // for (const key of this.colorUpdateList) {
            //   if (key == e.value.id) {
            //     const i = this.formData.findIndex((p) => p.value.id == key);
            //     const obj = {
            //       id: e.value.id,
            //       question: e.value.question,
            //       answer: e.value.answer,
            //       fieldType: e.value.fieldType,
            //       color: "red",
            //     };

            //     this.formData.splice(i, 1, obj);
            //   }

            //   // }
            // });
          } else {
            this.toastr.error(data.message, "Update Data");
          }
        });
      } else {
        this.toastr.error(
          "Operation not allowed. Please login  with the relevent Id",
          "Error"
        );
      }
    } else {
      this.toastr.error("Value is Incorrect");
      this.loading = false;
    }
  }

  updateTextData(value) {
    this.loading = true;
    if (value.answer != null && value.answer >= 0) {
      if (this.isEditable) {
        const obj = {
          msdId: value.id,
          newValue: value.answer,
          fieldId:value.fieldId,
          surveyId:value.surveyId,
          newValueId: -1,
          title: value.question,
          categoryTitle: this.data.sectionTitle,
          type: 8,
          evaluatorId: this.evaluatorId,
        };

        this.httpService.updateSwapData(obj).subscribe((data: any) => {
          if (data.success) {
            this.loading = false;
            this.toastr.success("Data Updated Successfully");
            // const key = data.msdId;
            // this.formData.forEach((e) => {
            //   // for (const key of this.colorUpdateList) {
            //   if (key == e.value.id) {
            //     const i = this.formData.findIndex((p) => p.value.id == key);
            //     const obj = {
            //       id: e.value.id,
            //       question: e.value.question,
            //       answer: e.value.answer,
            //       fieldType: e.value.fieldType,
            //       color: "red",
            //     };

            //     this.formData.splice(i, 1, obj);
            //   }

            //   // }
            // });
          } else {
            this.toastr.error(data.message, "Update Data");
          }
        });
      } else {
        this.toastr.error(
          "Operation not allowed. Please login  with the relevent Id",
          "Error"
        );
      }
    } else {
      this.toastr.error("Value is Incorrect");
      this.loading = false;
    }
  }

  updateTextDataNew() {
    this.loading = true;
    const obj = {
      surveyId  : this.surveyId 
    }

        this.httpService.ViewSwapDataNew(obj).subscribe((data: any) => {
          if (data) {
            this.loading = false;
            debugger;
            this.data = data;
            console.log("this.data: "+ this.data);
            console.log("this.imageList: "+ this.data[0].imageList);
            this.selectedImage =  this.data[0].imageList[0];
            this.formData = this.keyValuePipe.transform(this.data[0].formData) || [];
            console.log("this.formData: "+ this.formData);
            // this.toastr.success("Data Updated Successfully");
            // const key = data.msdId;
            // this.formData.forEach((e) => {
            //   // for (const key of this.colorUpdateList) {
            //   if (key == e.value.id) {
            //     const i = this.formData.findIndex((p) => p.value.id == key);
            //     const obj = {
            //       id: e.value.id,
            //       question: e.value.question,
            //       answer: e.value.answer,
            //       fieldType: e.value.fieldType,
            //       color: "red",
            //     };

            //     this.formData.splice(i, 1, obj);
            //   }

            //   // }
            // });
          } else {
            this.toastr.error(data.message, "Update Data");
          }
        });
  }

  calculateSos() {
    let achievedSos = 0;
    let comSos = 0;
    for (const element of this.formData) {
      if (element.value.answer) {
        if (element.value.isSubQuestion == "nfl") {
          achievedSos = achievedSos + Number(element.value.answer);
        } else {
          comSos = comSos + Number(element.value.answer);
        }
      }
    }
    this.totalSos = comSos + achievedSos;
    this.achievedSos = achievedSos;
    this.getUtilizationPercentage(achievedSos, comSos);
  }

  getUtilizationPercentage(achieved, competition) {
    this.achievedSosPercentage =
      competition == 0 && achieved == 0
        ? 0
        : ((achieved * 100) / (competition + achieved)).toFixed(2);
  }

//   updateAttendance(attendanceData) {
//     console.log("Attendance Data:",attendanceData)
//   debugger;
//   this.loadingModalButton = true;
//   console.log("remarkkkk",this.shopData);
//   const formData = new FormData();
//   formData.append("remardId", JSON.stringify(attendanceData));
//   const obj={
//     remarkId: attendanceData.Remark,
//     shopId: this.shopData.id,
//     reason: attendanceData.Reason,
//   }
// ;
//  console.log("reID: ", attendanceData.Remark, "shopDataID: ", this.shopData.id);
//  console.log("Reason",obj);
//   this.httpService.updateKTSupervisorAttendenceKissan(formData).subscribe((data: any) => {
//     if (data.success == "true") {
//      if(this.shopList.length>0){
//        this.getSupervisorAttendanceList();
//      }
//       this.hideupdateSuperAttendenceModal();
//       this.toastr.success(data.message);
//     } else {
//       this.toastr.error(data.message, "Error");
//     }
//     this.loadingModalButton = false;
//   });
// }
}
