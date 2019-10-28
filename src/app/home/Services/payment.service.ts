import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import { Incomes } from 'src/app/Models/Incomes';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient
  ) { }

  public GetCategories(): Observable<any> {
    return this.http.get(environment.baseUri + '/categories');
  }

  public GetPrice(locationId: number, categoryId: number) {
    return this.http.get(environment.baseUri + `/prices/${locationId}/${categoryId}`);
  }

  public MakePayment(income: Incomes): Observable<any> {
    return this.http.post(environment.baseUri + '/incomes', income);
  }

}
