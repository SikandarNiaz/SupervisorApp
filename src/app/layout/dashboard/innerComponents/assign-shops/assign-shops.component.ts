import { Component, OnInit, AfterViewChecked, Input, ViewChild } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
import { subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DashboardDataService } from '../../dashboard-data.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material';
import { environment } from 'src/environments/environment';
import { NgModel } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import * as _ from 'lodash';
import { config } from 'src/assets/config';

@Component({
  selector: 'app-assign-shops',
  templateUrl: './assign-shops.component.html',
  styleUrls: ['./assign-shops.component.scss']
})
export class AssignShopsComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;
  constructor( private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    private dataService: DashboardDataService) { 
    this.zones = JSON.parse(localStorage.getItem('zoneList'));
    }
    tableData: any = [];
  title = 'Assign Shops';
  zones: any = [];
  loadingData: boolean;
  regions: any = [];
  programs: any=[];
  surveyors: any=[];
  selectedZone: any = {};
  selectedProgram: any = {};
  selectedRegion: any = {};
  regionId = -1;
  response: any = '';
  loadingReportMessage = false;
  tabsData: any = [];
  loading = true;
  sortOrder = true;
  sortBy: 'm_code';


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
          this.clearLoading();

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
        }

        setTimeout(() => {
          this.loadingData = false;
        }, 500);
      },
      error => {
        this.clearLoading();
      }
    );
  }


  getTabsData() {
    this.loadingData = true;
    this.loading = true;
    const obj: any = {
      zoneId: this.selectedZone.id ? this.selectedZone.id : localStorage.getItem('zoneId'),
      regionId: this.selectedRegion.id ? this.selectedRegion.id : localStorage.getItem('regionId')
    };

    this.httpService.getShopData(obj).subscribe(
      data => {
        this.loadingData = false;
        const res: any = data;
        if (res) {
          this.tabsData = data;
        }
        this.loading = false;
      },
      error => {
        this.clearLoading();

        console.log(error, 'home error');
      }
    );
  }



  clearLoading() {
    this.loading = false;
    this.loadingData = false;
    this.loadingReportMessage = false;
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


  showChildModal(): void {
    this.loadPrograms();
    this.childModal.show();
  }



  hideChildModal() {
    this.childModal.hide();
  }


loadPrograms(){
 this.loadingData = true;
    this.httpService.getPrograms().subscribe(
      data => {
        const res: any = data;
        if (res) {
          this.programs = res;
        } else {
          this.clearLoading();

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
        }

        setTimeout(() => {
          this.loadingData = false;
        }, 500);
      },
      error => {
        this.clearLoading();
      }
    );
}

getSurveyors(programId){
  this.loadingData = true;
    this.httpService.getSurveyors(programId).subscribe(
      data => {
        const res: any = data;
        if (res) {
          this.surveyors = res;
        } else {
          this.clearLoading();

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
        }

        setTimeout(() => {
          this.loadingData = false;
        }, 500);
      },
      error => {
        this.clearLoading();
      }
    );
}

}
