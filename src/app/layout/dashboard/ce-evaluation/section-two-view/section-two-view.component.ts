import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

declare const google: any;

@Component({
  selector: 'section-two-view',
  templateUrl: './section-two-view.component.html',
  styleUrls: ['./section-two-view.component.scss']
})
export class SectionTwoViewComponent implements OnInit, AfterViewInit {
  @Input('data') data: any;

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  lat: number;
  long: number;
  systemLat: number;
  systemLong: number;
  mapReady: boolean = false;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.data = changes.data.currentValue;

      const mapData = this.data.sectionMap;
      this.lat = parseFloat(mapData.latitude);
      this.long = parseFloat(mapData.longitude);
      this.systemLat = parseFloat(mapData.systemLatitude);
      this.systemLong = parseFloat(mapData.systemLongitude);

      this.mapReady = true;
    }
  }

  ngAfterViewInit(): void {
    // Wait for DOM to fully render
    setTimeout(() => {
      if (this.mapReady) {
        this.loadMap();
      }
    }, 100); // short delay ensures map div exists
  }

  loadMap(): void {
    const mapOptions = {
      center: new google.maps.LatLng(this.lat, this.long),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

    // Main marker
    new google.maps.Marker({
      position: new google.maps.LatLng(this.lat, this.long),
      map,
      title: 'Main Location',
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });

    // System marker
    if (this.systemLat && this.systemLong) {
      new google.maps.Marker({
        position: new google.maps.LatLng(this.systemLat, this.systemLong),
        map,
        title: 'System Location',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      });
    }
  }
}
