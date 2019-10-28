import { Injectable } from '@angular/core';
import { User } from 'src/app/Models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userDummy: User = {
    Id: 1,
    Name: 'Matei Emil',
    Username: 'admin',
    Password: 'admin123'
  };
  user: User;

  constructor(
    private http: HttpClient
  ) { }

  Login(user: any): Observable<any> {
    return this.http.post(environment.baseUri + '/login', user);
  }
}
