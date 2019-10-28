import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from 'src/app/Models/Location';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public location$: Location;

  constructor(
    private http: HttpClient
  ) { }

  public GetLocations(): Observable<any> {
    return this.http.get('https://localhost:44313/api/locations');
  }

  public GetLocation(id: number): Observable<any> {
    return this.http.get(`https://localhost:44313/api/locations/${id}`);
  }

  public GetTollBooths(id: number): Observable<any> {
    return this.http.get(environment.baseUri + `/locations/${id}/tollbooths`);
  }
  public GetTollBooth(locationId: number, tollboothId: number): Observable<any> {
    return this.http.get(environment.baseUri + `/locations/${locationId}/tollbooths/${tollboothId}`);
  }

}
