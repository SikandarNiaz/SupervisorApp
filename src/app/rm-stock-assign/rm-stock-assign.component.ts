import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/layout/dashboard/dashboard.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

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
  title = "Assign Stock";
  Products: any[] = [];
  Supervisors: any[] = [];
  StockDetail: any[] = [];
  filteredItems: any[] = [];
  loadingData: boolean;
  selectedSupervisor: any;
  rm_id: string;
  showForms: boolean = true;
  displayedColumns: string[] = ['id', 'title', 'quantity', 'date'];


  constructor(
    private dashboardService: DashboardService, 
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.rm_id = localStorage.getItem("user_id");
    this.gettingProducts();
    this.gettingSupervisors();
    this.gettingStockDetail();
  }

  openAssignStockModal() {
    this.AddStockModal.show();  // Make sure to include the parentheses
  }

  hideStockModal() {
    this.AddStockModal.hide();  // Make sure to include the parentheses
  }

 // Component TypeScript file
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


  gettingStockDetail() {
    this.dashboardService.gettingStockDetail().subscribe(
      (response: any[]) => {
        this.StockDetail = response.map((item) => ({
          id: item.stockLoadingId,
          title: item.title,
          quantity: item.quantity,
          userName: item.userName,
          date: new Date(item.visitDate),
          isEditing: false // Initialize editing state
        }));
        this.filteredItems = [...this.StockDetail];
        console.log('Formatted Stock Detail:', this.StockDetail);
      },
      (error) => {
        console.error('Error fetching stock details:', error);
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
}
