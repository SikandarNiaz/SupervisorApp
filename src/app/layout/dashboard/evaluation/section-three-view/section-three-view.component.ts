import {
  Component,
  OnInit,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { environment } from "src/environments/environment";
import { Config } from "src/assets/config";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { EvaluationService } from "../evaluation.service";
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: "section-three-view",
  templateUrl: "./section-three-view.component.html",
  styleUrls: ["./section-three-view.component.scss"],
})
export class SectionThreeViewComponent implements OnInit {
  @Input("data") data;
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
  zoomedImage =
    "https://image.shutterstock.com/image-photo/micro-peacock-feather-hd-imagebest-260nw-1127238569.jpg";
  formData: any;
  availability: any;
  changeColor: boolean;
  updatingMSL: boolean;
  selectedProduct: any = {};
  colorUpdateList: any = [];
  selectedSku: any;
  surveyId: any;
  evaluatorId: any;
  MSLCount = 0;
  loadingData: boolean;
  loading = false;
  MSLNAvailabilityCount: number;
  facing: any;
  totalDesiredFacing: any;

  statusArray: any = [
    { title: "Yes", value: "Yes" },
    { title: "No", value: "No" },
  ];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: EvaluationService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      this.data = changes.data.currentValue;
      //this.formData = this.data.sectionArray;
      this.formData = this.data.tagsList
      this.selectedImage = this.data.imageList[0];
      console.log("taglist dfata" + this.formData);
      debugger;
    }
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

  updateQuestionAnswer(data: any, value: any){
    debugger;
    const obj = {
      ceSurveyId: data.ceSurveyId,
      formId: data.formId,
      fieldId: data.fieldId,
      title: value,
      fieldValueId: data.fieldValueId,
    }; 
    this.httpService.updateSurveyQuestions(obj).subscribe((data: any) => {
      debugger;
      if (data.success) {
        this.toastr.success("Data Updated Successfully");
      } else {
        this.toastr.error("There was an error while updating data");
      }
    });
  }
}
