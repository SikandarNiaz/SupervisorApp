import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import moment from 'moment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-distribution-asset-report',
  templateUrl: './distribution-asset-report.component.html',
  styleUrls: ['./distribution-asset-report.component.css']
})
export class DistributionAssetReportComponent implements OnInit { minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();
  queryList: any = [];
  selectedQuery: any = {};
  loadingData: boolean;
  loadingReportMessage = false;
  p:any={};
  // reportId=-1;
  title='';
  selectedReportUrl='';


  constructor(
    private httpService: DashboardService,

   ) {
   }

  ngOnInit() {}






  getDashboardData() {
    if (this.endDate >= this.startDate) {
      this.loadingData = true;
      this.loadingReportMessage = true;

      const obj = {
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD')
      };

      const url = '/distribution-asset-report';
      const body = this.httpService.UrlEncodeMaker(obj);

      this.httpService.getKeyForProductivityReport1(body, url).pipe(
        catchError(error => {
          ////  console.error('Error downloading the file:', error);
          this.clearLoading();
          throw error;
        })
      ).subscribe(
        (data: Blob) => {
          if (data.size === 0) {
            ////  console.error('Received empty file');
            this.clearLoading();
            return;
          }

          const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = 'DISTRIBUTION ASSET REPORT.xlsx';
          link.click();
          window.URL.revokeObjectURL(downloadUrl);
          this.clearLoading();
        }
      );
    }
  }


  clearLoading(){
    this.loadingData=false;
    this.loadingReportMessage=false;
  }
}
