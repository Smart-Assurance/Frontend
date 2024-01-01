import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/auth/login', {
      username: username,
      password: password,
    });
  }

  public register(
    l_name:string,f_name:string,username:string,password:string,email:string,phone:string,city:string,address:string,cin:string,date_of_birth:Date

  ): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/auth/register', {
      l_name: l_name,
      f_name: f_name,
      username: username,
      password: password,
      email: email,
      phone: phone,
      city: city,
      address: address,
      cin: cin,
      date_of_birth: date_of_birth,
    });
  }
}
