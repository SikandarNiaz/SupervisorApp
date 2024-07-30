import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/layout/dashboard/dashboard.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rm-stock-assign',
  templateUrl: './rm-stock-assign.component.html',
  styleUrls: ['./rm-stock-assign.component.css']
})
export class RmStockAssignComponent implements OnInit {

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2100, 0, 1);
  startDate = new Date();
  endDate = new Date();
  title = "Assign Stock";
  Products: any[];
  assignedProducts: any[] = [];
  Brands: any[]; // Array to hold brands with quantity
  Supervisors: any[]; // Array to hold supervisors
  loadingData: boolean;
  selectedBrand: any; // Variable to store selected brand
  selectedSupervisor: any; // Variable to store selected supervisor
  rm_id: string; // Variable to store the user_id

  constructor(private dashboardService: DashboardService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.rm_id = localStorage.getItem("user_id"); // Retrieve user_id from localStorage
    this.gettingProducts(); // Fetch products on component initialization
    this.gettingSupervisors(); // Fetch supervisors on component initialization
  }
  

  gettingSupervisors() {
    this.dashboardService.gettingSupervisors().subscribe(
      (response: any[]) => {
        this.Supervisors = response.map((item) => ({ id: item.id, name: item.fullName }));
        console.log(this.Supervisors, 'Supervisors');
      },
      (error) => {
        console.log(error, 'error');
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
        console.log(this.Products, 'Products');
      },
      (error) => {
        console.log(error, 'error');
      }
    );
  }

  assignStock() {
    const formData = new FormData();

    // Include date and time in the startDate and endDate fields
    formData.append('startDate', moment(this.startDate).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('endDate', moment(this.endDate).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('supervisorId', this.selectedSupervisor);

    // Add form_type field
    formData.append('form_type', 'STOCK');

    // Add user_id to the form data
    formData.append('user_id', this.rm_id);

    this.Products.forEach(product => {
      // Ensure product.id, product.brandId, and product.quantity are defined
      if (product.id && product.brandId !== undefined && product.quantity !== undefined) {
        formData.append(`products[${product.id}].brandId`, product.brandId.toString());
        formData.append(`products[${product.id}].quantity`, product.quantity.toString());
      } else {
        console.error('Product properties are undefined:', product);
      }
    });

    // Log or pass the formData to a service method
    console.log(formData);

    this.dashboardService.assignStock(formData).subscribe(
      (response) => {
        console.log('Stock assigned successfully', response);
        
        // Show success toast notification
        this.toastr.success('Stock assigned successfully');
        this.assignedProducts = [...this.Products];

        // Reset form fields to default values
        this.resetForm();
      },
      (error) => {
        console.error('Error assigning stock', error);
      }
    );
  }
  onQuantityChange(product) {
    console.log("Product:", product)
    // Call your service method to update the assigned product
    this.dashboardService.updateAssignedProduct(product).subscribe(
      (response) => {
        console.log('Product updated successfully', response);
        
        // Show success toast notification
        this.toastr.success('Product updated successfully');
      },
      (error) => {
        console.error('Error updating product', error);
      }
    );
  }
  resetForm() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.selectedSupervisor = null;
    // this.Products.forEach(product => product.quantity = 0);
  }
}
