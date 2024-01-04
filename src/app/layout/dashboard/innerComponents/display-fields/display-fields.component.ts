import {
    Component,
    OnInit,
    AfterViewChecked,
    Input,
    ViewChild,
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
    selector: 'app-display-fields',
    templateUrl:'./display-fields.component.html',
    styleUrls: ['./display-fields.component.scss']
  })
  export class ShowFieldsComponent implements OnInit {
    @ViewChild("updateSuperAttendenceModal", { static: true }) updateSuperAttendenceModal: ModalDirective;
    @ViewChild("insertSuperAttendenceModal", { static: true }) insertSuperAttendenceModal: ModalDirective;
    @Input("isEditable") isEditable: any;
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
    giftList:any=[];
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
    selectedStore: any = [];
    selectedGift: any = [];
    loadingModalButton:boolean;
    stores: any = [];
    p = 1;
    sortOrder = true;
    sortBy: "m_code";
    projectType: any;
    labels: any;
    shopId: any;
    remarkId: any;
    supervisorId: any;
    surveyorId: any;
    dashboardData: any;
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
      this.zones = JSON.parse(localStorage.getItem("zoneList"));
      this.projectType = localStorage.getItem("projectType");
      this.labels = JSON.parse(localStorage.getItem("labelProperties"));
  
    }
  
    ngOnInit() {
      this.loadingData = false;
      this.getSupervisorAttendanceList();
      this.sortIt("m_code");
      this.userId = localStorage.getItem("user_id");
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
        shopId: this.selectedStore.id || -1,
        giftId: this.selectedGift.id || -1,
        remarkId: this.remarkId,
        supervisorId: this.supervisorId,
        surveyorId: this.surveyorId,
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
      };
  
      this.httpService
        .getFieldsList(obj)
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
  
    // gotoNewPage(item) {
    //   window.open(
    //     `${environment.hash}dashboard/evaluation/list/home?surveyorId=${
    //       item.id
    //     }&startDate=${this.modifyDate(this.startDate)}&endDate=${this.modifyDate(
    //       this.endDate
    //     )} &userType=${this.userTypeId}`,
    //     "_blank"
    //   );
    // }
  
  }