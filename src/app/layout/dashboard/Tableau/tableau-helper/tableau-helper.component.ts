import {
  Component,
  OnInit,
  AfterViewChecked,
  Input,
  ViewChild,
} from "@angular/core";
import { DashboardService } from "../../dashboard.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DashboardDataService } from "../../dashboard-data.service";
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";

declare var tableau: any;

@Component({
  selector: "tableau-helper",
  templateUrl: "./tableau-helper.component.html",
  styleUrls: ["./tableau-helper.component.scss"],
})
export class TableauHelperComponent implements OnInit {
  viz: any;
  ticketUrl: string;
  params: any = {};
  indexOf: any = {};
  @Input() type;
  @Input() cluster;
  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    private dataService: DashboardDataService,
    public activatedRoute: ActivatedRoute,
    private readonly location: Location
  ) {
    this.activatedRoute.queryParams.subscribe((p) => {
      this.params = p;
      if (this.params.link) {
        this.location.replaceState("/dashboard/tableau");
        this.getKey();
      }
    });
  }

  ngOnInit(): void {
    if (!this.params.link) {
      this.getKey();
    }
  }
  getKey() {
    const obj = {
      type: this.type || "",
      userType: localStorage.getItem("user_type"),
    };
  
    // Get zone, region, and area from localStorage
    const zoneId = localStorage.getItem("zoneId") || -1;
    const regionId = localStorage.getItem("regionId") || -1;
    const areaId = localStorage.getItem("area_id");
    const area_id = areaId ? areaId.split(',').map(Number) : [];
  console.log ("region_id",localStorage.getItem("regionId"));
    // Prepare zoneRegionParams
    const areaParam =
      area_id.length > 0 && area_id.some((id) => id > 0)
        ? `&area_id=${area_id.join(',')}`
        : "";
  
    const zoneRegionParams = `zoneId=${zoneId}&regionId=${regionId}${areaParam}`;
  
    this.httpService.getKey(obj).subscribe((data: any) => {
      const baseUrl = `${data.TableauData.tableau_url}/${data.ticket}/${this.params.link}`;
      const commonParams = `:iframeSizedToWindow=${data.TableauData.iframe}&:embed=${data.TableauData.embed}&:showAppBanner=${data.TableauData.showAppBanner}&:display_count=${data.TableauData.display_count}&:showVizHome=${data.TableauData.showVizHome}`;
  
      if (this.params.link.indexOf("?") >= 0) {
        this.ticketUrl = `${baseUrl}&${zoneRegionParams}&${commonParams}`;
      } else {
        this.ticketUrl = `${baseUrl}?${zoneRegionParams}&${commonParams}`;
      }
  
      console.log("url:", this.ticketUrl);
      this.initViz();
    });
  }

  initViz() {
    const containerDiv = document.getElementById("vizContainer"),
      url = this.ticketUrl,
      options = {
        hideTabs: true,
        onFirstInteractive: function () {},
      };
    if (this.viz) {
      this.viz.dispose();
    }
    this.viz = new tableau.Viz(containerDiv, url, options);
  }
}
