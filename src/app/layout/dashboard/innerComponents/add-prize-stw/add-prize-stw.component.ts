import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Config } from 'src/assets/config';
import { environment } from 'src/environments/environment';
import { DashboardService } from "../../dashboard.service";

@Component({
  selector: 'app-add-prize-stw',
  templateUrl: './add-prize-stw.component.html',
  styleUrls: ['./add-prize-stw.component.scss']
})
export class AddPrizeStwComponent implements OnInit {
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
  projectType: any;
  // @Input() startDate: moment.MomentInput;
  title = "Prize Winners";
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
    if (!this.labels) {
      // Set default values
      this.labels = {
        surveyorLabel: "BA",
        zoneLabel: "Zone",
        regionLabel: "Region"
        // Add other default labels as needed
      };
    }
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
    
    if (this.params.startDate && this.params.endDate) {
      this.startDate = new Date(this.params.startDate);
      this.endDate = new Date(this.params.endDate);
    } else {
      this.startDate = new Date();
    }
  }

  getData(params) {
    this.loading = true;
    debugger
    if (params.regionId && params.startDate && params.endDate) {
      debugger
      this.obj = {
       // surveyorId: params.surveyorId,
        startDate: params.startDate,
        endDate: params.endDate,
        regionId: params.regionId,
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

    this.httpService.getSpinTheWheelData(this.obj).subscribe(
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

  // gotoNewPage(item) {
  //   // tslint:disable-next-line:triple-equals
  //   if (this.userType == this.reevaluatorRole || item.flag == -1) {
  //     window.open(
  //       `${environment.hash}dashboard/evaluation/list/details/${item.survey_id}`,
  //       "_blank"
  //     );
  //   } else {
  //     window.open(
  //       `${environment.hash}dashboard/evaluation/list/details/${item.survey_id}/${item.shop_id}`,
  //       "_blank"
  //     );
  //   }
  // }

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
