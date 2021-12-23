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
import { ModalDirective } from "ngx-bootstrap/modal";
import { KeyValuePipe } from "@angular/common";

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
  projectType: any;
  MSLCount = 0;
  loadingData: boolean;
  loading = false;
  MSLNAvailabilityCount: number;
  facing: any;
  totalDesiredFacing: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: EvaluationService,
    private keyValuePipe: KeyValuePipe
  ) {
    this.evaluatorId = localStorage.getItem("user_id");
    this.projectType = localStorage.getItem("projectType");
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      this.data = changes.data.currentValue;
      this.formData = this.keyValuePipe.transform(this.data.formData) || [];
      this.selectedImage = this.data.imageList[0];
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

  updateMultiOptionData(value, data) {
    this.loading = true;
    let selectedOption;
    for (const option of data.optionList) {
      if (value == option.id) {
        selectedOption = option;
        break;
      }
    }
    if (value) {
      if (this.isEditable) {
        const obj = {
          msdId: data.id,
          title: data.question,
          categoryTitle: this.data.sectionTitle,
          newValueId: selectedOption.id,
          newValue: selectedOption.title,
          evaluatorId: this.evaluatorId,
        };

        this.httpService.updateSurveyData(obj).subscribe((data: any) => {
          if (data.success) {
            this.loading = false;
            this.toastr.success("Data Updated Successfully");
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
    if (value.answer) {
      if (this.isEditable) {
        const obj = {
          msdId: value.id,
          newValue: value.answer,
          newValueId: -1,
          title: value.question,
          categoryTitle: this.data.sectionTitle,
          evaluatorId: this.evaluatorId,
        };

        this.httpService.updateSurveyData(obj).subscribe((data: any) => {
          if (data.success) {
            this.loading = false;
            this.toastr.success("Data Updated Successfully");
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
}
