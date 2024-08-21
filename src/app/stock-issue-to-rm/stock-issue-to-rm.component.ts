import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/layout/dashboard/dashboard.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-stock-issue-to-rm',
  templateUrl: './stock-issue-to-rm.component.html',
  styleUrls: ['./stock-issue-to-rm.component.css']
})
export class StockIssueToRmComponent implements OnInit {
  @ViewChild('AddStockModal') AddStockModal: ModalDirective;

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2100, 0, 1);
  startDate = new Date();
  endDate = new Date();
  formType: string = 'DISTRIBUTION';
  specificDetails: any = null;
  selectedRegion: any;
  itemId: string;
  title = "RM Received";
  Products: any[] = [];
  Regions: any[] = [];
  Zones: any[] = [];
  Supervisors: any[] = [];
  StockDetail: any[] = [];
  StockDetail1: any[] = [];
  filteredItems: any[] = [];
  selectedZone: any;
  loadingData: boolean;
  selectedSupervisor: any;
  rm_id: string;
  showForms: boolean = false;
  id: string;
  visitDate: string;
  detail: any;
  displayedColumns: string[] = ['id', 'title', 'quantity', 'date'];


  constructor(
    private dashboardService: DashboardService, 
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.rm_id = localStorage.getItem("user_id");
    this.gettingProducts();
    this.getZone();
    this.gettingRmList();
        // this.gettingRmStockDetail();
        this.route.queryParams.subscribe(params => {
          const id = params['id'];
          const visitDate = params['visitDate'];
         
          if (id && visitDate) {
            this.fetchSpecificDetails(id, visitDate,this.formType);
          } else {
            // this.gettingRmStockDetail();  // Fetch stock details when there's no specific ID
          }
        });
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
    this.dashboardService.gettingRmStockDetail(obj).subscribe(
      (response: any[]) => {
        this.StockDetail1 = response.map((item) => ({
          id: item.stockLoadingId,
          title: item.title,
          quantity: item.quantity,
          userName: item.userName,
          date: moment(item.startTime).format('DD-MM-YYYY h:mm A'),
          isEditing: false // Initialize editing state
        }));
        this.filteredItems = [...this.StockDetail1];
        this.showForms = true; 
        console.log('Formatted Stock Detail:', this.StockDetail);
      },
      (error) => {
        console.error('Error fetching stock details:', error);
        this.showForms = false; 
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
  fetchSpecificDetails(id: number, visitDate: string,formType: string): void {
    console.log("formType:", formType);
    this.dashboardService.getRmSpecificDetail(id,visitDate,formType).subscribe(
      (response: any[] | null) => {
        if (response) {
          this.StockDetail = response.map((item) => ({
            id: item.stockLoadingId,
            title: item.title,
            quantity: item.quantity,
            userName: item.userName,
            date: moment(item.startTime).format('YYYY-MM-DD h:mm A'),
            isEditing: false // Initialize editing state
          }));
          this.filteredItems = [...this.StockDetail]; 
          this.showForms = true; // Update filteredItems
          console.log("Fetched Data:", this.StockDetail);
        } else {
          console.error('No data returned from fetchSpecificDetails');
          this.StockDetail = [];
          this.filteredItems = [];
          this.showForms = false; 
        }
      },
      (error) => {
        console.error('Error fetching specific details:', error);
        this.StockDetail = [];
        this.filteredItems = [];
      }
    );
  }

  assignStock() {
    const formData = new FormData();
    formData.append('startDate', moment(this.startDate).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('endDate', moment(this.endDate).format('YYYY-MM-DD HH:mm:ss'));
    const supervisorId = this.selectedSupervisor ? this.selectedSupervisor : -1;
    formData.append('supervisorId', supervisorId.toString());
    formData.append('form_type', 'DISTRIBUTION');
    formData.append('user_id', this.rm_id);
    formData.append('entry_type', 'WEB');
    formData.append('user_type', 'DISTRIBUTION');
    

    this.Products.forEach(product => {
      if (product.id && product.brandId !== undefined && product.quantity !== undefined) {
        formData.append(`products[${product.id}].brandId`, product.brandId.toString());
        formData.append(`products[${product.id}].quantity`, product.quantity.toString());
      } else {
        console.error('Product properties are undefined:', product);
      }
    });

    console.log('FormData:', formData);

    this.dashboardService.assignRmStock(formData).subscribe(
      (response) => {
        console.log('Stock assigned successfully', response);
        this.toastr.success('Stock assigned successfully');
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
    this.gettingRmStockDetail(); // Refresh stock details to revert changes
  }

  resetForm() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.selectedSupervisor = null;
    this.Products.forEach(product => product.quantity = 0);
  }
  
}
