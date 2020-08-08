import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import * as moment from 'moment';
import { DashboardService } from '../../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ModalDirective } from 'ngx-bootstrap';
import { Alert } from 'selenium-webdriver';
import { config } from 'src/assets/config';
import {MatPaginator} from '@angular/material';

@Component({
  selector: 'app-merchandiser-attendence-detail',
  templateUrl: './merchandiser-attendence-detail.component.html',
  styleUrls: ['./merchandiser-attendence-detail.component.scss']
})
export class MerchandiserAttendenceDetailComponent implements OnInit {
  // ip = environment.ip;
  configFile = config;

  ip: any = this.configFile.ip;
  tableData: any = [];
  headingsList: any = [];
  loading = true;
  reevaluatorRole: any;
  userType: any;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();
  // @Input() startDate: moment.MomentInput;
  title = 'Attendance';
  userId: any;
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild (MatPaginator) paginator: MatPaginator;
  selectedItem: any = {};
  p = 0;
  tableTitle = '';
  params: any = {};
  constructor(private router: Router, private toastr: ToastrService, private httpService: DashboardService, private activeRoute: ActivatedRoute) {
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
    this.getData();


  }

  getData() {
this.loading=true;
 const obj = {
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      endDate:  moment(this.endDate).format('YYYY-MM-DD'),

    };
    this.httpService.getAttendanceData(obj).subscribe(data => {
      // console.log(data);
      this.tableData = data;
      if (this.tableData.length === 0) {
        this.loading = false;
        this.toastr.info('No record found.');
      }
    this.loading = false;

    }, error => {});


  }

  gotoNewPage(item) {
    // tslint:disable-next-line:triple-equals
    if (this.userType == this.reevaluatorRole || item.flag == -1) {
    window.open(`${environment.hash}dashboard/evaluation/list/details/${item.survey_id}`, '_blank');
    } else {
      window.open(`${environment.hash}dashboard/evaluation/list/details/${item.survey_id}/${item.shop_id}`, '_blank');
    }

}
}
