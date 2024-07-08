import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../layout/dashboard/dashboard.service';
import { KeyValuePipe } from "@angular/common";

import {
 EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-pmi-home-detail',
  templateUrl: './pmi-home-detail.component.html',
  styleUrls: ['./pmi-home-detail.component.css']
})
export class PmiHomeDetailComponent implements OnInit {
  @Input("data") data;
  mCode: string;
  formData: any;
  loading:boolean;
  selectedImage: any = {};
 

  constructor(private route: ActivatedRoute,
    private httpService: DashboardService,
    private toastr: ToastrService,
    private keyValuePipe: KeyValuePipe,) {

    this.route.queryParams.subscribe((p) => {
      console.log("active params", p);
      this.mCode = p.mCode;
    });
   }

   ngOnInit(): void {
    // Using queryParams to get mCode parameter
    this.route.queryParams.subscribe(params => {
      this.mCode = params['mCode'];
      console.log("mCode from queryParams:", this.mCode);
      this.updateTextDataNew();
    });
  }


  updateTextDataNew() {
    this.loading = true;
    const obj = {
      mCode: this.mCode
    };
    console.log("mCode:", this.mCode);

    this.httpService.ViewDistributionAuditDetail(obj).subscribe((data: any) => {
      console.log("API Response:", JSON.stringify(data, null, 2));
      this.loading = false;
      if (data && Array.isArray(data) && data.length > 0) {
        this.data = data;
        console.log("this.data:", JSON.stringify(this.data, null, 2));
        if (data[0].imageList && Array.isArray(data[0].imageList) && data[0].imageList.length > 0) {
          this.selectedImage = data[0].imageList[0];
          console.log("this.selectedImage:", this.selectedImage);
        }
        // Assuming data[0].formData is the correct path to your form data
        this.formData = data[0].formData || [];
        console.log("this.formData:", JSON.stringify(this.formData, null, 2));
      } else {
        console.error("No data or data in unexpected format");
        this.toastr.error("Data not found or in unexpected format", "Error");
      }
    }, error => {
      this.loading = false;
      console.error("API Error:", error);
      this.toastr.error("An error occurred while fetching data", "Error");
    });
  }

}
