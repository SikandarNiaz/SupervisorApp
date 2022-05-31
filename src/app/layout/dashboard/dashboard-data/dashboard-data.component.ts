import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardService } from "../dashboard.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
@Component({
  selector: "app-dashboard-data",
  templateUrl: "./dashboard-data.component.html",
  styleUrls: ["./dashboard-data.component.scss"],
})
export class DashboardDataComponent implements OnInit {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();
  singleDate = new Date();
  queryList: any = [];
  selectedQuery: any = {};
  loadingData: boolean;
  loadingReportMessage = false;
  p: any = {};
  reportId = -1;
  title = "";
  selectedReportUrl = "";
  clusterList: any = [];
  zones: any = [];
  regions: any = [];
  selectedZone: any = {};
  selectedRegion: any = {};
  selectedCluster: any = {};
  clusterId: any;
  labels: any;
  projectType: any;
  queryParams: any = [];
  selectedArea: any = {};
  areas: any = [];
  selectedFold: any = {};
  selectedChannel: any = {};
  reportData: any = {};
  selectedSurveyor: any = {};
  surveyors: any = [];

  constructor(
    private activatedRoutes: ActivatedRoute,
    private httpService: DashboardService,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.projectType = localStorage.getItem("projectType");
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
  }

  ngOnInit() {
    this.activatedRoutes.params.subscribe((params) => {
      if (params.reportId) {
        this.reportId = params.reportId;
      }
      this.getQueryTypeList(this.reportId);
    });
  }

  getQueryTypeList(reportId: number) {
    this.loadingData = true;
    this.httpService.getQueryList(reportId).subscribe(
      (data: any) => {
        if (data) {
          this.reportData = data;
          this.queryList = data.reportList;
          this.loadQuery(reportId);
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

  getDashboardData() {
    if (this.endDate >= this.startDate) {
      this.loadingData = true;
      this.loadingReportMessage = true;
      // tslint:disable-next-line:triple-equals
      const url = "dashboard-data-new";
      this.httpService
        .getKeyForDashboardReport(url, this.getReportDataObj())
        .subscribe(
          (data) => {
            const res: any = data;

            if (res) {
              const obj2 = {
                key: res.key,
                fileType: res.fileType,
              };
              // tslint:disable-next-line:triple-equals
              if (this.selectedQuery.type == 1) {
                this.selectedReportUrl = "downloadcsvReport";
              } else {
                this.selectedReportUrl = "downloadReport";
              }

              this.getproductivityDownload(obj2, this.selectedReportUrl);
            } else {
              this.clearLoading();

              this.toastr.info(
                "Something went wrong,Please retry",
                "Connectivity Message"
              );
            }
          },
          (error) => {
            this.clearLoading();
          }
        );
    } else {
      this.clearLoading();
      this.toastr.info(
        "End date must be greater than start date",
        "Date Selection"
      );
    }
  }

  getReportDataObj() {
    let obj: any = {};
    obj.queryId = this.selectedQuery.id;
    for (const param of this.selectedQuery.parameterList) {
      if (param.populatedFrom == "Cluster") {
        obj.Cluster = this.selectedCluster.id
          ? this.selectedCluster.id == -1
            ? localStorage.getItem("clusterId")
            : this.selectedCluster.id
          : localStorage.getItem("clusterId");
      } else if (param.populatedFrom == "Zone") {
        obj.Zone = this.selectedZone.id
          ? this.selectedZone.id == -1
            ? localStorage.getItem("zoneId")
            : this.selectedZone.id
          : localStorage.getItem("zoneId");
      } else if (param.populatedFrom == "Region") {
        obj.Region = this.selectedRegion.id
          ? this.selectedRegion.id == -1
            ? localStorage.getItem("regionId")
            : this.selectedRegion.id
          : localStorage.getItem("regionId");
      } else if (param.populatedFrom == "Area") {
        obj.Area = this.selectedArea.id
          ? this.selectedArea.id == -1
            ? localStorage.getItem("areaId")
            : this.selectedArea.id
          : localStorage.getItem("areaId");
      } else if (param.populatedFrom == "start_date") {
        obj.start_date = moment(this.startDate).format("YYYY-MM-DD");
      } else if (param.populatedFrom == "end_date") {
        obj.end_date = moment(this.endDate).format("YYYY-MM-DD");
      } else if (param.populatedFrom == "date") {
        obj.date = moment(this.singleDate).format("YYYY-MM-DD");
      } else if (param.populatedFrom == "Fold") {
        obj.Fold = this.selectedFold.id || -1;
      } else if (param.populatedFrom == "Channel") {
        obj.Channel = this.selectedChannel.id || -1;
      } else if (param.populatedFrom == "Surveyor") {
        obj.Surveyor = this.selectedSurveyor.id || -1;
      }
    }
    return obj;
  }

  getproductivityDownload(obj: { key: any; fileType: any }, url: string) {
    const u = url;
    this.httpService.DownloadResource(obj, u);
    setTimeout(() => {
      this.loadingData = false;
      this.loadingReportMessage = false;
      this.httpService.updatedDownloadStatus(false);
    }, 1000);
  }

  clearLoading() {
    this.loadingData = false;
    this.loadingReportMessage = false;
  }

  loadQuery(reportId: number) {
    this.selectedQuery = this.queryList[0];
    if (reportId > -1) {
      this.title = this.selectedQuery.title;
    } else {
      this.title = "Raw Data";
    }
    this.clusterList = this.reportData.clusterList;
    this.zones = this.reportData.zoneList;
    this.regions = this.reportData.regionList;
    this.areas = this.reportData.areaList;
    this.setparamsVisibility(-1);
  }

  setparamsVisibility(parentId) {
    for (let i = 0; i < this.selectedQuery.parameterList.length; i++) {
      if (this.selectedQuery.parameterList[i].parentId == parentId) {
        if (parentId > -1) {
          this.loadFilters(i);
        }
        this.selectedQuery.parameterList[i].isVisible = true;
      }
    }
  }

  loadFilters(index) {
    if (this.selectedQuery.parameterList[index].populatedFrom == "Zone") {
      this.reportData.zoneList =
        this.selectedCluster.id == -1
          ? this.zones
          : this.zones.filter((z) => z.clusterId == this.selectedCluster.id);
    } else if (
      this.selectedQuery.parameterList[index].populatedFrom == "Region"
    ) {
      this.reportData.regionList =
        this.selectedZone.id == -1
          ? this.regions.filter((r) =>
              r.zone ? r.zone.id == localStorage.getItem("zoneId") : -1
            )
          : this.regions.filter((r) =>
              r.zone ? r.zone.id == this.selectedZone.id : -1
            );
    } else if (
      this.selectedQuery.parameterList[index].populatedFrom == "Area"
    ) {
      this.reportData.areaList =
        this.selectedRegion.id == -1
          ? this.areas
          : this.areas.filter((a) => a.regionId == this.selectedRegion.id);
    }
  }
}
