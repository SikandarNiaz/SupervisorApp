import { Component, OnInit, ViewChild,ElementRef, TemplateRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/layout/dashboard/dashboard.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-stock-audit-layer',
  templateUrl: './stock-audit-layer.component.html',
  styleUrls: ['./stock-audit-layer.component.css']
})
export class StockAuditLayerComponent implements OnInit {
  @ViewChild('AddStockModal') AddStockModal: ModalDirective;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2100, 0, 1);
  startDate = new Date();
  endDate = new Date();
  formType: string = 'STOCK_VARIANCE';
  specificDetails: any = null;
  itemId: string;
  Zones: any[] = [];
  selectedZone: any;
  amount: number;
  voucherImage: File | null = null;
  title = "STOCK VARIANCE";
  Products: any[] = [];
  Supervisors: any[] = [];
  StockDetail: any[] = [];
  StockDetail1: any[] = [];
  filteredItems: any[] = [];
  loadingData: boolean;
  selectedSupervisor: any;
  Regions: any[] = [];
  rm_id: string;
  showForms: boolean = false;
  id: string;
  visitDate: string;
  detail: any;
  sortBy: string = 'id';  // Default sort column
  sortOrder: boolean = true;
  displayedColumns: string[] = ['id', 'title', 'quantity', 'date'];


  constructor(
    private dashboardService: DashboardService, 
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.rm_id = localStorage.getItem("user_id");
    this.gettingProducts();
    this.gettingRmList();
    // this.gettingRmStockDetail();  

    // this.route.queryParams.subscribe(params => {
    //   const id = params['id'];
    //   const visitDate = params['visitDate'];
    //   if (id && visitDate) {
    //     this.fetchSpecificDetails(id, visitDate,this.formType);
    //   } else {
        
    //   }
    // });
  }
  sortByField(field: string): void {
    this.sortBy = field;
    this.sortOrder = !this.sortOrder; // Toggle between ascending and descending

    const compare = (a: any, b: any) => {
      const isAsc = this.sortOrder;
      if (a[field] < b[field]) return isAsc ? -1 : 1;
      if (a[field] > b[field]) return isAsc ? 1 : -1;
      return 0;
    };

    // Apply sorting to both filteredItems and specificDetails
    this.filteredItems.sort(compare);
    this.specificDetails.sort(compare);
  }
  openAssignStockModal() {
    this.AddStockModal.show();  // Make sure to include the parentheses
  }

  hideStockModal() {
    this.AddStockModal.hide();  // Make sure to include the parentheses
  }
  gettingRmList() {
    this.dashboardService.gettingRmList().subscribe(
      (response: any[]) => {
        this.Supervisors = response.map((item) => ({ id: item.id, name: item.fullName }));
        this.Supervisors.unshift({ id: -1, name: 'All' });
        console.log('RmList:', this.Supervisors);
      },
      (error) => {
        console.error('Error fetching Rm:', error);
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


  gettingRmStockDetail() {
    const obj = {
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      endDate: moment(this.endDate).format('YYYY-MM-DD'),
      supervisorId: this.selectedSupervisor ? this.selectedSupervisor : -1,
      // zoneId: this.selectedZone ? this.selectedZone : -1,
      // regionId: this.selectedRegion ? this.selectedRegion : -1
    };
    this.dashboardService.gettingReturnStockAuditDetail(obj).subscribe(
      (response: any[]) => {
        this.StockDetail1 = response.map((item) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          userName: item.userName,
          visitDate: moment(item.date).format('YYYY-MM-DD'),
          date: moment(item.visit_date).format('YYYY-MM-DD'),
          isEditing: false // Initialize editing state
        }));
        this.filteredItems = [...this.StockDetail1];
        this.showForms = true; 
        console.log('Formatted Stock Detail:', this.StockDetail1);
      },
      (error) => {
        console.error('Error fetching stock details:', error);
        this.showForms = false; 
      }
    );
  }
  // fetchSpecificDetails(id: number, visitDate: string,formType: string): void {
  //   console.log("formTyep",formType)
  //   this.dashboardService.getRmSpecificDetail(id,visitDate,formType).subscribe(
  //     (response: any[] | null) => {
  //       if (response) {
  //         this.StockDetail = response.map((item) => ({
  //           id: item.stockLoadingId,
  //           title: item.title,
  //           quantity: item.quantity,
  //           userName: item.userName,
  //           visitDate: moment(item.date).format('YYYY-MM-DD'),
  //           date: moment(item.startTime).format('YYYY-MM-DD h:mm A'),
  //           isEditing: false // Initialize editing state
  //         }));
  //         this.filteredItems = [...this.StockDetail];
  //         this.showForms = true; // Update filteredItems
  //         console.log("Fetched Data:", this.StockDetail);
  //       } else {
  //         console.error('No data returned from fetchSpecificDetails');
  //         this.StockDetail = [];
  //         this.filteredItems = [];
  //         this.showForms = false;
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching specific details:', error);
  //       this.StockDetail = [];
  //       this.filteredItems = [];
  //     }
  //   );
  // }
  gettingProducts() {
    this.dashboardService.gettingProducts().subscribe(
      (response: any[]) => {
        this.Products = response.map((item) => ({
          id: item.id,
          brandId: item.brandId,
          quantity: item.quantity,
          title: item.title
        }));
        console.log('Products:', this.Products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  returnStock() {
    // if (!this.selectedSupervisor) {
    //   this.toastr.error('Please select a supervisor.', 'Error', {
    //     timeOut: 3000,
    //     positionClass: 'toast-top-center'
    //   });
    //   return;
    // }
    const formData = new FormData();
    formData.append('startDate', moment(this.startDate).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('endDate', moment(this.endDate).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('supervisorId', this.selectedSupervisor || '-1');
    formData.append('form_type', 'STOCK_VARIANCE');
    formData.append('user_id', this.rm_id || ''); 
    formData.append('file_type', 'IMAGE');
    formData.append('entry_type', 'WEB');
    formData.append('user_type', 'VARIANCE');
    
    // Ensure amount has a default value of 0 if not defined
    formData.append('amount', (this.amount || 0).toString());
    
    if (this.voucherImage) {
        formData.append('voucherImage', this.voucherImage); 
    }
  
    this.Products.forEach(product => {
        if (product.id && product.brandId !== undefined && product.quantity !== undefined) {
            formData.append(`products[${product.id}].brandId`, product.brandId.toString());
            formData.append(`products[${product.id}].quantity`, (product.quantity || 0).toString());
            // Ensure lost has a default value of 0 if not defined
            formData.append(`products[${product.id}].lost`, (product.lost || 0).toString());
        } else {
            console.error('Product properties are undefined:', product);
        }
    });
    console.log('FormData:', formData);
    this.dashboardService.returnStockAudit(formData).subscribe(
      (response) => {
        console.log('Stock returned successfully', response);
        this.toastr.success('Stock returned successfully');
        this.resetForm();
        this.hideStockModal();
        this.gettingRmStockDetail(); 
      },
      (error) => {
        console.error('Error assigning stock', error);
      }
    );
  }

  startEditing(item: any): void {
    item.isEditing = true;
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files.length > 0) {
      this.voucherImage = input.files[0];
    }
  }
  updateItem(item: any): void {
    debugger;
    item.isEditing = false;
    const obj = {
      stockLoadingId: item.id,
      quantity: item.quantity
    };

    this.dashboardService.updateAssignedProduct(obj).subscribe(
      (response) => {
        console.log('Product updated successfully', response);
        this.toastr.success('Stock updated successfully');
      },
      (error) => {
        console.error('Error updating product', error);
      }
    );
  }

  cancelEdit(item: any): void {
    item.isEditing = false;
    // Optionally revert changes if needed
    this.gettingRmStockDetail(); // Refresh stock details to revert changes
  }

  resetForm() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.selectedSupervisor = null;
    this.Products.forEach(product => {
      product.quantity = '';
      product.lost = ''; 
    });
    this.voucherImage = null; 
    this.amount = 0;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  
}

