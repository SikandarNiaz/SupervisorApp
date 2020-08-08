import { Component, OnInit, AfterViewChecked, Input, ViewChild } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment';
import { NgModel } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';


@Component({
  selector: 'app-interception-summary',
  templateUrl: './interception-summary.component.html',
  styleUrls: ['./interception-summary.component.scss']
})
export class InterceptionSummaryComponent implements OnInit {
  
  constructor(  private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router) { 
    this.zones = JSON.parse(localStorage.getItem('zoneList'));
    this.getTabsData();
  }
  title = 'Interception';
  loadingData: boolean;
  selectedZone: any = {};
  selectedRegion: any = {};
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  regions: any = [];
  stores: any=[];
  sortOrder = true;
  sortBy: 'm_code';
  selectedStore: any={};
  endDate = new Date();
  zones: any = [];
    tableData: any=[];
  ngOnInit() {
  }

  zoneChange() {
    this.loadingData = true;
    this.getTabsData();
  
    this.httpService.getRegion(this.selectedZone.id).subscribe(
      data => {
        const res: any = data;
        if (res) {
          this.regions = res;
        } else {
          this.loadingData=false;

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
        }

        setTimeout(() => {
          this.loadingData = false;
        }, 500);
      },
      error => {
        this.loadingData=false;
      }
    );
  }

  regionChange(){
    this.loadingData = true;
   this.selectedStore.id=-1;
    this.getTabsData();
  this.httpService.getShops(this.selectedZone.id, this.selectedRegion.id).subscribe(
    data => {
      const res: any = data;
      if (res) {
        this.stores = res;
      } else {
        this.loadingData=false;

        this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
      }

      setTimeout(() => {
        this.loadingData = false;
      }, 500);
    },
    error => {
      this.loadingData=false;
    }
  );
  }

  getTabsData()
  {
    this.loadingData = true;
    const obj = {
      startDate:moment(this.startDate).format('YYYY-MM-DD'),
      endDate:moment(this.endDate).format('YYYY-MM-DD'),
      zoneId: this.selectedZone.id || -1,
      regionId: this.selectedRegion.id || -1,
      shopId: this.selectedStore.id || -1
    };

    this.httpService.getBAList(obj).subscribe((data: any) => {
      // console.log('merchandiser list for evaluation',data);
      if (data) {
        this.tableData = data;
        this.loadingData = false;
      }
    });
  }


  getArrowType(key) {
    if (key === this.sortBy) {
      return this.sortOrder ? 'arrow_upward' : 'arrow_downward';
    } else { return ''; }
  }
  sortIt(key) {
    this.sortBy = key;
    this.sortOrder = !this.sortOrder;
  }



}
