import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DashboardService } from '../layout/dashboard/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { MatSelectChange } from '@angular/material/select';
import * as moment from 'moment'; 

interface FormData {

  smsRemarks: string;
  smsStatus: string;
  callRemarks: string;
  callStatus: string;
  // smsReference: string;
  baCode: string; // Add baCode to the form data
  conversionDate: string; // Add conversionDate to the form data
}

@Component({
  selector: 'app-supervisor-evaluation-page',
  templateUrl: './supervisor-evaluation-page.component.html',
  styleUrls: ['./supervisor-evaluation-page.component.css']
})
export class SupervisorEvaluationPageComponent implements OnInit {

  @ViewChild('AddStockModal') AddStockModal!: ModalDirective;

  selectedSupervisor: string | null = null;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2100, 0, 1);
  startDate: Date;
  endDate: Date;
  selectedZone: any;
  selectedRegion: any;
  loadingData: boolean = false;
  title = "Hubspot Data";
  smsRemarks: string = '';
  smsStatus: string = '';
  callRemarks: string = '';
  conversionDate: string = ''; 
  callStatus: string = '';
  smsReference: string = '';
  Regions: any[] = [];
  Zones: any[] = [];
  filteredEvaluationDetail: any[] = []; 
  callRemarksList: any[] = [];
  smsRemarksList: any[] = [];
  showUploadModal: boolean = false;
  EvaluationDetail: any[] = [];
  Supervisors = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
  ];
  showForms: boolean = false;
  smsStatuses = ['Sent', 'Failed', 'Pending'];
  selectedItem: any; 
  searchQuery: string = '';
  selectedStatus: string = '';
  sortBy: string = ''; // Field to sort by
  sortOrder: 'asc' | 'desc' = 'asc'; // Sorting order

  constructor(
    private dashboardService: DashboardService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.gettingCallRemarksList();
    this.gettingSmsRemarksList();
    // this.gettingEvaluationDetail();
    this.getZone();
  }
  getZone() {
    this.dashboardService.getZone().subscribe(
      (response: any) => {
        console.log('Response from getZone:', response);
        if (response && Array.isArray(response.zoneList)) {
          this.Zones = response.zoneList.map((item) => ({ id: item.id, name: item.title }));
        } else {
          console.error('Expected response.zoneList to be an array but got:', response);
        }
      },
      (error) => {
        console.error('Error fetching zones:', error);
      }
    );
  }

  gettingEvaluationDetail(): void {
    this.loadingData = true; // Set loading state to true
  
    // Prepare the filter parameters
    const obj = {
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      endDate: moment(this.endDate).format('YYYY-MM-DD'),
      zoneId: this.selectedZone,
      regionId: this.selectedRegion,
      status: this.selectedStatus
    };
  
    this.dashboardService.gettingSupervisorEvaluationDetail(obj).subscribe(
      (response: any[]) => {
        // Process and set the evaluation details
        this.EvaluationDetail = response.map(item => ({
          baCode: item.baCode,
          deployment: item.deploymentMarket,
          name: item.firstName,
          cnic: item.cnicNumber,
          conversionDate: moment(item.conversionDate).format('YYYY-MM-DD HH:mm:ss'),
          // conversionDate: item.conversionDate,
          evaluated : item.evaluated,
          smsRemarks:item.smsRemarks,
          callRemarks:item.callRemarks,
          smsReference:item.smsReference

        }));
  
        this.filteredEvaluationDetail = this.EvaluationDetail;
        this.showForms = true;
        this.loadingData = false; // Set loading state to false
        console.log('Filtered Evaluation Details:', this.filteredEvaluationDetail);
      },
      (error) => {
        this.loadingData = false; // Set loading state to false
        console.error('Error fetching evaluation details:', error);
        this.toastr.error('Failed to fetch evaluation details');
      }
    );
  }
  
  onZoneChange(event: MatSelectChange): void {
    console.log('Zone changed:', event.value);
    this.selectedZone = event.value;
    this.getRegion(this.selectedZone);
  }

  getRegion(zoneId: string) {
    this.dashboardService.getRegion(zoneId).subscribe(
      (response: any) => {
        console.log('Response from getRegion:', response);
        if (response && Array.isArray(response)) {
          this.Regions = response.map((item) => ({ id: item.id, name: item.title }));
        } else {
          console.error('Expected response to be an array but got:', response);
        }
      },
      (error) => {
        console.error('Error fetching regions:', error);
      }
    );
  }
  onSelectChange(): void {
    // this.checkAndFetchSummary();
  }

  onDateChange(): void {
    // this.checkAndFetchSummary();
  }
  sortByField(field: string): void {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle sort order
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc'; // Default to ascending order
    }
    this.sortItems(); // Sort items after changing sort parameters
  }

  // Method to apply sorting
  sortItems(): void {
    this.filteredEvaluationDetail.sort((a, b) => {
      const aValue = a[this.sortBy];
      const bValue = b[this.sortBy];

      let comparison = 0;

      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }
  gettingSmsRemarksList() {
    this.dashboardService.gettingSmsRemarks().subscribe(
      (response: any) => {
        const smsRemarksArray = Array.isArray(response) ? response : response.data;
        if (Array.isArray(smsRemarksArray)) {
          this.smsRemarksList = smsRemarksArray.map((item) => ({
            title: item.title
          }));
        } else {
          this.toastr.error('Failed to fetch SMS remarks');
        }
      },
      (error) => {
        this.toastr.error('Failed to fetch SMS remarks');
      }
    );
  }

  gettingCallRemarksList() {
    this.dashboardService.gettingCallRemarks().subscribe(
      (response: any) => {
        const callRemarksArray = Array.isArray(response) ? response : response.data;
        if (Array.isArray(callRemarksArray)) {
          this.callRemarksList = callRemarksArray.map((item) => ({
            title: item.title
          }));
        } else {
          this.toastr.error('Failed to fetch call remarks');
        }
      },
      (error) => {
        this.toastr.error('Failed to fetch call remarks');
      }
    );
  }
  filterEvaluationDetail(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredEvaluationDetail = this.EvaluationDetail.filter(item =>
      item.baCode.toLowerCase().includes(query) ||
      item.deployment.toLowerCase().includes(query)
    );
  }
  getCallStatus(callRemark: string): string {
    const approvedRemarks = [
      "Approved",
      "Incorrect Name",
      "Customer didn't verify CNIC"
    ];

    const redFlagRemarks = [
      "Not Intercepted by BA",
      "Non-nicotine User",
      "Underage",
      "Trial was not generated",
      "Didn’t purchase VELO",
      "Invalid CNIC",
      "Invalid Contact"
    ];

    const responsePendingRemarks = [
      "Customer didn't give time",
      "Customer suggested alternate time",
      "Didn't pickup the call",
      "Number was not responding"
    ];

    if (approvedRemarks.includes(callRemark)) {
      return 'Approved';
    } else if (redFlagRemarks.includes(callRemark)) {
      return 'Red Flag';
    } else if (responsePendingRemarks.includes(callRemark)) {
      return 'Response Pending';
    } else {
      return ''; // Default case
    }
  }

  getSmsStatus(smsRemark: string): string {
    const approvedRemarks = [
      "Valid CNIC",
      "CNIC Valid but VNR"
    ];

    const redFlagRemarks = [
      "Invalid CNIC"
    ];

    const duplicateRemarks = [
      "Duplicate Same BA Same Day",
      "Duplicated Same BA Different Day",
      "Duplicate Different BA Same Day",
      "Duplicate Different BA Different Day"
    ];

    if (approvedRemarks.includes(smsRemark)) {
      return 'Approved';
    } else if (redFlagRemarks.includes(smsRemark)) {
      return 'Red Flag';
    } else if (duplicateRemarks.includes(smsRemark)) {
      return 'Duplicate';
    } else if (smsRemark === "Response Pending") {
      return 'Response Pending';
    } else {
      return ''; // Default case
    }
  }

  assignStock() {
    this.smsStatus = this.getSmsStatus(this.smsRemarks);
  
    // Ensure the selectedItem exists and has the required properties
    const baCode = this.selectedItem?.baCode || '';
    const formattedConversionDate = this.formatDate(this.selectedItem?.conversionDate || '');
  
    // Create a new FormData object
    const data = {
      smsRemarks: this.smsRemarks,
      smsStatus: this.smsStatus,
      callRemarks: this.callRemarks,
      callStatus: this.getCallStatus(this.callRemarks),
      baCode: baCode,
      conversionDate: formattedConversionDate,
      smsReference: this.smsReference 
    };
    
    this.dashboardService.insertEvaluationData(data).subscribe(
      response => {
        if (response === "Update successful") { // Adjust this condition based on your actual response
          this.toastr.success('Data inserted successfully!');
          this.resetFormData();
          this.closeUploadModal(); // Close the modal after processing
        } else {
          this.toastr.error('Failed to insert data'); // Handle unexpected responses
        }
        console.log('Server Response:', response); // Log server response
      },
      error => {
        console.error('Error inserting data:', error); // Log error details
        this.toastr.error('Failed to insert data'); // Show error message
      }
    );
  }
  openUploadModal(item: any): void {
    // Debugging
    console.log('Opening modal with item:', item);
  
    this.selectedItem = item;
  
    if (this.selectedItem) {
      // Debugging
      console.log('Selected item:', this.selectedItem);
  
      // Set values from selectedItem or defaults
      this.smsRemarks = this.selectedItem.smsRemarks || '';
      this.callRemarks = this.selectedItem.callRemarks || '';
      this.smsReference = this.selectedItem.smsReference || '';
  
      // Ensure conversionDate is not used or cleared
      this.conversionDate = ''; // Ensure conversionDate is cleared
  
      // Show the modal
      this.showUploadModal = true;
  
      // Debugging
      console.log('Modal visibility:', this.showUploadModal);
  
      // Check if AddStockModal is initialized and show it
      if (this.AddStockModal) {
        // Ensure AddStockModal is the correct instance
        this.AddStockModal.show();
        console.log('Modal is shown');
      } else {
        console.error('AddStockModal is not initialized');
      }
    } else {
      console.error('Selected item is null or undefined');
    }
  }
  
  
  // openUploadModal(item: any): void {
  //   this.selectedItem = item;
  //   this.smsRemarks = this.selectedItem.smsRemarks || '';
  //   this.callRemarks = this.selectedItem.callRemarks || '';
  //   this.smsReference = this.selectedItem.smsReference || '';
  
  //   // Use the updated formatDate method
  //   this.conversionDate = this.formatDate(this.selectedItem.conversionDate || '');
  
  //   this.showUploadModal = true;
  //   this.AddStockModal.show();
  // }
  
  
  // openUploadModal(item: any): void {
  //   this.selectedItem = item; 
  //   this.showUploadModal = true;
  //   this.AddStockModal.show(); 
  // }

  // Close the modal
  closeUploadModal(): void {
    this.showUploadModal = false;
    this.AddStockModal.hide(); // Hide the modal
  }

  
  resetFormData() {
    // Reset form data
    this.smsRemarks = '';
    this.smsStatus = '';
    this.callRemarks = '';
    this.callStatus = ''; 
    this.smsReference = '';
  }
  // Utility function to format date
// formatDate(dateStr: string): string {
//   const date = new Date(dateStr);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//   const day = String(date.getDate()).padStart(2, '0');
//   const hours = String(date.getHours()).padStart(2, '0');
//   const minutes = String(date.getMinutes()).padStart(2, '0');
//   const seconds = String(date.getSeconds()).padStart(2, '0');

//   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// }

formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0'); // Use 24-hour format
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Return the date in YYYY-MM-DD HH:mm:ss format
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

}
