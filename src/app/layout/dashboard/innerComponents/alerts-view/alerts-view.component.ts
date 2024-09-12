import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../../dashboard.service";
import * as moment from "moment";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-alerts-view",
  templateUrl: "./alerts-view.component.html",
  styleUrls: ["./alerts-view.component.scss"],
})
export class AlertsViewComponent implements OnInit {
  title = "";
  minDate = new Date(2000, 0, 1);
  maxDate: any = new Date();
  startDate: any = new Date();
  zones: any = [];
  regions: any = [];
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
  loading = true;
  loadingData: boolean;
  cardLoading: boolean;
  evaluationSummary: any;
  evaluatorRole: any;
  supervisorList: any = [];
  selectedSupervisor: any = [];
  selectedSurveyor: any = [];
  p = 1;
  sortOrder = true;
  sortBy: "m_code";
  projectType: any;
  labels: any;
    surveyorList: any = [];
    alertTypes: string[] = [];
    selectedAlertType: string | number = -1; 
  constructor(
    private httpService: DashboardService,
    private toastr: ToastrService
  ) {
    this.evaluatorRole = localStorage.getItem("Evaluator");
    this.userTypeId = localStorage.getItem("user_type");
    if (localStorage.getItem("projectType") != "RECKITT_CENSUS"){
    if (this.userTypeId == this.evaluatorRole) {
      this.maxDate.setDate(this.maxDate.getDate() - 1);
      this.startDate.setDate(this.startDate.getDate() - 1);
      this.endDate.setDate(this.endDate.getDate() - 1);
    }
  }
    this.title = "Alert View";
    this.zones = JSON.parse(localStorage.getItem("zoneList"));
    this.projectType = localStorage.getItem("projectType");
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
  }

  ngOnInit() {
    this.loadingData = false;
    this.getZoneList();
   // this.loadEvaluationSummary();
    this.getMerchandiserList();
    this.getSupervisor();
    this.getSupervisorList();
    this.sortIt("m_code");
    this.gettingAlertsType();
    this.userId = localStorage.getItem("user_id");
  }


  gettingAlertsType() {
    this.httpService.gettingAlertsType().subscribe(
      (response: any[]) => {
        // Add "All" option to the alertTypes array
        this.alertTypes = ['All', ...response];
        console.log('Alert Types:', this.alertTypes);
      },
      (error) => {
        console.error('Error fetching Alert Types:', error);
      }
    );
  }
  onAlertTypeChange(selectedValue: string | number) {
    // Update selectedAlertType based on the selection
    this.selectedAlertType = selectedValue === 'All' ? -1 : selectedValue;
    this.getMerchandiserList(); // Call method to fetch data based on the new alertType
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

  getSupervisorList() {
    this.loadingData = true;

    this.httpService.getSupervisorsList().subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.surveyorList = [{ id: -1, fullName: 'All' }, ...res];
          this.loadingData = false;
        } else {
          this.loadingData = false;

          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }
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

  getMerchandiserList() {
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
      selectedSurveyor: this.selectedSurveyor.id || -1,
      selectedEvaluator: this.selectedEvaluator.id || -1,
      userTypeId: this.userTypeId,
      alertType: this.selectedAlertType || -1,
      startDate: moment(this.startDate).format("YYYY-MM-DD"),
      endDate: moment(this.endDate).format("YYYY-MM-DD"),
    };

    this.httpService
      .getAlertsView(obj)
      .subscribe((data: any) => {
        // console.log('merchandiser list for evaluation',data);
        if (data) {
          this.merchandiserList = data;
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

  loadEvaluationSummary() {
    this.cardLoading = true;
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
      startDate: moment(this.startDate).format("YYYY-MM-DD"),
      endDate: moment(this.endDate).format("YYYY-MM-DD"),
    };

    this.httpService.getEvaluationSummary(obj).subscribe((data: any) => {
      // console.log('merchandiser list for evaluation',data);
      if (data) {
        this.evaluationSummary = data;
        this.cardLoading = false;
      }
    });
  }

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

  getSupervisor() {
    this.loading = true;

     this.httpService.getBaSupervisorsList().subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.supervisorList = [{ id: -1, fullName: 'All' }, ...res];
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
}
