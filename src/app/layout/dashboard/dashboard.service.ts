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
    const url = this.ip + "portal/auth/login";
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
    const filter = JSON.stringify({ act: 5 });
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    return this.http.post(url, filter);
  }

  getRegions() {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({ act: 4 });
    return this.http.post(url, filter);
  }
  getSurveyors(programId, surveyorId, zoneId, regionId) {
    const url = this.ip + "loadFilters"; // -----------> JsonFilterController
    const filter = JSON.stringify({
      act: 13,
      programId: programId,
      surveyorId: surveyorId,
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
    const url = this.ip + "shopWiseRouteCount";
    return this.http.post(url, obj);
  }
  uploadRoutes(obj) {
    const url = this.ip + "UploadRoutesControllerNew";
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

  getDashboardStats(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "interceptionSummary"; // ------> InterceptionSummaryDataController
    return this.http.post(url, urlEncode, this.httpOptions);
  }

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
}
