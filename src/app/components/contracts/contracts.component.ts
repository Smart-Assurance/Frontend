import { Component, OnInit } from '@angular/core';
import { ContractsService } from 'src/app/services/contracts.service';
import { ReadMoreComponent } from '../read-more/read-more.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit{
  contracts: any[] = [];

  constructor(private contractService: ContractsService,    private modalService: NgbModal
    ) {}

  
  openContractDetailModal(offer: any): void {
    const modalRef = this.modalService.open(ReadMoreComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.offer = offer; 
  }

  ngOnInit(): void {
    // Subscribe to the clients$ observable to get updates
    this.contractService.contracts$.subscribe((data) => {
      this.contracts = data;
    });

    // Trigger the API call to get clients
    this.contractService.getAll();    
  }

}
