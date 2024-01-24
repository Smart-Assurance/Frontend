import { Component, OnInit } from '@angular/core';
import { WalletService } from './services/wallet.service';
import { CarInsuranceContractService } from './services/car-insurance-contract.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'smart-assurance-client';

  clientAddress: string = '';
  insuranceAddress: string = '';
  amountToSend: number = 0;
  clientTransactions: any[] = [];

  constructor(
    private ethereumService: WalletService,
    private CarInsuranceService: CarInsuranceContractService,
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.checkWalletConnection();
  }

  private checkWalletConnection(): void {
    this.ethereumService.currentAccount.subscribe(account => {
      console.log('Current Account:', account);
    });
    this.ethereumService.checkWalletConnection();
  }

  async purchaseInsurance() {
    try {
      await this.CarInsuranceService.purchaseInsurance();
    } catch (error) {
      console.error('Error purchasing insurance:', error);
    }
  }

  async sendEtherFromContract(): Promise<void> {
    try {
      if (this.clientAddress && this.insuranceAddress && this.amountToSend > 0) {
        await this.CarInsuranceService.sendAmountToClient(this.clientAddress, this.insuranceAddress, this.amountToSend);
        this.clientAddress = '';
        this.amountToSend = 0;
      } else {
        console.warn('Please provide a valid client address and amount to send.');
      }
    } catch (error) {
      console.error('Error sending amount to client:', error);
    }
}

transactionHistory: any[] = [];
async getTransactionHistory(): Promise<void> {
  try {
    if (this.clientAddress) {
      this.transactionHistory = await this.CarInsuranceService.getTransactionHistory(this.clientAddress);
      
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

  async getClientTransactions() {
    try {
      if (this.clientAddress) {
        this.clientTransactions = await this.CarInsuranceService.getAllClientTransactions(this.clientAddress);
        console.log('Client Transactions:', this.clientTransactions);
      } else {
        console.warn('Please provide a valid client address.');
      }
    } catch (error) {
      console.error('Error getting client transactions:', error);
    }
  }


}
