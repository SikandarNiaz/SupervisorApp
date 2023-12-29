import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, SimpleChanges, OnChanges, HostListener  } from "@angular/core";
import { DashboardService } from "../../dashboard.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Config } from "src/assets/config";
import { environment } from "src/environments/environment";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgModel,
} from "@angular/forms";
import * as moment from "moment";
import { Lightbox } from 'ngx-lightbox';
// import { EventEmitterService } from "../../event-emitter.service";
// import { RefreshComService } from "../../refresh-com.service";
// import { ImageViewerConfig } from "@hreimer/angular-image-viewer";

@Component({
  selector: "samsung-claims-management-opd",
  templateUrl: "./samsung-claims-management-opd-component.html",
  styleUrls: ["./samsung-claims-management-opd-component.scss"],
})
export class SamsungClaimManagementOPDComponent implements OnInit, OnChanges  {
  ip: any = Config.BASE_URI;
  private _albums: any = [];
  loadingData = false;
  selectedUpdate : any;
  loadingModal = false;
  loadingModalButton = false;
  projectType: any;
  emailList: any = [];
  tmpEmailList: any = [];
  emailTypes: any = [];
  selectedEmailType: any;
  addressTypes: any = [];
  clusterList: any = [];
  zones: any = [];
  regions: any = [];
  zoneObj ={id: -1, title: "All"}
  selectedCluster: any = {};
  selectedZone: any ;
  selectedRegion: any ;
 
  activeStatus: any = [
    { id: 1, value: "Y" },
    { id: 2, value: "N" },
  ];

  approvedList : any =[
    {id: 1, value: 'PENDING'},
    {id: 2, value: 'APPROVED'},
    {id: 3, value: 'REJECTED'},
  ]

  labels: any;

  isUpdateRequest: boolean;
  modalTitle: any;

  @ViewChild("remarksModal", { static: true }) remarksModal: ModalDirective;

  images = [
    `https://sls-app-resources-bucket.s3.us-east-2.amazonaws.com/temp/1.2M.png?q=${1}`,
    `https://sls-app-resources-bucket.s3.us-east-2.amazonaws.com/temp/520K.png?q=${2}`,
    `https://sls-app-resources-bucket.s3.us-east-2.amazonaws.com/temp/43.6K.png?q=${3}`,
    `https://sls-app-resources-bucket.s3.us-east-2.amazonaws.com/temp/16M.jpg?q=${4}`,
    'https://i.ytimg.com/vi/nlYlNF30bVg/hqdefault.jpg',
    'https://www.askideas.com/media/10/Funny-Goat-Closeup-Pouting-Face.jpg'
  ];

  imageIndexOne = 0;


  form: FormGroup;
  filteredList: any;
  areas: any= [];
  zoneList: any;
  regionList: any;
  areaList: any;
  claimData: any = [];
  user_id: string;
 latitude: number = 32.9235933;
   longitude: number = 72.3989733;
  oneShopData: any= [];
  distinctClaimDataList: any = [];
  len: any;
  surveyors: any = [];
  selectedSurveyor: any = [];
  sortOrder: any;
  sortBy: any;
  filteredSurveyors: any = [];
    selectedSupervisor: any;
    selectedProgram: any;
  loading: boolean;

 

  constructor(
    private httpService?: DashboardService,
    private router?: Router,
    private toastr?: ToastrService,
    public formBuilder?: FormBuilder,
    public _lightbox?: Lightbox
  ) {

    window.addEventListener('focus', event => {
      console.log("focus: ", event);
      if(this.selectedRegion?.id){
        this.getSamsungClaimData();
      }
  });
  // window.addEventListener('blur', event => {
  //     console.log("blue: ",event);
  //     if(this.selectedRegion?.id){
  //       this.getSamsungClaimData();
  //     }
      
  // });


// window.onfocus = function(){
//    this.hasfocus = true;
//    console.log("focus:");
//    this.getSamsungClaimData();
// }

// window.onblur = function(){
//    this.hasfocus = false;
//    console.log("blur: ");
//    this.getSamsungClaimData();
// }
   
    this.zones = JSON.parse(localStorage.getItem("zoneList"));
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
    this.projectType = localStorage.getItem("projectType");
    this.user_id = localStorage.getItem("user_id");
    this.clusterList = JSON.parse(localStorage.getItem("clusterList"));

    // this.form = formBuilder.group({
    //   id: new FormControl(""),
    //   remarks: new FormControl("", [Validators.required]),
    // });

  }


  ngOnInit() {
    this.getZoneList();

  }

  showRemarksModal(data){

    this.form.patchValue({
      id: data.id
    });

    this.remarksModal.show();
  }

  hideRemarksModal() {
    
    this.form.reset();
    console.log("this.form.value", this.form.value);
    this.remarksModal.hide();
  }

  getSamsungClaimData() {
   this.selectedUpdate = {};
    
    this.loadingData = true;
    this.filteredList = [];
    const obj = {
      zoneId: this.selectedZone.id
        ? this.selectedZone.id == -1
          ? localStorage.getItem("zoneId")
          : this.selectedZone.id
        : localStorage.getItem("zoneId"),
      regionId: this.selectedRegion.id
        ? this.selectedRegion.id == -1
          ? localStorage.getItem("regionId")
          : this.selectedRegion.id
        : localStorage.getItem("regionId"),
      //  zoneId: this.selectedZone.id ? this.selectedZone.id: -1,
        claimId: -1,
        surveyorIds: this.arrayMaker(this.selectedSurveyor) || -1
      }
    this.httpService.getSamsungClaimData(obj).subscribe(
      (data) => {
        const res: any = data;
        console.log("claim data: ",data);
        if (res) {
          // this.claimData = data;
          // this.getList();
          this.distinctClaimDataList = data;
          this.filteredList= this.distinctClaimDataList;
          this.setImageUrl();
        }
        if (!res) {
          this.toastr.info("No data Found", "Info");
        }
        this.loadingData = false;
      },
      (error) => {
        this.loadingData = false;
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
  }


  getZoneList() {
    this.loading = true;
    this.httpService.getZone().subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.zones = res.zoneList;
        } else {
          this.loading = false;

          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }

        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  zoneChange() {
    this.loadingData = true;
    this.selectedRegion = {};
    this.httpService.getRegion(this.selectedZone.id).subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.regions = res;
        } else {
          this.loadingData = false;

          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }

        setTimeout(() => {
          this.loadingData = false;
        }, 500);
      },
      (error) => {
        this.loadingData = false;
      }
    );
  }

  getRegion() {
    this.loading = true;

     this.httpService.getRegions().subscribe(
      (data) => {
        console.log(data)
        const res: any = data;
        if (res) {
          this.regions = res.regionList;
          console.log("supervisors",this.regions)
        } else {
          this.loading = false;

          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }

        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
      (error) => {
        this.loading = false;
      }
    );
  }
  clearLoading() {
    this.loadingData = false;
  }

  selectedUpdateChange(){
    this.filteredList =this.distinctClaimDataList;
    this.filteredList = this.distinctClaimDataList.filter(e=> e.claimStatus== this.selectedUpdate.value);

  }

  showImageLigtBox(index: number): void {
    // open lightbox
    // this._lightbox.open(this._albums, index, {
    //   wrapAround: true,
    //   disableKeyboardNav: false,
    //   showZoom: true
    //   // showDownloadButton: true,
    //   // showRotate: true,
    //   // positionFromTop: 40
    // });
  }



  ngOnChanges(changes: SimpleChanges): void {
    // console.log('imagesSectionList: ', this.distinctClaimDataList);
    // for (let i = 0; i < this.distinctClaimDataList.imageList.length; i++) {
    //   const src = this.ip + this.distinctClaimDataList.imageList[i].image_url;
    //   const caption = 'Image ' + i + ' caption here';
    //   const thumb = this.distinctClaimDataList.imageList[i].image_url;
    //   console.log('imagesSectionList: ', src);
    //   console.log('imagesSectionList: ', caption);
    //   console.log('imagesSectionList: ', thumb);
    //   const album = {
    //     src: src,
    //     caption: caption,
    //     thumb: thumb
    //   };

    //   this._albums.push(album);
    // }
    // this.filterimg(this.distinctClaimDataList.imageList);
  }
  filterimg(imagesSectionList) {
    
    this.len = imagesSectionList.length;
    let i = this.odd(imagesSectionList.length);
    if (i == 1) {
      // this.imagesSectionList.filter(e => this.imagesSectionList.length - 1);
      // for(const k=1; k<=imagesSectionList.length-1; k++){
      //     this.newArray.push();
      // }
      this.len = imagesSectionList.length - 1;
    }
  }

  odd(i) {
    return i % 2;
  }

  open(index: number): void {
    // open lightbox
    
    this._lightbox.open(this._albums, 0, {
      wrapAround: true,
      disableKeyboardNav: false,
      showZoom: true
      // showDownloadButton: true,
      // showRotate: true,
      // positionFromTop: 40
    });
  }

  close(): void {
    // close lightbox programmatically
    
    // this._albums = [];
    this._lightbox.close();
    
  }

  open2(data){
    let imglist = data.imageList;
    
    this._albums = [];
    console.log('data: ', data);
    for (let i = 0; i < imglist.length; i++) {
      const src = imglist[i];
      const caption = 'Image ' + data.id + ' caption here';
      const thumb = imglist[i];
      console.log('imagesSectionList: ', src);
      console.log('imagesSectionList: ', caption);
      console.log('imagesSectionList: ', thumb);
      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };

      this._albums.push(album);
    }

    this.open(0);
    this.filterimg(imglist);
  }



  getDistinctClaimObjId(){
    const unique = [...new Set(this.claimData.map(item => item.zone))];
    console.log("unique", unique);
    this.getList();
  }

  getList(){
    this.distinctClaimDataList = this.claimData.filter(
      (thing, i, arr) => arr.findIndex(t => t.id === thing.id) === i
    );

    for(let k of this.distinctClaimDataList){
      let imageList = [];

      for(let j of this.claimData){
        if(j.id==k.id){
          imageList.push(j.image_url);
        }
      }

      console.log("imageList", imageList);
      k.imageList = imageList;
    }

console.log("distinctClaimDataList", this.distinctClaimDataList);

this.externalUrl();
  }

  externalUrl(){
    for(let data of this.distinctClaimDataList){
      for(let i=0; i<data.imageList.length; i++){
        if (data.imageList[i].indexOf("http") < 0) {
          data.imageList[i] = this.ip + data.imageList[i];
        }
      }
    }

    console.log("this.distinctClaimDataList: ", this.distinctClaimDataList);

  }


  setImageUrl() {
    

    for(let data of this.distinctClaimDataList){
      for (const image of data.imageList) {
        if (image.url != null) {
          if (image.url.indexOf("http") >= 0) {
            const i = data.imageList.findIndex((e) => e.url == image.url && e.imageId == image.imageId);
            data.imageList[i].isExternalUrl = true;
          }
        }
      }
    }

    console.log("this.distinctClaimDataList; ", this.distinctClaimDataList);
    this.filteredList = this.distinctClaimDataList;
}

goToEvaluation(data) {
  console.log("goToEvaluation data: ", data);
  window.open(
    `${
      environment.hash
    }dashboard/samsung-claim-images?obj=${
      JSON.stringify(data)
    }`,
    "_blank"
  );
}

loadSurveyors() {
  this.loadingData = true;
  this.httpService
    .getSamsungSurveyors(
      this.selectedZone.id || -1,
      this.selectedRegion.id || -1
    )
    .subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.surveyors = res;
          this.filteredSurveyors = res;
        }
        if (!res) {
          this.toastr.info("No data Found", "Info");
        }
        this.loadingData = false;
      },
      (error) => {
        this.loadingData = false;
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
}

arrayMaker(arr) {
  const all = arr.filter((a) => a === "all");
  const result: any = [];
  if (all[0] === "all") {
    arr = this.surveyors.filter(
      (surveyor: any) => surveyor.type == 2 && surveyor.active == "Y"
    );
    const surveyorTypes = arr.map((surveyor) => surveyor.type);
    console.log("Surveyor Types: ", surveyorTypes);
  }
  arr.forEach((e) => {
    result.push(e.id);
  });
  return result;
}

selectAll(select: NgModel, values) {
  select.update.emit(values);
}

deselectAll(select: NgModel) {
  select.update.emit([]);
}

equals(objOne, objTwo) {
  if (typeof objOne !== "undefined" && typeof objTwo !== "undefined") {
    return objOne.id === objTwo.id;
  }
}

selectedSurveyorChanged(event){
  console.log("event: ", event);
  console.log("selectedSurveyor: ", this.selectedSurveyor);
  this.filteredList = [];
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

onNotifyClicked(filteredlist: any){
  console.log(this.filteredList)
  this.filteredSurveyors=filteredlist;
}

}
