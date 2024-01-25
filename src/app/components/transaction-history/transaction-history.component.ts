import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarInsuranceContractService } from 'src/app/services/car-insurance-contract.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent {

  constructor(private carInsuranceService: CarInsuranceContractService) { }

  transactionHistory: any[] = [];
  clientAddress: string = '';

  async getTransactionHistory(): Promise<void> {
    try {
      if (this.clientAddress) {
        this.transactionHistory = await this.carInsuranceService.getTransactionHistory(this.clientAddress);

        console.log('Transaction History:', this.transactionHistory);
      } else {
        console.warn('Please provide a valid client address.');
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  }

  getFormattedDate(timestamp: number | null): string {
    if (timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    } else {
      return 'Timestamp not available';
    }
  }

  //carousel options:
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 900,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
}
