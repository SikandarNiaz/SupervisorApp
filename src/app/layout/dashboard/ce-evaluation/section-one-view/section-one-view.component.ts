import {
  Component,
  OnInit,
  Input,
  ViewChild,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { environment } from "src/environments/environment";
import { Config } from "src/assets/config";

@Component({
  selector: "section-one-view",
  templateUrl: "./section-one-view.component.html",
  styleUrls: ["./section-one-view.component.scss"],
})
export class SectionOneViewComponent implements OnInit {
  @Input("data") data;
  @ViewChild("childModal", { static: true }) childModal: ModalDirective;
  @Output("showModal") showModal: any = new EventEmitter<any>();
  @Input("isEditable") isEditable: any;
  selectedShop: any = {};
  selectedImage: any = {};
  // ip=environment.ip;
  reevaluatorRole: any;
  userType: any;

  ip: any = Config.BASE_URI;
  hover = "hover";
  zoomOptions = {
    Mode: "hover",
  };
  zoomedImage =
    "https://image.shutterstock.com/image-photo/micro-peacock-feather-hd-imagebest-260nw-1127238569.jpg";

  constructor() {}

  ngOnInit() {
    this.reevaluatorRole = localStorage.getItem("Reevaluator");
    this.userType = localStorage.getItem("user_type");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes.data.currentValue;
    this.selectedImage = this.data.imageList[0];
  }

  openSurvey(img) {
    // tslint:disable-next-line:triple-equals
    window.open(
      `${environment.hash}dashboard/ce_evaluation/list/details/${img.surveyId}`,
      "_blank"
    );
  }

  setSelectedImage(img) {
    this.selectedImage = img;
  }

  showChildModal(shop): void {
    this.selectedShop = shop;
    this.showModal.emit(this.selectedImage);

    // this.childModal.show();
  }

  hideChildModal(): void {
    // this.childModal.hide();
  }
}
