import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { elementStart } from "@angular/core/src/render3";
import { NG_PROJECT_AS_ATTR_NAME } from "@angular/core/src/render3/interfaces/projection";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { Config } from "src/assets/config";
import mapboxgl from "mapbox-gl";
declare const google: any;
declare var ol: any;
@Component({
  selector: "section-two-view",
  templateUrl: "./section-two-view.component.html",
  styleUrls: ["./section-two-view.component.scss"],
})
export class SectionTwoViewComponent implements OnInit {
  @Input("data") data;
  locationMap: any;
  mapSrc: SafeResourceUrl;
  map: any;
  ip: any = Config.BASE_URI;
  projectType: any;

  constructor(public sanitizer: DomSanitizer) {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2lrYW5kYXJuaWF6IiwiYSI6ImNrd3FiYWkwZzBrd3UycHBtOGNnYWY1Nm4ifQ.NSL0s456ejrd4QFu4cvZ6w";
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes.data.currentValue;
    this.locationMap = this.data.sectionMap;
    this.projectType = localStorage.getItem("projectType");
    if (this.projectType == "PMI_CENSUS") {
      this.initialize_map();
    } else {
      this.initialize_map_pg();
    }
  }

  initialize_map() {
    this.map = new ol.Map({
      target: "map",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM({
            url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new ol.View({
        center: ol.proj.transform(
          [
            parseFloat(this.locationMap.routeLongitude),
            parseFloat(this.locationMap.routeLatitude),
          ],
          "EPSG:4326",
          "EPSG:3857"
        ),
        zoom: 18,
      }),
    });
    this.add_map_point(
      this.locationMap.latitude,
      this.locationMap.longitude,
      1,
      "Start Location"
    );
    this.add_map_point(
      this.locationMap.endLatitude,
      this.locationMap.endLongitude,
      2,
      "End Location"
    );
    this.add_map_point(
      this.locationMap.routeLatitude,
      this.locationMap.routeLongitude,
      3,
      "Route Location"
    );
  }

  initialize_map_pg() {
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.locationMap.longitude, this.locationMap.latitude],
      zoom: 14,
    });
    const marker1 = new mapboxgl.Marker()
      .setLngLat([this.locationMap.longitude, this.locationMap.latitude])
      .addTo(this.map);
    this.map.addControl(new mapboxgl.NavigationControl());
    setTimeout(() => this.map.resize(), 0);
  }

  add_map_point(lat, lng, index, title) {
    const vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.transform(
                [parseFloat(lng), parseFloat(lat)],
                "EPSG:4326",
                "EPSG:3857"
              )
            ),
          }),
        ],
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.6, 0.6],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: this.ip + "images/" + index + ".png",
        }),
        fill: new ol.style.Fill({
          color: "rgba(255,255,255,0.4)",
        }),
        stroke: new ol.style.Stroke({
          color: "#3399CC",
          width: 1.25,
        }),
        text: new ol.style.Text({
          font: "12px Calibri,sans-serif",
          fill: new ol.style.Fill({ color: "#000" }),
          stroke: new ol.style.Stroke({
            color: "#fff",
            width: 2,
          }),
          text: title,
        }),
      }),
    });
    this.map.addLayer(vectorLayer);
  }
}

// initialize_map_pg() {
//   this.map = new ol.Map({
//     target: "map",
//     layers: [
//       new ol.layer.Tile({
//         source: new ol.source.OSM({
//           url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
//         }),
//       }),
//     ],
//     view: new ol.View({
//       center: ol.proj.transform(
//         [
//           parseFloat(this.locationMap.longitude),
//           parseFloat(this.locationMap.latitude),
//         ],
//         "EPSG:4326",
//         "EPSG:3857"
//       ),
//       zoom: 18,
//     }),
//   });
//   this.add_map_point(
//     this.locationMap.latitude,
//     this.locationMap.longitude,
//     1,
//     "Start Location"
//   );
// }
