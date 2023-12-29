import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Config } from 'src/assets/config';
import { environment } from 'src/environments/environment';
import { DashboardService } from "../../dashboard.service";
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
  } from "@angular/forms";
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Component({
  selector: 'app-kt-interception-detail',
  templateUrl: './kt-interception-detail.component.html',
  styleUrls: ['./kt-interception-detail.component.scss']
})
export class KTInterceptionData implements OnInit {
   // ip = environment.ip;

  ip: any = Config.BASE_URI;
  hover = "hover";
  zoomOptions = {
    Mode: "hover",
  };
  zoomedImage =
    "https://image.shutterstock.com/image-photo/micro-peacock-feather-hd-imagebest-260nw-1127238569.jpg";
  tableData: any = [];
  headingsList: any = [];
  obj: any = {};
  loading = false;
  reevaluatorRole: any;
  userType: any;
  zones: any = [];
  regions: any = [];
  loadingData: boolean;
  selectedZone: any = {};
  selectedRegion: any = {};
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();
  projectType: any;
  selectedSupervisor: any = [];
  // @Input() startDate: moment.MomentInput;
  title = "Interception Data";
  userId: any;
  @ViewChild("childModal", { static: true }) childModal: ModalDirective;
  @ViewChild("childModal1", { static: true }) childModal1: ModalDirective;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  selectedItem: any = {};
  p = 0;
  tableTitle = "";
  params: any = {};
  labels: any;
  selectedRemark: any;
  shopData: any = {};
  form: FormGroup;
  type: any;
  supervisorList: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: DashboardService,
    private activeRoute: ActivatedRoute,
    public fb: FormBuilder
  ){
    // ...
    this.form = fb.group({
        Capstan_by_Pall_Mall: [''],
        Gold_Flake: [''],
        Morven_Classic: [''],
        Cafe: [''],
        Melburn: [''],
        Melburn_Gold: [''],
        Morven_by_Chesterfield: [''],
        Cricket: [''],
        Champion: [''],
        Other: ['']
      });
      
    // ...
    this.zones = JSON.parse(localStorage.getItem("zoneList"));
    this.activeRoute.queryParams.subscribe((p) => {
      console.log("active params", p);
      this.params = p;
      this.getData();
    });
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
    this.projectType = localStorage.getItem("projectType");
    
  }

  showChildModal(item):void {
    debugger
   // this.tableData=item.tableData;
    this.shopData=item;
    console.log("item: ", item);
    this.form.patchValue({
        Receiving_pictures: item.Receiving_pictures,
        survey_Id: item.survey_Id,
        Capstan_by_Pall_Mall: item.Capstan_by_Pall_Mall,
     // contractAmount: shop.contract_amount,
     Gold_Flake: item.Gold_Flake,
      Morven_Classic: item.Morven_Classic,
      Cafe: item.Cafe,
      Melburn: item.Melburn,
      Melburn_Gold: item.Melburn_Gold,
      Morven_by_Chesterfield: item.Morven_by_Chesterfield,
      Cricket: item.Cricket,
      Champion: item.Champion,
      Other: item.Other,
    });
    this.childModal.show();
  }

  showChildModal1(): void {
    this.childModal1.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
    this.childModal1.hide();
  }

  setSelectedItem(item) {
    this.selectedItem = item;
  }

  ngOnInit() {
    // this.getTableData();
    this.getZoneList();
    this.getSupervisor();
    this.getData();
   // this.getSupervisor();
  }

  getZoneList() {
    this.loading = true;
    this.httpService.getZone().subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.zones = res.zoneList;
        } else {
          this.loading = false;

          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }

        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  zoneChange() {
    this.loadingData = true;
    this.selectedRegion.id = -1;
    this.getData();
    this.httpService.getRegion(this.selectedZone.id).subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.regions = res;
        } else {
          this.loadingData = false;

          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }
        this.getSupervisor();

        setTimeout(() => {
          this.loadingData = false;
        }, 500);
      },
      (error) => {
        this.loadingData = false;
      }
    );
  }

  regionChange() {
    this.loading = true;
    this.selectedSupervisor.id = -1;
        console.log("regions id", this.selectedRegion);
        this.httpService.getBaSupervisorsListByRegion(this.selectedRegion.id).subscribe(
          (data) => {
            // this.channels = data[0];
            const res: any = data;
            if (res) {
              this.supervisorList = res;
              console.log("supervisors",this.supervisorList)
            } else {
              this.loading = false;
    
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

  getData() {
    this.loading = true;
    const obj = {
        zoneId: this.selectedZone.id
        ? this.selectedZone.id == -1
          ? localStorage.getItem("zoneId")
          : this.selectedZone.id
        : localStorage.getItem("zoneId"),
      regionId: this.selectedRegion.id
        ? this.selectedRegion.id == -1
          ? localStorage.getItem("regionId")
          : this.selectedRegion.id
        : localStorage.getItem("regionId"),
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.endDate).format("YYYY-MM-DD"),
       // surveyorId: -1,
      //  regionId: this.selectedRegion.id || -1,
        supervisorId: this.selectedSupervisor.id || -1,
        
      };
    

    this.httpService.getKTInterceptionData(obj).subscribe(
      (data) => {
        // console.log(data);
        this.tableData = data;
        if (this.tableData.length === 0) {
          this.loading = false;
          this.toastr.info("No record found.");
        }
        this.loading = false;
      },
      (error) => {}
    );
  }

  // gotoNewPage(item) {
  //   // tslint:disable-next-line:triple-equals
  //   if (this.userType == this.reevaluatorRole || item.flag == -1) {
  //     window.open(
  //       `${environment.hash}dashboard/evaluation/list/details/${item.survey_id}`,
  //       "_blank"
  //     );
  //   } else {
  //     window.open(
  //       `${environment.hash}dashboard/evaluation/list/details/${item.survey_id}/${item.shop_id}`,
  //       "_blank"
  //     );
  //   }
  // }

  getRegion() {
    this.loading = true;

     this.httpService.getRegions().subscribe(
      (data) => {
        console.log(data)
        const res: any = data;
        if (res) {
          this.regions = res.regionList;
          console.log("supervisors",this.regions)
        } else {
          this.loading = false;

          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }

        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
      (error) => {
        this.loading = false;
      }
    );
  }
    clearLoading() {
        throw new Error('Method not implemented.');
    }

    updateStockData(shop) {
      debugger;
     // this.selectedGift=shop.prize_id;
      this.shopData=shop;
      console.log("shop: ", shop);
      console.log(this.selectedRemark);
      const formData = new FormData();
      formData.append("remardId", JSON.stringify(shop));
        const obj = {
        shopId: shop.shop_id,
        
       // contractAmount: shop.contract_amount,
        startDate: shop.startDate,
       // endDate: shop.end_date,
       // active: shop.active,
        prizeId: shop.prize_id,
        surveyorId: shop.surveyor_id,
        count: shop.count,
      };
     console.log("prizeID: ", shop.prize_id, "shopID: ", shop.shop_id,"surveyorID: ", shop.surveyor_id,"count: ", shop.count);
      this.httpService.updateStockData(obj).subscribe((data: any) => {
        debugger;
        if (data.success == true) {
        //  if(this.giftList.length>0){
            this.getData();
        //  }
      //    this.hideupdateSuperAttendenceModal();
          this.toastr.success("Success");
        } else {
          this.toastr.error("Error", "Error");
        }
       // this.loadingModalButton = false;
      });
    } 
    goToEvaluation(shop) {
      console.log("shop", shop);
      window.open(
        `${
          environment.hash
        }dashboard/section_eleven?surveyId=${
          shop.surveyId
        }`,
        "_blank"
      );
    }

    goToUpdateTargetPage(shop) {
      window.open(
        `${environment.hash}dashboard/section_detail_1?surveyId=${shop.Survey_Id}`,
        "_blank"
      );

  } 

  getSupervisor() {
      this.loading = true;
      this.getData();
       this.httpService.getBaSupervisorsListByRegion(this.selectedRegion.id || -1).subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.supervisorList = res;
            console.log("supervisors",this.supervisorList)
          } else {
            this.loading = false;
  
            this.toastr.info(
              "Something went wrong,Please retry",
              "Connectivity Message"
            );
          }
  
          setTimeout(() => {
            this.loading = false;
          }, 500);
        },
        (error) => {
          this.loading = false;
        }
      );
    }
    gotoNewPage(item) {
      console.log("item data: ", item);
  
      const queryParams = new URLSearchParams();
      queryParams.set('interception_id', item.id);
      const urlWithParams = `${environment.hash}dashboard/view-kt-interception-evaluation?${queryParams.toString()}`;
  
      window.open(
        urlWithParams,
        "_blank"
      );
      } 

}