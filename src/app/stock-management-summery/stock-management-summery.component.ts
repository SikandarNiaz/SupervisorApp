import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/layout/dashboard/dashboard.service';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import * as moment from 'moment'; 
import { RouterModule, Routes } from '@angular/router';
import { RmStockAssignComponent } from '../rm-stock-assign/rm-stock-assign.component';
import { RmStockReturnComponent } from '../rm-stock-return/rm-stock-return.component';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  { path: 'dashboard/app-rm-stock-assign/:id', component: RmStockAssignComponent },
  { path: 'dashboard/app-rm-stock-return/:id', component: RmStockReturnComponent },
];

@Component({
  selector: 'app-stock-management-summery',
  templateUrl: './stock-management-summery.component.html',
  styleUrls: ['./stock-management-summery.component.css']
})
export class StockManagementSummeryComponent implements OnInit {

  loadingData: boolean = false;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2100, 0, 1);
  startDate: Date;
  endDate: Date;
  selectedSupervisor: any;
  selectedZone: any;
  selectedRegion: any;
  title = "Supervisor Stock Summary";
  Supervisors: any[] = [];
  Regions: any[] = [];
  Zones: any[] = [];
  filteredItems: any[] = [];
  sortBy: string = 'id'; // default sorting column
  sortOrder: boolean = true;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {
    this.startDate = new Date();
    this.endDate = new Date();
  }

  ngOnInit(): void {
    this.gettingSupervisors();
    this.getZone();
  }


  sortIt(key: string) {
    this.sortBy = key;
    this.sortOrder = !this.sortOrder;

    const compare = (a: any, b: any) => {
      const isAsc = this.sortOrder;
      if (a[key] < b[key]) return isAsc ? -1 : 1;
      if (a[key] > b[key]) return isAsc ? 1 : -1;
      return 0;
    };

    this.filteredItems.sort(compare);
  }

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

  // checkAndFetchSummary(): void {
  //   if (this.startDate && this.endDate && this.selectedSupervisor && this.selectedZone && this.selectedRegion) {
  //     this.getSummeryDetail();
  //   }
  // }

  getSummeryDetail() {
    this.loadingData = true;
    const obj = {
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      endDate: moment(this.endDate).format('YYYY-MM-DD'),
      supervisorId: this.selectedSupervisor ? this.selectedSupervisor : -1,
      zoneId: this.selectedZone ? this.selectedZone : -1,
      regionId: this.selectedRegion ? this.selectedRegion : -1
    };
    console.log("Summary:", obj);
    this.dashboardService.getSummery(obj).subscribe(
      (response: any[]) => {
        this.filteredItems = response;
        this.loadingData = false;
        console.log('Summary data:', this.filteredItems);
      },
      (error) => {
        console.error('Error fetching summary:', error);
      }
    );
  }
  
  goToEvaluation(id: number, visitDate: string) {
    const formattedDate = this.formatDate(visitDate);
    console.log("goToEvaluation called with id:", id, "visitDate:", formattedDate);
    if (id && formattedDate) {
      window.open(
        `${environment.hash}dashboard/app-rm-stock-assign?id=${id}&visitDate=${formattedDate}`,
        "_blank"
      );
    } else {
      console.error("Missing id or visitDate", id, formattedDate);
    }
  }
  
  goToEvaluation1(id: number, visitDate: string) {
    const formattedDate = this.formatDate(visitDate);
    console.log("goToEvaluation1 called with id:", id, "visitDate:", formattedDate);
    if (id && formattedDate) {
      window.open(
        `${environment.hash}dashboard/app-rm-stock-return?id=${id}&visitDate=${formattedDate}`,
        "_blank"
      );
    } else {
      console.error("Missing id or visitDate", id, formattedDate);
    }
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero
    return `${year}-${month}-${day}`;
  }
  openInNewTab(route: string) {
    // Use the hash-based URL format
    const url = `${environment.hash}dashboard${route}`;
    window.open(url, '_blank');
  }
  
  // navigateToStockAssign() {
  //   this.router.navigate(['/app-rm-stock-assign']);
  // }

  // navigateToStockReturn() {
  //   this.router.navigate(['/app-rm-stock-return']);
  // }
  
  }
  
 
 


