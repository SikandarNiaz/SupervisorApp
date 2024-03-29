import {
  Component,
  OnInit,
  AfterViewChecked,
  Input,
  ViewChild,
} from "@angular/core";
import { DashboardService } from "../../dashboard.service";
import * as moment from "moment";
import { subscribeOn } from "rxjs/operators";
import { Router } from "@angular/router";
import { DashboardDataService } from "../../dashboard-data.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { MatTableDataSource } from "@angular/material/table";
import { environment } from "src/environments/environment";
import { NgModel } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import * as _ from "lodash";
import { Config } from "src/assets/config";

@Component({
  selector: "filter-bar",
  templateUrl: "./filter-bar.component.html",
  styleUrls: ["./filter-bar.component.scss"],
})
export class FilterBarComponent implements OnInit {
  labels: any;
  //#endregion

  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    private dataService: DashboardDataService,
    public formBuilder: FormBuilder
  ) {
    this.zones = JSON.parse(localStorage.getItem("zoneList"));
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
    this.form = formBuilder.group({
      selectedRegionUp: this.selectedRegionUp,
      selectedOption: this.selectedOption,
      // date : this.date,
      avatar: null,
    });

    console.log(this.categoryList);
    this.sortIt("completed");
    this.userType = localStorage.getItem("user_type");
    this.evaluatorRole = localStorage.getItem("Evaluator");
    this.amRole = localStorage.getItem("amRole");
  }
  tableData: any = [];
  // ip = environment.ip;

  ip: any = Config.BASE_URI;
  selectedReportUrl = "";
  distributionList: any = [];
  selectedDistribution: any = {};
  storeType: any = ["Elite", "Platinum", "Gold", "Silver", "Others"];
  selectedStoreType = null;
  //#region veriables
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  @Input() title;
  zones: any = [];
  loadingData: boolean;
  regions: any = [];
  channels: any = [];
  options: any = ["Yes", "No"];

  reportId = -1;
  selectedZone: any = {};
  selectedRegion: any = {};
  selectedChannel: any = [];
  startDate = new Date();
  endDate = new Date();
  areas: any = [];
  regionId = -1;
  projectType: any;
  selectedArea: any = {};
  lastVisit: any = [];
  selectedLastVisit = 1;
  mustHave: any = [];
  mustHaveAll: any = [];
  selectedMustHave = false;
  selectedMustHaveAll = "";
  merchandiserList: any = [];
  selectedMerchandiser: any = {};
  clickedOnce = 1;
  categoryList: any = [];
  selectedCategory: any = {};
  cities: any = [];
  selectedCity: any = {};
  productsList: any = [];
  selectedProduct: any = [];
  selectedImpactType: any = {};
  impactTypeList: any = [];
  response: any = "";
  shopWiseCount: any = [];
  surveyorList: any = [];
  selectedSurveyor: any = [];
  brandList: any = [];
  selectedBrand: any = {};
  queryList: any = [];
  selectedQuery: any = {};
  placeHolder = "";
  userType: any;
  evaluatorRole: any;
  amRole: any;

  selectedRegionUp: any = new FormControl({}, [Validators.required]);
  // date = new FormControl(new Date());
  selectedFile = new FormControl(null, [Validators.required]);
  selectedOption = new FormControl("", [Validators.required]);
  form: FormGroup;

  loadingReportMessage = false;
  tabsData: any = [];
  loading = true;
  sortOrder = true;
  sortBy: "completed";
  selectedRemark = 0;
  remarksList = [];

  applyFilter(filterValue: string) {
    this.tableData = this.tableData.filter((f) => f.shop_title);
    console.log(this.tableData, "table data filter");
  }

  sortIt(key) {
    this.sortBy = key;
    this.sortOrder = !this.sortOrder;
  }

  getArrowType(key) {
    if (key === this.sortBy) {
      return this.sortOrder ? "arrow_upward" : "arrow_downward";
    } else {
      return "";
    }
  }
  clearAllSections() {
    this.selectedZone = {};
    this.selectedRegion = {};
    this.selectedArea = {};
    this.selectedCategory = {};
    this.selectedChannel = [];
    this.selectedProduct = [];
    this.selectedCity = {};
    this.selectedDistribution = {};
    this.distributionList = [];
    this.startDate = new Date();
    this.endDate = new Date();
  }
  ngOnInit() {
    console.log("router", this.router.url);
    this.projectType = localStorage.getItem("projectType");
    this.getZone();
    if (this.router.url === "/dashboard/export-data") {
      this.getSurveyors();
    }
    if (this.router.url === "/dashboard/raw_data") {
      this.getQueryTypeList();
    }

    if (this.router.url === "/dashboard/upload_routes_new") {
      this.getAllRegions();
    }

    // Brand Filter and Brand Wise Surveyors Filter for reports (NFL CE)
    if (this.projectType == "NFL") {
      if (
        this.router.url === "/dashboard/daily-contact-report" ||
        this.router.url === "/dashboard/cc-productivity-report" ||
        this.router.url === "/dashboard/ce-raw-data" ||
        this.router.url === "/dashboard/export-data" ||
        this.router.url === "/dashboard/attendance-detail"
      ) {
        this.getBrands();

        if (this.router.url === "/dashboard/daily-contact-report") {
          this.reportId = 1;
        } else if (this.router.url === "/dashboard/cc-productivity-report") {
          this.reportId = 3;
        } else if (this.router.url === "/dashboard/ce-raw-data") {
          this.reportId = 11;
        } else if (this.router.url === "/dashboard/attendance-detail") {
          this.reportId = 9;
        }
      }
      this.placeHolder = "BAs";
    } else if (
      this.projectType == "PMI_CENSUS" ||
      this.projectType == "PGJORDAN"
    ) {
      this.placeHolder = "Surveyors";
    }
  }

  showCount(action) {
    this.loadingData = true;
    if (this.regionId !== -1) {
      const obj = {
        regionId: this.regionId,
        action: action,
      };
      this.httpService.displayRouteStatus(obj).subscribe(
        (data) => {
          if (data) {
            this.shopWiseCount = data;
          }
          this.clearLoading();
        },
        (error) => {
          error.status === 0
            ? this.toastr.error("Please check Internet Connection", "Error")
            : this.toastr.error(error.description, "Error");
          this.clearLoading();
        }
      );
    }
  }

  deleteRoutes(surveyorId, action) {
    this.loadingData = true;
    const obj = {
      surveyorId: surveyorId,
      action: action,
    };
    this.httpService.updateRouteStatus(obj).subscribe(
      (data) => {
        if (data) {
          this.toastr.success("Routes Deactivated Successfully ");
          this.showCount("show");
        }
        this.clearLoading();
      },
      (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
        this.clearLoading();
      }
    );
  }

  getReportTypes() {
    this.httpService.getReportList().subscribe(
      (data) => {
        console.log("Reports", data);
        if (data) {
          this.queryList = data;
        }
      },
      (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
  }

  getQueryTypeList() {
    this.httpService.getQueryTypeList(-1).subscribe(
      (data) => {
        console.log("qurry list", data);
        if (data) {
          this.queryList = data;
        }
      },
      (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
  }

  uploadData(post) {
    const formData = new FormData();
    formData.append("cityId", post.selectedRegionUp);
    formData.append("newSurveyor", post.selectedOption);
    // formData.append('startDate', post.date);
    formData.append("filePath", this.form.get("avatar").value);

    if (
      post.selectedRegionUp !== "" &&
      post.selectedOption !== "" &&
      this.form.get("avatar").value !== null
    ) {
      this.loadingData = true;
      this.httpService.uploadRoutes(formData).subscribe((data) => {
        if (data) {
          this.response = data;
          if (this.response.length > 0) {
            this.loadingData = false;
            this.toastr.info(this.response, "Info");
          }
        } else {
          this.loadingData = false;
          this.toastr.error("There is an error in ur file!!");
        }
      });
    } else {
      this.loadingData = false;
      this.toastr.error("Plz fill all the required details");
    }
  }
  getDashboardData() {
    if (this.endDate >= this.startDate) {
      this.loadingData = true;
      this.loadingReportMessage = true;
      // tslint:disable-next-line:triple-equals
      const obj = {
        queryId: this.selectedQuery.id,
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
      };

      const url = "dashboard-data";
      const body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForProductivityReport(body, url).subscribe(
        (data) => {
          console.log(data, "query list");
          const res: any = data;

          if (res) {
            const obj2 = {
              key: res.key,
              fileType: res.fileType,
            };
            // tslint:disable-next-line:triple-equals
            if (this.selectedQuery.type == 1) {
              this.selectedReportUrl = "downloadCsvReport";
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

  getReportData() {
    const obj = {
      typeId: this.selectedQuery.id,
      title: this.selectedQuery.title,
      sheetName: this.selectedQuery.sheet_name,
      templatePath: this.selectedQuery.template_url,
      heading: this.selectedQuery.heading,
      query: this.selectedQuery.query,
      startDate: moment(this.startDate).format("YYYY-MM-DD"),
      endDate: moment(this.endDate).format("YYYY-MM-DD"),
    };

    const url = "dashboard-data";
    const body = this.httpService.UrlEncodeMaker(obj);
    this.httpService.getKeyForProductivityReport(body, url).subscribe(
      (data) => {
        console.log(data, "pivot data");
        const res: any = data;

        if (res) {
          const obj2 = {
            key: res.key,
            fileType: "json.fileType",
          };
          const url = "downloadReport";
          this.getproductivityDownload(obj2, url);
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
  }
  //#region filters logic

  getZone() {
    this.httpService.getZone().subscribe(
      (data) => {
        const res: any = data;
        if (res.zoneList) {
          localStorage.setItem("zoneList", JSON.stringify(res.zoneList));
          localStorage.setItem("assetList", JSON.stringify(res.assetList));
          localStorage.setItem("channelList", JSON.stringify(res.channelList));
        }
      },
      (error) => {
        this.clearLoading();

        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
  }

  zoneChange() {
    this.loadingData = true;
    // this.regions = [];
    // this.channels = [];
    if (
      this.router.url === "/dashboard/productivity_report" ||
      this.router.url === "/dashboard/merchandiser_attendance"
    ) {
      this.getTabsData();
    }

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

  getAllRegions() {
    this.loadingData = true;
    this.httpService.getRegions().subscribe(
      (data) => {
        const res: any = data;
        if (res.regionList) {
          this.regions = res.regionList;
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

  regionChange() {
    this.selectedArea = {};
    this.selectedCity = {};
    this.selectedDistribution = {};
    if (this.router.url === "/dashboard/daily_visit_report") {
      this.getMerchandiserList(this.startDate);
    }

    if (
      this.router.url === "/dashboard/productivity_report" ||
      this.router.url === "/dashboard/merchandiser_attendance"
    ) {
      this.getTabsData();
    }
    if (this.router.url !== "/dashboard/daily_visit_report") {
      this.loadingData = true;

      console.log("regions id", this.selectedRegion);
      this.httpService.getCities(this.selectedRegion.id).subscribe(
        (data) => {
          // this.channels = data[0];
          const res: any = data;
          if (res) {
            this.areas = res.areaList;
            this.cities = res.cityList;
            this.distributionList = res.distributionList;
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
    if (this.router.url === "/dashboard/daily_visit_report") {
      this.getMerchandiserList(this.startDate);
    }
  }

  dailyEvaluationRport() {
    if (this.endDate >= this.startDate) {
      this.loadingData = true;
      this.loadingReportMessage = true;
      const obj = {
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
        zoneId: this.selectedZone.id || -1,
        regionId: this.selectedRegion.id || -1,
        // channelId: this.arrayMaker(this.selectedChannel),
      };

      const url = "evaluation-report";
      const body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForProductivityReport(body, url).subscribe(
        (data) => {
          console.log(data, "evaluation data");
          const res: any = data;

          if (res) {
            const obj2 = {
              key: res.key,
              fileType: "json.fileType",
            };
            const url = "downloadReport";
            this.getproductivityDownload(obj2, url);
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

  downloadExportData() {
    if (this.endDate >= this.startDate) {
      this.loadingData = true;
      this.loadingReportMessage = true;
      const obj = {
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
        zoneId: this.selectedZone.id || -1,
        regionId: this.selectedRegion.id || -1,
        surveyorId: this.arrayMaker(this.selectedSurveyor),
        appType: this.projectType,
      };

      const url = "export-data-report";
      const body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForProductivityReport(body, url).subscribe(
        (data) => {
          console.log(data, "evaluation data");
          const res: any = data;

          if (res) {
            const obj2 = {
              key: res.key,
              fileType: "json.fileType",
            };
            const url = "downloadReport";
            this.getproductivityDownload(obj2, url);
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

  clearLoading() {
    this.loading = false;
    this.loadingData = false;
    this.loadingReportMessage = false;
  }

  getMerchandiserList(event?) {
    console.log(event);
    this.clickedOnce = 1;
    if (event) {
      this.startDate = event;
    }

    this.merchandiserList = [];
    if (!this.selectedZone.id || !this.selectedRegion.id) {
      // console.log(this.selectedZone.id,this.selectedRegion.id)
      this.toastr.info(
        "Please select zone and region to proceed",
        "PDF Download"
      );
    } else {
      const obj = {
        zoneId: this.selectedZone.id,
        regionId: this.selectedRegion.id,
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
      };
      this.httpService.getMerchandiserList(obj).subscribe(
        (data) => {
          console.log("merchandiser", data);
          const res: any = data;
          if (!res) {
            this.toastr.warning("NO record found", "Merchandiser List");
            this.merchandiserList = [];
          } else if (res.length === 0) {
            this.toastr.info(
              "NO record found,Please try again",
              "Merchandiser List"
            );
          } else {
            this.merchandiserList = res;
          }
        },
        (error) => {
          this.clearLoading();
          error.status === 0
            ? this.toastr.error("Please check Internet Connection", "Error")
            : this.toastr.error(error.description, "Error");
        }
      );
    }
  }

  arrayMaker(arr) {
    const all = arr.filter((a) => a === "all");
    const result: any = [];
    if (all[0] === "all") {
      arr = this.surveyorList;
    }
    arr.forEach((e) => {
      result.push(e.id);
    });
    return result;
  }

  getOOSShopListReport() {
    if (this.endDate >= this.startDate) {
      this.loadingReportMessage = true;
      this.loadingData = true;

      const obj = {
        zoneId: this.selectedZone.id || "",
        regionId: this.selectedRegion.id || "",
        cityId: this.selectedCity.id || "",
        areaId: this.selectedArea.id || "",
        channelId: this.arrayMaker(this.selectedChannel),
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
        // category: -1,
        lastVisit: this.selectedLastVisit || 1,
        // productId: -1,
        mustHave: "n",
      };

      const url = "shopwise-ost-report";
      const body = this.httpService.UrlEncodeMaker(obj);
      //  `pageType=2&zoneId=${obj.zoneId}&regionId=${obj.regionId}&startDate=${obj.startDate}&endDate=${obj.endDate}&cityId=${obj.cityId}&areaId=${obj.areaId}&channelId=${obj.channelId}&category=${obj.category}&lastVisit=${obj.lastVisit}&productId=${obj.productId}&mustHave=${obj.mustHave}`;

      this.httpService.getKeyForProductivityReport(body, url).subscribe(
        (data) => {
          console.log(data, "oos shoplist");
          const res: any = data;

          if (res) {
            const obj2 = {
              key: res.key,
              fileType: "json.fileType",
            };
            const url = "downloadReport";
            this.getproductivityDownload(obj2, url);
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

    // let url = 'downloadReport';
    // this.httpService.DownloadResource(obj, url);
  }

  getProuctivityDashboardReport() {
    if (this.endDate >= this.startDate) {
      this.loadingData = true;
      this.loadingReportMessage = true;
      const obj = {
        zoneId: this.selectedZone.id || -1,
        regionId: this.selectedRegion.id || -1,
        cityId: this.selectedCity.id || -1,
        areaId: this.selectedArea.id || -1,
        channelId: this.arrayMaker(this.selectedChannel),
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
        // category: -1,
        // productId: -1,
        // mustHave: 'N',
        // chillerAllocated: -1,
        // type:2,
        // pageType:1
      };

      const encodeURL: any = this.httpService.UrlEncodeMaker(obj);

      const url = "productivityDashboard";
      const body = encodeURL;
      // `chillerAllocated=${obj.chillerAllocated}&type=2&pageType=1&zoneId=${obj.zoneId}&regionId=${obj.regionId}&startDate=${obj.startDate}&endDate=${obj.endDate}&mustHave=${obj.mustHave}&channelId=${obj.channelId}`;
      //     //

      this.httpService.getKeyForProductivityReport(body, url).subscribe(
        (data) => {
          const res: any = data;

          if (res) {
            const obj2 = {
              key: res.key,
              fileType: "json.fileType",
            };
            const url = "downloadReport";
            this.getproductivityDownload(obj2, url);
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

          console.log(error, "summary report");
        }
      );
    } else {
      this.loading = false;
      this.loadingData = false;
      this.loadingReportMessage = false;
      this.toastr.info(
        "End date must be greater than start date",
        "Date Selection"
      );
    }

    // let url = 'oosSummaryReport';
    // this.httpService.DownloadResource(obj, url);
  }
  MProductivityReport() {
    if (this.endDate >= this.startDate) {
      this.loadingData = true;
      this.loadingReportMessage = true;
      const obj = {
        zoneId: this.selectedZone.id || -1,
        regionId: this.selectedRegion.id || -1,
        cityId: this.selectedCity.id || -1,
        distributionId: this.selectedDistribution.id || -1,
        storeType: this.selectedStoreType || null,
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
        // totalShops: this.selectedImpactType,
        channelId: -1,
      };
      const url = "productivityreport";
      const body = `type=2&pageType=1&zoneId=${obj.zoneId}&regionId=${obj.regionId}&startDate=${obj.startDate}&endDate=${obj.endDate}&distributionId=${obj.distributionId}&cityId=${obj.cityId}&storeType=${obj.storeType}&channelId=${obj.channelId}`;

      this.httpService.getKeyForProductivityReport(body, url).subscribe(
        (data) => {
          const res: any = data;

          if (res) {
            const obj2 = {
              key: res.key,
              fileType: "json.fileType",
            };
            const url = "downloadReport";
            this.getproductivityDownload(obj2, url);
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

          console.log(error, "productivity error");
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

  getproductivityDownload(obj, url) {
    const u = url;
    this.httpService.DownloadResource(obj, u);
    setTimeout(() => {
      this.loadingData = false;
      this.loadingReportMessage = false;
      this.httpService.updatedDownloadStatus(false);
    }, 1000);
  }

  getPercentage(n) {
    return Math.round(n) + " %";
  }
  getTabsData(data?: any, dateType?: string) {
    this.loadingData = true;
    let startDate =
      dateType === "start"
        ? moment(data).format("YYYY-MM-DD")
        : moment(this.startDate).format("YYYY-MM-DD");
    let endDate =
      dateType === "end"
        ? moment(data).format("YYYY-MM-DD")
        : moment(this.endDate).format("YYYY-MM-DD");
    // for merchandiser attendance only
    if (this.router.url === "/dashboard/merchandiser_attendance") {
      startDate = moment(this.startDate).format("YYYY-MM-DD");
      endDate = moment(this.startDate).format("YYYY-MM-DD");
    }

    this.loading = true;
    const obj: any = {
      zoneId: this.selectedZone.id
        ? this.selectedZone.id
        : localStorage.getItem("zoneId"),
      regionId: this.selectedRegion.id
        ? this.selectedRegion.id
        : localStorage.getItem("regionId"),
      startDate: startDate,
      endDate: endDate,
      cityId: this.selectedCity.id || -1,
      distributionId: this.selectedDistribution.id || -1,
      storeType: this.selectedStoreType || null,
      channelId: -1,
    };
    localStorage.setItem("obj", JSON.stringify(obj));
    this.getTableData(obj);

    this.httpService.getDashboardData(obj).subscribe(
      (data) => {
        // console.log(data, 'home data');
        this.loadingData = false;
        const res: any = data;
        if (res) {
          this.tabsData = data;
        }
        this.loading = false;
        // if (res.planned == 0)
        //   this.toastr.info('No data available for current selection', 'Summary')
      },
      (error) => {
        this.clearLoading();

        console.log(error, "home error");
      }
    );
  }
  getTableData(obj) {
    this.httpService.merchandiserShopListCBL(obj).subscribe(
      (data) => {
        console.log(data, "table data");
        const res: any = data;

        if (res) {
          this.tableData = res;
        }
        this.loading = false;
        // if (res.planned == 0)
        //   this.toastr.info('No data available for current selection', 'Summary')
      },
      (error) => {
        this.clearLoading();

        console.log(error, "home error");
      }
    );
  }

  // getMerchandiserDetailPage(id){
  //   this.router.navigate
  // }

  selectAll(select: NgModel, values) {
    select.update.emit(values);
  }

  deselectAll(select: NgModel) {
    select.update.emit([]);
  }

  equals(objOne, objTwo) {
    if (typeof objOne !== "undefined" && typeof objTwo !== "undefined") {
      return objOne.id === objTwo.id;
    }
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get("avatar").setValue(file);
    }
  }

  getBrands() {
    this.loadingData = true;
    this.getSurveyorByBrands();
    this.httpService.getBrands().subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.brandList = res;
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

  // Surveyors Based On BrandId

  getSurveyorByBrands() {
    this.loadingData = true;

    this.httpService.getSurveyorByBrands(this.selectedBrand.id || -1).subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.surveyorList = res;
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

  getSurveyors() {
    this.loadingData = true;
    this.httpService
      .getSurveyors(
        -1,
        localStorage.getItem("surveyorId") || -1,
        this.selectedZone.id || localStorage.getItem("zoneId"),
        this.selectedRegion.id || localStorage.getItem("regionId")
      )
      .subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.surveyorList = res;
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

  getSurveyorsAndBrands() {
    this.loadingData = true;

    this.httpService.getSurveyorsAndBrands().subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.surveyorList = res.surveyorList;
          this.brandList = res.brandList;
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

  getCEReports() {
    if (this.endDate >= this.startDate) {
      this.loadingData = true;
      this.loadingReportMessage = true;
      const obj = {
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
        surveyorId: this.arrayMaker(this.selectedSurveyor),
        brandId: this.selectedBrand.id || -1,
        reportId: this.reportId,
        reqType: "angularRequest",
      };

      const url = "ceSurveyDetail";
      const body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForProductivityReport(body, url).subscribe(
        (data) => {
          console.log(data, "query list");
          const res: any = data;

          if (res) {
            const obj2 = {
              key: res.key,
              fileType: res.fileType,
            };
            const url = "downloadReport";
            this.getproductivityDownload(obj2, url);
          } else {
            this.clearLoading();

            this.toastr.info(
              "Something went wrong,Please retry",
              "dashboard Data Availability Message"
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
        "Something went wrong,Please retry",
        "dashboard Data Availability Message"
      );
    }
  }

  // downloadPGExportData() {
  //   if (this.endDate >= this.startDate) {
  //     this.loadingData = true;
  //     this.loadingReportMessage = true;
  //     const obj = {
  //       startDate: moment(this.startDate).format("YYYY-MM-DD"),
  //       endDate: moment(this.endDate).format("YYYY-MM-DD"),
  //       surveyorId: this.arrayMaker(this.selectedSurveyor),
  //     };

  //     const url = "export-data-report";
  //     const body = this.httpService.UrlEncodeMaker(obj);
  //     this.httpService.getKeyForProductivityReport(body, url).subscribe(
  //       (data) => {
  //         console.log(data, "evaluation data");
  //         const res: any = data;

  //         if (res) {
  //           const obj2 = {
  //             key: res.key,
  //             fileType: "json.fileType",
  //           };
  //           const url = "downloadReport";
  //           this.getproductivityDownload(obj2, url);
  //         } else {
  //           this.clearLoading();

  //           this.toastr.info(
  //             "Something went wrong,Please retry",
  //             "Connectivity Message"
  //           );
  //         }
  //       },
  //       (error) => {
  //         this.clearLoading();
  //       }
  //     );
  //   } else {
  //     this.clearLoading();
  //     this.toastr.info(
  //       "End date must be greater than start date",
  //       "Date Selection"
  //     );
  //   }
  // }
}
