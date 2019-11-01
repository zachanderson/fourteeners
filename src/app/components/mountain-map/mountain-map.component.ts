import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { tap, filter } from 'rxjs/operators';
import { IMountain } from 'src/app/interfaces/mountain';
import { MountainService } from 'src/app/services/mountain.service';

@Component({
  selector: 'app-mountain-map',
  templateUrl: './mountain-map.component.html',
  styleUrls: ['./mountain-map.component.scss']
})
export class MountainMapComponent implements OnInit, AfterViewInit {
lat:number;
long:number;

  constructor(private mountainService: MountainService) { 

    this.mountainService.activeModel$    
    .pipe(
      filter(mtn=> !!mtn),
      tap((mtn:IMountain) => {
        this.lat = mtn.Lat;
        this.long = mtn.Long;
      })
    ).subscribe();

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const map = new Map({
      target: 'mapdiv',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  }



  //  flyTo(location, done) {
  //   var duration = 2000;
  //   var zoom = view.getZoom();
  //   var parts = 2;
  //   var called = false;
  //   function callback(complete) {
  //     --parts;
  //     if (called) {
  //       return;
  //     }
  //     if (parts === 0 || !complete) {
  //       called = true;
  //       done(complete);
  //     }
  //   }
  //   view.animate({
  //     center: location,
  //     duration: duration
  //   }, callback);
  //   view.animate({
  //     zoom: zoom - 1,
  //     duration: duration / 2
  //   }, {
  //     zoom: zoom,
  //     duration: duration / 2
  //   }, callback);
  // }

}
