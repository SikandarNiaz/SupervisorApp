import {
  AfterContentChecked,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { DashboardService } from "../../dashboard.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
  selector: "app-manage-surveyors",
  templateUrl: "./manage-surveyors.component.html",
  styleUrls: ["./manage-surveyors.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ManageSurveyorsComponent implements OnInit, AfterContentChecked {
  @ViewChild("surveyorInfoModal", { static: true })
  surveyorInfoModal: ModalDirective;
  @ViewChild("insertModal") insertModal: ModalDirective;
  zones: any = [];
  regions: any = [];
  selectedZone: any = {};
  selectedRegion: any = {};
  surveyorList: any = [];
  supervisorList: any = [];
  merchandiserList: any=[];
  managerList: any = [];
  eva: any = [];
  productsSetList: any = [];
  loadingData: boolean;
  regionList: any=[]; 
  brandList : any=[];
  cityList: any=[];
  programList: any=[];
  brand_id:any;

  projectType: any;
  sortOrder = true;
  sortBy: "m_code";
  form: FormGroup;
  loadingModal: boolean;
  loadingModalButton: boolean;
  activeStatus: any = ["Y", "N"];
  selectedSurveyor: any = {};
  clusterList: any = [];
  labels: any;
  selectedCluster: any = {};
  title = "";

  insertForm: FormGroup;
  insertTitle = "";
  insertType: any;
  selectedProgram: any = [];
  selectedSupervisor: any = [];

  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    public formBuilder: FormBuilder,
    private readonly changeDetector: ChangeDetectorRef
  ) {
    this.zones = JSON.parse(localStorage.getItem("zoneList"));
    this.projectType = localStorage.getItem("projectType");
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
    this.title = "Manage " + this.labels.surveyorLabel;
    this.clusterList = JSON.parse(localStorage.getItem("clusterList"));
    console.log(this.clusterList);
    this.form = formBuilder.group({
      id: new FormControl(""),
      m_code: new FormControl(""),
      fullName: new FormControl(""),
      password: new FormControl("", [Validators.required]),
    //  supervisorId: new FormControl(""),
    //  evaluatorId: new FormControl(""),
    //  productsSetId: new FormControl("", [Validators.required]),
      city_id: new FormControl(""),
      region_id: new FormControl(""),
      program_id: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      cnic: new FormControl(""),
      brand_id:new FormControl(""),
      active: new FormControl(""),
    });

    // this.form = formBuilder.group({
    //   id: new FormControl(""),
    //   m_code: new FormControl(""),
    //   fullName: new FormControl("", [Validators.required]),
    //   password: new FormControl("", [Validators.required]),
    //   supervisorId: new FormControl(""),
    //   evaluatorId: new FormControl(""),
    //   productsSetId: new FormControl(""),
    //   email: new FormControl(""),
    //   phone: new FormControl(""),
    //   cnic: new FormControl(""),
    //   active: new FormControl("", [Validators.required]),
    // });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
  //  this.getEvaluator();
   // this.getProductsSet();
    this.getAllRegions();
   this.getAllcity();
   this.getAllprograms();
   this.getAllBrands();
  }
  getAllprograms() {
    this.loadingData = true;
    this.httpService.getProgramsForInsert().subscribe(
      (data) => {
        const res: any = data;
        if (res.programList) {
          this.programList = res.programList;
          
          // localStorage.setItem('regionList', JSON.stringify(res.regionList));
        }
        if (!res.programList) {
          this.toastr.info("No data Found", "Info");
        }
        this.loadingData = false;
      },
      (error) => {
        this.loadingData = false;
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
  }

  getAllcity() {
    this.loadingData = true;
    this.httpService.getCity().subscribe(
      (data) => {
        const res: any = data;
        if (res.cityList) {
          this.cityList = res.cityList;
          
          // localStorage.setItem('regionList', JSON.stringify(res.regionList));
        }
        if (!res.cityList) {
          this.toastr.info("No data Found", "Info");
        }
        this.loadingData = false;
      },
      (error) => {
        this.loadingData = false;
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
  }

  getAllRegions() {
    this.loadingData = true;
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
        this.loadingData = false;
      },
      (error) => {
        this.loadingData = false;
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
  }
  getAllBrands(){
    debugger;
    this.loadingData = true;
    this.httpService.getBrand().subscribe(
      (data) => {
        const res: any = data;
        if (res.BrandList) {
          this.brandList = res.BrandList;
          
          // localStorage.setItem('regionList', JSON.stringify(res.regionList));
        }
        if (!res.BrandList) {
          this.toastr.info("No data Found", "Info");
        }
        this.loadingData = false;
      },
      (error) => {
        this.loadingData = false;
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
  }

  zoneChange() {
    const hello = this.selectedZone;
    debugger;
    this.loadingData = true;
    this.selectedRegion = {};
    this.httpService.getRegion(this.selectedZone.id).subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.regions = res;
        } else {
          this.loadingData = false;

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
        this.loadingData = false;
      }
    );
  }

  // zoneChange() {
  //   this.getData(this.params);
  //   this.loading = true;
  //   this.httpService.getRegion(this.selectedZone.id).subscribe(
  //     (data) => {
  //       const res: any = data;
  //       if (res) {
  //         this.regions = res;
  //       } else {
  //         this.loading = false;
  //         this.toastr.info(
  //           "Something went wrong,Please retry",
  //           "Connectivity Message"
  //         );
  //       }
  //       this.loading = false;
  //     },
  //     (error) => {
  //       this.loading = false;
  //     }
  //   );
  // }

  // getZoneByCluster() {
  //   this.loadingData = true;
  //   this.selectedZone = {};
  //   this.selectedRegion = {};
  //   this.httpService.getZoneByCluster(this.selectedCluster.id || -1).subscribe(
  //     (data) => {
  //       const res: any = data;
  //       if (res) {
  //         this.zones = res;
  //       }
  //       this.loadingData = false;
  //     },
  //     (error) => {
  //       error.status === 0
  //         ? this.toastr.error("Please check Internet Connection", "Error")
  //         : this.toastr.error(error.description, "Error");
  //       this.loadingData = false;
  //     }
  //   );
  // }

  loadSurveyors() {
    this.loadingData = true;
    this.httpService.getSurveyor(this.selectedProgram,this.selectedSupervisor.id|| -1,this.selectedZone.id || -1, this.selectedRegion.id || -1).subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.surveyorList = res;
            console.log("merch data: ", this.surveyorList);
            this.getMerchandiser();
           // this.getSupervisors();
           // this.getManagers();
          }
          if (!res) {
            this.toastr.info("No data Found", "Info");
          }
          this.loadingData = false;
        },
        (error) => {
          this.loadingData = false;
          error.status === 0
            ? this.toastr.error("Please check Internet Connection", "Error")
            : this.toastr.error(error.description, "Error");
        }
      );
  }

  // getEvaluator() {
  //   this.loadingData = true;
  //   this.httpService.getEvaluatorData().subscribe((data) => {
  //     //this.eva = data;
  //     if (data) {
  //       // console.log("evaluator data", data);
  //       this.eva = data;
  //       this.loadingData = false;
  //     }
  //     this.loadingData = false;
  //   });
  // }

  // getProductsSet() {
  //   this.loadingData = true;
  //   this.httpService.getProductSets().subscribe((data) => {
  //     if (data) {
  //       this.productsSetList = data;
  //       this.loadingData = false;
  //     }
  //     this.loadingData = false;
  //   });
  // }

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

  updateSurveyorData(data) {
    this.loadingModalButton = true;
    const formData = new FormData();
    // console.log("sup id: ", data.supervisorId);
    // if (!data.supervisorId || !data.evaluatorId) {
    //   data.supervisorId = -1;
    // }
    // if (!data.evaluatorId) {
    //   data.evaluatorId = -1;
    // }
    // console.log("sup id: ", data.supervisorId);
    // console.log("update data: ", data);
    formData.append("formData", JSON.stringify(data));
    this.httpService.updateSurveyorData(formData).subscribe((data: any) => {
      if (data.success == "true") {
        this.loadSurveyors();
        this.hideSurveyorInfoModal();
        this.toastr.success(data.message);
      } else {
        this.toastr.error(data.message, "Error");
      }
      this.loadingModalButton = false;
    });
  }

  showSurveyorInfoModal(surveyor) {
    debugger;
    this.selectedSurveyor = surveyor;
    debugger;
    this.form.patchValue({
      id: surveyor.id,
      m_code: surveyor.mCode,
      fullName: surveyor.fullName,
      password: surveyor.password,
     // supervisorId: surveyor.supervisorId,
      email: surveyor.email,
      phone: surveyor.phone,
      active: surveyor.active,
      cnic: surveyor.cnic,
    //  evaluatorId: surveyor.evaluatorId,
     // productsSetId: surveyor.productsSetId > 0 ? surveyor.productsSetId : null,
     city_id: surveyor.cityId || 1,
      region_id: surveyor.region_id || 1,
     program_id: surveyor.programId || 1,
     brand_id: surveyor.brand_id || 1,
    });
    this.surveyorInfoModal.show();
  }

  hideSurveyorInfoModal() {
    this.selectedSurveyor = {};
    this.form.reset();
    this.surveyorInfoModal.hide();
  }

  // getMerchandisers(){
  //   this.merchandiserList = [];
  //   for (const surveyor of this.surveyorList) {
  //     if (surveyor.type == 1) {
  //       this.merchandiserList.push(surveyor);
  //     }
  //   }
  //   // const noSuperVisor={
  //   //   supervisorList.
  //   // };
  //   console.log(this.merchandiserList);
  // }

  getMerchandiser(){
    this.merchandiserList = [];
    for (const surveyor of this.surveyorList) {
      if (surveyor.type == 2) {
        this.merchandiserList.push(surveyor);
      }
    }
    // const noSuperVisor={
    //   supervisorList.
    // };
    console.log(this.merchandiserList);
  }

  // getSupervisors() {
  //   this.supervisorList = [];
  //   for (const surveyor of this.surveyorList) {
  //     if (surveyor.type == 2) {
  //       this.supervisorList.push(surveyor);
  //     }
  //   }
  //   // const noSuperVisor={
  //   //   supervisorList.
  //   // };
  //   console.log(this.supervisorList);
  // }

  // getManagers() {
  //   this.managerList = [];
  //   for (const surveyor of this.surveyorList) {
  //     if (surveyor.type == 3) {
  //       this.managerList.push(surveyor);
  //     }
  //   }
  //   // const noSuperVisor={
  //   //   supervisorList.
  //   // };
  //   console.log(this.managerList);
  // }

  showInsertModal(data) {
    console.log(data);
    this.insertTitle = data.insertTitle;
    this.insertType = data.insertType;
    this.insertModal.show();
  }

  hideInsertModal() {
    // this.insertForm.reset();
    this.form.reset();
    this.insertModal.hide();
  }

  addSurveyor(data) {
    console.log("insertformData: ", data);
    this.loadingModalButton = true;
    const obj = {
      // act: 2,
      m_code: data.m_code,
      fullname: data.fullName,
      active: data.active,
      password: data.password,
      phone: data.phone,
     // supervisorId: data.supervisorId ? data.supervisorId : -1,
     // evaluatorId: data.evaluatorId ? data.evaluatorId : -1,
     // productsSetId: data.productsSetId,
      cityId: data.city_id,
      regionId: data.region_id,
      programId: data.program_id,
      brandId: data.brand_id || -1,
      // evaluatorId: data.evaluatorId,
      email: data.email,
      cnic: data.cnic,
     // type: this.insertType,
    };
    // const active = data.active;
    this.httpService.insertSurveyor(obj).subscribe((data: any) => {
      if (data.success == "true") {
        this.toastr.success(this.insertTitle, " Added");
        this.loadSurveyors();
        this.hideInsertModal();
      } else {
        this.toastr.error(data.message, "Error");
      }
      this.loadingModalButton = false;
    });

    
  }
  selectAllBrands() {
    const brandIds = this.brandList.map(b => b.id);
    this.form.controls.brand_ids.patchValue(brandIds);
  }
  
  deselectAllBrands() {
    this.form.controls.brand_ids.patchValue([]);
  }
  
  
  
}
