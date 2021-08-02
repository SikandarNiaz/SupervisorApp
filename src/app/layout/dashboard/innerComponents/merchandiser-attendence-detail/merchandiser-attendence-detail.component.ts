import { Component, OnInit, ViewChild, Input } from "@angular/core";
import * as moment from "moment";
import { DashboardService } from "../../dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { ModalDirective } from "ngx-bootstrap";
import { Alert } from "selenium-webdriver";
import { Config } from "src/assets/config";
import { MatPaginator } from "@angular/material";

@Component({
  selector: "app-merchandiser-attendence-detail",
  templateUrl: "./merchandiser-attendence-detail.component.html",
  styleUrls: ["./merchandiser-attendence-detail.component.scss"],
})
export class MerchandiserAttendenceDetailComponent implements OnInit {
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
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();
  zonePlaceHolder: any;
  regionPlaceHolder: any;
  resourcePlaceHolder: any;
  // @Input() startDate: moment.MomentInput;
  title = "Attendance";
  userId: any;
  @ViewChild("childModal") childModal: ModalDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedItem: any = {};
  p = 0;
  tableTitle = "";
  params: any = {};
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
    this.zonePlaceHolder = localStorage.getItem("zonePlaceHolder");
    this.regionPlaceHolder = localStorage.getItem("regionPlaceHolder");
    this.resourcePlaceHolder = localStorage.getItem("resourcePlaceHolder");
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
      };
    } else {
      this.obj = {
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
        surveyorId: -1,
        regionId: this.selectedRegion.id || -1,
        zoneId: this.selectedZone.id || -1,
      };
    }

    this.httpService.getAttendanceData(this.obj).subscribe(
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
    // tslint:disable-next-line:triple-equals
    if (this.userType == this.reevaluatorRole || item.flag == -1) {
      window.open(
        `${environment.hash}dashboard/evaluation/list/details/${item.survey_id}`,
        "_blank"
      );
    } else {
      window.open(
        `${environment.hash}dashboard/evaluation/list/details/${item.survey_id}/${item.shop_id}`,
        "_blank"
      );
    }
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
}
