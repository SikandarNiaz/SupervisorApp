import { Component, AfterViewInit, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/layout/dashboard/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { id } from 'date-fns/locale';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-new-screen',
  templateUrl: './new-screen.component.html',
  styleUrls: ['./new-screen.component.css']
})
export class NewScreenComponent  implements OnInit {
  objg = []; // Your initial data
  objr = []; // Your initial data for first level child
  objp = [];
  noramlFormFieldId: any;
  childdFormValueId:any;
  formValueIdAtIndex0:any;
  childdFormFieldId:any;
  ffDataType;
  // objr:any;
  // objp:any;
  selectedFormId:any;
  fieldValueId: any;
  gotoFormFieldId: any;
  gotoFieldID: any;
  selectedField: any;
  childObj:any;
  propFormTitle: any;
  propFieldTitle: any;
  obj: any;
  formSubmit:any;
  textFieldType:any;
  selectedAction: string = 'exit';
  selectedFormId1: string = '-1';
  dateValue:any
  searchQuery: string = '';
  defaultFields: any
  toggelView: boolean = false;
  glow:boolean=false;
  formsid: any;
  // @ViewChild('formslistModal') formslistModal: ModalDirective;
  // @ViewChild('ExtraModal') ExtraModal: ModalDirective;
  @ViewChild('submitForm') submitForm: ModalDirective;
  @ViewChild('CaptureModal') CaptureModal: ModalDirective;
  @ViewChild('FvModal') FvModal: ModalDirective;
  @ViewChild('AddModal') AddModal: ModalDirective;
  @ViewChild('AddNewFeildModal') AddNewFeildModal: ModalDirective;
  @ViewChild('AddModalSample') AddModalSample: ModalDirective; 
 
  // @ViewChild('FieldPropertiesModal') FieldPropertiesModal: ModalDirective;  AddModalSample
  @ViewChild('FormPropertiesModal') FormPropertiesModal: ModalDirective;
  @ViewChild('logicModal') logicModal: ModalDirective;
 
  brandID: any;
  moveOrExit: string = '';
  child:boolean=false;
  campaingId: any;
  loadingdata: Boolean = false;
  fvti: String;
  isTextType: boolean = false;
  showForms: boolean = false;
  item: any;
  op: any;
  dataType:any;
  a: any;
  tog :boolean = false ;
  selectedCampaignId: any;
  selectedBrandId: any;
  Campaigns: any;
  Brands: any;
  fieldTitle: String;
  showData: true;
  naam: String;
  nextorder: any
  loadingData: boolean;
  itemForFv: any;
  formid: any;
  logicFields: any;
  newfeildtype: String;
  newFieldtitle: String;
  hoveredRowIndex: any;
  ratingValueToSend: any;
  // fieldOptions: string[] = [
  //   'text_field',
  //   'single_selection',
  //   'multi_selection',
  //   'date',
  //   'rating',
  //   'multi_text',
  //   'exist_question',
  //   'form',
  //   'image'
  // ];
  // fieldOptions:any;
  formtypes: any;
  
  ff: any;
  
  formtitle: any;
  submitFormFieldId:any;
  ql: any;
  
  ffid: any;
  title: String = 'SELECT OR CREATE NEW FORM';
  ft: String; //forgettingnewform
  fty: String;//forgettingnewform
  newformobj2: { id: any; title: any; };
  // options: any[] = [];
  options: { value: string }[] = [];
  fieldOptions: { fieldType: string }[] = [];
  numberOfOptions: number = 0;
  objq: any[];
  
  rating: any;
  ratingValue: any = 5;
  orderId:any = 1;
  lastOrderID: any;
    selectedFormType: any;
  formProperties: FormGroup;
  fieldProperties: FormGroup;
  logicProperties: FormGroup;
  formFieldId: any;
  selectedFormTitle: string = '';
  list: any[] = ['single_selection', 'multi_selection'];

  constructor(
    private toaster: ToastrService,
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.formProperties = this.fb.group({
      formType: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      brandId: ['', Validators.required],
      campaignId: ['', [Validators.required]],
      id: ['', [Validators.required]]
    });
    this.fieldProperties = this.fb.group({
      minLength: ['', Validators.required],
      fieldLength: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(50)]], // Remove the extra comma here
      fieldType: ['', Validators.required],
      id: ['', Validators.required],
      // formId: ['', Validators.required]
    });
    this.logicProperties = this.fb.group({
      formFieldId: ['', Validators.required],
      fieldValueId: ['', Validators.required],
      gotoFormFieldId: ['', Validators.required],
      gotoFieldId: ['', Validators.required],
    });
  }

  resetModalValues() {
    this.newFieldtitle = ''; // Reset newFieldtitle
    this.newfeildtype = ''; // Reset newfeildtype
    this.ratingValue = null; // Reset ratingValue
    this.numberOfOptions = null; // Reset numberOfOptions
    this.options = [];
     // Reset options
  }

  resetAddModalValues(): void {
    this.ft = '';
    this.selectedFormType = '';
    this.selectedCampaignId = null;
    this.selectedBrandId = null;
  }

  ngOnInit(): void {
    this.showForms = true;
    // this.showFormProperties;
    this.getformslist();
    this.gettingBrands();
    this.gettingCompaign();
    this.gettingFormTypes();
    this.gettingFieldDataTypes();
  }
  // gettingFormTypes() {
  //   this.dashboardService.gettingFormTypes().subscribe(
  //     (response: any[]) => {
  //       this.formtypes = response.map((item) => ({ ...item }));
  //       console.log(this.formtypes, 'habshi')
  //     },
  //     (error) => {
  //       console.log(error, 'error');
  //     }
  //   );
  // }
  gettingFormTypes() {
    this.dashboardService.gettingFormTypes().subscribe(
      (response: any[]) => {
        this.formtypes = response.map((item) => ({ id: item.id, title: item.title }));
        console.log(this.formtypes, 'FormTypes');
      },
      (error) => {
        console.log(error, 'error');
      }
    );
  }

 
  gettingFieldDataTypes() {
    this.dashboardService.gettingFieldDataTypes().subscribe(
      (response: any[]) => {
        this.fieldOptions = response.map((item) => ({ fieldType: item.fieldType }));
        console.log(this.fieldOptions, 'FieldDataTypes');
      },
      (error) => {
        console.log(error, 'error');
      }
    );
  }
  gettingCompaign() {
    this.dashboardService.gettingCampaigns().subscribe(
      (response: any[]) => {
        this.Campaigns = response.map((item) => ({ ...item }));
        console.log(this.Campaigns, 'habshi')
      },
      (error) => {
        console.log(error, 'error');
      }
    );
  }
  gettingBrands() {
    this.dashboardService.gettingBrands().subscribe(
      (response: any[]) => {
        this.Brands = response.map((item) => ({ ...item }));
        console.log(this.Brands, 'habshi')
      },
      (error) => {
        console.log(error, 'error');
      }
    );
  }
  // get filteredItems() {
  //   return this.obj.filter(item =>
  //     item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
  //   );
  // }

  get filteredItems() {
    // Check if this.obj is defined before accessing its properties
    if (!this.obj) {
      return [];
    }
  
    return this.obj.filter(item =>
      item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  


  getformslist(): void {
    this.showForms=true;
    this.toggelView=false;
    this.dashboardService.getformslist().subscribe(
      (response: any[]) => {
        console.log(response, 'chauri');
        this.obj = response.map((item) => ({ ...item }));


        // Extract formvalue_orderids and formvalue_titles arrays
        const formvalueOrderidsArray = this.obj.formvalue_orderids;
        const formvalueTitlesArray = this.obj.formvalue_titles;

        console.log(formvalueOrderidsArray, 'formvalue_orderids');
        console.log(formvalueTitlesArray, 'formvalue_titles');
        this.loadingdata = true
      },
      (error) => {
        console.log(error, 'error');
      }
    );
  }
  // LOADING QUESTIONS
  getforminfo(selectedform: any): void {

    if (selectedform) {
      this.loadingData = true;

      this.title = selectedform.title;
      this.formid = selectedform.id;
      this.formtitle = selectedform.title;
      this.cdr.detectChanges();
      this.nextorder = selectedform.options + 2;
      // this.closeFormList();
    };
    console.log("selectedForm:", this.formid);
    console.log("selectedForm:", selectedform);
    console.log("selectedForm:", this.formtitle);

    const qdata = {
      formId: this.formid,

    }
    console.log("ConsoleFormId:", qdata)
    this.dashboardService.gettingeildsV2(qdata).subscribe(
      (response: any[]) => {
        console.log(response, 'qustions');
        this.ql = response.map((item) => ({ ...item }));
        this.loadingdata = true
        this.populateQLAndLastOrderID();
        this.showForms = false;
        this.toggelView = true;
        //  this.showForms = false;
      },
      (error) => {
        console.log(error, 'error');
      });
  }
  // LOADING VALUES OF FIELDS IF
  gettingFieldValue(data) {

    const objx = { formFieldId: data.formfieldid }
    this.fieldTitle = data.fieldtitle;
    this.formFieldId = data.formfieldid;
    console.log("abcd", this.fieldTitle)
    console.trace(data, 'data')
    console.log("data", data);
    
     this.ffDataType=data.field_type;
     console.log("vv", this.ffDataType)
    this.dashboardService.gettingFeildsvaluesV2(objx).subscribe(
      (response: any[]) => {


        console.log(response, 'questionvalues');
        this.ff = response.map((item) => ({ ...item }));
        this.loadingdata = true
        this.showFv();

      },
      (error) => {
        console.log(error, 'error');
      });



  }
  // ADDING NEW fORM
  addform() {

    console.log("Selected Brand ID:", this.selectedBrandId);
    console.log("Selected Campaign ID:", this.selectedCampaignId);

    console.log(this.ft, this.selectedFormType);
    this.formtitle = this.ft;
    const newform = {
      title: this.ft,
      type: this.selectedFormType,
      brandId: this.selectedBrandId,
      campaignId: this.selectedCampaignId
    };
    console.log("title", newform.title, "type", newform.type, "brandId", newform.brandId, "campaignId ", newform.campaignId);
    this.dashboardService.createNewForm(newform).subscribe(
      (response: any[]) => {

        // this.showForms=false;
        // Ensure response is an array and has at least one element
        if (Array.isArray(response) && response.length > 0) {
          const firstItem = response[0];

          const generatedKey = firstItem.generatedKey;
          this.newformobj2 = {
            id: generatedKey,
            title: this.ft
          };
          this.toaster.success('New Form Successfully added')
          console.log(this.newformobj2, "newwwwwww fooooooorm object");
          this.closeaddModal();
           this.getforminfo(this.newformobj2);
        }
      },
      (error) => {
        console.log(error, 'error');
        this.closeaddModal();
      }
    );

  }
  // ADDING NEW QUESTIONS
  addFields(): void {

    console.log("I'm clicked");

    // Extracting option values from the objects in the options array
    const optionValues = this.options.map(option => option.value);
    if (this.newfeildtype === 'rating') {
      console.log("Rating field type selected");

      this.ratingValueToSend = this.ratingValue;
      console.log("Rating value to send:", this.ratingValueToSend);
    }
    let dataType;
    if (this.newfeildtype === 'single_selection' || this.newfeildtype === 'multi_selection'|| this.newfeildtype === 'form'|| this.newfeildtype === 'image'||this.newfeildtype === 'date'||this.newfeildtype === 'rating'||this.newfeildtype === 'multi_text'||this.newfeildtype === 'exist_question') {
        dataType = 1;
    } else if (this.newfeildtype === 'text_field') {
      // Check the value of textFieldType to set dataType
      if (this.textFieldType === 'numeric') {
        dataType = 2;
      } else if (this.textFieldType === 'alphabetic') {
        dataType = 1;
      }
    }


    // Creating the newField object with the optionValues array
    const newField = {
      title: this.newFieldtitle,
      formId: this.formid,
      feildType: this.newfeildtype,
      options: optionValues, // Use optionValues instead of this.options
      orderId: this.lastOrderID ?? 0,
      fieldLength: this.ratingValueToSend ?? 50,
      date:this.dateValue,
      dataType: dataType ,
    

    };
    console.log("new field: ", newField)

    // Sending newField object to the backend
    this.dashboardService.getNewFeild(newField).subscribe(
      (response: any[]) => {
        this.hideAddnewfeild();
        this.objq = response.map((item) => ({ ...item }));
        console.log(this.objq, 'data of newly inserted field');
        const firstItem = response[0];

        // Check if the first item exists and has the property 'Formid'
        if (firstItem && firstItem.Formid) {
          this.formsid = firstItem.Formid;
          console.log('Form Id:', this.formsid);

        }
        const objx = { id: this.formsid, title: this.title };
        this.getforminfo(objx);
        this.resetModalValues();


      },
      (error) => {
        console.log(error, 'error');
      }
    );

  }

  createOptions() {
    this.options = new Array(this.numberOfOptions).fill('').map(() => ({ value: '' }));
  }

  addOption() {
    this.options.push({ value: '' });
    this.numberOfOptions = this.options.length; 
  }

  removeOption(index: number) {
    this.options.splice(index, 1);
  }

  updateOptions() {
    // Reset the options array
    this.options = [];

    // Only add options if the data type requires them
    if (this.newfeildtype !== 'text_field' && this.newfeildtype !== 'image') {
      for (let i = 0; i < this.numberOfOptions; i++) {
        this.options.push({ value: '' }); // Add empty objects initially
      }
    }
  }

  // CHANGING FIELD position
  changefeildPosition(data, g: String) {

    console.log("changing feild data", "going", g, data,)

    if (g === 'up') {
      this.a = 1;

    } else {
      this.a = 2;
    }

    const ib = {

      //this id is form id 
      formId: this.formid,
      orderId: data.order_id,
      b: g,
      arrow: this.a,
      ffId: data.formfieldid

    }
    console.log("IB", ib)
    this.dashboardService.changPositon(ib).subscribe(
      (response: any[]) => {
        this.obj = response.map((item) => ({ ...item }));
        console.log(this.obj, 'positonchanged');
        const b = {
          id: this.formid,
          title: this.title
        }
        console.log("calling after updating position", b)
        this.getforminfo(b)

      },
      (error) => {
        console.log(error, 'error');
      }
    );

  }
  gettingFieldInfo(data) {
    

    const objx = { formFeildId: data.formfieldid }
    console.log("data", data);
    this.dashboardService.gettingFeildInfo(objx).subscribe(
      (response: any[]) => {
        console.log(response, 'questionvalues');
        this.defaultFields = response.map((item) => ({ ...item }));
        console.log(this.defaultFields, "hiphop")
        this.settingFeildgroup(this.defaultFields);
      },
      (error) => {
        console.log(error, 'error');
      });
  }
  settingFeildgroup(data) {
    // Check if data is an array and has at least one item
    if (Array.isArray(data) && data.length > 0) {
      const firstItem = data[0]; // Access the first item in the array
      this.fieldProperties.setValue({
        minLength: firstItem.min_length || 0,
        fieldLength: firstItem.field_length || 0,
        title: firstItem.title || '',
        fieldType: firstItem.field_type || '',
        id: firstItem.id || null
      });
      console.log('Field Properties:', this.fieldProperties.value);
     
    }
    this.showFieldProperties()
  }
  gettingformProperties(data) {
    // this.showFormProperties();
         
    console.log("updating form attributes", data);
    this.formProperties.patchValue({
      formType: data.form_type || null,
      title: data.title || '',
      brandId: data.brand_id || null,
      campaignId: data.campaign_id || null,
      id: data.id || null,
    });
    this.propFormTitle = data.title

    console.log('Updated formProperties:', this.formProperties.value);
    this.loadingData = false;
    this.showFormProperties();
  }

  updatingFieldInfo(data) {

    console.log('updating field properties', data);
    this.loadingData = true;
    var formData = new FormData();
    formData.append("formId", JSON.stringify(data));
    // formData.append("formId", data.formId);
    // formData.append("fieldId", data.id);
    console.log("formData", formData);

    this.dashboardService.updatingFieldProperties(formData).subscribe(
      (res: any) => {
        this.hideFieldProperties()
        this.loadingData = false;
        this.toaster.success('Field Properties are updated')
        const b = {
          id: this.formid,
          title: this.title
        }
        console.log("calling after updating field attributes", b)
        this.getforminfo(b)
      },
      (error) => {
        this.loadingData = false;
        this.toaster.error(error.message, "Error");
      }
    );

  }
  updatingFormProperties(data) {
    console.log("updating bar", data)
    this.loadingData = true;
    var formData = new FormData();
    formData.append("fieldData", JSON.stringify(data));
    console.log("formData", formData);

    this.dashboardService.updatingFormProperties(formData).subscribe(
      (res: any) => {
        this.hideFormProperties();
        this.toaster.success('Form Properties are updated')
        console.log("calling after updating form attributes")
        this.getformslist();
      },
      (error) => {
        this.loadingData = false;
        this.toaster.error(error.message, "Error");
      }
    );
  }
  // ADDING OR REMOVING FEILDVALUE
  editFeildValue(data: any, op: String) {

    // this.naam='*';
    console.log("order", data.order_id)
    const fv = {
      formFieldId: data.form_field_id,
      title: this.naam,
      operation: op,
      orderID: data.order_id !== undefined ? data.order_id : 0,
      id: data.id
    };
    console.log("fv", fv);
    // 

    this.dashboardService.feildValueOperation(fv).subscribe(
      (response: any[]) => {
        this.toaster.success(op + "");
        // this.hideFv();  
        this.hc();
        // this.obj = response.map((item) => ({ ...item }));
        console.log(this.obj, 'positonchanged');

        const c = {
          formfieldid: data.form_field_id
        }
        console.log("calling after updating position", c)
        this.gettingFieldValue(c)


      },
      (error) => {
        console.log(error, 'error');
      }
    );

  }
  showaddModal() {
    this.AddModal.show();

  }
  closeaddModal() {
    this.AddModal.hide();
    this. resetAddModalValues();
    
  }
  showsubmitFormModal(data) {
    this.submitForm.show();
    this.submitFormFieldId = { formFieldId: data.formfieldid      
       };
    
    console.log("submitFormField:", this.submitFormFieldId )

  }
  closesubmitFormModal() {
    this.submitForm.hide();
    
  }

  showFv() {
    this.FvModal.show();
  }
  hideFv() {
    const b = {
      id: this.formid,
      title: this.title
    }
    // console.log("calling after updating position",b)
    this.getforminfo(b)

    this.FvModal.hide();
  }
  showAddnewfeild() {
    this.AddNewFeildModal.show();
  }
  hideAddnewfeild() {
    this.AddNewFeildModal.hide();
    this.resetModalValues();
  }
  populateQLAndLastOrderID() {
    if (this.ql.length > 0) {
      // Get the last item in ql and retrieve the order_id
      this.lastOrderID = this.ql[this.ql.length - 1].order_id;
      console.log("OrderId", this.lastOrderID);
    }
  }
  addFieldValueWithPrompt(item: any, op: String) {

    console.log(this.naam, item, op);
    const order = this.itemForFv.order_id + 2
    const data = {
      form_field_id: this.itemForFv.form_field_id,
      title: this.naam,
      order_id: order,
      id: this.itemForFv.id

    }

    this.editFeildValue(data, op);
  }
  sc(item, op: string) {
    const lastItem = item[item.length - 1];
    if (lastItem) {
      const data = {
        form_field_id: lastItem.form_field_id,
        title: lastItem.title,
        order_id: lastItem.order_id,
        id: lastItem.id
      };
      item = data
      this.itemForFv = item;
      console.log(this.itemForFv);
      this.op = op;
      this.CaptureModal.show();
    } else {
      console.error("The 'item' array is empty or undefined.");
    }
  }

  hc() {
    this.CaptureModal.hide()
  }
  toggleDiv(): void {
    
    this.showForms = true;
    this.toggelView=false;
    if (this.showForms) {
      this.getformslist();
      this.toggelView = false;
      // this.tog= false;
       
    }
  }
  viewFormPattern() {
    this.toggelView = !this.toggelView;
    // this.tog=!this.tog;
    this.showForms=false;
    // this.toggelView=false;
    const data = {
      id: this.formid
    }
    this.dashboardService.getQuestionList(data).subscribe(
      (response: any[]) => {
        console.log(response, 'chauri');
        this.objg = response.map((item) => ({ ...item }));
        console.log(this.objg, 'objectt');
      },
      (error) => {
        console.log(error, 'error');
      });

  }
  gobutton() {
    this.toggelView = !this.toggelView;
  }
  // toggleFormState(item: any): void {
  // Your logic to toggle the form state (activate/deactivate)
  // For example:
  //   item.active = item.active === 'Y' ? 'N' : 'Y';
  // }
  toggleInputType() {
    this.isTextType = !this.isTextType;
  }
  showFieldProperties() {
    this.AddModalSample.show();
    // this.FieldPropertiesModal.show();
  }

  hideFieldProperties() {
    this.fieldProperties.reset();
    this.AddModalSample.hide();
    // this.FieldPropertiesModal.hide();
  }
  showFormProperties() {
    
    this.FormPropertiesModal.show();
      // this.AddModal.show();
  }
  hideFormProperties() {
    this.formProperties.reset();
    this.FormPropertiesModal.hide();
  }
  deactivateForm(data) {
    console.log('deactivatingform', data)
    const obj = {
      formId: data.id,
    }
    this.dashboardService.deActivateForm(obj).subscribe(
      (response: any[]) => {
        this.toaster.success("Deactivate Sucessfully");
        this.getformslist();
      },
      (error) => {
        console.log(error, 'error');
      }
    );


  }
  deActivateField(data) {
    console.log('deactivatingfield  ', data)
    const obj = {
      formFeildId: data.formfieldid
    }
    this.dashboardService.deActivateField(obj).subscribe(
      (response: any[]) => {
        const b = {
          id: this.formid,
          title: this.title
        };
        console.log("calling after updating field attributes", b);
        this.getforminfo(b);
      },
      (error) => {
        console.log(error, 'error');
      }
    );

  }
  deActivateFieldValue(data) {
    console.log('deactivatingfieldValue  ', data)
    const obj = {
      formFeildId: data.id
    }
    this.dashboardService.deActivateFieldValue(obj).subscribe(
      (response: any[]) => {
        data.active = 'N';
        const gettingFieldObj = { formFieldId: data.form_field_id };
        this.gettingFieldValue(gettingFieldObj);
      },
      (error) => {
        console.log(error, 'error');
      }
    );

  }
  activateFieldValue(data) {
    console.log('activatingfieldvalue  ', data)
    const obj = {
      formFeildId: data.id
    }
    this.dashboardService.activateFieldValue(obj).subscribe(
      (response: any[]) => {

        data.active = 'Y';
        const gettingFieldObj = { formFieldId: data.form_field_id };
        this.gettingFieldValue(gettingFieldObj);
      },
      (error) => {
        console.log(error, 'error');
      }
    );

  }
  activateForm(data) {
    console.log('activatingform', data)
    const obj = {
      formId: data.id,
    }
    this.dashboardService.activateForm(obj).subscribe(
      (response: any[]) => {
        this.toaster.success("activate Sucessfully");
        this.getformslist();
      },
      (error) => {
        console.log(error, 'error');
      }
    );


  }
  activateField(data) {
    console.log('activatingfield  ', data)
    const obj = {
      formFeildId: data.formfieldid
    }
    this.dashboardService.activateField(obj).subscribe(
      (response: any[]) => {

        const b = {
          id: this.formid,
          title: this.title
        };
        this.getforminfo(b);
      },
      (error) => {
        console.log(error, 'error');
      }
    );

  }
  openLogicModal() {
    
    this.logicModal.show();

  }
  closeLogicModal() {
    this.logicProperties.reset();
    this.logicModal.hide();

  }
  handleChange(item: any) {
    const data = {
selectedFormFieldId : item.form_field_id,
  selectedFieldId:item.id,
  selectedValue:  item.selected 
    }
   console.log("Data",data)
   this.dashboardService.selectedFieldValues(data).subscribe(
    (res: any) => {

      this.toaster.success('Successfully updated')
      this.FvModal.hide();
      console.log("calling after updating form attributes");
    },
    (error) => {
      console.log(error, 'error');
    },
  );
  }
  
  logicFieldList(item) {
    const data = {
      formId: this.formid
    }
    this.dashboardService.logicFieldlist(data).subscribe(
      (response: any[]) => {

        this.logicFields = response.map((item) => ({ ...item }));
        if (this.logicFields.length > 0) {
          this.selectedField = this.logicFields[0];
          console.log("intialSelectedfield",this.selectedField)
        }
        console.log('logic fields', this.logicFields)
        this.setLogicProperties(item);
      },

      (error) => {
        console.log(error, 'error');
      },
    );

  }

  setLogicProperties(item: any) {
    
    this.noramlFormFieldId = item.form_field_id;
    this.fieldValueId = item.id

  console.log("normalFormFieldId:", this.noramlFormFieldId);
    this.hideFv();
    // this.showExtraModal();
    this.openLogicModal();

  }

  applyLogic() {
    debugger;
    
    console.log(this.selectedField); // Accessing id property
    const gtff: number | null = this.selectedField.formfield ? parseInt(this.selectedField.formfield) : null;

    // console.log(this.selectedField.formfieldid); // Accessing formfieldid property
    this.logicProperties.setValue({
      formFieldId: this.noramlFormFieldId, 
      fieldValueId: this.fieldValueId, 
      gotoFormFieldId: gtff,
      gotoFieldId: this.selectedField.id || null

      });
    const data = this.logicProperties.value;

    console.log("peep peep", data)

    var formData = new FormData();
    formData.append("fieldData", JSON.stringify(data));
    console.log("formData", formData);

    this.dashboardService.applyLogic(formData).subscribe(
      (res: any) => {
        this.closeLogicModal();
        console.log("selectedForm:", this.formid);
     
        this.toaster.success('Successfully added')
        console.log("calling after updating form attributes")
        const b = {
          id: this.formid,
          title: this.title
        }
        
        this.getforminfo(b);
      },
      (error) => {
        this.loadingData = false;
        this.toaster.error(error.message, "Error");
      }
    );


  }
  setHoveredRowIndex(index: number | null): void {
    this.hoveredRowIndex = index;
  }


  submit() {
    console.log("Additional Data:", this.submitFormFieldId.formFieldId);
  
    let data = {};
  
    if (this.selectedAction === 'exit') {
      this.selectedFormId = '-1'; // Ensure selectedFormId is -1 for exit action
      console.log("Action: Exit");
      console.log("selectedFormId:", this.selectedFormId);
  
      // Prepare data object for exit action
      data = {
        formId: this.selectedFormId,
        formFieldId: this.submitFormFieldId.formFieldId,
        orderId: this.orderId
      };
      console.log("formFieldData for exit:", data);
  
    } else if (this.selectedAction === 'move_to' && this.selectedFormId !== '-1') {
      console.log("Action: Move to Form ID:", this.selectedFormId);
  
      // Prepare data object for move_to action
      data = {
        formId: this.selectedFormId,
        formFieldId: this.submitFormFieldId.formFieldId,
        orderId: this.orderId
      };
      console.log("formFieldData for move_to:", data);
    } else {
      console.log("Object not found or not enough elements");
      return; // Exit early if no valid action
    }
  
    // Call the service with the prepared data
    this.dashboardService.formMoveTo(data).subscribe(
      (res: any) => {
        
        // Update the corresponding item in objr with the response
        this.formSubmit = res.map((item) => ({ ...item }));
        console.log("Response data:", this.formSubmit);
      },
      (error) => {
        // Handle errors
        this.loadingData = false;
        this.toaster.error(error.message, "Error");
      }
    );
  
    this.closesubmitFormModal();
  }
  
  
  onRadioChange(item: any, optionIndex: number, fieldIndex: number) {
    console.log('onRadioChange - item:', item, 'optionIndex:', optionIndex, 'fieldIndex:', fieldIndex);
    const selectedFormValueId = item.formvalue_ids ? item.formvalue_ids[optionIndex] : null;
    if (selectedFormValueId !== undefined) {
        this.childVisibility(selectedFormValueId, fieldIndex);
    }
}

onNestedRadioChange(data: any, optionIndex: number) {
  debugger;

  // Extracting form_field_id and formvalue_ids from the data object
  const formFieldId = data.form_field_id;
  const formValueIdsString = data.formvalue_ids;

  // Splitting the formvalue_ids string by comma to get individual IDs
  const formValueIdsArray = formValueIdsString.split(',');

  // Ensure that optionIndex is within bounds
  if (optionIndex >= 0 && optionIndex < formValueIdsArray.length) {
      // Retrieve the selected form value ID using optionIndex
      const selectedFormValueId = formValueIdsArray[optionIndex];

      // Call childVisibility1 with the selectedFormValueId and formFieldId
      this.childVisibility1(selectedFormValueId,data.form_field_id1);
  } else {
      console.error('Invalid optionIndex:', optionIndex);
      // Handle the case where optionIndex is out of bounds
  }
}



  childVisibility(formValueId: any, formFieldId: any) {
    console.log("childVisibility - formValueId:", formValueId);
    console.log("childVisibility - formFieldId:", formFieldId);
  
    if (this.objg && this.objg.length > formFieldId) {
      const currentField = this.objg[formFieldId];
      console.log("childVisibility - currentField:", currentField);
  
      const ffid = currentField.formfeild_id;
      const data = {
        formValueId: formValueId,
        formfieldID: ffid
      };
  
      this.objr = [];
  
      this.dashboardService.childVisibility(data).subscribe(
        (res: any) => {
          console.log("childVisibility - API response:", res);
          this.objr = res.map((item) => ({ ...item }));
          console.log("childVisibility - updated objr:", this.objr);
        },
        (error) => {
          console.error("childVisibility - error:", error);
          this.toaster.error(error.message, "Error");
        }
      );
    } else {
      console.log("childVisibility - objg not found or not enough elements");
    }
  }

  childVisibility1(formValueId1: any, formFieldId: any) {
    console.log("childVisibility1 - formValueId:", formValueId1);
    console.log("childVisibility1 - formFieldId:", formFieldId); // Log formFieldId
  
   
      const data = {
        formValueId: formValueId1,
        formfieldID: formFieldId // Use the passed formFieldId argument
      };
      console.log("childVisibility1 - data:", data);
  
      this.objp = [];
  
      this.dashboardService.childVisibility1(data).subscribe(
        (res: any) => {
          console.log("childVisibility1 - API response:", res);
          this.objp = res.map((item) => ({ ...item }));
          console.log("childVisibility1 - updated objp:", this.objp);
        },
        (error) => {
          console.error("childVisibility1 - error:", error);
          this.toaster.error(error.message, "Error");
        }
      );
    }
  }