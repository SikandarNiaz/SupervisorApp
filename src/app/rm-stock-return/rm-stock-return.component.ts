import { Component, OnInit, ViewChild, ElementRef ,TemplateRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/layout/dashboard/dashboard.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-rm-stock-return',
  templateUrl: './rm-stock-return.component.html',
  styleUrls: ['./rm-stock-return.component.css']
})
export class RmStockReturnComponent implements OnInit {
  @ViewChild('AddStockModal') AddStockModal: ModalDirective;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2100, 0, 1);
  startDate = new Date();
  endDate = new Date();
  title = "Return Stock";
  quantity: number;
  price:number;
  formType: string = 'RETURN';
  amount: number;
  lost: number;
  Products: any[] = [];
  Supervisors: any[] = [];
  StockDetail: any[] = [];
  filteredItems: any[] = [];
  loadingData: boolean;
  selectedSupervisor: any;
  rm_id: string;
  visitDate: string;
  showForms: boolean = true;
  displayedColumns: string[] = ['id', 'title', 'quantity', 'date'];
  voucherImage: File | null = null;

  constructor(
    private dashboardService: DashboardService, 
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    
   }

  ngOnInit(): void {
    this.rm_id = localStorage.getItem("user_id");
    this.gettingProducts();
    this.gettingSupervisors();
    
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const visitDate = params['visitDate'];
      if (id && visitDate) {
        this.fetchSpecificDetails(id, visitDate,this.formType);
      } else {
        this.gettingStockDetail1();  // Fetch stock details when there's no specific ID
      }
    });
  }

  openAssignStockModal() {
    this.AddStockModal.show();  // Make sure to include the parentheses
  }

  hideStockModal() {
    this.AddStockModal.hide();  // Make sure to include the parentheses
  }

  gettingSupervisors() {
    this.dashboardService.gettingSupervisors().subscribe(
      (response: any[]) => {
        this.Supervisors = response.map((item) => ({ id: item.id, name: item.fullName }));
        // Add "All" option here
        this.Supervisors.unshift({ id: -1, name: 'All' });
        console.log('Supervisors:', this.Supervisors);
      },
      (error) => {
        console.error('Error fetching supervisors:', error);
      }
    );
  }
  

  gettingStockDetail1() {
    this.dashboardService.gettingStockDetail1().subscribe(
      (response: any[]) => {
        this.StockDetail = response.map((item) => ({
          id: item.stockLoadingId,
          title: item.title,
          quantity: item.quantity,
          userName: item.userName,
          date: moment(item.startTime).format('YYYY-MM-DD h:mm A'),
          isEditing: false 
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
    if (!this.selectedSupervisor) {
      this.toastr.error('Please select a supervisor.', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
      return;
    }
    const formData = new FormData();
    formData.append('startDate', moment(this.startDate).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('endDate', moment(this.endDate).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('supervisorId', this.selectedSupervisor || ''); 
    formData.append('form_type', 'RETURN');
    formData.append('user_id', this.rm_id || ''); 
    formData.append('file_type', 'IMAGE');
    
    // Ensure amount has a default value of 0 if not defined
    formData.append('amount', (this.amount || 0).toString());
    
    if (this.voucherImage) {
        formData.append('voucherImage', this.voucherImage); 
    }
  
    this.Products.forEach(product => {
        if (product.id && product.brandId !== undefined && product.quantity !== undefined) {
            formData.append(`products[${product.id}].brandId`, product.brandId.toString());
            formData.append(`products[${product.id}].quantity`, product.quantity.toString());
            // Ensure lost has a default value of 0 if not defined
            formData.append(`products[${product.id}].lost`, (product.lost || 0).toString());
        } else {
            console.error('Product properties are undefined:', product);
        }
    });
    console.log('FormData:', formData);
    this.dashboardService.returnStock(formData).subscribe(
      (response) => {
        console.log('Stock returned successfully', response);
        this.toastr.success('Stock returned successfully');
        this.resetForm();
        this.hideStockModal();
        this.gettingStockDetail1(); 
      },
      (error) => {
        console.error('Error assigning stock', error);
      }
    );
  }
  
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files.length > 0) {
      this.voucherImage = input.files[0];
    }
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
    this.gettingStockDetail1(); // Refresh stock details to revert changes
  }

  resetForm() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.selectedSupervisor = null;
    this.Products.forEach(product => {
      product.quantity = 0;
      product.lost = 0; 
    });
    this.voucherImage = null; 
    this.amount = 0;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  fetchSpecificDetails(id: number, visitDate: string,formType: string): void {
    console.log("formTyep",formType)
    this.dashboardService.getSpecificDetail(id,visitDate,formType).subscribe(
      (response: any[] | null) => {
        if (response) {
          this.StockDetail = response.map((item) => ({
            id: item.stockLoadingId,
            title: item.title,
            quantity: item.quantity,
            userName: item.userName,
            date: new Date(item.visitDate),
            isEditing: false // Initialize editing state
          }));
          this.filteredItems = [...this.StockDetail]; // Update filteredItems
          console.log("Fetched Data:", this.StockDetail);
        } else {
          console.error('No data returned from fetchSpecificDetails');
          this.StockDetail = [];
          this.filteredItems = [];
        }
      },
      (error) => {
        console.error('Error fetching specific details:', error);
        this.StockDetail = [];
        this.filteredItems = [];
      }
    );
  }
}
