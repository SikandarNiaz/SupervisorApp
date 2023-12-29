import { Component, OnInit, ViewChild, Input } from "@angular/core";
import * as moment from "moment";
import { DashboardService } from "../../dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Alert } from "selenium-webdriver";
import { Config } from "src/assets/config";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-ndn-interception-summary-detail",
  templateUrl: "./ndn-interception-summary-detail-component.html",
  styleUrls: ["./ndn-interception-summary-detail-component.scss"],
})
export class NDNInterceptionSummaryDetailComponent implements OnInit {
  // ip = environment.ip;

  ip: any = Config.BASE_URI;
  tableData: any = [];
  headingsList: any = [];
  obj: any = {};
  loading = false;
  reevaluatorRole: any;
  userType: any;
  zones: any = [];
  regions: any = [];
  loadingData: boolean;
  selectedZone: any = {};
  selectedRegion: any = {};
  minDate = new Date(2000, 0, 1);
  supervisorList: any;
  selectedSupervisor: any = [];
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();
  projectType: any;
  sortBy: "CUSTOMER_CONTACT";
  sortOrder = true;
  // @Input() startDate: moment.MomentInput;
  title = "Interception Summary Detail";
  userId: any;
  @ViewChild("childModal", { static: true }) childModal: ModalDirective;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  selectedItem: any = {};
  p = 0;
  tableTitle = "";
  params: any = {};
  labels: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: DashboardService,
    private activeRoute: ActivatedRoute
  ) {
    this.zones = JSON.parse(localStorage.getItem("zoneList"));
    this.activeRoute.queryParams.subscribe((p) => {
      console.log("active params", p);
      this.params = p;
      this.getData(this.params);
    });
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
    this.projectType = localStorage.getItem("projectType");
    
  }

  showChildModal(): void {
    this.childModal.show();
  }
  hideChildModal(): void {
    this.childModal.hide();
  }

  setSelectedItem(item) {
    this.selectedItem = item;
  }

  ngOnInit() {
    // this.getTableData();
    this.getSupervisor();
    
  }

  getData(params) {
    this.loading = true;
    if (params.surveyorId && params.startDate && params.endDate) {
      this.obj = {
        surveyorId: params.surveyorId,
        startDate: params.startDate,
        endDate: params.endDate,
        regionId: -1,
        zoneId: -1,
        supervisorId: -1,
      };
    } else {
      this.obj = {
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
        surveyorId: -1,
        regionId: this.selectedRegion.id || -1,
        zoneId: this.selectedZone.id
        ? this.selectedZone.id == -1
          ? localStorage.getItem("zoneId")
          : this.selectedZone.id
        : localStorage.getItem("zoneId"),
        supervisorId: this.selectedSupervisor.id || -1,
      };
    }

    this.httpService.getNDNInterceptionSummaryDetail(this.obj).subscribe(
      (data) => {
        // console.log(data);
        this.tableData = data;
        if (this.tableData.length === 0) {
          this.loading = false;
          this.toastr.info("No record found.");
        }
        this.loading = false;
      },
      (error) => {}
    );
  }

  gotoNewPage(item) {
    console.log("item data: ", item);

    const queryParams = new URLSearchParams();
    queryParams.set('interception_id', item.id);
    const urlWithParams = `${environment.hash}dashboard/view-kt-interception-evaluation?${queryParams.toString()}`;

    window.open(
      urlWithParams,
      "_blank"
    );
    } 

  zoneChange() {
    this.getData(this.params);
    this.loading = true;
    this.httpService.getRegion(this.selectedZone.id).subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.regions = res;
        } else {
          this.loading = false;
          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }
        this.loading = false;
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

  getSupervisor() {
    this.loading = true;

     this.httpService.getBaSupervisorsList().subscribe(
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
}
