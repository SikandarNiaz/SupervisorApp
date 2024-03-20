import {Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {FormBuilder} from '@angular/forms';
import { DashboardService } from "../../dashboard.service";
import { NgxSpinnerModule } from "ngx-spinner";

@Component({
    selector: 'app-push-notification',
    templateUrl: './push-notification.component.html',
    styleUrls: ['./push-notification.component.scss'],
})
export class PushNotificationComponent implements OnInit {
    title = 'Alert Manager';
    selectedClient: any;
    selectedDistribution: any;
    profile: any;
    clients: any = [];
    shops: any = [];
    tempShops: any = [];
    shopSearch: any;
    mobileSearch: any;
    selectedShops = [];
    selectedToken = [];
    distributionList: any[];
    message: string;
    selectedAlertType: any;
    @ViewChildren('checked') private myCheckbox: any;
    alertType : Array<String> = ['NOTIFICATION'];
    // alertType : Array<String> = ['SMS'];
    zones: any = [];
    clusterList: any = [];
    loading: boolean = false;
    regions: any = [];
    selectedZone: any = {};
    selectedRegion : any = {};
    public image: any = File;
    selectedImage: File;

    constructor(
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private titleService: Title,
        public fb: FormBuilder,
        private httpService: DashboardService
    ) {
        this.zones = JSON.parse(localStorage.getItem("zoneList"));
        this.clusterList = JSON.parse(localStorage.getItem("clusterList"));
        this.profile = JSON.parse(localStorage.getItem('profile')) || -1;
        this.titleService.setTitle(this.title);
    }

    ngOnInit(): void {
        // this.getClientList();
    }

    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
          this.image = <File>event.target.files[0];
          const file = event.target.files[0];
          this.image = file;
    
          const reader = new FileReader();
          reader.readAsDataURL(this.image);
          reader.onload = (_event) => { };
        }
      }
    // getClientList() {
    //     this.spinner.show();

    //     const obj = {
    //         act: 6,
    //         clientId: this.profile.clientId,
    //     };
    //     this.httpService.loadFilter(obj).subscribe(
    //         (data: any) => {
    //             this.clients = data;
    //             this.spinner.hide();
    //             setTimeout(() => {
    //                 this.spinner.hide();
    //             }, 30000);
    //         },
    //         (error: any) => {
    //             this.spinner.hide();
    //             this.toastr.error('Internal server error', 'Error');
    //         }
    //     );
    // }

    // onClinetChangeGetDistributions() {
    //     this.spinner.show();
    //     const obj = {
    //         act: 7,
    //         regionId: -1,
    //         clientId: this.selectedClient.id,
    //         distributionId: -1,
    //     };
    //     this.httpService.loadFilter(obj).subscribe(
    //         (data: any) => {
    //             this.distributionList = data;
    //             if (this.distributionList.length == 0) {
    //                 this.toastr.info('No distribution found.', 'Info');
    //             }
    //             this.spinner.hide();
    //         },
    //         (error: any) => {
    //             this.spinner.hide();
    //             this.toastr.error('Internal server error', 'Error');
    //         }
    //     );
    // }

    getClientWiseShops() {
        // if (this.selectedClient == undefined || this.selectedClient == '') {
        //     this.toastr.info('Client is not selected', 'Info');
        //     return;
        // }
        // if (
        //     this.selectedDistribution == undefined ||
        //     this.selectedDistribution == ''
        // ) {
        //     this.toastr.info('Distribution is not selected', 'Info');
        //     return;
        // }
        this.spinner.show();
        debugger
        const obj = {
            regionId: this.selectedRegion?.id,
            // distributionId: this.selectedDistribution.id,
        };
        this.httpService.getClientWiseShops(obj).subscribe(
            (data: any) => {
                this.shops = data;
                this.tempShops = data;
                this.spinner.hide();
                setTimeout(() => {
                    this.spinner.hide();
                }, 30000);
            },
            (error: any) => {
                this.spinner.hide();
                this.toastr.error('Internal server error', 'Error');
            }
        );
    }

    resetFilter() {
        this.selectedClient = null;
    }

    searchShop() {
        this.shops = [];
        this.shops = this.tempShops.filter((att) =>
            att.shopName?.toLowerCase().includes(this.shopSearch?.toLowerCase())
        );
    }

    searchMobile() {
        this.shops = [];
        this.shops = this.tempShops.filter((att) =>
            att.userMobile
                ?.substring(att.userMobile.length - 10)
                ?.includes(
                    this.mobileSearch?.substring(this.mobileSearch.length - 10)
                )
        );
    }

    checkUncheckAll(event) {
        if (event.checked == true) {
            for (let i = 0; i < this.shops.length; i++) {
                const found = this.selectedShops.find(
                    (element) => element == this.shops[i].id
                );
                if (found == undefined) {
                    this.selectedShops.push(this.shops[i].id);
                }
            }
            for (
                let index = 0;
                index < this.myCheckbox._results.length;
                index++
            ) {
                this.myCheckbox._results[index]._checked = true;
            }
        } else {
            for (let i = 0; i < this.shops.length; i++) {
                const shopIndex = this.selectedShops.indexOf('id');
                this.selectedShops.splice(shopIndex, 1);
                this.selectedShops = [];
                this.selectedToken = [];
            }
            for (
                let index = 0;
                index < this.myCheckbox._results.length;
                index++
            ) {
                this.myCheckbox._results[index]._checked = false;
            }
        }
        console.info(this.selectedShops);
    }

    checkUncheckSingle(event, item, index) {
        const found = this.selectedShops.find(
            (element) => element == item.userMobile
        );
        if (!event.checked && found == undefined) {
            this.selectedShops.push(item.id);
        } else {
            const shopIndex = this.selectedShops.indexOf(item.id);
            this.selectedShops.splice(shopIndex, 1);
        }
        console.info(this.selectedShops);
    }

    sendAlert() {
        console.log("sendAlert");
        if (this.message?.length == 0 || this.message == undefined) {
            this.toastr.info('Message is empty.', 'Info');
            return;
        }
        if (this.alertType?.length == 0 || this.alertType == undefined) {
            this.toastr.info('Alert type not selected.', 'Info');
            return;
        }
         debugger;
     //   console.info(" File ",this.selectedFile);
        const obj = {
            // clientId: this.selectedClient.id,
            message: this.message,
            ids: this.selectedShops.join(),
            alertType: this.selectedAlertType,
            imageName: this.image ? this.image.name : null
           
        };
        console.info(obj);
        this.spinner.show();
        this.httpService.sendMessage(obj).subscribe(
            (data: any) => {
                this.spinner.hide();
                if (data.title == 'SUCCESS') {
                    this.toastr.success(data.description, 'Success');
                } else {
                    this.toastr.error(data.description, 'Error');
                }
            },
            (error: any) => {
                this.spinner.hide();
                this.toastr.error('Internal server error', 'Error');
            }
        );
    }

    zoneChange() {
        this.loading = true;
    
        this.httpService.getRegion(this.selectedZone.id).subscribe(
          (data) => {
            const res: any = data;
            if (res) {
              this.regions = res;
            } else {
              this.clearLoading();
    
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
            this.clearLoading();
          }
        );
      }

      clearLoading() {
        this.loading = false;
      }
}
