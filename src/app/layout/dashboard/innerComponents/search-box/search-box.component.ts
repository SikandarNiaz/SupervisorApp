import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: "search-box",
  templateUrl: "./search-box.component.html",
  styleUrls: ["./search-box.component.scss"],
})
export class SearchBoxComponent {
  isActive = true;
  @Input("list") data: any;
  @Output() notify: EventEmitter<any> = new EventEmitter();
  filteredList: any = [];
  value: String;

  applyFilter() {
    if (!this.value) {
      this.filteredList = this.data;
    } else {
      this.filteredList = this.data.filter((x) =>
        Object.keys(x).some((key) =>
          String(x[key]).toLowerCase().includes(this.value.toLowerCase())
        )
      );
    }
    this.notify.emit(this.filteredList);
  }
  cancelFilter() {
    this.value = "";
    this.filteredList = this.data;
    this.notify.emit(this.filteredList);
  }
}
