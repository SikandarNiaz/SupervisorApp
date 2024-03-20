import { Component, AfterViewInit, ViewChild, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DashboardService } from 'src/app/layout/dashboard/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { id } from 'date-fns/locale';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-surmon',
  templateUrl: './surmon.component.html',
  styleUrls: ['./surmon.component.css']
})
export class SurmonComponent implements OnInit, AfterViewInit {
  obj: any;
  defaultFields: any
  toggelView: boolean = true;
  formsid: any;
  @ViewChild('formslistModal') formslistModal: ModalDirective;
  @ViewChild('CaptureModal') CaptureModal: ModalDirective;
  @ViewChild('FvModal') FvModal: ModalDirective;
  @ViewChild('AddModal') AddModal: ModalDirective;
  @ViewChild('AddNewFeildModal') AddNewFeildModal: ModalDirective;
  @ViewChild('FieldPropertiesModal') FieldPropertiesModal: ModalDirective;
  @ViewChild('FormPropertiesModal') FormPropertiesModal: ModalDirective;
  @ViewChild('logicModal') logicModal: ModalDirective;

  loadingdata: Boolean = false;
  fvti: String;
  isTextType: boolean = false;
  item: any;
  propFormTitle:any;
  propFieldTitle:any;
  op: any;
  a: any;
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
  selectedCampaignId : any;
  selectedBrandId : any;
  brandId : any;
  campaignId:any;
  fieldOptions: string[] = [
    'text_field',
    'single_selection',
    'multi_selection',
    'date',
    'rating',
    'multi_text',
    'exist_question',
    'form',
    'image'
  ];
  formtypes: any;
  Campaigns:any;
  Brands : any ;
  // string[] = [
  //     'MAIN',
  // 'INTERESTED',
  // 'NOTINTERESTED',
  // 'SIGNATURE RATING BRAND PURCHASE VIDEO_TYPE',
  // 'CATEGORY FEEDBACK',
  // 'OOS_CATEGORY OOS_BRAND',
  // 'MARKET_INTELLIGENCE','MANUAL',
  // 'ARIEL_KBD',
  // 'SX_KBD',
  // 'AUDIO_SUP',
  // 'VIDEO SUP IMAGE FEEDBACK_1',
  // 'FEEDBACK_2',
  // 'KBD',
  // 'FEEDBACK_3',
  // 'SHOP_DETAIL', 
  // 'BA_ASSESSMENT',
  // 'STORE_EVALUATION',
  // 'TRAINING',
  // 'QUIZ',
  // 'COMPETITION_USER',
  // 'COMPETITION',
  // 'SPW',
  // 'INVENTORY_IN_HAND',
  // 'INVENTORY_RETURN',
  // 'SCRATCH',
  // 'SC',
  // 'SPW_BEFORE',
  // 'SPW_AFTER',
  // 'FAQ',
  // 'EXPIRY',
  // 'SURVEY'
  //   ];
  ff: any;
  //  SELECTEDFORTHROUGOUT
  formtitle: any;
  ql: any;
  gotoFormFieldId: any
  // FORMFEILDID
  ffid: any;
  title: String = 'SELECT OR CREATE NEW FORM';
  ft: String; //forgettingnewform
  fty: String;//forgettingnewform
  newformobj2: { id: any; title: any; };
  options: any[];
  numberOfOptions: number;
  objq: any[];
  objg: any[];
  lastOrderID: any;
  selectedFormType: any;
  formProperties: FormGroup;
  fieldProperties: FormGroup;
  logicProperties: FormGroup;
  formFieldId: any;
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
      title: ['', Validators.required, , Validators.maxLength(50)],
      fieldType: ['', Validators.required],
      id: ['', Validators.required]
    });
    this.logicProperties = this.fb.group({
      formFieldId: ['', Validators.required],
      fieldValueId: ['', Validators.required],
      gotoFormFieldId: ['', Validators.required]
    });
  }
  // FOR LOADING FORMSLIST
  ngAfterViewInit(): void {
    this.showFormList();
  }

  ngOnInit(): void {
    this.toaster.success('Almost there');
    this.getformslist();
    // x  
    this.gettingFormTypes();
    this.gettingBrands();
    this.gettingCompaign();
    this.ngAfterViewInit();
  }
  // refreshComponent(): void {
  //   // You can perform any logic here before refreshing, if needed
  //   this.cdr.detectChanges(); // Trigger change detection
  //   this.ngOnInit()
  // }
  gettingFormTypes() {
    this.dashboardService.gettingFormTypes().subscribe(
      (response: any[]) => {
        this.formtypes = response.map((item) => ({ ...item }));
        console.log(this.formtypes, 'habshi')
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


  getformslist(): void {
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
debugger;
    if (selectedform) {
      this.loadingData = true;

      this.title = selectedform.title;
      this.formid = selectedform.id;
      this.formtitle = selectedform.title;
      this.nextorder = selectedform.options + 2;
      this.closeFormList();
    };
    console.log("selectedForm:",this.formid)
    const qdata = {
      formId: this.formid,

    }
    console.log("ConsoleFormId:",qdata)
    this.dashboardService.gettingeildsV2(qdata).subscribe(
      (response: any[]) => {
        console.log(response, 'qustions');
        this.ql = response.map((item) => ({ ...item }));
        this.loadingdata = true
        this.populateQLAndLastOrderID();
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
    this.dashboardService.gettingFeildsvaluesV2(objx).subscribe(
      (response: any[]) => {
        debugger;

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
    debugger;
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
    console.log("title", newform.title, "type",newform.type,"brandId", newform.brandId,"campaignId ",newform.campaignId);
    this.dashboardService.createNewForm(newform).subscribe(
      (response: any[]) => {

        // Ensure response is an array and has at least one element
        if (Array.isArray(response) && response.length > 0) {
          const firstItem = response[0];
          // Check if generatedKey exists and is an array with at least one element
          const generatedKey = firstItem.generatedKey;
          this.newformobj2 = {
            id: generatedKey,
            title: this.ft
          };
          console.log(this.newformobj2, "newwwwwww fooooooorm object");
          this.closeaddModal();
          this.getforminfo(this.newformobj2);
          this.formslistModal.show();
          // console.log(this.newformobj2, "newwwwwww fooooooorm object");


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

    console.log("i'm clicked");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const newField = {
      title: this.newFieldtitle,
      formId: this.formid,
      feildType: this.newfeildtype,
      options: this.options,
      orderId: this.lastOrderID ?? 0
    };
    console.log(newField, "japani")
    const obj = {
      id: this.formid
    }
    this.dashboardService.getNewFeild(newField).subscribe(
      (response: any[]) => {
        this.hideAddnewfeild();
        this.objq = response.map((item) => ({ ...item }));
        console.log(this.objq, 'data of newly inserted feild');
        const firstItem = response[0];

        // Check if the first item exists and has the property 'Formid'
        if (firstItem && firstItem.Formid) {
          this.formsid = firstItem.Formid;
          console.log('Form Id:', this.formsid);


          // Store the formId in a variable or use it as needed
          // Example: this.myFormIdVariable = formId;
        }
        const objx = { id: this.formsid, title: this.title }
        this.getforminfo(objx);

      },
      (error) => {
        console.log(error, 'error');
      }
    );

    // console.log("title",this.title)
    // console.log("formId",this.formid)

  }
  removeOption(index: number) {
    this.options.splice(index, 1);
  }
  createOptions() {
    this.options = new Array(this.numberOfOptions).fill('');
  }
  updateOptions() {
    // Reset the options array
    this.options = [];

    // Only add options if the data type requires them
    if (this.newfeildtype !== 'text_field' && this.newfeildtype !== 'image') {
      for (let i = 0; i < this.numberOfOptions; i++) {
        this.options.push(''); // Add empty strings initially
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
      console.log('Form Properties:', this.fieldProperties.value);
    }
    this.showFieldProperties()
  }


  gettingformProperties(data) {
    debugger;
    console.log("updating form attributes", data);
    this.formProperties.patchValue({
        formType: data.form_type || null,
        title: data.title || '',
        brandId: data.brand_id || null,
        campaignId: data.campaign_id || null,
        id: data.id || null,
    });
    this.propFormTitle=data.title

    console.log('Updated formProperties:', this.formProperties.value);
    this.loadingData = false;
    this.showFormProperties();
}


  updatingFieldInfo(data) {
    debugger;
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
  editFeildValue(data:any,op:String){
    debugger;
    // this.naam='*';
    console.log("order",data.order_id)
    const fv = {
      formFieldId: data.form_field_id,
      title:this.naam,
      operation: op,
      orderID: data.order_id !== undefined ? data.order_id : 0,
      id: data.id
    };
    console.log("fv",fv);
    // 
    
    this.dashboardService.feildValueOperation(fv).subscribe(
      (response: any[]) => {
        this.toaster.success(op+"");
        // this.hideFv();  
        this.hc();
        // this.obj = response.map((item) => ({ ...item }));
        console.log(this.obj, 'positonchanged');
        
        const c={
          formfieldid:data.form_field_id
        }
        console.log("calling after updating position",c)
        this.gettingFieldValue(c)
  
        
      },
      (error) => {
        console.log(error, 'error');
      }
    );
   
    // const b={
    //   id:this.formid,
    //   title:this.title
    // }
    // // console.log("calling after updating position",b)
    // this.getforminfo(b)
   
   
  }
  showaddModal() {
    this.AddModal.show();

  }
  closeaddModal() {
    debugger;
    this.AddModal.hide();
  }

  showFormList() {
    this.formslistModal.show();
  }
  closeFormList() {
    this.formslistModal.hide();
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
    this.AddNewFeildModal.show()
  }
  hideAddnewfeild() {
    this.AddNewFeildModal.hide()
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

    // console.log(item);

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

      // Now 'data' contains the required information from the last item

      // If you want to store 'data' in a separate array or object, you can do so here

      // Show the modal or perform other actions
      this.op = op;
      this.CaptureModal.show();
    } else {
      console.error("The 'item' array is empty or undefined.");
    }
  }

  hc() {
    this.CaptureModal.hide()
  }
  viewFormPattern() {
    this.toggelView = !this.toggelView;
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
    this.FieldPropertiesModal.show()
  }
  hideFieldProperties() {
    this.fieldProperties.reset();
    this.FieldPropertiesModal.hide()
  }
  showFormProperties() {
    this.FormPropertiesModal.show()
  }
  hideFormProperties() {
    this.formProperties.reset();
    this.FormPropertiesModal.hide();
  }
  deActivateForm(data) {
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
        debugger;
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
  logicFieldList(item) {
    debugger;
    const data = {
      formId: this.formid
    }
    this.dashboardService.logicFieldlist(data).subscribe(
      (response: any[]) => {
        debugger;
        this.logicFields = response.map((item) => ({ ...item }));
        console.log('logic fields', this.logicFields)
        this.setLogicProperties(item);
      },

      (error) => {
        console.log(error, 'error');
      },
    );

  }
  setLogicProperties(item) {
    this.logicProperties.setValue({
      formFieldId: this.formFieldId,
      fieldValueId: item.id,
      gotoFormFieldId: null

    });
    console.log("logicProperties", this.logicProperties.value)
    this.hideFv();
    this.openLogicModal();

  }
  applyLogic(data) {
    console.log("peep peep", data)
    debugger;
    var formData = new FormData();
    formData.append("fieldData", JSON.stringify(data));
    console.log("formData", formData);

    this.dashboardService.applyLogic(formData).subscribe(
      (res: any) => {
        this.closeLogicModal();
        this.toaster.success('logic is')
        console.log("calling after updating form attributes")
        this.getformslist();
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
  // toggleForm(item: any) {
  //   if (item.active === 'Y') {
  //     this.deactivateForm(item);
  //   } else {
  //     this.activateForm(item);
  //   }
  // }
}