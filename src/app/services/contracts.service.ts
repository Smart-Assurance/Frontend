import { Injectable } from '@angular/core';
import { ContractManagement } from '../api/contracts.api';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  private contractSubject = new BehaviorSubject<any[]>([]);
  contracts$ = this.contractSubject.asObservable();

  constructor(
    private contractManagemnet: ContractManagement,
    private router: Router,
  ) {}

  public getAll(): void {
    this.contractManagemnet.getAll().subscribe({
      next: (response) => {
        this.contractSubject.next(response);
      },
      error: (error) => {
        console.error("Error during get all:", error);
      }
    });
  }
}
