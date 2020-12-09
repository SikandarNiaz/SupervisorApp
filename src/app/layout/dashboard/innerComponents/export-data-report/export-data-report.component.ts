import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-export-data-report",
  templateUrl: "./export-data-report.component.html",
  styleUrls: ["./export-data-report.component.scss"],
})
export class ExportDataReportComponent implements OnInit {
  title = "";
  projectType: any;
  constructor() {
    this.projectType = localStorage.getItem("projectType");
    if (this.projectType == "NIVEA" || this.projectType == "NFL") {
      this.title = "Performance Dashboard";
    } else {
      this.title = "Export Data";
    }
  }

  ngOnInit() {}
}
