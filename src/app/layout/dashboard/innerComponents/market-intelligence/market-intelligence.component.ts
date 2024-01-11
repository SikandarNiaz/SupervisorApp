import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as moment from 'moment';
import { DashboardService } from '../../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Config } from 'src/assets/config';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { KeyValuePipe } from "@angular/common";

@Component({
  selector: 'app-market-intelligence',
  templateUrl: './market-intelligence.component.html',
  styleUrls: ['./market-intelligence.component.scss']
})
export class MarketIntelligenceComponent implements OnInit {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();

  ip = Config.BASE_URI;
  tableData: any = [];
  loading = true;
  title = 'Market Intelligence';
  userId: any;
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('remarksModal') remarksModal: ModalDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedItem: any = {};
  selectedRemark: any =  null;

  params: any = {};
  loadingData: boolean = false;
  remarksList: any = [];
  status: any;
  surveyId: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: DashboardService,
    private activeRoute: ActivatedRoute,
    private readonly location: Location,
    private keyValuePipe: KeyValuePipe
  ) {
    this.activeRoute.queryParams.subscribe((p) => {
      console.log('active params', p);
      this.params = p;
    });
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
    this.getData();
    this.getShopRemarks();
  }

  getData() {
    this.loading = true;
    const obj={
      zoneId:this.params.zoneId || -1,
      regionId: this.params.regionId || -1,
      category:this.params.category || -1,
      brand : this.params.brand || -1,
      promotionType: this.params.promotionType || -1,
      startDate : moment(this.startDate).format("YYYY-MM-DD"),
      endDate : moment(this.endDate).format("YYYY-MM-DD"),
    };
      this.httpService.getMarketIntelligenceData(obj).subscribe(
        (data) => {
          // console.log(data);
          this.tableData = data || [];
          if (this.tableData.length === 0) {
            this.loading = false;
            this.toastr.info('No record found.');
          }
          else{
            this.tableData=this.keyValuePipe.transform(this.tableData);
          }
          this.loading = false;
        },
        (error) => { }
      );
   
  }

  
  gotoNewPage(item) {
    localStorage.setItem('imageList', JSON.stringify(item.imageList));
    localStorage.setItem('itemList', JSON.stringify(item.itemList));
    window.open(
      `${environment.hash}dashboard/image-view`,
      "_blank"
    );
  }

  evaluateVisitApprove(status, surveyId){
    this.loadingData = true;
    const obj = {
      userId: localStorage.getItem("user_id"),
      surveyId: surveyId,
      status: status,
    };
    console.log("evaluateVisitApprove obj: ", obj);
    this.httpService.evaluateMarketIntelligenceVisist(obj).subscribe(
      (data: any) => {
        console.log("evaluateVisit resp data: ", data);
        if (data.success) {
          this.toastr.success(data.success);
          this.loadingData = false;
          this.getData();
          
        } else {
          this.loadingData = false;
          this.toastr.error(data.fail);
        }
      },
      (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
        this.loadingData = false;
      }
    );

  }

  showRemarkModal(status, surveyId): void {
    this.status = status;
    this.surveyId = surveyId;
    this.remarksModal.show();
  }
  
  hideRemarksModal(): void {
    this.remarksModal.hide();
  }

  evaluateVisitDisapprove(){
    this.loadingData = true;
    const obj = {
      userId: localStorage.getItem("user_id"),
      surveyId: this.surveyId,
      status: this.status,
      remarkId : this.selectedRemark?.id
    };
    console.log("evaluateVisitDisapprove obj: ", obj);
    this.httpService.evaluateMarketIntelligenceVisist(obj).subscribe(
      (data: any) => {
        console.log("evaluateVisit resp data: ", data);
        if (data.success) {
          this.toastr.success(data.success);
          this.loadingData = false;

          this.getData();
          
        } else {
          this.loadingData = false;
          this.toastr.error(data.fail);
        }
        this.hideRemarksModal();
      },
      (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
        this.loadingData = false;
      }
    );

  }

  getShopRemarks() {
    this.loading = true;

      this.httpService.getShopRemarks().subscribe(
        (data) => {
         
          this.remarksList = data || [];
           console.log("remarksList", this.remarksList);
          if (this.remarksList?.length == 0) {
            this.loading = false;
            this.toastr.info('No record found.');
          }
          else{
            // this.tableData=this.keyValuePipe.transform(this.tableData);
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
         }
      );
   
  }
}
