import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/layout/dashboard/dashboard.service';
import * as moment from "moment";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-pmi-home',
  templateUrl: './pmi-home.component.html',
  styleUrls: ['./pmi-home.component.css']
})
export class PmiHomeComponent implements OnInit {
  showForms: boolean = false;
  toggelView:boolean = false;
  obj: any[] = [];
  title = "Distribution Assets";
  loadingData: boolean;
  loading: boolean;
  loadingdata: Boolean = false;
  searchQuery: string = '';
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();
  params: any = {};

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    // this.getDashboardData();
  }

  getDashboardData() {
    this.loadingData = true;
    const obj = {
      startDate: moment(this.startDate).format("YYYY-MM-DD"),
      endDate: moment(this.endDate).format("YYYY-MM-DD")
    };
    console.log("Dashboard Data:", obj);
    this.loading = true;
    this.dashboardService.getDistributionAssets(obj).subscribe(
      (response: any[]) => {
        console.log(response, 'distributionsAssets');
        this.obj = response.map((item) => ({ ...item }));
        this.loadingdata = false;
      },
      (error) => {
        console.log(error, 'error');
        this.loadingdata = false;
      }
    ); 
  }

  get filteredItems() {
    if (!Array.isArray(this.obj)) return [];
    return this.obj.filter(item => {
      const mCode = item.m_code || '';
      return mCode.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }
  modifyDate(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  openNewWindow(item: any) {

    window.open(
      `${environment.hash}dashboard/app-pmi-home-detail?mCode=${
        item.m_code
      }&startDate=${this.modifyDate(this.startDate)}&endDate=${this.modifyDate(
        this.endDate
      )}`,
      "_blank"
    );
  }
}
