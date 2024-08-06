import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/layout/dashboard/dashboard.service";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-upload-training",
  templateUrl: "./upload-training.component.html",
  styleUrls: ["./upload-training.component.css"],
})
export class UploadTrainingComponent implements OnInit {
  title = "Upload Training";
  loadingData: boolean;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2100, 0, 1); // Set maxDate to a far future date
  startDate = new Date();
  endDate = new Date();
  Surveyors: any[] = [];
  selectedSurveyors: number[] = [];
  fileToUpload: File | null = null;
  fileName: string = "";
  searchQuery: string = "";

  constructor(
    private dashboardService: DashboardService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.gettingSurveyor();
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0]; // Save the selected file
      this.fileName = this.fileToUpload.name; // Get the file name
    }
  }

  gettingSurveyor() {
    this.dashboardService.gettingSurveyors().subscribe(
      (response: any[]) => {
        this.Surveyors = response.map((item) => ({ ...item }));
        console.log(this.Surveyors, "Surveyor list");
      },
      (error) => {
        console.log(error, "error");
      }
    );
  }

  onSurveyorChange(event) {
    console.log("Selected Surveyor IDs:", this.selectedSurveyors);
    // Your logic to handle surveyor change
  }

  selectAllSurveyors(event: Event) {
    event.stopPropagation();
    this.selectedSurveyors = this.Surveyors.map((surveyor) => surveyor.id);
    console.log("Selected Surveyors:", this.selectedSurveyors);
  }

  deselectAllSurveyors(event: Event) {
    event.stopPropagation();
    this.selectedSurveyors = [];
    console.log("Deselected Surveyors:", this.selectedSurveyors);
  }

  filteredSurveyors() {
    if (!this.searchQuery) {
      return this.Surveyors;
    }
    return this.Surveyors.filter((surveyor) =>
      surveyor.mCode.toLowerCase().includes(this.searchQuery.toLowerCase())
    ).sort((a, b) => {
      const aIndex = a.mCode
        .toLowerCase()
        .indexOf(this.searchQuery.toLowerCase());
      const bIndex = b.mCode
        .toLowerCase()
        .indexOf(this.searchQuery.toLowerCase());
      if (aIndex === bIndex) {
        return a.mCode.localeCompare(b.mCode);
      }
      return aIndex - bIndex;
    });
  }

  uploadTrainingPDF() {
    if (!this.fileToUpload) {
      this.toaster.error("Please select a file to upload.", "Error");
      return;
    }

    this.loadingData = true;

    const formData = new FormData();
    formData.append("file", this.fileToUpload);
    formData.append("startDate", moment(this.startDate).format("YYYY-MM-DD"));
    formData.append("endDate", moment(this.endDate).format("YYYY-MM-DD"));
    formData.append(
      "title",
      this.fileToUpload.name.split(".").slice(0, -1).join(".")
    ); // Remove extension
    formData.append(
      "description",
      this.fileToUpload.name.split(".").slice(0, -1).join(".")
    );
    formData.append("surveyorIds", JSON.stringify(this.selectedSurveyors));

    console.log("Uploading PDF with dates and additional fields:", formData);

    this.dashboardService.uploadTrainingPDF(formData).subscribe(
      (response) => {
        this.loadingData = false;
        console.log("Upload successful:", response);
        this.toaster.success("uploaded successfully!", "Success");
      },
      (error) => {
        this.loadingData = false;
        console.error("Upload failed:", error);
        this.toaster.error("Failed to upload.", "Error");
      }
    );
  }

  modifyDate(date) {
    return moment(date).format("YYYY-MM-DD");
  }
}
