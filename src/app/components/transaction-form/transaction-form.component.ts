import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CarInsuranceContractService } from 'src/app/services/car-insurance-contract.service';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit{

  clientAddress: string = '';
  insuranceAddress: string = '';
  amountToSend: number = 0;
  clientTransactions: any[] = [];
  contracts: any[] = [];
  selectedContract: any;

  ngOnInit() {
    this.thirdFormGroup = this._formBuilder.group({
      contract: ['', Validators.required],
    });

    // Subscribe to contracts$ observable to get the latest contracts
    this.contractsService.contracts$.subscribe(contracts => {
      this.contracts = contracts;
    });

    // Trigger the getAll method to fetch contracts
    this.contractsService.getAll();
  }

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
    type: ['', Validators.required],
    matricule: ['', Validators.required],
    price: ['', Validators.required],
    grey_card_number: ['', Validators.required],
    model: ['', Validators.required],
    marque: ['', Validators.required],
    puissanceFiscale: ['', Validators.required],
    carburant: ['', Validators.required],
    annee: [null, Validators.required],
    boiteDeVitesses: ['', Validators.required],
    etatDeVehicule: ['', Validators.required]  });

  thirdFormGroup = this._formBuilder.group({
      contract: ['', Validators.required],
    });

  constructor(
    private _formBuilder: FormBuilder,
    private carInsuranceService: CarInsuranceContractService,
    private contractsService: ContractsService
    ) {}

    onContractSelected() {
      const selectedContractId = this.thirdFormGroup.get('contract')?.value;
  
      // Find the selected contract from the contracts array
      this.selectedContract = this.contracts.find(contract => contract.id === selectedContractId);
  
      // If you have a service method to fetch the description, call it here
      // For example: this.fetchContractDescription(selectedContractId);
    }

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
