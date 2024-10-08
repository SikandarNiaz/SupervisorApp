
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from "@angular/core";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DashboardService } from "../layout/dashboard/dashboard.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { DatePipe } from "@angular/common";
import * as moment from "moment";

@Component({
  selector: 'app-manage-ptc-file',
  templateUrl: './manage-ptc-file.component.html',
  styleUrls: ['./manage-ptc-file.component.css']
})
export class ManagePtcFileComponent implements OnInit,AfterViewInit  {
  @ViewChild(MatSort, { static: true }) sort!: MatSort; 
  dynamicForm: FormGroup;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2100, 0, 1);
  startDate = new Date();
  endDate = new Date();
  isDownloadDisable=true
  channels: any = [
    { id: 1, title: "MT" },
    { id: 2, title: "GT" },
    { id: 3, title: "IMT" },
  ];
  selectedChannel: any;
  loadingData: boolean =false
  loadingModal = false;
  loadingModalButton = false;
  projectType: any;
  
  clusterList: any = [];
  zones: any = [];
  regions: any = [];
  zoneObj = { id: -1, title: "All" };
  selectedCluster: any = {};
  selectedZone: any;
  selectedRegion: any;

  activeStatus: any = [
    { id: 1, value: "Y" },
    { id: 2, value: "N" },
  ];

  statusList: any = [
    { id: 1, value: "COMPLIANT" },
    { id: 2, value: "NON-COMPLIANT" },
  ];
  selectedStatus : any = {};

  labels: any;
  data: any[] = [];
  sortedData: any[] = []; // To store sorted data
  sortBy: string = ''; // Field to sort by
 
  @ViewChild("childModal", { static: true }) childModal: ModalDirective;

  form: FormGroup;
  filteredList: any;
  areas: any = [];
  title = "Hubspot Data";
  loading: boolean = true;
  tableData: any = [];
  columns: string[] = [];
  headersData: any;
  rowsData: any;
  showInTableHeaders: any;
  showInModalHeaders: any;
  user_id: string;
  excelFile: any;
  isSelected: boolean=true;
  channelName: this;
  sortOrder: 'asc' | 'desc' = 'asc';
  dataSource = new MatTableDataSource<any>([]);
 
  // data: any;

  constructor(
    private httpService: DashboardService,
    private router: Router,
    private toastr: ToastrService,
    public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    
  ) {
    this.user_id = localStorage.getItem("user_id");
    this.dynamicForm = this.formBuilder.group({});
    this.clusterList = JSON.parse(localStorage.getItem("clusterList")) || [];

    this.projectType = localStorage.getItem("projectType");

    this.form = formBuilder.group({
      email: new FormControl("", [Validators.required]),
      cluster:
        this.clusterList?.length == 0 || !this.clusterList
          ? this.formBuilder.group({
              id: -1,
              title: "All",
            })
          : this.formBuilder.group({
              id: new FormControl("", [Validators.required]),
              title: new FormControl(""),
            }),
      region_id: new FormControl(""),
    });
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
  }

  ngOnInit() {
   
  
  }
 
  
  // ngAfterViewInit() {
  //   const message = "all done loading :)";
  //   this.cdr.detectChanges();
  // }

  
  onSelectChange(): void {
    // this.checkAndFetchSummary();
  }

  onDateChange(): void {
    // this.checkAndFetchSummary();
  }
  changeStatus(checkedEvent, email) {
    console.log("id: ", email?.id, "checkedEvent", checkedEvent.target.checked);
    console.log("email in changestatus: ", email);
    const obj = email;
    obj.id = email.id;
    if (email.active == "Y") {
      obj.active = "N";
    } else {
      obj.active = "Y";
    }
    this.loadingModal = true;
    this.loadingModalButton = true;
    this.httpService.addUpdateEmailById(obj).subscribe((data: any) => {
      if (data.success == "true") {
        // this.toastr.success(data.message);
        console.log("Status Change: ", data.message);
        email.active = obj.active;
        // this.spliceEmail(email, -1);
      } else {
        this.toastr.error(data.message, "Error");
      }

      this.loadingModal = false;
      this.loadingModalButton = false;
    });
  }
  // sortByField(field: string): void {
  //   if (this.sortBy === field) {
  //     this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; 
  //   } else {
  //     this.sortBy = field;
  //     this.sortOrder = 'asc'; 
  //   }
  //   this.sortItems(); 
  // }



  // sortItems(): void {
  //   if (!this.sortBy) return; 

  //   this.sortedData = [...this.data].sort((a, b) => {
  //     const aValue = a[this.sortBy];
  //     const bValue = b[this.sortBy];

  //     let comparison = 0;
  //     if (aValue > bValue) {
  //       comparison = 1;
  //     } else if (aValue < bValue) {
  //       comparison = -1;
  //     }
  //     return this.sortOrder === 'asc' ? comparison : -comparison;
  //   });
  // }
  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    } else {
      console.error('MatSort is not defined!');
    }
  }

  sortIt(key: string) {
    if (!this.sort) {
      console.error('MatSort is not initialized!');
      return;
    }

    if (this.sort.active === key) {
      this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.active = key;
      this.sort.direction = 'asc';
    }
    this.sortBy = key;
    this.sortOrder = this.sort.direction;
    this.dataSource.sort = this.sort;
  }

  getArrowType(key: string): string {
    return key === this.sortBy ? (this.sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward') : '';
  }

  onGetDataClick() {
    // Ensure startDate and endDate are set before calling getData
    if (this.startDate && this.endDate) {
      this.getData();
    } else {
      this.toastr.warning('Please select both start and end dates.', 'Warning');
    }
  }

  getData() {
    this.loadingData = true;

    const obj = {
      clusterId: -1,
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      endDate: moment(this.endDate).format('YYYY-MM-DD')
    };

    this.httpService.getPtcFileData(obj).subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource.data = []; // Clear existing data
        this.columns = [];

        if (Array.isArray(data) && data.length > 0) {
          this.dataSource.data = data;
          this.columns = Object.keys(data[0]);
          this.isDownloadDisable = false;
        } else {
          this.isDownloadDisable = true;
        }

        this.loadingData = false;
      },
      (error) => {
        this.toastr.error(error.status === 0 ? 'Please check Internet Connection' : error.description, 'Error');
        this.loadingData = false;
      }
    );
  }

  
  
  

  getZoneByCluster() {
    this.loadingData = true;
    this.selectedZone = {};
    this.selectedRegion = {};
    this.httpService.getZoneByCluster(this.selectedCluster.id || -1).subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.zones = res;
        }
        console.log("zone", this.zones);
        this.loadingData = false;
      },
      (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
        this.loadingData = false;
      }
    );
  }

  zoneChange() {
    this.loadingData = true;
    this.selectedRegion = {};

    this.httpService.getRegion(this.selectedZone.id||-1).subscribe(
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
          this.loadingData = false;
        }, 500);
      },
      (error) => {
        this.clearLoading();
      }
    );
  }

  clearLoading() {
    this.loading = false;
    this.loadingData = false;
  }

  showUpdateModal(row){
    // this.form.patchValue({
    //   id: surveyor.id,
    //   m_code: surveyor.m_code,
    //   fullName: surveyor.fullName,
    //   password: surveyor.password,
    // });
    
    this.patchForm(row);
    this.childModal.show();
  }

  patchForm(row: any) {
    
    Object.keys(row).forEach((key) => {
      if (this.dynamicForm.controls[key]) {
        this.dynamicForm.patchValue({ [key]: row[key] });
       // equivalent to if key = id
        // this.dynamicForm.patchValue({ id: row.id });
      }
    });
    console.log("this.dynamicForm: ", this.dynamicForm.value)
    
  }

  hideModal(){
    // this.selectedSurveyor = {};
    this.dynamicForm.reset();
    this.childModal.hide();
  }

  private getColumns(data: any): string[] {
    // Extract keys from the first row of data (assuming all rows have the same structure)
    return Object.keys(data[0]);
  }

  filteredHeadersData(){
    this.showInTableHeaders = this.headersData.filter((e)=>e.showInTable == true);
    this.showInModalHeaders = this.headersData.filter((e)=>e.showInEditModal == true);

    console.log("this.showInTableHeaders: ",this.showInTableHeaders);
    console.log("this.showInModalHeaders: ",this.showInModalHeaders);
  }

  createDynamicForm(hData?){
    const formGroupConfig: { [key: string]: any } = {};
    for (const column of hData) {
      formGroupConfig[column.title] = [{ value: '',   hidden : !column.showInEditModal }];
      console.log("formGroupConfig[column.title]: ", formGroupConfig[column.title]);
    }

    console.log("formGroupConfig: ", formGroupConfig);
    this.dynamicForm = this.formBuilder.group(formGroupConfig);
  }

  updateData(data: any){
    console.log("submited data: ", data);
    data.requestType = 'update';
    data.channelType = this.selectedChannel?.id
    data.userId = this.user_id;
    console.log("submited data: ", data);


    this.loadingData = true;
    this.httpService.updateComplianceTableData(data).subscribe(
      (data: any) => {
        const res: any = data;
        if (res) {
          this.toastr.success("Data Updated Successfully");
          this.childModal.hide();
          this.getData();
        }
        this.loadingData = false;
      },
      (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
        this.loadingData = false;
      }
    );

  }

  uploadComplianceData() {
    this.loadingData=true;
    let userId= localStorage.getItem("user_id")
    let userName= localStorage.getItem("user_name")
    this.httpService.uploadPtcFileData(this.excelFile,userId,userName).subscribe((data:string)=>{
      if(data.includes("not") || data.includes("Invalid")){
        this.toastr.error("File uploading status",data)
       }
       else{
        this.toastr.success("File uploading status",data);
       }
        this.loadingData=false;
        (<HTMLInputElement>document.getElementById('input-file-btn')).value = "";
        this.isSelected=true  
    },
  error=>{
    console.log(error);
    this.loadingData=false;
    this.toastr.error("Errors");
  })
    }
    
    onFileChange(event: any) {
     this.excelFile=event.target.files[0]
     this.isSelected=false
    }

      downloadAsExcelFile(): void {
       
          const workbook: XLSX.WorkBook = XLSX.utils.book_new();
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
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
      
