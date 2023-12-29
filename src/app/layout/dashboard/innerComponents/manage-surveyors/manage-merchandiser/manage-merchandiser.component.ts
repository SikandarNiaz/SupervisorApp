import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { ManageSurveyorsComponent } from "../manage-surveyors.component";

@Component({
  selector: "manage-merchandiser",
  templateUrl: "./manage-merchandiser.component.html",
  styleUrls: ["./manage-merchandiser.component.scss"],
})
export class ManageMerchandiserComponent implements OnInit, AfterContentChecked, OnChanges  {

  @Input("surveyorList") surveyorList;
  sortOrder = true;
  sortBy: "m_code";

  @Output("updateMerchandiser") updateMerchandiser: any = new EventEmitter<any>();
  @Output("showModal") showModal: any = new EventEmitter<any>();
  @Output("addMerchandiserModal") addMerchandiserModal: any = new EventEmitter<any>();

  insertTitle= "Merchandiser";
  insertType= 1;
  filteredList: any = [];
  labels: any;

  // pageOfItems: Array<any>;
  

  constructor(
    // private httpService: DashboardService,
    // public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
    }
    
  //   onChangePage(pageOfItems: Array<any>) {
  //     // update current page of items
  //     this.pageOfItems = pageOfItems;
  // }
  ngOnChanges() {
    // changes.prop contains the old and the new value...
    this.filteredList = this.surveyorList;
  }

  ngOnInit() { 
    // console.log("surList in manage merch: ", this.surveyorList);
    // this.filteredList = this.surveyorList;
    
  }

  ngAfterContentChecked(): void {
    // this.cdr.detectChanges();
  }

  page = 1;

   handlePageChange(event) {
      this.page = event;
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

  updateSuperviserData(data) {
    this.updateMerchandiser.emit(data);
  }

  showMerchandiserInfoModal(surveyor) {
    this.showModal.emit(surveyor);
      }

  addMerchandiser(){
    console.log("add merch");
    this.addMerchandiserModal.emit({insertTitle: this.insertTitle, insertType: this.insertType});
    
  }
  onNotifyClicked(filteredlist: any){
    console.log(this.filteredList)
    this.filteredList=filteredlist;
  }
  
}
