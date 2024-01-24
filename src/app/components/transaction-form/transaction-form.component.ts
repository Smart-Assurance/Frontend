import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CarInsuranceContractService } from 'src/app/services/car-insurance-contract.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent {

  clientAddress: string = '';
  insuranceAddress: string = '';
  amountToSend: number = 0;
  clientTransactions: any[] = [];

  firstFormGroup = this._formBuilder.group({
    f_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    city: ['Tangier'],
    address: ['', Validators.required],
    cin: ['', Validators.required],
    date_of_birth: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private carInsuranceService: CarInsuranceContractService) {}

  //from client to contract address
  async sendAmountFromClient(): Promise<void> {
    try {
      if (this.clientAddress && this.insuranceAddress && this.amountToSend > 0) {
        await this.carInsuranceService.sendAmountToClient(this.clientAddress, this.insuranceAddress,this.amountToSend);
        this.clientAddress = '';
        this.amountToSend = 0;
      } else {
        console.warn('Please provide a valid client address and amount to send.');
      }
    } catch (error) {
      console.error('Error sending amount to client:', error);
    }
  }
}
