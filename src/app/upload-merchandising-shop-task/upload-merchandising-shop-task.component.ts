import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../layout/dashboard/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DashboardDataService } from '../layout/dashboard/dashboard-data.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';


@Component({
  selector: 'app-upload-merchandising-shop-task',
  templateUrl: './upload-merchandising-shop-task.component.html',
  styleUrls: ['./upload-merchandising-shop-task.component.css']
})
export class UploadMerchandisingShopTaskComponent implements OnInit {

  shopList: any[];
  taskList: any[];
  file: any;
  fileInput: any;
  form: FormGroup;
  visitDate: any;
  loadingData: boolean;
  loadingModal: boolean;
  selectedShop: any;
  shopId:any;
  taskId:any;
  id:any;
  selectedTask: any;
  response: any = "";
  title: string = "Merchandising Shop Task";
  labels = {
    shopLabel: "Select Shop"
  };

  labels1 = {
    taskLabel: "Select Task"
  };
  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    private dataService: DashboardDataService,
    public formBuilder: FormBuilder
  ) {

    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  ngOnInit(): void {
    this.loadShops();
    this.loadTask();

    this.form = this.formBuilder.group({
      selectedShop: ['', Validators.required],
      selectedTask: ['', Validators.required],
      visitDate: ['', Validators.required],
      fileInput: [''] 
    });
  }
  clearLoading() {
    this.loadingData = false;
    this.loadingModal = false;
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      // Do not attempt to set the value of the file input field programmatically
      // Instead, you can directly access the selected file from the event
      const file = event.target.files[0];
      // Handle the file as needed, for example, you can store it in a variable or append it to the form data
      // For example:
      this.file = file;
    }
  }
  loadShops() {
    this.loadingModal = true;
    this.httpService
      .getActiveShops(-1, -1)
      .subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.shopList = res;

          } else {
            this.clearLoading();

            this.toastr.info(
              "Something went wrong,Please retry",
              "Connectivity Message"
            );
          };
          setTimeout(() => {
            this.loadingModal = false;
          }, 500);
        },
        (error) => {
          this.clearLoading();
        }
      );
  }
  loadTask() {
    this.loadingModal = true;
    this.httpService
      .getTask()
      .subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.taskList = res;

          } else {
            this.clearLoading();

            this.toastr.info(
              "Something went wrong,Please retry",
              "Connectivity Message"
            );
          };
          setTimeout(() => {
            this.loadingModal = false;
          }, 500);
        },
        (error) => {
          this.clearLoading();
        }
      );
  }
  uploadData() {
    // Create a new FormData object
    const formData = new FormData();
    // Append other form data as needed
    const shopData = {
      id: this.form.get("selectedShop").value.id,
      taskId: this.form.get("selectedTask").value.id,
      visitDate: this.extractDate(this.form.get("visitDate").value),
    };
    formData.append("shopData", JSON.stringify(shopData));
    
    // Check if a file is selected
    if (this.file) {
      // Append the selected file to the FormData object
      formData.append("fileInput", this.file, this.file.name);
      
      // Now you can proceed with uploading the data
      this.loadingData = true;
      console.log("info", formData);
      this.httpService.uploadmerchandisingShops(formData).subscribe((data) => {
        if  (data && data['success'] === 'true' && data['message'])  {
          this.response = data['message'];
          // You can remove this line if it's not needed:
          // this.response = data;
          if (this.response.length > 0) {
            this.loadingData = false;
            this.toastr.info(this.response, "Info");
            this.form.reset();
            // Reload shops and tasks
            this.loadShops();
            this.loadTask();
          }
        } else {
          this.loadingData = false;
          this.toastr.error("There is an error in your file!!");
        }
      });
    } else {
      // No file selected, display error message
      this.toastr.error("Please select a file to upload");
    }
  }


  extractDate(dateTimeString: string): string {
    // Convert the provided datetime string to a Date object
    const date = new Date(dateTimeString);
    // Get the date part only
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }


  loadTasks() {
    this.loadingModal = true;
    this.httpService
      .getActiveShops(-1, -1)
      .subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.shopList = res;

          } else {
            this.clearLoading();

            this.toastr.info(
              "Something went wrong,Please retry",
              "Connectivity Message"
            );
          };
          setTimeout(() => {
            this.loadingModal = false;
          }, 500);
        },
        (error) => {
          this.clearLoading();
        }
      );
  }
}
