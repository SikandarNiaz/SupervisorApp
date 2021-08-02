import { Component, OnInit,ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { DashboardService } from "../../dashboard.service";
import { environment } from "src/environments/environment";
import { ModalDirective } from "ngx-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-fields',
  templateUrl: './add-fields.component.html',
  styleUrls: ['./add-fields.component.scss']
})
export class AddFieldsComponent implements OnInit {
  @ViewChild("updateFieldValuesModal") updateFieldValuesModal: ModalDirective;
  tableData: any = [];
  selectedField:any=[];
  fieldvalueList: any=[]
  sortBy: "order_id";
  sortOrder = true;
  loadingData: boolean;
  loading = true;
  form: FormGroup;
  fieldValues: FormGroup;
  fieldsList: any=[];
  fieldsValueList: any=[];
  formfieldId: any[];
  formfieldId1: any[];
  fieldvaluesId: any[];
  type: any[];
  selectedFormData:any=[];
  selectedFormData1:any=[];
  LoadFormsDetail: any;
  selectedItem: any = {};
  operationType='';
  isUpdateRequest:boolean;
  formStatus: any = [
    { id: 1, value: "Y" },
    { id: 2, value: "N" },
  ];
  formStatus3: any = [
    { id: 1, value: "Y" },
    { id: 2, value: "N" },
  ];
  formStatus1: any = [
    { id: 1, value: "NORMAL" },
    { id: 2, value: "CHILD" },
  ];
  formStatus2: any = [
    { id: 1, value: "single_selection" },
    { id: 2, value: "multi_selection" },
    { id: 3, value: "switch_type" },
    { id: 4, value: "text_field" },
    { id: 5, value: "form" },
    { id: 6, value: "separator" },
    { id: 7, value: "form_value" },
    { id: 8, value: "multi_field_total"},
  ];
  params: any = {};
  selectedFieldValue:any={};

  constructor(
    private activeRoute: ActivatedRoute,
    private httpService: DashboardService,
    private toastr: ToastrService,
    public fb: FormBuilder,
    public fb1: FormBuilder
  ) {
    this.params = JSON.parse(localStorage.getItem("field"));
    this.form = fb.group({ 
      formId: new FormControl(""),
      formfieldId: new FormControl(""),
      fieldId: new FormControl(""),
      active: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
      form_field_type: new FormControl("", [Validators.required]),
      required: new FormControl("", [Validators.required]),
      field_type: new FormControl("", [Validators.required]),
      order_id: new FormControl("", [Validators.required]),

     });
     this.fieldValues = fb1.group({ 
      title: new FormControl("", [Validators.required]),
      order_id: new FormControl("", [Validators.required]),
      selected: new FormControl("", [Validators.required]),
      fieldvaluesId: new FormControl("",[Validators.required]),
      formfieldId: new FormControl(""),

     });
    //  this.activeRoute.queryParams.subscribe((p) => {
    //   console.log("active params", p);
    //   this.params = p;
    //   if (p.formfieldId) {
    //     this.getshowFormValuesDetail();
    //   }

    // });
   }

  ngOnInit() {
    this.loadingData = false;
    this.showFormDetail(this.params);
   // this.LoadFormValuesDetail();
    this.getshowFormValuesDetail();
    this.sortIt("order_id");
  }
  setSelectedItem(item) {
    this.selectedItem = item;
  }

  getshowFormValuesDetail() {
    const obj ={
      formfieldId: this.params.formfieldId,
      //fieldvaluesId:this.params.fieldvaluesId,
    }
    this.loading = true;
    this.httpService.getFieldValues(obj).subscribe(
      (data) => {
        // console.log(data);
        this.tableData = data;
        if (this.tableData.length === 0) {
          this.loading = false;
          this.loadingData = false;
          this.toastr.info("No record found.");
        }
        this.loading = false;
      },
      (error) => {
        this.toastr.info("There was some error extracting the Data.");
        this.loading = false;
      }
    );
  }

  showFormDetail(params): void {
    this.selectedFormData=params;
    this.form.patchValue({
      //fieldvaluesId:params.fieldvaluesId,
      formfieldId:params.formfieldId,
      formId:params.form_id,
      fieldId:params.field_id, 
     // contractAmount: forms.contract_amount,
      // startDate: params.start_date,
      // endDate: params.end_date,
      active: params.active,
      title: params.title,
      form_field_type:params.form_field_type,
      required: params.required,
      field_type: params.field_type,
      order_id: params.order_id,
    });
   // this.formDetail.show();
  }
  // hideFormDetailModal(): void {
  //   this.form.reset();
  //   this.formDetail.hide();
  // }

  // LoadFormValuesDetail() {
  //   this.loadingData = true;
  //   const obj = {
  //     // formId: this.selectedForms.id
  //     // ? this.selectedForms.id == -1
  //     //   ? localStorage.getItem("formId")
  //     //   : this.selectedForms.id
  //     // : localStorage.getItem("formId"),
  //     selectedField : this.selectedField.formfieldId,
  //   // regionId: this.selectedRegion.id
  //   //   ? this.selectedRegion.id == -1
  //   //     ? localStorage.getItem("regionId")
  //   //     : this.selectedRegion.id
  //   //   : localStorage.getItem("regionId"),
  //   //   evaluatorId: localStorage.getItem("user_id"),
  //   //   selectedSupervisor : this.selectedSupervisor.id || -1,
  //   //   selectedEvaluator: this.selectedEvaluator.id || -1,
  //   //   userTypeId: this.userTypeId,
  //   //   startDate: moment(this.startDate).format("YYYY-MM-DD"),
  //   //   endDate: moment(this.endDate).format("YYYY-MM-DD"),
  //   };

  //   this.httpService
  //     .getFieldValues(obj)
  //     .subscribe((data: any) => {
  //       // console.log('merchandiser list for evaluation',data);
  //       if (data) {
  //         this.fieldvalueList = data;
  //         this.loadingData = false;
  //       }
  //     });
  // }

  // gotoFieldValuesPage() {
  //  // localStorage.setItem('field',JSON.stringify(item));
  //   window.open(
  //     `${environment.hash}dashboard/Load_Field_values?formfieldId=${this.selectedFormData.id
  //     }`,
  //     "_blank"
  //   );
  // }

  updateFormData(postdata) {
    //if(formData.endDate>formData.startDate)
    {
   // this.loadingModalButton = true;
    const formData = new FormData();
    formData.append("title", postdata.title);
    formData.append("formfieldType", postdata.form_field_type);
    formData.append("required", postdata.required);
    formData.append("fieldType", postdata.field_type);
    formData.append("orderId", postdata.order_id);
    formData.append("active", postdata.active);
    formData.append("formfieldId", postdata.formfieldId);
    //formData.append("fieldvaluesId", postdata.fieldvaluesId);
    //formData.append("formId", data.form_id);
    //formData.append("fieldId", data.field_id);
    // if (formData.contractUrl != null && formData.contractUrl != "") {
    //   formData.append("contractUrl", this.image);
    // }
    this.httpService.updateFormFields(formData).subscribe((data: any) => {
      if (data.success == "true") {
       if(this.fieldsList.length>0){
         this.LoadFormsDetail();
       }
        this.toastr.success(data.message);
      } else {
        this.toastr.error(data.message, "Error");
      }
      //this.loadingModalButton = false;
      //this.hideFormDetailModal();
    });
  }
  // else{
  //   this.toastr.error("End Date Must be Greater Then or equal to Start Date", "Error");
  // }
  }
  getArrowType(key) {
    if (key === this.sortBy) {
      return this.sortOrder ? "arrow_upward" : "arrow_downward";
    } else {
      return "";
    }
  }
  sortIt(key) {
    this.sortBy = key;
    this.sortOrder = !this.sortOrder;
  }
  showInsertModal(){0
    this.isUpdateRequest=false;
    this.operationType="Create";
    this.fieldValues.patchValue({
      formfieldId:this.params.formfieldId,
      fieldvaluesId:-1,
    });
    this.updateFieldValuesModal.show();
  }

  showFeildValuesModal(fieldValues): void {
    this.operationType="Update";
    this.isUpdateRequest=true
      this.selectedFormData1=fieldValues;
      this.fieldValues.patchValue({
        // formfieldId:forms.id,
        // formId:forms.form_id,
        // fieldId:forms.field_id, 
       // contractAmount: forms.contract_amount,
         title: fieldValues.title,
         order_id: fieldValues.order_id,
         selected: fieldValues.selected,
         fieldvaluesId: fieldValues.id,
      });
      this.updateFieldValuesModal.show();
    }
    hideFieldValuesModal(): void {
      this.fieldValues.reset();
      this.updateFieldValuesModal.hide();
    }

    updateFieldValuesData(postdata) {
        //if(formData.endDate>formData.startDate)
        {
       // this.loadingModalButton = true;
        const formData = new FormData();
        formData.append("title", postdata.title);
        formData.append("orderId", postdata.order_id);
        formData.append("selected", postdata.selected);
        formData.append("fieldvaluesId", postdata.fieldvaluesId);
        //formData.append("formId", data.form_id);
        //formData.append("fieldId", data.field_id);
        // if (formData.contractUrl != null && formData.contractUrl != "") {
        //   formData.append("contractUrl", this.image);
        // }
        this.httpService.updateFieldValues(formData).subscribe((data: any) => {
          if (data.success == "true") {
           if(this.fieldsValueList.length>0){
            // this.LoadFormsDetail();
           }
            this.toastr.success(data.message);
            this.hideFieldValuesModal();
            this.getshowFormValuesDetail();
          } else {
            this.toastr.error(data.message, "Error");
          }
          // this.loadingModalButton = false;
          // this.hideFormDetailModal();
        });
      }
      // else{
      //   this.toastr.error("End Date Must be Greater Then or equal to Start Date", "Error");
      // }
      }

      insertFieldValuesData(postdata) {
        //this.loadingModalButton = true;
        const formData = new FormData();
        //formData.append("formData", JSON.stringify(data));
        formData.append("title", postdata.title);
        formData.append("orderId", postdata.order_id);
        formData.append("selected", postdata.selected);
        formData.append("formfieldId", postdata.formfieldId);
        const url="add-field-values";
        this.httpService.insertFieldValues(formData, url).subscribe((data: any) => {
          if (data.success == "true") {
            this.toastr.success(data.message);
            // if(this.selectedChannel.id){
            // this.getChillerList();
            // }
            this.hideFieldValuesModal();
            this.getshowFormValuesDetail();
          } else {
            this.toastr.error(data.message, "Error");
          }
         // this.loadingModalButton = false;
        });
      }

}
function data(data: any): string | Blob {
  throw new Error('Function not implemented.');
}

