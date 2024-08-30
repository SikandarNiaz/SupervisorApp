import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { DashboardService } from '../layout/dashboard/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { MatSelectChange } from '@angular/material/select';
import * as moment from 'moment'; 
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Clipboard } from '@angular/cdk/clipboard';

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
  data: any[] = [];
  selectedZone: any;
  baList: any[] = [];
  selectedBa:any;
  selectedRegion: any;
  loadingData: boolean = false;
  isButtonDisabled: boolean = true;
  title = "Evaluation Data";
  smsRemarks: string = '';
  smsStatus: string = '';
  callRemarks: string = '';
  lastName: string = '';
  firstName: string = '';
  phoneNumber: string = '';
  skuType: string = '';
  name: string = '';
  dateOfBirth: Date | null = null; 
  cnic: string = '';
  isCallMode: boolean = false;
  contactClassification: string = '';
  conversionDate: string = ''; 
  callStatus: string = '';
  smsReference: string = '';
  Regions: any[] = [];
  ba: any[] = [];
  Zones: any[] = [];
  filteredEvaluationDetail: any[] = []; 
  callRemarksList: any[] = [];
  smsRemarksList: any[] = [];
  showUploadModal: boolean = false;
  EvaluationDetail: any[] = [];
  isEditable: boolean = false;
  isSmsMode: boolean = false; // Indicates if the mode is SMS

  Supervisors = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
  ];
  showForms: boolean = false;
  smsStatuses = ['Sent', 'Failed', 'Pending'];
  selectedItem: any; 
  searchQuery: string = '';
  selectedStatus: string = '';
  selectedClassification: string;
  classifications: string[] = ['Purchase Trial', 'Info Pass'];
  sortBy: string = ''; // Field to sort by
  sortOrder: 'asc' | 'desc' = 'asc'; // Sorting order

  constructor(
    private clipboard: Clipboard,
    private dashboardService: DashboardService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.gettingCallRemarksList();
    this.gettingSmsRemarksList();
    // this.gettingEvaluationDetail();
    this.getZone();
  }


  gettingBaList(zoneId: number, regionId: number): void {
    this.dashboardService.gettingBaList(zoneId, regionId).subscribe(
      (response: any[]) => {
        console.log('BA List:', response);

        this.baList = response.map((item) => ({ id: item.id, name: item.fullName,mCode:item.mCode }));
        console.log('BA List:', this.baList);
      },
      (error) => {
        console.error('Error fetching BA list:', error);
      }
    );
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
      status: this.selectedStatus,
      classification: this.selectedClassification, // Add classification
      baId: this.selectedBa
    };
    console.log('obj:', obj);
  
    this.dashboardService.gettingSupervisorEvaluationDetail(obj).subscribe(
      (response: any[]) => {
        console.log('Response:',response );
        // Process and set the evaluation details
        this.EvaluationDetail = response.map(item => ({
        
          id :item.id,
          baCode: item.baCode,
          deployment: item.deploymentMarket,
          name: item.firstName,
          cnic: item.cnicNumber,
          dateOfBirth: moment(item.dateOfBirth, 'MMM DD, YYYY').toDate(),
            //  conversionDate: moment(item.conversionDate).format('YYYY-MM-DD'),
          conversionDate: moment(item.conversionDate).format('YYYY-MM-DD HH:mm:ss'),
          // conversionDate: item.conversionDate,
          evaluated : item.evaluated,
          smsRemarks:item.smsRemarks,
          callRemarks:item.callRemarks,
          smsReference:item.smsReference,
          contactClassification:item.contactClassification,
          contactId:item.contactId,
          callStatus:item.callStatus,smsStatus:item.smsStatus,
          lastName:item.lastName,
          phoneNumber:item.phoneNumber,
          skuType:item.skuType

        }));
        this.isButtonDisabled = this.EvaluationDetail.length <= 0;
  
        this.filteredEvaluationDetail = this.EvaluationDetail;
        this.showForms = true;
        this.loadingData = false; // Set loading state to false
        console.log('Filtered Evaluation Details:', this.filteredEvaluationDetail);
      },
      (error) => {
        this.loadingData = false; // Set loading state to false
        console.error('Error fetching evaluation details:', error);
        this.isButtonDisabled = true; 
        this.toastr.error('Failed to fetch evaluation details');
      }
    );
  }
  
  onZoneChange(event: MatSelectChange): void {
    console.log('Zone changed:', event.value);
    this.selectedZone = event.value;
    this.getRegion(this.selectedZone);
    this.gettingBaList(this.selectedZone, this.selectedRegion);
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
    this.selectedRegion = this.selectedRegion;
    this.gettingBaList(this.selectedZone, this.selectedRegion);}

  onDateChange(): void {
    // this.checkAndFetchSummary();
  }
  copyPhoneNumber() {
    navigator.clipboard.writeText(this.phoneNumber).then(() => {
      this.toastr.success('Phone Number Copied!');
      console.log('Phone Number copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy Phone Number: ', err);
    });
  }
  
  copyCNIC() {
    navigator.clipboard.writeText(this.cnic).then(() => {
      this.toastr.success('CNIC Copied!');
      console.log('CNIC copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy CNIC: ', err);
    });
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
  openUploadModal(item: any, mode: 'view' | 'call'): void {
    this.selectedItem = item;
    console.log('Selected Item:', this.selectedItem);
  
    if (this.selectedItem) {
      this.isSmsMode = (mode === 'view');
      this.isCallMode = (mode === 'call');
      this.firstName = this.selectedItem.name || '';
      this.cnic = this.selectedItem.cnic || '';
      this.smsRemarks = this.selectedItem.smsRemarks || '';
      this.callRemarks = this.selectedItem.callRemarks || '';
      this.smsReference = this.selectedItem.smsReference || '';
      this.lastName = this.selectedItem.lastName || '';
      this.phoneNumber = this.selectedItem.phoneNumber || '';
      this.skuType = this.selectedItem.skuType || '';
      this.dateOfBirth = this.selectedItem.dateOfBirth || null;
      this.contactClassification = this.selectedItem.contactClassification || '';
     
  
      // Show the modal
      this.showUploadModal = true;
      document.body.classList.add('modal-open'); 
  
      if (this.AddStockModal) {
        this.AddStockModal.show();
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
downloadAsExcelFile(): void {
       
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.EvaluationDetail);
  worksheet['!cols'] = [{ wch: 15 }, { wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 },{ wch: 15 }
    ,{ wch: 15 },{ wch: 15 }, { wch: 15 },{ wch: 15 },{ wch: 20 },{ wch: 15 },
  ];
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, "ptc"+"_"+"file_data");

}

private saveAsExcelFile(buffer: any, fileName: string): void {
const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
saveAs(data, `${fileName}${new Date().getTime()}.xlsx`);
}

}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';


