import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractManagement {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    return this.http.get<any>(environment.apiUrlContracts + '/contracts/getAll');
  }

}
