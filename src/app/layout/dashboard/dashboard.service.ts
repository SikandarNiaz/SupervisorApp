import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Subject, of, BehaviorSubject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { timeout, catchError } from "rxjs/operators";
import * as moment from "moment";
import { Router } from "@angular/router";
import { Config } from "src/assets/config";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  dashboardStatsObj: any;
  filteredList: any;
  filter1:any=null;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.user_id = localStorage.getItem("user_id");
  }

  ip: any = Config.BASE_URI;
  user_id: any = 0;
  private dataSource = new Subject();
  data = this.dataSource.asObservable();

  // ip: any = 'http://192.168.3.162:8080/audit/';

  // ip: any='http://192.168.3.142:8080/audit/';
  // ip: any = 'http://192.168.3.189:8080/audit/';
  // ip: any = 'http://192.168.3.94:8080/audit/';
  // ip: any = 'http://192.168.3.162:8080/audit/';

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    withCredentials: true,
  };

  updatedDownloadStatus(data) {
    this.dataSource.next(data);
  }

  login(credentials: any) {
    // let body=JSON.stringify(credentials)
    const url = this.ip + "portal/auth/login";   // JsonLoginController
    return this.http.post(url, credentials);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout')
    //     return of(null);
    //   })
    // );
  }
  login1() {
   
    const url = this.ip + "getProjectType";   // JsonLoginController
    return this.http.post(url,this.httpOptions);
    
  }
  updatePassword(obj) {
    const url = this.ip + "change-password";
    return this.http.post(url, obj, this.httpOptions);
  }

  UrlEncodeMaker(obj) {
    let url = "";
    for (const key in obj) {
      url += `${key}=${obj[key]}&`;
    }
    const newUrl = url.substring(0, url.length - 1);
    return newUrl;
  }

  getDashboardData(obj) {
    let body = null;
    if (obj != null) {
      body = this.UrlEncodeMaker(obj);
      // `zoneId=${obj.zoneId}&regionId=${obj.regionId}&endDate=${obj.endDate}&startDate=${obj.startDate}&distributionId=${obj.distributionId}&cityId=${obj.cityId}&storeType=${obj.storeType}&channelId=${obj.channelId}`;
    }
    const url = this.ip + "dashboardDatajson"; // ---------> DashboardDataControllerJson
    return this.http.post(url, body, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getShopData(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "shopData"; //  --------> ShopListController
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  ActiveDeactiveShops(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "assign-shops"; // -----> ShopsAssignController
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  UpdateTime(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "update-surveyor-time"; // -----> UpdateSurveyorTimeController
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  //#region FILTER CALL
  getZone() {
    this.user_id = localStorage.getItem("user_id");
    const filter = JSON.stringify({ act: 34, userId: this.user_id });
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getQueryTypeList(reportId) {
    this.user_id = localStorage.getItem("user_id");

    const filter = JSON.stringify({ act: 12, reportId: reportId });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }

  getReportList() {
    this.user_id = localStorage.getItem("user_id");

    const filter = JSON.stringify({ act: 14, userId: this.user_id });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }

  updateRouteStatus(obj) {
    const url = this.ip + "shopWiseRouteCount";
    return this.http.post(url, obj);
  }

  deleteRoutes(obj) {
    const url = this.ip + "shopWiseRouteCount";
    return this.http.post(url, obj);
  }

  getRegion(zoneId) {
    this.user_id = localStorage.getItem("user_id");
    const filter = JSON.stringify({
      act: 1,
      zoneId: zoneId,
      userId: this.user_id,
    });
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }
  getPrograms() {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({ act: 5 });
    return this.http.post(url, filter);
  }

  getRegions() {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({ act: 4 });
    return this.http.post(url, filter);
  }
  getBrand() {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({ act: 39 });
    return this.http.post(url, filter);
  }

  getZones() {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({ act: 34 });
    return this.http.post(url, filter);
  }
  getCity() {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({ act: 26 });
    return this.http.post(url, filter);
  }
  getProgramsForInsert() {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({ act: 27 });
    return this.http.post(url, filter);
  }

  getSurveyors(programId, surveyorId, zoneId, regionId) {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({
      act: 13,
      programId: programId,
      surveyorId: surveyorId,
      // supervisorId:supervisorId,
      zoneId: zoneId,
      regionId: regionId,
    });
    return this.http.post(url, filter);
  }

  getSamsungSurveyors(zoneId, regionId) {
    const filter = JSON.stringify({
      act: 25,
      zoneId: zoneId,
      regionId: regionId,
    });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }

  getSurveyor(programId, surveyorId, zoneId, regionId) {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({
      act: 25,
      programId: programId,
      surveyorId: surveyorId,
      // supervisorId:supervisorId,
      zoneId: zoneId,
      regionId: regionId,
    });
    return this.http.post(url, filter);
  }

  getActiveShops(zoneId, regionId) {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({
      act: 15,
      zoneId: zoneId,
      regionId: regionId,
    });
    return this.http.post(url, filter);
  }

  getKeyForProductivityReport(body, reportUrl) {
    this.updatedDownloadStatus(true);
    const url = this.ip + reportUrl;
    return this.http.post(url, body, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getMerchandiserList(obj) {
    this.user_id = localStorage.getItem("user_id");

    const filter = JSON.stringify({
      act: 4,
      regionId: obj.regionId,
      zoneId: obj.zoneId,
      date: obj.startDate,
      userId: this.user_id,
    });
    const url = this.ip + "loadFilters";

    // const url = this.ip + 'cbl-pdf';
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getTableList(obj) {
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "completedShopListCBL";
    return this.http.post(url, body, this.httpOptions);
  }

  merchandiserShopListCBL(obj) {
    const body = `zoneId=${obj.zoneId}&regionId=${obj.regionId}&endDate=${obj.endDate}&startDate=${obj.startDate}&distributionId=${obj.distributionId}&cityId=${obj.cityId}&storeType=${obj.storeType}&channelId=${obj.channelId}`;
    const url = this.ip + "merchandiserShopListCBL";
    return this.http.post(url, body, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getCities(regionId) {
    this.user_id = localStorage.getItem("user_id");

    const filter = JSON.stringify({
      act: 2,
      regionId: regionId,
      userId: this.user_id,
    });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  public DownloadResource(obj, url) {
    let path;

    path = this.ip + url;

    const form = document.createElement("form");

    form.setAttribute("action", path);

    form.setAttribute("method", "post");
    // form.setAttribute('target', '_blank');

    document.body.appendChild(form);

    this.appendInputToForm(form, obj);

    form.submit();

    document.body.removeChild(form);
  }

  private appendInputToForm(form, obj) {
    Object.keys(obj).forEach((key) => {
      const input = document.createElement("input");

      input.setAttribute("value", obj[key]);

      input.setAttribute("name", key);

      form.appendChild(input);
    });
  }

  displayRouteStatus(obj) {
    const url = this.ip + "shopWiseRouteCount"; // ------->  SurveyorRouteListController
    return this.http.post(url, obj);
  }
  uploadRoutes(obj) {
    const url = this.ip + "uploadRoutes"; // -------> UploadExcelController
    return this.http.post(url, obj);
  }
  uploadmerchandisingShops(obj) {
    const url = this.ip + "merchandisingShopTask"; // -------> UploadExcelController
    return this.http.post(url, obj);
  }
  getKey(obj) {
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(this.ip + "tableauTicket", body, this.httpOptions);
  }
  getAttendanceData(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "merchandiserAttendanceDetail"; // -------> MerchandiserAttendanceDetailController
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  getBAList(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "BAList"; // ------> BAListController
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  getNDNInterceptionSummary(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "ndn-interception-Summary"; // ------> NdnInterceptionSummaryController
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  getNDNInterceptionSummaryDetail(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "ndn-interception-Summary-Detail"; // -------> NdnInterceptionSummaryDetailController
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  getBrands() {
    const filter = JSON.stringify({ act: 9 });
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    return this.http.post(url, filter);
  }

  getSurveyorByBrands(brandId) {
    const filter = JSON.stringify({ act: 10, brandId: brandId });
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    return this.http.post(url, filter);
  }

  // getDashboardStats(obj) {
  //   const urlEncode = this.UrlEncodeMaker(obj);
  //   const url = this.ip + "interceptionSummary"; // ------> InterceptionSummaryDataController
  //   return this.http.post(url, urlEncode, this.httpOptions);
  // }

  getShops(zoneId, regionId) {
    const filter = JSON.stringify({
      act: 6,
      zoneId: zoneId,
      regionId: regionId,
    });
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    return this.http.post(url, filter);
  }

  getSurveyorsAndBrands() {
    const filter = JSON.stringify({ act: 7 });
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    return this.http.post(url, filter);
  }

  saveShop(obj) {
    const url = this.ip + "addNewShop"; // -----------> AddNewShopController
    return this.http.post(url, obj);
  }

  updateShop(obj) {
    const url = this.ip + "updateShopInfo"; // -----------> UpdateShopInfoController
    return this.http.post(url, obj);
  }
  getEvaluationSummary(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "evaluatorSummaryData";
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getMerchandiserListForEvaluation(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "merchandiserList";
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getSupervisorsList() {
    const filter = JSON.stringify({ act: 19 });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }

  getCESupervisorsList() {
    const filter = JSON.stringify({ act: 14 });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }

  getShopTargetData(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "shopTarget"; //----------> ShopListController
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getSupervisorAttendence(obj) {
    const url = this.ip + "/supervisor-attendance-detail"; // -----------> DisplaySupervisorAttendanceController
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body, this.httpOptions);
  }

  getKTSupervisorAttendenceKissan(obj) {
    const url = this.ip + "/kt-supervisor-attendance-detail-kissan"; // -----------> DisplayKTSupervisorAttendanceKissanController
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body, this.httpOptions);
  }

  getKTSupervisorAttendenceCGS(obj) {
    const url = this.ip + "/kt-supervisor-attendance-detail-CGS"; // -----------> DisplayKTSupervisorAttendanceKissanController
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body, this.httpOptions);
  }

  updateKTSupervisorAttendenceKissan(obj) {
    const url = this.ip + "/update-kt-supervisor-attendance-kissan"; // -----------> UpdateKTSupervisorAttendanceKissanController
    return this.http.post(url, obj);
  }

  updateKTSupervisorAttendenceCGS(obj) {
    const url = this.ip + "/update-kt-supervisor-attendance-CGS"; // -----------> UpdateKTSupervisorAttendanceCGSController
    return this.http.post(url, obj);
  }

  updateSupervisorAttendence(obj) {
    const url = this.ip + "/update-supervisor-attendance"; // -----------> UpdateSupervisorAttendanceController
    return this.http.post(url, obj);
  }

  getBaSupervisorsList() {
    const filter = JSON.stringify({ act: 20 });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }

  getBaSupervisorsListWithNameCode() {
    const filter = JSON.stringify({ act: 32 });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }

  getBaSupervisorsListByRegion(regionId) {
    const filter = JSON.stringify({
      act: 35,
      regionId: regionId,
    });
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    return this.http.post(url, filter);
  }

  getKTBaKissanSupervisorsList() {
    const filter = JSON.stringify({ act: 31 });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }

  getKTBaCGSSupervisorsList() {
    const filter = JSON.stringify({ act: 32 });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }

  getAttendanceRemarkList() {
    const filter = JSON.stringify({ act: 21 });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }

  addSupervisorAttendence(obj) {
    const url = this.ip + "/add-supervisor-attendance"; // -----------> UpdateSupervisorAttendanceController
    return this.http.post(url, obj);
  }

  verifySupervisorAttendance(obj) {
    const url = this.ip + "/verify-supervisor-attendance"; // -----------> VerifySupervisorAttendanceController
    return this.http.post(url, obj);
  }

  getKeyForDashboardReport(reportUrl, obj) {
    this.updatedDownloadStatus(true);
    const url = this.ip + reportUrl;
    return this.http.post(url, obj);
  }
  getQueryList(reportId) {
    this.user_id = localStorage.getItem("user_id");
    const filter = JSON.stringify({
      act: 22,
      userId: this.user_id,
      reportId: reportId,
    });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }
  getSpinTheWheelData(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "spin-the-wheel-reward"; // -------> SpinTheWheelRewardController
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  getHelpersList(obj) {
    const url = this.ip + "/helper-list"; // -----------> DisplayHelperController
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body, this.httpOptions);
  }
  updateHelpersGifts(obj) {
    const url = this.ip + "/update-gift"; // -----------> UpdateGiftController
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body, this.httpOptions);
  }
  getHelperGifts() {
    const filter = JSON.stringify({ act: 24 });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }
  insertSurveyor(obj) {
    console.log("insertSurveyor: ", obj);
    const filter = JSON.stringify({
      obj: obj,
    });
    //return obj;
    const url = this.ip + "addSurveyors";
    return this.http.post(url, filter);
  }
  updateSurveyorData(obj) {
    const url = this.ip + "updateSurveyor"; // -----------> UpdateSurveyorController
    return this.http.post(url, obj);
  }
  getFieldsList(obj) {
    const url = this.ip + "display-fields"; // -----------> DisplayFieldsController
    return this.http.post(url, obj);
  }
  getStockData(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "stock-data"; // -------> ShowStockDataController
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  getSwapkData(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "swap-data"; // -------> ShowSwapDataController
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  updateSwapData(obj) {
    const url = this.ip + "/update-swap-data"; // -----------> UpdateGiftController
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body, this.httpOptions);
  }

  updateStockData(obj) {
    const url = this.ip + "/update-stock-data"; // -----------> UpdateGiftController
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body, this.httpOptions);
  }

  ViewSwapDataNew(obj) {
    const url = this.ip + "/viewSwapDataController"; // -----------> UpdateGiftController
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body, this.httpOptions);
  }

  ViewStockDataNew(obj) {
    const url = this.ip + "/viewStockDataController"; // -----------> ViewStockDataController
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body, this.httpOptions);
  }

  getKTInterceptionData(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "view-kt-interception-data"; // -------> viewKTInterceptionDataController
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getSamsungClaimData(obj) {
    const filter = JSON.stringify({ regionId: obj.regionId, zoneId: obj.zoneId, claimId: obj.claimId, surveyorIds: obj.surveyorIds });
   const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "samsungClaimManagementController";
    return this.http.post(url, body, this.httpOptions);
  }

  updateSamsungClaimData(obj){
    const filter = JSON.stringify({obj: obj});
    const url = this.ip + "/updateSamsungClaimManagementController"; 
    return this.http.post(url, filter);
  }

  // getInterceptionDataForEvaluationController(obj) {
  //   const urlEncode = this.UrlEncodeMaker(obj);
  //   const url = this.ip + "/view-kt-interception-data-Evaluation"; // -------> ViewInterceptionDataForEvaluationController
  //   return this.http.post(url, urlEncode, this.httpOptions);
  // }

  // getInterceptionDataForEvaluationController(obj) {
  //   const filter = JSON.stringify({ claimId: obj.claimId });
  //  const body = this.UrlEncodeMaker(obj);
  //   const url = this.ip + "/view-kt-interception-data-Evaluation";
  //   return this.http.post(url, body, this.httpOptions);
  // }

  getKTInterceptionEvaluation(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "view-kt-interception-evaluation"; //-------> KTInterceptionEvaluationController
       return this.http.post(url, urlEncode, this.httpOptions);
  }

  getApprovedDisApproved(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "approved-disapproved-kt-interception";
    // interceptionId:interceptionId; // -------> KTInterceptionEvaluetionController
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getRemarks() {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({ act: 36 });
    return this.http.post(url, filter);
  }
  getTask() {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({ act: 40 });
    return this.http.post(url, filter);
  }

  getKTDayStartData(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "view-kt-day-start-data"; // -------> ViewKTDayStartDataController
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getKTAttendanceEvaluation(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "view-kt-attendance-evaluation"; // -------> KtAttendanceEvaluationController
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getCensusBulkData(obj) {
    const url = this.ip + "/bulk-approve-shops"; // -----------> CensusBulkApproveDisapproveController
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body, this.httpOptions);
  }

  evaluateZsmShops(obj) {
    const urlencoded = this.UrlEncodeMaker(obj);
    const url = this.ip + "/zsm-survey-validation"; //ZsmSurveyValidationController
    return this.http.post(url, obj);
  }

  getMarketIntelligenceData(obj) {
    const url = this.ip + "/marketIntelligenceData"; // -----------> MarketIntelligenceDataController
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body, this.httpOptions);
  }
  getMarketIntelligenceDetail(obj) {
    const url = this.ip + "/marketIntelligenceDetailController"; // -----------> MarketIntelligenceDetailController
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body, this.httpOptions);
  }


  // payroll working methods //
  getPayrollProcessMonth(obj){
    debugger;
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip +"/payrollProcessController";
    return this.http.post(url,body, this.httpOptions);
  }

  getPayrollUnprocessMonth(obj){
    debugger;
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip +"/payrollUnprocessController";
    return this.http.post(url,body, this.httpOptions);
  }

  savePayrollProcess(obj){
    debugger;
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip +"/payrollProcessController";
    return this.http.post(url,body, this.httpOptions);
  }

  savePayrollUnprocess(obj){
    debugger;
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip +"/payrollUnprocessController";
    return this.http.post(url,body, this.httpOptions);
  }

  getTLDistributionStockData(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "tl-distribution-stock-data"; // -------> ShowTLDistributionStockData
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  evaluateMarketIntelligenceVisist(obj) {
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip +"/marketIntelligenceUpdateEvaluated";
    return this.http.post(url,body, this.httpOptions);
    
  }

  updateMarketIntelligenceDataField(obj) {
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip +"/updateMarketIntelligenceDataField";
    return this.http.post(url,body, this.httpOptions);
    
  }


  getShopRemarks() {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({ act: 17 });
    return this.http.post(url, filter);
  }
  
  getTLDistributionSwappedData(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "tl-distribution-swapped-data"; // -------> ShowTLDistributionSwappedData
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  getRandomSelfiesData(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "/randomSelfies"; // -------> RandomSelfiesController
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getSupervisorList(obj) {
    const filter = JSON.stringify(obj);
    const url = this.ip + "/loadFilters";
    return this.http.post(url, filter);
  }

  getEvaluationSummaryInBulkApprovalView(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "/evaluatorSummaryDataInBulkApprovalView";
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getShopperEngagementList(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "ShopperEngagement"; // ------> BAListController
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getClientWiseShops(obj){
    const filter = JSON.stringify({
      act: 20,
      regionId: obj.regionId
    });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);

  }

  sendMessage(obj) {
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "/app/notification-manager" + '?' + body;
    return this.http.post(url, obj,  this.httpOptions);
}

getBrand1() {
  const url = this.ip + "loadFilters"; // -----------> JsonFilterController
  const filter = JSON.stringify({ act: 37 });
  return this.http.post(url, filter);
}
  // updatef1f2(obj){
  // debugger;
  // const body = this.UrlEncodeMaker(obj);
  // console.log(obj);
  // const url = this.ip +"/portal/ndn/update_price";
  // return this.http.post(url,body, this.httpOptions);


  // }


gettingCampaigns() {
  const url = this.ip + "loadFilters"; // -----------> JsonFilterController
  const filter = JSON.stringify({ act: 38 });
  return this.http.post(url, filter);
}

gettingBrands() {
  const url = this.ip + "loadFilters"; // -----------> JsonFilterController
  const filter = JSON.stringify({ act: 37 });
  return this.http.post(url, filter);
}
gettingProducts() {
  const url = this.ip + "loadFilters"; // -----------> JsonFilterController
  const filter = JSON.stringify({ act: 47 });
  return this.http.post(url, filter);
}
gettingSupervisors() {
  const url = this.ip + "loadFilters"; // -----------> JsonFilterController
  const filter = JSON.stringify({ act: 49 });
  return this.http.post(url, filter);
}
gettingRmList() {
  const url = this.ip + "loadFilters"; // -----------> JsonFilterController
  const filter = JSON.stringify({ act: 56 });
  return this.http.post(url, filter);
}

gettingBaList( zoneId, regionId) {
  const url = this.ip + "loadFilters"; // -----------> JsonFilterController
  const filter = JSON.stringify({
    act: 25,
    zoneId: zoneId,
    regionId: regionId
  });
  return this.http.post(url, filter);
}
gettingSkuType() {
  const url = this.ip + "loadFilters"; // -----------> JsonFilterController
  const filter = JSON.stringify({ act: 41 });
  return this.http.post(url, filter);
}
gettingFieldDataTypes() {
  const url = this.ip + "loadFilters"; // -----------> JsonFilterController
  const filter = JSON.stringify({ act: 46 });
  return this.http.post(url, filter);
}
  gettingFormTypes(){
    // const body = this.UrlEncodeMaker();
 const url = this.ip + "portal/ndn/getformstypes";
 return this.http.post(url,this.httpOptions);
}
getformslist(){
  const url = this.ip + "portal/ndn/getformslist";
  return this.http.post(url,this.httpOptions);
}
gettingeildsV2(formId){
       const body = this.UrlEncodeMaker(formId);
    const url = this.ip + "portal/ndn/mfl";
    return this.http.post(url, body, this.httpOptions);
  }
gettingFeildsvaluesV2(obj:any){
       const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "portal/ndn/mfv";
    return this.http.post(url, body, this.httpOptions);
  }
createNewForm(newForm) {
    const body = this.UrlEncodeMaker(newForm);
    const url = this.ip + "portal/ndn/getnewForm";
    return this.http.post(url, body, this.httpOptions);
  }
 getNewFeild(obj){
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "portal/ndn/getnewFeild";
    return this.http.post(url, body, this.httpOptions);
  }
 changPositon(obj){
  const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "portal/ndn/getposition";
    return this.http.post(url, body, this.httpOptions);
  }
gettingFeildInfo(obj){
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "portal/ndn/gettingFieldInfo";
    return this.http.post(url, body, this.httpOptions);
  }
updatingFieldProperties(obj){
    debugger;
    const url = this.ip + "portal/ndn/changingfieldattribute";
    return this.http.post(url, obj);
  }
updatingFormProperties(obj){
    const url = this.ip + "portal/ndn/changingformattribute";
    return this.http.post(url, obj);
  }
feildValueOperation(obj){
    debugger;
     const body = this.UrlEncodeMaker(obj);
     const url = this.ip + "portal/ndn/valueop";
     return this.http.post(url, body, this.httpOptions);
   }
getQuestionList(obj){
       const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "portal/ndn/getquestionlist";
    return this.http.post(url, body, this.httpOptions);
  }
deActivateField(obj){
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "portal/ndn/deactivateField";
    return this.http.post(url, body, this.httpOptions);
}
deActivateFieldValue(obj){
  const body = this.UrlEncodeMaker(obj);
  const url = this.ip + "/portal/ndn/deactivateFieldValue";
  return this.http.post(url, body, this.httpOptions);
}
  activateField(obj){
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "portal/ndn/activateField";
    return this.http.post(url, body, this.httpOptions);
  }
  activateFieldValue(obj){
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "/portal/ndn/activateFieldValue";
    return this.http.post(url, body, this.httpOptions);
  }
  activateForm(obj){
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "portal/ndn/activateForm";
    return this.http.post(url, body, this.httpOptions);
  }
  logicFieldlist(obj){
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "portal/ndn/logicfieldlist";
    return this.http.post(url, body, this.httpOptions);
  }
  selectedFieldValues(obj){
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "/portal/ndn/selectedvalue";
    return this.http.post(url, body, this.httpOptions);
  }
  applyLogic(obj){
    const url = this.ip + "portal/ndn/formlogic";
    return this.http.post(url, obj);
  }
  deActivateForm(obj){
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "portal/ndn/deactivateForm";
    return this.http.post(url, body, this.httpOptions);
  }
  childVisibility(obj){
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "portal/ndn/childVisibility";
    return this.http.post(url, body, this.httpOptions);
  }
  childVisibility1(obj){
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "portal/ndn/childVisibility";
    return this.http.post(url, body, this.httpOptions);
  }
  
  getShopDetails(obj){
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "/evaluationManager";
    return this.http.post(url, body, this.httpOptions);
  }
  updateShopData(obj) {
    const urlencoded = this.UrlEncodeMaker(obj);
    const url = this.ip + "update-shop-Target"; // -------> UpdateShopTargets
    return this.http.post(url, urlencoded, this.httpOptions);
  }

  updateShopBrandTarget(obj) {
    const urlencoded = this.UrlEncodeMaker(obj);
    const url = this.ip + "update-shop-brand-target"; // -------> ShopBrandTarget
    return this.http.post(url, urlencoded, this.httpOptions);
  }

  uploadTargetVsAchievement(obj) {
    const url = this.ip + "/uploadTargetVsAchievement";
    return this.http.post(url, obj);
  }
  uploadDistributionAssets(obj) {
    const url = this.ip + "/uploadDistributionAssets";
    return this.http.post(url, obj);
  }
  getDistributionAssets(obj) {
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "/getdistributionassests";
    return this.http.post(url, body,this.httpOptions);
  }
  ViewDistributionAuditDetail(obj) {
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "/viewDistributionAuditDetail";
    return this.http.post(url, body,this.httpOptions);
  }
  formMoveTo(obj){
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + "/formMoveToController";
    return this.http.post(url, body, this.httpOptions);
  }
  getAreaByRegion(regionId) {
    this.user_id = localStorage.getItem("user_id");

    const filter = JSON.stringify({
      act: 45,
      regionId: regionId,
      userId: this.user_id,
    });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }
  addUpdateEmail(obj, url) {
    return this.http.post(this.ip + url, obj);
  }

  addUpdateEmailById(obj){
    // const objId={
    //   id: id
    // }
    const obj2 = this.UrlEncodeMaker(obj);
    const url = this.ip + "/updateEmail";
    return this.http.post(url, obj2, this.httpOptions);

  }
  getAllClusters() {
    this.user_id = localStorage.getItem("user_id");
    const filter = JSON.stringify({ act: 43, userId: this.user_id });
    const url = this.ip + "/loadFilters";
    return this.http.post(url, filter);
  }
  getFilterData(obj) {
    
    const url = this.ip + "/loadFilters";
    // const filter = JSON.stringify({ act: 23, userId: this.user_id });
    return this.http.post(url, obj);
  }
  getZoneByCluster(clusterId) {
    this.user_id = localStorage.getItem("user_id");
    const filter = JSON.stringify({
      act: 44,
      userId: this.user_id,
      clusterId: clusterId,
    });
    const url = this.ip + "/loadFilters";
    return this.http.post(url, filter);
  }
  samlLogin(){
    const url = this.ip + "/saml/login";
    return this.http.post(url, {}, { responseType: 'text' });
  }
  getProjectName() {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({ act: 55 });
    return this.http.post(url, filter);
  }
  gettingSurveyors() {
    const filter = JSON.stringify({ act: 13 });
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    return this.http.post(url, filter);
  }
  uploadTrainingPDF(formData: FormData){
    const url = this.ip + "upload-training";
    return this.http.post(url, formData);
  }
  assignStock(formData: FormData){
    const url = this.ip + "assign-stock"
    return this.http.post(url, formData);
  }
  assignRmStock(formData: FormData){
    const url = this.ip + "rm-assign-stock"
    return this.http.post(url, formData);
  }
  returnStock(formData: FormData){
    const url = this.ip + "return-stock"
    return this.http.post(url, formData);
  }
  returnRmStock(formData: FormData){
    const url = this.ip + "rm-return-stock"
    return this.http.post(url, formData);
  }
  insertEvaluationData(data) {
    const url = this.ip + "/supervisor-evaluation-data"; 
    const body = this.UrlEncodeMaker(data);
    return this.http.post(url, body, this.httpOptions);
  }
  
  updateAssignedProduct(obj) {
    const url = this.ip + "/update-assign-stock-controller"; // -----------> UpdateAssignStockController
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body, this.httpOptions);
  }
  gettingStockDetail(obj) {
    const url = this.ip + "assign-stock-summary";
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body,this.httpOptions);
  }
  gettingRmStockDetail(obj) {
    const url = this.ip + "assign-stock-rm-detail";
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body,this.httpOptions);
  }

  gettingRmReturnStockDetail(obj) {
    const url = this.ip + "return-stock-rm-detail";
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body,this.httpOptions);
  }



  // gettingRmReturnStockDetail() {
  //   const url = this.ip + "loadFilters"; // -----------> JsonFilterController
  //   const filter = JSON.stringify({ act: 55 });
  //   return this.http.post(url, filter);
  // }
  // gettingSupervisorEvaluationDetail(obj) {
  //   const url = this.ip + "loadFilters"; // -----------> JsonFilterController
  //   const filter = JSON.stringify({ act: 55 });
  //   return this.http.post(url, filter);
  // }
  gettingSupervisorEvaluationDetail(obj) {
    const url = this.ip + "supervisor-evaluation-summary";
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body,this.httpOptions);
  }
  getSpecificDetail(id: number, visitDate: string,formType: string) {
    const url = this.ip + "loadFilters"; 
    const filter = JSON.stringify({ 
        act: 51, 
        id: id,
        visitDate: visitDate ,
        formType: formType 
    });
    return this.http.post(url, filter);
}
getRmSpecificDetail(id: number, visitDate: string,formType: string) {
  const url = this.ip + "loadFilters"; 
  const filter = JSON.stringify({ 
      act: 52, 
      id: id,
      visitDate: visitDate ,
      formType: formType 
  });
  return this.http.post(url, filter);
}
gettingStockDetail1(obj) {
  const url = this.ip + "return-stock-summary";
  const body = this.UrlEncodeMaker(obj);
  return this.http.post(url, body,this.httpOptions);
}

  // gettingStockDetail1() {
  //   const url = this.ip + "loadFilters"; // -----------> JsonFilterController
  //   const filter = JSON.stringify({ act: 50 });
  //   return this.http.post(url, filter);
  // }

  getSummery(obj) {
    const url = this.ip + "stock-management-summery";
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body,this.httpOptions);
  }
  getRmSummery(obj) {
    const url = this.ip + "rm-distributor-management-summary";
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(url, body,this.httpOptions);
  }
  getPtcFileData(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "ptcFileDataController";
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  updateComplianceTableData(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "complianceTableDataController";
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  uploadPtcFileData(file: any, userId: string, userName: string) {
    const url = this.ip + "/uploadPtcFile";
    let formData=new FormData()
    formData.append("file",file)
    formData.append("userId",userId)
    formData.append("userName",userName)
      return this.http.post(url,formData);
  }
  gettingCallRemarks() {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({ act: 53 });
    return this.http.post(url, filter);
  }
  gettingSmsRemarks() {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({ act: 54 });
    return this.http.post(url, filter);
  }
  uploadSurveyorRoutes(obj: FormData) {
    const url = this.ip + "uploadSurveyorRoutes"; 
    return this.http.post(url, obj);
  }  
 
downloadFile(obj, url) {
    let path;

    path = this.ip + url;

    const form = document.createElement("form");

    form.setAttribute("action", path);

    form.setAttribute("method", "post");

    document.body.appendChild(form);

    this.appendInputToForm(form, obj);

    form.submit();

    document.body.removeChild(form);
  }

  getAlertsView(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "alertsView";
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  
}
