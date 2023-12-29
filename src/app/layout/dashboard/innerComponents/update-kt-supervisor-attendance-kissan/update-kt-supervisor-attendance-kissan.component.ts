import {
    Component,
    OnInit,
    AfterViewChecked,
    Input,
    ViewChild,
    ViewChildren,
  } from "@angular/core";
  import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
  } from "@angular/forms";
  import { DashboardService } from "../../dashboard.service";
  import * as moment from "moment";
  import { Router } from "@angular/router";
  import { ToastrService } from "ngx-toastr";
  import * as _ from "lodash";
  import { environment } from "src/environments/environment";
  import { ModalDirective } from "ngx-bootstrap/modal";
  import { Config } from 'src/assets/config';
  
  @Component({
    selector: 'app-update-kt-supervisor-attendance-kissan',
    templateUrl: './update-kt-supervisor-attendance-kissan.component.html',
    styleUrls: ['./update-kt-supervisor-attendance-kissan.component.scss']
  })
  export class UpdateKTSupervisorAttendenceKissanComponent implements OnInit {
    @ViewChildren("checked") private myCheckbox: any;
    selectedIds : any = [];
    @ViewChild("updateSuperAttendenceModal", { static: true }) updateSuperAttendenceModal: ModalDirective;
    @ViewChild("insertSuperAttendenceModal", { static: true }) insertSuperAttendenceModal: ModalDirective;
    title = "";
    minDate = new Date(2000, 0, 1);
    maxDate: any = new Date();
    startDate: any = new Date();
    zones: any = [];
    regions: any = [];
    form: FormGroup;
    selectedZone: any = {};
    selectedRegion: any = {};
    endDate = new Date();
    loadingReportMessage = false;
    selectedEvaluator: any = {};
    evaluatorList: any = [];
    userTypeId: any;
    ReEvaluatorId: any;
    userId: any;
    merchandiserList: any = [];
    supervisorAttendanceList: any = [];
    remarkList: any = [];
    remarkAttendanceList: any = [];
    shopList:any=[];
    selectedShop: any = {};
    selectedSurveyor: any = [];
    selectedProgram: any = [];
    UpdateSupervisorAttendence: any = [];
    shopData: any = [];
    surveyors: any = [];
    supervisors: any = [];
    loading = true;
    loadingData: boolean;
    cardLoading: boolean;
    evaluationSummary: any;
    evaluatorRole: any;
    supervisorList: any = [];
    selectedSupervisor: any = [];
    selectedRemark: any = [];
    selectedReason: any = [];
    selectedStore: any = [];
    loadingModalButton:boolean;
    loadingVerifyButton:boolean;
    stores: any = [];
    Reason: any;
    p = 1;
    sortOrder = true;
    sortBy: "m_code";
    projectType: any;
    labels: any;
    shopId: any;
    remarkId: any;
    reason: any;
    supervisorId: any;
    surveyorId: any;
    dashboardData: any;
    ischecked: boolean = false
  checkAllTrades: boolean = false
    id: any;
    obj = {
      id: this.selectedIds,
    };
    constructor(
      private httpService: DashboardService,
      private toastr: ToastrService,
      public fb: FormBuilder
    ) {
      this.evaluatorRole = localStorage.getItem("Evaluator");
      this.userTypeId = localStorage.getItem("user_type");
      if (this.userTypeId == this.evaluatorRole) {
        this.maxDate.setDate(this.maxDate.getDate() - 1);
        this.startDate.setDate(this.startDate.getDate() - 1);
        this.endDate.setDate(this.endDate.getDate() - 1);
      }
      if (localStorage.getItem("projectType") == "PMI_CENSUS") {
        this.title = "BDE List";
      } else {
        this.title = "Surveyor List";
      }
      this.zones = JSON.parse(localStorage.getItem("regionList"));
      this.projectType = localStorage.getItem("projectType");
      this.labels = JSON.parse(localStorage.getItem("labelProperties"));
      
  
      this.form = fb.group({
         shopId: new FormControl(""),
      //   id: new FormControl(""),
        // contractAmount: new FormControl("", [Validators.required]),
        // contractUrl: new FormControl(""),
        // active: new FormControl("", [Validators.required]),
        surveyorId:new FormControl("", [Validators.required]),
        remarkId: new FormControl("", [Validators.required]),
      //  supervisorId:new FormControl("", [Validators.required]),
        startDate: new FormControl("", [Validators.required]),
       // Remark: new FormControl("", [Validators.required]),
       // surveyor: new FormControl("", [Validators.required]),
        // endDate: new FormControl("", [Validators.required]),
        reason: new FormControl(""),
      //  id: new FormControl(""),
      });
    }
  
    ngOnInit() {
      this.loadingData = false;
      // this.loadEvaluationSummary();
      this.getSupervisorAttendanceList();
    //  this.getBaSupervisorList();
      this.getAttendanceRemarkList();
      this.getStores();
      this.getSurveyors();
      this.getSupervisor();
      this.getZoneList();
      this.sortIt("m_code");
      this.userId = localStorage.getItem("user_id");
    }
  
    getZoneList() {
      this.loading = true;
      this.httpService.getZone().subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.zones = res.zoneList;
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

    checkboxes = [
      { label: 'check 1', selected: false },
      { label: 'check 2', selected: false },
      { label: 'check 3', selected: false },
      { label: 'check 4', selected: false }
    ];
  
    showupdateSuperAttendenceModal(shop): void {
      debugger;
      this.selectedRemark=shop.Remarks;
      this.selectedReason=shop.Reason;
      this.shopData=shop;
      console.log("shop: ", shop);
      console.log(this.selectedRemark);
      console.log(this.selectedReason);
      this.form.patchValue({
        shopId: shop.id,
       // contractAmount: shop.contract_amount,
        startDate: shop.startDate,
       // endDate: shop.end_date,
       // active: shop.active,
        Remark: shop.remark_id,
      //  surveyorId: shop.surveyorId,
      });
      this.updateSuperAttendenceModal.show();
    }
  
    hideupdateSuperAttendenceModal(): void {
      this.selectedRemark={};
      this.selectedReason={};
      this.form.reset();
      this.updateSuperAttendenceModal.hide();
    }
  
    showinsertSuperAttendenceModal(shop): void {
      this.selectedStore=shop;
       this.form.patchValue({
      //   shopId: shop.shop_id,
      //  // contractAmount: shop.contract_amount,
      //   startDate: shop.startDate,
      //  // endDate: shop.end_date,
      //  // active: shop.active,
      //   Remark: shop.Remark,
      //   surveyorId: shop.surveyorId,
    supervisorId: this.selectedSupervisor.id,
       });
      this.getSurveyors();
      this.insertSuperAttendenceModal.show();
    }
  
    hideinsertSuperAttendenceModal(): void {
      this.selectedStore={};
      this.form.reset();
      this.insertSuperAttendenceModal.hide();
    }
  
    // getBaSupervisorList() {
    //   this.loadingData = true;
  
    //   this.httpService.getBaSupervisorsList().subscribe(
    //     (data) => {
    //       const res: any = data;
    //       if (res) {
    //         this.supervisorList = res;
    //         this.loadingData = false;
    //       } else {
    //         this.loadingData = false;
  
    //         this.toastr.info(
    //           "Something went wrong,Please retry",
    //           "Connectivity Message"
    //         );
    //       }
    //     },
    //     (error) => {
    //       this.loading = false;
    //     }
    //   );
    // }
  
    getSupervisor() {
        this.loading = true;
    
         this.httpService.getKTBaKissanSupervisorsList().subscribe(
          (data) => {
            const res: any = data;
            if (res) {
              this.supervisorList = res;
              console.log("supervisors",this.supervisorList)
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
  
    getAttendanceRemarkList() {
      this.loading = true;
  
      this.httpService.getAttendanceRemarkList().subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.remarkList = res;
            console.log("remarkList",this.remarkList)
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
  
    getSupervisorAttendanceList() {
      this.loadingData = true;
      const obj = {
        zoneId: this.selectedZone.id
          ? this.selectedZone.id == -1
            ? localStorage.getItem("zoneId")
            : this.selectedZone.id
          : localStorage.getItem("zoneId"),
        regionId: this.selectedRegion.id
          ? this.selectedRegion.id == -1
            ? localStorage.getItem("regionId")
            : this.selectedRegion.id
          : localStorage.getItem("regionId"),
        evaluatorId: localStorage.getItem("user_id"),
        selectedSupervisor: this.selectedSupervisor.id || -1,
        selectedEvaluator: this.selectedEvaluator.id || -1,
        userTypeId: this.userTypeId,
        shopId: this.shopId,
        remarkId: this.remarkId,
        reason:this.Reason,
        supervisorId: this.supervisorId,
        surveyorId: this.surveyorId,
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
        id: this.id,
      };
  
      this.httpService
        .getKTSupervisorAttendenceKissan(obj)
        .subscribe((data: any) => {
          // console.log('merchandiser list for evaluation',data);
          if (data) {
            this.supervisorAttendanceList = data;
            console.log("supervisorAttendanceList:", this.supervisorAttendanceList)
            this.loading = false;
            this.loadingData = false;
          }
        });
    }
  
    modifyDate(date) {
      return moment(date).format("YYYY-MM-DD");
    }
  
    gotoNewPage(item) {
      window.open(
        `${environment.hash}dashboard/evaluation/list/home?surveyorId=${
          item.id
        }&startDate=${this.modifyDate(this.startDate)}&endDate=${this.modifyDate(
          this.endDate
        )} &userType=${this.userTypeId}`,
        "_blank"
      );
    }
  
    // loadEvaluationSummary() {
    //   this.cardLoading = true;
    //   const obj = {
    //     zoneId: this.selectedZone.id
    //       ? this.selectedZone.id == -1
    //         ? localStorage.getItem("zoneId")
    //         : this.selectedZone.id
    //       : localStorage.getItem("zoneId"),
    //     regionId: this.selectedRegion.id
    //       ? this.selectedRegion.id == -1
    //         ? localStorage.getItem("regionId")
    //         : this.selectedRegion.id
    //       : localStorage.getItem("regionId"),
    //     evaluatorId: localStorage.getItem("user_id"),
    //     selectedSupervisor: this.selectedSupervisor.id || -1,
    //     selectedEvaluator: this.selectedEvaluator.id || -1,
    //     userTypeId: this.userTypeId,
    //     startDate: moment(this.startDate).format("YYYY-MM-DD"),
    //     endDate: moment(this.endDate).format("YYYY-MM-DD"),
    //   };
  
    //   this.httpService.getEvaluationSummary(obj).subscribe((data: any) => {
    //     // console.log('merchandiser list for evaluation',data);
    //     if (data) {
    //       this.evaluationSummary = data;
    //       this.cardLoading = false;
    //     }
    //   });
    // }
  
    zoneChange() {
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
  
    getDashboardData() {
      this.loadingData = true;
      const obj = {
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
        zoneId: this.selectedZone.id || -1,
        regionId: this.selectedRegion.id || -1,
        shopId: this.selectedStore.id || -1,
       // brandId: this.selectedBrand.id || -1,
      };
      this.loading = true;
      // this.getTabsData();
      this.httpService.getSupervisorAttendence(obj).subscribe((data: any) => {
        this.loadingData = false;
        if (data) {
          console.log("data",data);
          this.dashboardData = data;
        }
        this.loading = false;
      });
    }
  
     regionChange() {
      this.loading = true;
      this.selectedStore.id = -1;
      this.httpService
        .getShops(this.selectedZone.id, this.selectedRegion.id)
        .subscribe(
          (data) => {
            const res: any = data;
            if (res) {
              this.stores = res;
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
  
    updateAttendance(attendanceData) {
        console.log("Attendance Data:",attendanceData)
      debugger;
      this.loadingModalButton = true;
      console.log("remarkkkk",this.shopData);
      const formData = new FormData();
      formData.append("remardId", JSON.stringify(attendanceData));
      const obj={
        remarkId: attendanceData.Remark,
        shopId: this.shopData.id,
        reason: attendanceData.Reason,
      }
  ;
     console.log("reID: ", attendanceData.Remark, "shopDataID: ", this.shopData.id);
     console.log("Reason",obj);
      this.httpService.updateKTSupervisorAttendenceKissan(formData).subscribe((data: any) => {
        if (data.success == "true") {
         if(this.shopList.length>0){
           this.getSupervisorAttendanceList();
         }
          this.hideupdateSuperAttendenceModal();
          this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message, "Error");
        }
        this.loadingModalButton = false;
      });
    }
  
    addAttendance(attendanceData) {
      
      this.loadingModalButton = true;
      const formData = new FormData();
      formData.append("attendanceData", JSON.stringify(attendanceData));
     
      this.httpService.addSupervisorAttendence(formData).subscribe((data: any) => {
        if (data.success == "true") {
         if(this.shopList.length>0){
           this.getSupervisorAttendanceList();
         }
          this.hideinsertSuperAttendenceModal();
          this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message, "Error");
        }
        this.loadingModalButton = false;
      });
    }
    clearLoading() {
      this.loadingData = false;
    }

    resetObj() {
      this.obj = {
        id: [],
      };
    }

    verifyAttendance() {
      debugger;
      this.loading = true;
      // const obj = {
      //   id: this.selectedIds,
      // };
    
      this.httpService.verifySupervisorAttendance(this.obj).subscribe((data: any[]) => {
        debugger;
        for (const message of data) {
          if (message.success === true) {
            this.getSupervisorAttendanceList();
            // Handle success for each ID
            this.toastr.success("Attendance Verified Successfully ");
            this.selectedIds = [];
            // this.loadingModalButton = false;
          } else {
            // Handle failure for each ID
            this.toastr.error("Error occurred for one or more IDs");
          }
          this.loadingVerifyButton=false;
        }
        this.clearLoading();
      }, (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
        this.clearLoading();
      });
    }
    

    // deleteRoutes(action) {
    //   this.loadingData = true;
    //   const obj = {
    //     surveyorIds: this.selectedSurveyors,
    //     action: action,
    //   };
    //   this.httpService.updateRouteStatus(obj).subscribe(
    //     (data) => {
    //       if (data) {
    //         this.toastr.success("Routes Deactivated Successfully ");
    //         this.showCount("show");
    //       }
    //       this.clearLoading();
    //     },
    //     (error) => {
    //       error.status === 0
    //         ? this.toastr.error("Please check Internet Connection", "Error")
    //         : this.toastr.error(error.description, "Error");
    //       this.clearLoading();
    //     }
    //   );
    // }
  
    getStores() {
      this.loading = true;
  
      this.httpService.getShops(this.selectedZone.id || -1, this.selectedRegion.id || -1).subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.shopList = res;
            console.log("shopList",this.shopList)
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

    singleCheckbox(event) {
      if (event.target.checked == true) {
        this.ischecked = true
      }
  
      if (this.ischecked && this.checkAllTrades) {
        event.target.checked = true
      }
    }
      toggleCheckboxAll(event) {
        const checked = event.target.checked;
        this.checkboxes.forEach(item => item.selected = checked);
      }
  
    // getSurveyors() {
    //   this.loadingModal = true;
    //   this.httpService
    //     .getSurveyors(
    //       this.selectedProgram,
    //       -1,
    //       this.selectedZone.id || -1,
    //       this.selectedRegion.id || -1
    //     )
    //     .subscribe(
    //       (data) => {
    //         const res: any = data;
    //         if (res) {
    //           this.surveyors = res;
    //         } else {
    //           this.clearLoading();
  
    //           this.toastr.info(
    //             "Something went wrong,Please retry",
    //             "Connectivity Message"
    //           );
    //         }
  
    //         setTimeout(() => {
    //           this.loadingModal = false;
    //         }, 500);
    //       },
    //       (error) => {
    //         this.clearLoading();
    //       }
    //     );
    // }
  
    getSurveyors() {
      this.loading = true;
  
       this.httpService.getSurveyors(this.selectedProgram,this.selectedSupervisor.id|| -1,this.selectedZone.id || -1, this.selectedRegion.id || -1).subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.surveyors = res;
            console.log("surveyors",this.surveyors)
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
  
    // getSupervisor() {
    //   this.loading = true;
  
    //    this.httpService.getCESupervisorsList().subscribe(
    //     (data) => {
    //       const res: any = data;
    //       if (res) {
    //         this.supervisors = res;
    //         console.log("supervisors",this.supervisors)
    //       } else {
    //         this.loading = false;
  
    //         this.toastr.info(
    //           "Something went wrong,Please retry",
    //           "Connectivity Message"
    //         );
    //       }
  
    //       setTimeout(() => {
    //         this.loading = false;
    //       }, 500);
    //     },
    //     (error) => {
    //       this.loading = false;
    //     }
    //   );
    // }

    checkUncheckAll(event) {
      if (event.checked === true) {
        for (let i = 0; i < this.supervisorAttendanceList.length; i++) {
          if (
            this.selectedIds.indexOf(this.supervisorAttendanceList[i].id) ==
            -1
          ) {
            this.selectedIds.push(this.supervisorAttendanceList[i].id);
          }
        }
        for (let index = 0; index < this.myCheckbox._results.length; index++) {
          this.myCheckbox._results[index]._checked = true;
        }
      } else {
        for (let i = 0; i < this.supervisorAttendanceList.length; i++) {
          const i = this.selectedIds.indexOf("id");
          this.selectedIds.splice(i, 1);
          this.selectedIds = [];
        }
        for (let index = 0; index < this.myCheckbox._results.length; index++) {
          this.myCheckbox._results[index]._checked = false;
        }
      }
    }

    checkUncheckSingle(event, item, index) {
      console.log("item", item);
      debugger;
      if (event.checked === true) {
        debugger;
        this.selectedIds.push(item.id);

      } else {
        const i = this.id.indexOf(item.id);
        this.selectedIds.splice(i, 1);
      }
    }
   
  }