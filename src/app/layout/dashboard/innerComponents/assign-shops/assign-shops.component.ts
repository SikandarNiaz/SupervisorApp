import {
  Component,
  OnInit,
  AfterViewChecked,
  Input,
  ViewChild,
  ViewChildren,
  ɵSWITCH_COMPILE_NGMODULE__POST_R3__,
} from "@angular/core";
import { DashboardService } from "../../dashboard.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import * as moment from "moment";
import { subscribeOn } from "rxjs/operators";
import { Router } from "@angular/router";
import { DashboardDataService } from "../../dashboard-data.service";
import { ToastrService } from "ngx-toastr";
import { MatTableDataSource } from "@angular/material/table";
import { environment } from "src/environments/environment";
import { NgModel } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import * as _ from "lodash";
import { Config } from "src/assets/config";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { isNgTemplate } from "@angular/compiler";
import { id } from "date-fns/locale";

declare const google: any;
@Component({
  selector: "app-assign-shops",
  templateUrl: "./assign-shops.component.html",
  styleUrls: ["./assign-shops.component.scss"],
})
export class AssignShopsComponent implements OnInit {
  @ViewChildren("checked") private myCheckbox: any;
  @ViewChild("childModal", { static: true }) childModal: ModalDirective;
  @ViewChild("shopInfoModal", { static: true }) shopInfoModal: ModalDirective;
  @ViewChild("addEditShop", { static: true }) addEditShop: ModalDirective;
  @ViewChild("updateTimeModal", { static: true })
  updateTimeModal: ModalDirective;
  @ViewChild("ShopTargetDetail", { static: true })ShopTargetDetail: ModalDirective;
  private exportTime = { hour: 7, minute: 15, meriden: "PM", format: 24 };
  @Input("data") data;
  @ViewChild('totalSaleInput') totalSaleInput: any;

  form: FormGroup;
  tableData: any = [];
  ip: any = Config.BASE_URI;
  title = "";
  weekDays = [
    { value: "Monday", startTime: null, endTime: null, selected: false },
    { value: "Tuesday", startTime: null, endTime: null, selected: false },
    { value: "Wednesday", startTime: null, endTime: null, selected: false },
    { value: "Thursday", startTime: null, endTime: null, selected: false },
    { value: "Friday", startTime: null, endTime: null, selected: false },
    { value: "Saturday", startTime: null, endTime: null, selected: false },
    { value: "Sunday", startTime: null, endTime: null, selected: false },
  ];
  weekDay: any;
  selectedDay: any;
  selectedDay1: any;
  surveyType :any;
  selectedItem1: any; 
  zones: any = [];
  key:any;
  key1:any;
  brandID:any;
  skuID :any;
  loadingData: boolean;
  regions: any = [];
  programs: any = [];
  surveyors: any = [];
  selectedShops = [];
  selectedBrand: any; 
   selectedForm : any;
  selectedZone: any = {};
  selectedProgram = -1;
  selectedSurveyor = -1;
  selectedRegion: any = {};
  products: any;
  brands: any[];
  forms: any[]; 
  regionId = -1;
  response: any = "";
  loadingReportMessage = false;
  tabsData: any;
  sortOrder = true;
  sortBy: "m_code";
  shopId: Number;
  loading: boolean;
  selectedItem: any = {};
  panelOpenState = false;
  regionList: any = [];
  isAssignShopRequest: boolean;
  shopStatus: any = [
    { id: 1, value: "Y" },
    { id: 2, value: "N" },
  ];
  public image: any = File;
  shopLat: number;
  shopLong: number;
  selectedShopForEdit: any = {};
  isUpdateRequest: boolean;
  modalTitle = "";
  loadingModal: boolean;
  loadingModalButton: boolean;
  shopList: any = [];
  selectedShop: any = {};
  selectedKeyword = "";
  filteredShops: any = [];
  labels: any;
  Brands: any;
  time: any;
  type = -1;
  type1 = -1;
  totalInterception: number = -1;
successfulInterception: number = -1;
  selectedStartTime = null;
  selectedEndTime = null;
  daysList: any = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    private dataService: DashboardDataService,
    public fb: FormBuilder
  ) {
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
    if (this.router.url == "/dashboard/assign-shops") {
      this.isAssignShopRequest = true;
      this.title = "Assign Shops";
    } else {
      this.isAssignShopRequest = false;
      this.title = "Shop Details";
    }
    this.shopLat = 31.502102;
    this.shopLong = 74.335109;
    {
      this.zones = JSON.parse(localStorage.getItem("zoneList"));
      this.type = 4;
      this.type1 = 3;
    }

    // this.zones = JSON.parse(localStorage.getItem("zoneList"));
    this.selectedZone = this.zones[0];
    this.form = fb.group({
      id: new FormControl(""),
      // code: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
      address: new FormControl(""),
      shopImageUrl: new FormControl("", [Validators.required]),
      program: this.fb.group({
        id: new FormControl("", [Validators.required]),
      }),
      region: this.fb.group({
        id: new FormControl("", [Validators.required]),
      }),
      active: new FormControl("", [Validators.required]),
      longitude: new FormControl("", [Validators.required]),
      latitude: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    this.loadShops();
    this.getTabsData();
    this.gettingBrands();
    this.gettingSku();
   
  }
  // selectDay(day) {
  //   this.selectedDay1 = day.value;
  //   console.log("selectedDay:", this.selectedDay1)
  // }
  toggleDaySelection(day) {
    day.selected = !day.selected; // Toggle the selected property
    console.log("selectedDay:", day.value);
  }

  getPicker(day, type) {
    return "defaultPicker_" + day.value + "_" + type;
  }
  zoneChange() {
    this.loadingData = true;
    this.selectedRegion.id = -1;
    this.httpService.getRegion(this.selectedZone.id).subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.regions = res;
        } else {
          this.clearLoading();

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
        this.clearLoading();
      }
    );
  }
  onDayClick(day: string) {
    this.selectedDay = day; // Update selectedDay based on clicked day
    console.log(`Selected day: ${this.selectedDay}`);
    // You can perform actions based on the selected day here
  }

  setSelectedItem(item) {
    this.selectedItem = item;
  }
  goToUpdateTargetPage(item) {

    console.log("Function invoked: ",item);
    this.loading = true;
    this.loading = true;
   this.key=item.value.id;
    const obj = {
      surveyType: this.type1,
      surveyId: item.value.id,
      userTypeId: 2
    }
    this.products = [];
    this.httpService.getShopDetails(obj).subscribe(
      (data) => {
        const res: any = data;
        if (res && Array.isArray(res.section) && res.section.length > 0) {
          this.products = res.section; // Assigning the 'section' array to 'this.products'
          console.log("Products", this.products);
          console.log("Products SectionArray: ", this.products[0].sectionArray);
          this.selectedBrand = this.products[0].sectionTitle;
          this.selectedForm = this.products[0].sectionFormTitle;
          console.log("selectedBrand: ", this.selectedBrand);
          console.log("selectedForm: ", this.selectedForm);
          const matchingBrand = this.brands.find(brand => brand.title === this.selectedBrand);
          if (matchingBrand) {
            this.selectedBrand = matchingBrand.id; // Set selectedBrand to matching brand ID
          }
        
          // Find matching form by title
          const matchingForm = this.forms.find(form => form.title === this.selectedForm);
          if (matchingForm) {
            this.selectedForm = matchingForm.id; // Set selectedForm to matching form ID
          }
          
          this.key1 = this.products[0].sectionArray[0].id;
          console.log("key1: ", this.key1)
          this.ShopTargetDetail.show();
        } else {
          this.products = [];
          // this.loading = false;
        
          
        }
        this.loading = false;
        this.ShopTargetDetail.show();
      },
      
      (error) => {
        // Handle HTTP error
        this.loading = false;
        console.error("HTTP Request Error:", error);
      }
    );
    
  }
  
  getTabsData() {
    this.loadingData = true;
    const obj: any = {
      zoneId: this.selectedZone.id ? this.selectedZone.id : -1,
      regionId: this.selectedRegion.id ? this.selectedRegion.id : -1,
      shopId: this.selectedShop.id || -1,
    };
 
    this.httpService.getShopData(obj).subscribe(
      
      (data) => {
        this.loadingData = false;
        const res: any = data;
        if (res) {
          this.tabsData = data;
        }
      },
      (error) => {
        this.clearLoading();

        console.log(error, "home error");
      }
    );
  }

  clearLoading() {
    this.loadingData = false;
    this.loadingModal = false;
    this.loadingReportMessage = false;
    this.loadingModalButton = false;
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

  showChildModal(shopId): void {
    this.shopId = shopId;
    this.loadPrograms();
    this.childModal.show();
  }

  hideChildModal() {
    this.selectedSurveyor = -1;
    this.selectedProgram = -1;
    this.programs = [];
    this.surveyors = [];
    this.childModal.hide();
  }

  hideshowSurveyorTimeUpdateModal() {
    this.weekDays.forEach((day) => {
      day.startTime = null;
      day.endTime = null;
      day.value = null;
      this.selectedDay = null;
    });
    this.updateTimeModal.hide();
  }

  hc() {
    this.ShopTargetDetail.hide();
  }

  showShopInfoModal(): void {
    this.shopInfoModal.show();
  }

  showSurveyorTimeUpdateModal(surveyorId): void {
    // this.loadPrograms();
    debugger;
    this.selectedSurveyor = surveyorId;
    this.updateTimeModal.show();
  }

  hideShopInfoModal() {
    this.shopInfoModal.hide();
  }

  loadPrograms() {
    this.loadingModal = true;
    this.httpService.getPrograms().subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.programs = res;
        } else {
          this.clearLoading();

          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }

        setTimeout(() => {
          this.loadingModal = false;
        }, 500);
      },
      (error) => {
        this.clearLoading();
      }
    );
  }

  getSurveyors() {
    this.loadingModal = true;
    this.httpService
      .getSurveyors(
        this.selectedProgram,
        -1,
        this.selectedZone.id || -1,
        this.selectedRegion.id || -1
      )
      .subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.surveyors = res;
          } else {
            this.clearLoading();

            this.toastr.info(
              "Something went wrong,Please retry",
              "Connectivity Message"
            );
          }

          setTimeout(() => {
            this.loadingModal = false;
          }, 500);
        },
        (error) => {
          this.clearLoading();
        }
      );
  }

  loadShops() {
    this.loadingModal = true;
    this.httpService
      .getActiveShops(this.selectedZone.id || -1, this.selectedRegion.id || -1)
      .subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.shopList = res;
            console.log("loadShops: ", res.id)
            this.filteredShops = this.shopList;
          
          } else {
            this.clearLoading();

            this.toastr.info(
              "Something went wrong,Please retry",
              "Connectivity Message"
            );
          }
          setTimeout(() => {
            this.loadingModal = false;
          }, 500);
        },
        (error) => {
          this.clearLoading();
        }
      );
  }

  

  AssignShops() {
    const obj = {
      shopId: this.shopId,
      surveyorId: this.selectedSurveyor,
      programId: this.selectedProgram,
      action: 1,
    };
    console.log("assignShops: ", this.shopId)
    debugger;
    this.loadingModal = true;
    this.loadingModalButton = true;
    this.httpService.ActiveDeactiveShops(obj).subscribe((data) => {
      if (data) {
        debugger;
        this.response = data;
        this.getTabsData();
        this.hideChildModal();
        this.selectedShops = [];
        if (this.response.length > 0) {
          this.loadingModal = false;
          this.loadingModalButton = false;
          this.toastr.success(this.response, "Success");
        }
      } else {
        this.loadingModal = false;
        this.loadingModalButton = false;
        this.childModal.hide();
        this.toastr.error("There is an error in ur file!!");
      }
    });
  }

  DeactivateRoute(shopId, surveyorId) {
    const obj = {
      shopId: shopId,
      surveyorId: surveyorId,
      programId: this.selectedProgram,
      action: 2,
    };
    this.loadingData = true;
    this.httpService.ActiveDeactiveShops(obj).subscribe((data) => {
      if (data) {
        this.response = data;
        this.getTabsData();
        this.hideChildModal();
        this.selectedShops = [];
        if (this.response.length > 0) {
          this.loadingData = false;
          this.toastr.success(this.response, "Success");
        }
      } else {
        this.loadingData = false;
        this.childModal.hide();
        this.toastr.error("There is an error in ur file!!");
      }
    });
  }

  getTaggings(shop) {}

  asIsOrder(a, b) {
    return 1;
  }

     
   



    // this.ShopTargetDetail.show();
    // window.open(
    //   `${environment.hash}dashboard/ce_shoptarget/list/details/${item.value.id}/${this.type}`,
    //   "_blank"
    // );
  
  showAddShopModal(): void {
    this.modalTitle = "Create New Shop";
    this.isUpdateRequest = false;
    if (this.regionList.length == 0) {
      this.getAllRegions();
    }
    if (this.programs.length == 0) {
      this.loadPrograms();
    }
    // this.initMap();
    this.form.patchValue({
      id: -1,
    });
    this.addEditShop.show();
  }

  hideAddEditShopModal() {
    this.form.reset();
    this.addEditShop.hide();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.image = <File>event.target.files[0];
      const file = event.target.files[0];
      this.image = file;

      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = (_event) => {};
    }
  }
 
  gettingBrands() {
    this.httpService.gettingBrands().subscribe(
      (response: any) => {
        this.brands = response; // Assuming response contains an array of brand objects with id and name properties
        console.log(this.brands, 'Brands');
      },
      (error) => {
        console.log(error, 'error');
      }
    );
  }

  gettingSku() {
    this.httpService.gettingSkuType().subscribe(
      (response: any) => {
        this.forms = response; // Access the response directly, assuming it contains an array of form objects
        console.log(this.forms, 'formsSku');
      },
      (error) => {
        console.log(error, 'error');
      }
    );
  }
  submitShopBrandTarget(brandId,totalSale,formId,totalInterception,successfulInterception){
    console.log("key: ", this.key)
    
const data = {
  brandId: brandId,
  totalSale: totalSale,
  formId: formId,
  totalInterception:totalInterception,
  successfulInterception:successfulInterception,
  // selectedItem1 : item.value.id,
  shopId: this.key
  // shopId: this.selectedShop.id

  
};
console.log("Data: ", data)
// const selectedF = data[0].formId;
// console.log("SelectedF: ", selectedF)
this.httpService.updateShopBrandTarget(data).subscribe((response: any) => {
  if (response.status === "success") {
    this.ShopTargetDetail.hide();
    this.products = []; // Assuming products is an array you want to clear
this.selectedBrand = null; // Reset selectedBrand
this.selectedForm = null; 
this.totalSaleInput.nativeElement.value = null;
    // this.ShopTargetDetail.clear();
    this.toastr.success("Data Updated Successfully");
  } else {
    this.toastr.success("There was an error while updating data");
  }
});



  }

  getAllRegions() {
    this.loadingModal = true;
    this.httpService.getRegions().subscribe(
      (data) => {
        const res: any = data;
        if (res.regionList) {
          this.regionList = res.regionList;
          // localStorage.setItem('regionList', JSON.stringify(res.regionList));
        }
        if (!res.regionList) {
          this.toastr.info("No data Found", "Info");
        }
        this.clearLoading();
      },
      (error) => {
        this.clearLoading();
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
  }

  saveShopData(shopData) {
    this.loadingModal = true;
    this.loadingModalButton = true;
    const formData = new FormData();
    formData.append("shopData", JSON.stringify(shopData));
    formData.append("image", this.image);

    this.httpService.saveShop(formData).subscribe((data: any) => {
      if (data.success == "true") {
        if (this.selectedZone.id) {
          this.getTabsData();
        }
        this.hideAddEditShopModal();
        this.toastr.success(data.message);
      } else {
        this.toastr.error(data.message, "Error");
      }
      this.loadingModal = false;
      this.loadingModalButton = false;
    });
  }

  updateShopData(shopData) {
    this.loadingModal = true;
    this.loadingModalButton = true;
    const formData = new FormData();
    formData.append("shopData", JSON.stringify(shopData));
    if (shopData.shopImageUrl != null && shopData.shopImageUrl != "") {
      formData.append("image", this.image);
    }
    this.httpService.updateShop(formData).subscribe((data: any) => {
      if (data.success == "true") {
        if (this.selectedZone.id) {
          this.getTabsData();
        }
        this.hideAddEditShopModal();
        this.toastr.success(data.message);
      } else {
        this.toastr.error(data.message, "Error");
      }
      this.loadingModal = false;
      this.loadingModalButton = false;
    });
  }

  initMap() {
    const that = this;
    // var marksman = {lat: 31.502102, lng: 74.335109};
    const myLatlng = new google.maps.LatLng(that.shopLat, that.shopLong);

    const mapOptions = {
      zoom: 15,
      center: myLatlng,
    };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      draggable: true,
      map: map,
      title: "Marksman Office",
    });
    const infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, "dragend", function (event) {
      that.shopLat = event.latLng.lat();
      that.shopLong = event.latLng.lng();

      console.log(that.shopLat + " : " + that.shopLong);
      infoWindow.open(map, marker);
      infoWindow.setContent("Shop Location");
      infoWindow.open(map);
    });
  }

  showUpdateShopModal(shop): void {
    this.modalTitle = "Update Shop (" + shop.title + ")";
    this.selectedShopForEdit = shop;
    this.isUpdateRequest = true;
    if (this.regionList.length == 0) {
      this.getAllRegions();
    }
    if (this.programs.length == 0) {
      this.loadPrograms();
    }
    // this.initMap();
    this.form.patchValue({
      id: shop.baseShopId,
      title: shop.title,
      address: shop.address,
      region: {
        id: shop.region.id,
      },
      program: {
        id: shop.program.id,
      },
      longitude: shop.longitude,
      latitude: shop.latitude,
      active: shop.active,
    });
    this.addEditShop.show();
  }
  filterItem(value) {
    if (value) {
      value = value.toLowerCase();
    }
    this.filteredShops = Object.assign([], this.shopList).filter(
      (item) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }
  
  updateAssignShop(question: any) {
    let obj: { id: any; question: any; newValue: any; brandID?: any; skuID?: any } = {
      id:this.key1,
      question: question.question,
      newValue: question.answer,
    };
    console.log("OBJ : ", obj)
  
   
    if (question.question === 'Brand') {
      obj.brandID = this.selectedBrand; 
    }
  
    
    if (question.question === 'Sku') {
      obj.skuID = this.selectedForm;
     // Assuming you're storing the selected SKU in selectedForm property
    }
  
    this.httpService.updateShopData(obj).subscribe((data: any) => {
      if (data.success) {
        this.toastr.success("Data Updated Successfully");
        this.ShopTargetDetail.hide();
      } else {
        this.toastr.error("There was an error while updating data");
      }
    });
  }
  
  
  UpdateSurveyorTime() {
    this.loadingModal = true;
    this.loadingModalButton = true;

    // Filter out selected days
    const selectedDays = this.weekDays.filter((day) => day.selected);

    for (const selectedDay of selectedDays) {
      console.log("Selected Day:", selectedDay.value);
      console.log("Start Time:", selectedDay.startTime);
      console.log("End Time:", selectedDay.endTime);

      const obj = {
        surveyorId: this.selectedSurveyor,
        startTime: selectedDay.startTime || null,
        endTime: selectedDay.endTime || null,
        weekDay: selectedDay.value || null,
        holiday: this.selectedDay || null,
      };

      console.log("obj:", obj);

      this.httpService.UpdateTime(obj).subscribe((data) => {
        if (data) {
          debugger;
          this.response = data;
          this.hideshowSurveyorTimeUpdateModal();
          this.selectedShops = [];
          if (this.response.length > 0) {
            this.toastr.success(this.response, "Success");
            this.getTabsData();
          }
        } else {
          this.toastr.error("There is an error in your file!!");
        }
      });
    }
    this.loadingModal = false;
    this.loadingModalButton = false;
  }
}
