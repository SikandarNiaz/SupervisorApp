import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Config } from 'src/assets/config';
import { DashboardService } from '../../dashboard.service';
import {
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { FlaggedShopsListComponent } from '../../evaluation/flagged-shops-list/flagged-shops-list.component';

@Component({
  selector: 'app-kt-interception-evaluation',
  templateUrl: './kt-interception-evaluation-component.html',
  styleUrls: ['./kt-interception-evaluation-component.css'],
})
export class KtInterceptionEvaluationComponent implements OnInit {
  ip: any = Config.BASE_URI;
  loading = false;
  showEvaluetionData: any = [];
  showApprove: any = [];
  remarks: any = [];
  interception_id: any;
  interceptionId: any;
  id: any;
  isButtonsDisabled = true;
  selectedOption: string = '';
  selectedRemarks: any = [];
  title: '';
  rotationAngle: number = 0;

  rotateImage() {
    this.rotationAngle += 90; // Increment by 90 degrees, you can adjust as needed
  }

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: DashboardService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      const interceptionId = params['interception_id'];
      if (interceptionId) {
        this.interception_id = interceptionId;
        this.getData();
        this.getRemarksList();
      }
    });


  }
  ngOnDestroy() {
    this.isButtonsDisabled = false;
  }

  getData() {
    this.loading = true;
    ;
    const obj = {
      interception_id: this.interception_id
    }
    console.log("id:", this.interception_id);

    this.httpService.getKTInterceptionEvaluation(obj).subscribe(
      (data) => {
        console.log('DATA: ', data);
        this.showEvaluetionData = data;

        if (this.showEvaluetionData && this.showEvaluetionData.length === 0) {
          console.log('showEvaluetionData:', this.showEvaluetionData);
          this.toastr.info('No record found.');
        }
        this.isButtonsDisabled = false;

        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching data:', error);
        this.toastr.error('Error fetching data. Please try again.');
      }
    );
  }


  approveDetails() {

    this.loading = true;
    const obj = {
      interception_id: this.interception_id,
      selectedRemarks: this.selectedRemarks.id

    }

    console.log("obj", obj)
    this.httpService.getApprovedDisApproved(obj).subscribe(
      (data) => {
        console.log('Data: ', data);
        this.showApprove = data;

        if (this.showApprove && this.showApprove.length === 0) {
          console.log('showEvaluetionData:', this.showApprove);
          this.toastr.info('No record found.');

        }
        else {
          this.toastr.success('Interception Successfully Evaluated'); 
        }
        this.getData();

        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching data:', error);
        this.toastr.error('Error fetching data. Please try again.');
      }
    );


  }
  getRemarksList() {
    this.loading = true;
    this.httpService.getRemarks().subscribe(
      (data) => {
        const res: any = data;
        console.log("remarks:", data)
        if (res) {
          this.remarks = res.remarkList
            ;

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
}