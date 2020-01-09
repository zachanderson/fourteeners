import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { tap, filter } from 'rxjs/operators';
import { IMountain } from '../../interfaces/mountain';
import { MountainService } from '../../services/mountain.service';
import {fromLonLat} from 'ol/proj';
import {Fill, RegularShape, Stroke, Style} from 'ol/style';
import Draw from 'ol/interaction/Draw';
import {Vector as VectorSource} from 'ol/source';

@Component({
  selector: 'app-mountain-map',
  templateUrl: './mountain-map.component.html',
  styleUrls: ['./mountain-map.component.scss']
})
export class MountainMapComponent implements OnInit, AfterViewInit {
lat:number;
long:number;

private map: Map;
private view: View;
private star: Style;
draw: Draw;
source: VectorSource;

  constructor(private mountainService: MountainService) { 

    this.mountainService.activeModel$    
    .pipe(
      filter(mtn=> !!mtn),
      filter(am => !!am),
      tap(am => this.flyTo(fromLonLat([am.Long, am.Lat])))
    ).subscribe();

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.source = new VectorSource({wrapX: false});
    this.view = new View({
      center: fromLonLat([-105.718758, 39.099594]),
      zoom: 7
    });
    this.map = new Map({
      target: 'mapdiv',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: this.view
    });
  }

  private flyTo(location, done?) {
    let duration = 5000;
    let zoom = 13;
    let parts = 2;
    let called = false;
    function callback(complete) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
        done && done(complete);
      }
    }
    this.view.animate({
      center: location,
      duration
    }, callback);
    this.view.animate({
      zoom: zoom - 6,
      duration: duration / 2
    }, {
      zoom,
      duration: duration / 2
    }, callback);
  }

  
}
