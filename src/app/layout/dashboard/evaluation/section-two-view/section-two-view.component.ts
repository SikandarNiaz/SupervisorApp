import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Config } from "src/assets/config";

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Icon from 'ol/style/Icon.js';
import Style from 'ol/style/Style.js';
import { fromLonLat } from 'ol/proj.js';
import { Circle as CircleGeom } from 'ol/geom.js';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import { extend } from 'ol/extent.js';

@Component({
  selector: "section-two-view",
  templateUrl: "./section-two-view.component.html",
  styleUrls: ["./section-two-view.component.scss"],
})
export class SectionTwoViewComponent implements OnInit {
  @Input("data") data;
  locationMap: any;
  map: Map;
  ip: string = Config.BASE_URI;
  projectType: any;
  colorType1 = "../../../../../assets/map-marker-icons/";
  colorType = Config.BASE_URI + "/images/map-marker-icons/";

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.data = changes.data.currentValue;
      this.locationMap = this.data.sectionMap;
      this.projectType = localStorage.getItem("projectType");

      console.log("Received data:", this.data);
      console.log("Location Map:", this.locationMap);

      this.initializeMap();
    }
  }

  initializeMap() {
    const center = fromLonLat([parseFloat(this.locationMap.routeLongitude), parseFloat(this.locationMap.routeLatitude)]);

    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: center,
        zoom: 14,
      }),
    });

    const features: Feature[] = [];
    const extent = [Infinity, Infinity, -Infinity, -Infinity];

    // Add all the markers (pins)
    features.push(...this.createPointFeature(this.locationMap.latitude, this.locationMap.longitude, "redish.png", "Start Location", extent));  // Start
    features.push(...this.createPointFeature(this.locationMap.endLatitude, this.locationMap.endLongitude, "yellow.png", "End Location", extent));  // End
    features.push(...this.createPointFeature(this.locationMap.routeLatitude, this.locationMap.routeLongitude, "yellow.png", "Route Location", extent));  // Route
    features.push(...this.createPointFeature(this.locationMap.systemLatitude, this.locationMap.systemLongitude, "yellow.png", "System Location", extent));  // System

    const vectorSource = new VectorSource({ features: features });
    const vectorLayer = new VectorLayer({ source: vectorSource });
    this.map.addLayer(vectorLayer);

    // Add circle for system location if valid
    let lat: number;
let lng: number;

if (this.isValidCoordinate(this.locationMap.systemLatitude) && this.isValidCoordinate(this.locationMap.systemLongitude)) {
  lat = parseFloat(this.locationMap.systemLatitude);
  lng = parseFloat(this.locationMap.systemLongitude);
} else if (this.isValidCoordinate(this.locationMap.latitude) && this.isValidCoordinate(this.locationMap.longitude)) {
  lat = parseFloat(this.locationMap.latitude);
  lng = parseFloat(this.locationMap.longitude);
} else {
  console.warn("No valid coordinates found to draw circle.");
  return; // Stop here if no valid pair found
}

const sysCoord = fromLonLat([lng, lat]);

const circleFeature = new Feature({
  geometry: new CircleGeom(sysCoord, 100), // 100 meters radius
});

circleFeature.setStyle(
  new Style({
    stroke: new Stroke({
      color: "red",
      width: 2,
    }),
    fill: new Fill({
      color: "rgba(255, 0, 21, 0.2)",
    }),
  })
);

const circleLayer = new VectorLayer({
  source: new VectorSource({
    features: [circleFeature],
  }),
});

this.map.addLayer(circleLayer);

// Expand extent to include the circle area
extend(extent, circleFeature.getGeometry().getExtent());


    if (!isFinite(extent[0])) {
      console.warn("No valid points to display or fit on map.");
    } else {
      this.map.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 16 });
    }
  }

  createPointFeature(lat, lng, iconFile, label, extent): Feature[] {
    const features: Feature[] = [];

    if (this.isValidCoordinate(lat) && this.isValidCoordinate(lng)) {
      console.log(`Placing ${label} at lat: ${lat}, lng: ${lng}`);
      const coord = fromLonLat([parseFloat(lng), parseFloat(lat)]);
      extend(extent, [coord[0], coord[1], coord[0], coord[1]]);

      const feature = new Feature({
        geometry: new Point(coord),
        name: label,
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: `${this.colorType}${iconFile}`, // local assets path
            scale: 0.5, // increased scale
          }),
        })
      );

      features.push(feature);
    } else {
      console.warn(`Invalid or missing coordinates for ${label}:`, lat, lng);
    }

    return features;
  }

  isValidCoordinate(value): boolean {
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
  }
}
