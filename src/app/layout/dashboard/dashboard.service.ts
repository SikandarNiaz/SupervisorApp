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
    const filter = JSON.stringify({ act: 0, userId: this.user_id });
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
    const url = this.ip + "/viewStockDataController"; // -----------> UpdateGiftController
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

  // updatef1f2(obj){
  // debugger;
  // const body = this.UrlEncodeMaker(obj);
  // console.log(obj);
  // const url = this.ip +"/portal/ndn/update_price";
  // return this.http.post(url,body, this.httpOptions);


  // }
}
