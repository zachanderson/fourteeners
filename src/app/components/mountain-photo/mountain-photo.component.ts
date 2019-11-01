import { Component, OnInit } from '@angular/core';
import { IMountain } from '../../interfaces/mountain';
import { MountainService } from '../../services/mountain.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-mountain-photo',
  templateUrl: './mountain-photo.component.html',
  styleUrls: ['./mountain-photo.component.scss']
})
export class MountainPhotoComponent implements OnInit {
  photo: string
  
  constructor(private mountainService: MountainService ) { 
    this.mountainService.activeModel$    
    .pipe(
      tap((mtn:IMountain) => this.photo = mtn.photo )
    ).subscribe();

  }

  ngOnInit() {
  }

}
