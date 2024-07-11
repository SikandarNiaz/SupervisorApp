
  import { Component, OnInit } from '@angular/core';
  import { DashboardService } from 'src/app/layout/dashboard/dashboard.service';
  import * as moment from "moment";
  import { ToastrService } from 'ngx-toastr';
  import {
    FormGroup
  } from "@angular/forms";
  import { environment } from "src/environments/environment";
  
  @Component({
    selector: 'app-upload-training',
  templateUrl: './upload-training.component.html',
  styleUrls: ['./upload-training.component.css'],
  })
  export class  UploadTrainingComponent implements OnInit {
    showForms: boolean = false;
    toggelView:boolean = false;
    obj: any[] = [];
    title = "Upload Training";
    loadingData: boolean;
    loading: boolean;
    loadingdata: Boolean = false;
    searchQuery: string = '';
    minDate = new Date(2000, 0, 1);
    maxDate = new Date();
    startDate = new Date();
    endDate = new Date();
    params: any = {};
    Surveyors:any;
    form: FormGroup;
    selectedSurveyors: number[] = []; 
    fileToUpload: File | null = null;
  
    constructor(
      private dashboardService: DashboardService,
      private toaster: ToastrService
    ) { }
  
    ngOnInit(): void {
      this.gettingSurveyor();
      // this.getDashboardData();
    }

    onFileChange(event: any) {
      if (event.target.files && event.target.files.length > 0) {
        this.fileToUpload = event.target.files[0]; // Save the selected file
      }
    }
  
    gettingSurveyor() {
      this.dashboardService.gettingSurveyors().subscribe(
        (response: any[]) => {
          this.Surveyors = response.map((item) => ({ ...item }));
          console.log(this.Surveyors, 'Surveyor list');
        },
        (error) => {
          console.log(error, 'error');
        }
      );
    }
    onSurveyorChange(event) {
      console.log('Selected Surveyor IDs:', this.selectedSurveyors);
      // Your logic to handle surveyor change
    }
  
    selectAllSurveyors(event: Event) {
      event.stopPropagation();
      this.selectedSurveyors = this.Surveyors.map(surveyor => surveyor.id);
     
    }
  
    deselectAllSurveyors(event: Event) {
      event.stopPropagation();
      this.selectedSurveyors = [];
      console.log("Delected Surveyor:",this.selectedSurveyors)
    }

    uploadTrainingPDF() {
      if (!this.fileToUpload) {
        this.toaster.error('Please select a file to upload.', 'Error');
        return;
      }
  
      this.loadingData = true;
      
      const formData = new FormData();
      formData.append('file', this.fileToUpload);
      formData.append('startDate', moment(this.startDate).format("YYYY-MM-DD"));
      formData.append('endDate', moment(this.endDate).format("YYYY-MM-DD"));
  
      console.log("Uploading PDF with dates:", formData);
  
      this.dashboardService.uploadTrainingPDF(formData).subscribe(
        (response) => {
          this.loadingData = false;
          console.log("Upload successful:", response);
          this.toaster.success('PDF uploaded successfully!', 'Success');
        },
        (error) => {
          this.loadingData = false;
          console.error("Upload failed:", error);
          this.toaster.error('Failed to upload PDF.', 'Error');
        }
      );
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
  
    modifyDate(date) {
      return moment(date).format("YYYY-MM-DD");
    }
  }
  