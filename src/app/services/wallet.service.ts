import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';

//import contractABI from "../../../../Hardhat_Env/artifacts/contracts/CarInsurance.sol/CarInsurance.json";
import contractABI from "../../../../Hardhat_Environment/artifacts/contracts/CarInsurance.sol/CarInsurance.json";

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private ethereum: any;

  //private contractAddress = '0x100083200dD0655aBEdaf984963dD859bFe097a6';
  private contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  private currentAccountSubject = new BehaviorSubject<string>('');
  public currentAccount = this.currentAccountSubject.asObservable();
  
  constructor() {
    this.ethereum = (window as any).ethereum;
   }

   public async getEthereumContract() {
    const provider = new ethers.BrowserProvider(this.ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(this.contractAddress, contractABI.abi, await signer);
    
    console.log({
      provider,
      signer,
      transactionContract
    });
  }

  private async checkIfWalletIsConnect(): Promise<void> {
    try {
      if (!this.ethereum) {
        alert('Please install MetaMask.');
        return;
      }

      const accounts = await this.ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        this.setCurrentAccount(accounts[0]);
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async connectWallet(): Promise<void> {
    try {
      if (!this.ethereum) {
        alert('Please install MetaMask.');
        return;
      }

      const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });

      this.setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object');
    }
  }

  private setCurrentAccount(account: string): void {
    this.currentAccountSubject.next(account);
  }

  public checkWalletConnection(): void {
    this.checkIfWalletIsConnect();
  }
}
