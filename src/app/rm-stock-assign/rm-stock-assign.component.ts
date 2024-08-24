import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/layout/dashboard/dashboard.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-rm-stock-assign',
  templateUrl: './rm-stock-assign.component.html',
  styleUrls: ['./rm-stock-assign.component.css']
})
export class RmStockAssignComponent implements OnInit {
  @ViewChild('AddStockModal') AddStockModal: ModalDirective;

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2100, 0, 1);
  startDate = new Date();
  endDate = new Date();
  formType: string = 'STOCK';
  specificDetails: any = null;
  itemId: string;
  title = "Supervisor Received";
  selectedRegion: any;
  Regions: any[] = [];
  Zones: any[] = [];
  Products: any[] = [];
  Supervisors: any[] = [];
  StockDetail: any[] = [];
  StockDetail1: any[] = [];
  filteredItems: any[] = [];
  loadingData: boolean;
  selectedZone: any;
  selectedSupervisor: any;
  rm_id: string;
  showForms: boolean = false;
  id: string;
  visitDate: string;
  detail: any;
  displayedColumns: string[] = ['id', 'title', 'quantity', 'date'];
  sortBy: string = '';  // Field to sort by
  sortOrder: boolean = true;


  constructor(
    private dashboardService: DashboardService, 
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.rm_id = localStorage.getItem("user_id");
    this.gettingProducts();
    this.gettingSupervisors();
    this.getZone();
    
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const visitDate = params['visitDate'];
     
      if (id && visitDate) {
        this.fetchSpecificDetails(id, visitDate,this.formType);
      } else {
        // this.gettingStockDetail();  // Fetch stock details when there's no specific ID
      }
    });
  }
  sortIt(key: string) {
    this.sortBy = key;
    this.sortOrder = !this.sortOrder;

    const compare = (a: any, b: any) => {
      const isAsc = this.sortOrder;
      if (a[key] < b[key]) return isAsc ? -1 : 1;
      if (a[key] > b[key]) return isAsc ? 1 : -1;
      return 0;
    };

    this.filteredItems.sort(compare);
    this.StockDetail.sort(compare);
  }

  openAssignStockModal() {
    this.AddStockModal.show();  // Make sure to include the parentheses
  }

  hideStockModal() {
    this.AddStockModal.hide();  // Make sure to include the parentheses
  }
  gettingStockDetail() {
    // Define the filter object based on the current state
    const obj = {
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      endDate: moment(this.endDate).format('YYYY-MM-DD'),
      supervisorId: this.selectedSupervisor ? this.selectedSupervisor : -1,
      zoneId: this.selectedZone ? this.selectedZone : -1,
      regionId: this.selectedRegion ? this.selectedRegion : -1
    };
  
    // Pass the filterCriteria object to the service method
    this.dashboardService.gettingStockDetail(obj).subscribe(
      (response: any[]) => {
        // Map and format the response data
        this.StockDetail1 = response.map((item) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          userName: item.userName,
          date: moment(item.visit_date).format('YYYY-MM-DD h:mm A'),
          isEditing: false // Initialize editing state
        }));
        this.filteredItems = [...this.StockDetail1];
        this.showForms = true; // Show the details section
        console.log('Formatted Stock Detail:', this.StockDetail1);
      },
      (error) => {
        console.error('Error fetching stock details:', error);
        this.showForms = false; // Optionally hide the details section on error
      }
    );
  }
  
  

  gettingProducts() {
    this.dashboardService.gettingProducts().subscribe(
      (response: any[]) => {
        this.Products = response.map((item) => ({
          id: item.id,
          brandId: item.brandId,
          quantity: item.quantity || 0,
          title: item.title
        }));
        console.log('Products:', this.Products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  assignStock() {
    const formData = new FormData();
    formData.append('startDate', moment(this.startDate).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('endDate', moment(this.endDate).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('supervisorId', this.selectedSupervisor);
    formData.append('form_type', 'STOCK');
    formData.append('user_type', 'RM');
    formData.append('entry_type', 'WEB');
    formData.append('user_id', this.rm_id);

    this.Products.forEach(product => {
      if (product.id && product.brandId !== undefined && product.quantity !== undefined) {
        formData.append(`products[${product.id}].brandId`, product.brandId.toString());
        formData.append(`products[${product.id}].quantity`, product.quantity.toString());
      } else {
        console.error('Product properties are undefined:', product);
      }
    });

    console.log('FormData:', formData);

    this.dashboardService.assignStock(formData).subscribe(
      (response) => {
        console.log('Stock assigned successfully', response);
        this.toastr.success('Stock assigned successfully');
        this.resetForm();
        this.hideStockModal();
        this.gettingStockDetail(); 
      },
      (error) => {
        console.error('Error assigning stock', error);
      }
    );
  }
  gettingSupervisors() {
    this.dashboardService.gettingSupervisors().subscribe(
      (response: any[]) => {
        this.Supervisors = response.map((item) => ({ id: item.id, name: item.fullName }));
        this.Supervisors.unshift({ id: -1, name: 'All' });
        console.log('Supervisors:', this.Supervisors);
      },
      (error) => {
        console.error('Error fetching supervisors:', error);
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

  startEditing(item: any): void {
    item.isEditing = true;
  }

  updateItem(item: any): void {
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
    this.gettingStockDetail(); // Refresh stock details to revert changes
  }

  resetForm() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.selectedSupervisor = null;
    this.Products.forEach(product => product.quantity = 0);
  }
  fetchSpecificDetails(id: number, visitDate: string, formType: string): void {
    console.log("formType:", formType);
    this.dashboardService.getSpecificDetail(id, visitDate, formType).subscribe(
      (response: any[] | null) => {
        if (response) {
          this.StockDetail = response.map((item) => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            userName: item.userName,
            date: moment(item.startTime).format('YYYY-MM-DD h:mm A'),
            isEditing: false // Initialize editing state
          }));
          this.filteredItems = [...this.StockDetail]; // Update filteredItems
          this.showForms = true; // Show the details section
          console.log("Fetched Data:", this.StockDetail);
        } else {
          console.error('No data returned from fetchSpecificDetails');
          this.StockDetail = [];
          this.filteredItems = [];
          this.showForms = false; // Optionally hide the details section if no data
        }
      },
      (error) => {
        console.error('Error fetching specific details:', error);
        this.StockDetail = [];
        this.filteredItems = [];
        this.showForms = false; // Optionally hide the details section on error
      }
    );
  }  
  
}
