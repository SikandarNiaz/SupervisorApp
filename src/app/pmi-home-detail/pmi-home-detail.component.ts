import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../layout/dashboard/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { Config } from "src/assets/config";

@Component({
  selector: 'app-pmi-home-detail',
  templateUrl: './pmi-home-detail.component.html',
  styleUrls: ['./pmi-home-detail.component.css']
})
export class PmiHomeDetailComponent implements OnInit {
  data: any[] = [];
  formData: any[] = [];
  selectedImage: any = {};
  loading: boolean = false;
  ip: string = Config.BASE_URI;

  constructor(
    private route: ActivatedRoute,
    private httpService: DashboardService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const surveyId = params['survey_id'];
      const startDate = params['startDate'];
      const endDate = params['endDate'];

      this.loadData(surveyId, startDate, endDate);
    });
  }

  loadData(surveyId: string, startDate: string, endDate: string): void {
    this.loading = true;
    const obj = {
      surveyId,
      startDate,
      endDate
    };

    this.httpService.ViewDistributionAuditDetail(obj).subscribe(
      (response: any) => {
        this.loading = false;
        if (response && Array.isArray(response) && response.length > 0) {
          this.data = response;
          this.handleImageData();
          this.formData = this.transformFormData(this.data[0]?.formData);
        } else {
          this.handleError('No data or data in unexpected format');
        }
      },
      error => {
        this.loading = false;
        console.error('API Error:', error);
        this.handleError('An error occurred while fetching data');
      }
    );
  }

  handleImageData(): void {
    if (this.data[0]?.imageList1 && this.data[0].imageList1.length > 0) {
      this.selectedImage = this.data[0].imageList1[0];
    } else {
      console.error('No images found in data');
    }
  }

  transformFormData(formDataObj: any): any[] {
    return formDataObj ? Object.keys(formDataObj).map(key => formDataObj[key]) : [];
  }

  setSelectedImage(image: any): void {
    this.selectedImage = image;
  }

  showChildModal(image: any): void {
    // Implement modal logic if needed
  }

  updateTextData(item: any): void {
    // Implement logic to update text data if needed
  }

  private handleError(message: string): void {
    console.error(message);
    this.toastr.error(message, 'Error');
  }
}
