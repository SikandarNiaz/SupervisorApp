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
import { ModalDirective } from "ngx-bootstrap/modal";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-swap-data',
  templateUrl: './update-swap-data.component.html',
  styleUrls: ['./update-swap-data.component.css']
})
export class UpdateSwapDataComponent implements OnInit {
  @Input("data") data;
  // @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild("childModal", { static: true }) childModal: ModalDirective;
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
    { title: "Yes", value: "1" },
    { title: "No", value: "0" },
  ];

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      this.data = changes.data.currentValue;
      this.formData = this.data.sectionMap;
      this.selectedImage = this.data.imageList[0];
    }
  }

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
  unsorted() {}
}
