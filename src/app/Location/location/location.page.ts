import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Location } from 'src/app/Models/Location';
import { Router } from '@angular/router';
import { TollBooth } from 'src/app/Models/TollBooth';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  public locations$: Location;
  public location;
  public isLocation: boolean;
  public tollbooths: TollBooth;
  public tollboothSelected: TollBooth;
  constructor(
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.locationService.GetLocations().subscribe(res => {
      this.locations$ = res;
      // console.log(res);
    });
  }

  ChooseLocation() {
    console.log(this.location);
    console.log(this.tollboothSelected);
    this.router.navigate(['/tabs/home'], {
      queryParams: {
        locationid: this.location.id,
        tollboothid: this.tollboothSelected.id
      }
  });
}


  GetTollbooths(id: number) {
    this.locationService.GetTollBooths(id).subscribe(item => {
      this.tollbooths = item;
      console.log(this.tollbooths);
    });
  }
}
