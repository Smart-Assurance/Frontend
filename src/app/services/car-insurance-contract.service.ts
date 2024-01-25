import { Injectable } from '@angular/core';
import { Web3 } from 'web3';
import axios from 'axios';

//import ContractABI from "../../../../Hardhat_Env/artifacts/contracts/CarInsurance.sol/CarInsurance.json";
//import ContractABI from "../../../../Hardhat_Environment/artifacts/contracts/CarInsurance.sol/CarInsurance.json";

@Injectable({
  providedIn: 'root'
})
export class CarInsuranceContractService {

  web3js: any;
  provider: any;
  accounts: any;

  //private contractAddress = '0x100083200dD0655aBEdaf984963dD859bFe097a6';
  private contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  private contractABI=[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "client",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "AmountSentToClient",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "client",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "insuranceType",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "InsurancePurchased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "client",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "insuranceType",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "MonthlyTransaction",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "typeId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "charges",
          "type": "uint256"
        },
        {
          "internalType": "string[]",
          "name": "privileges",
          "type": "string[]"
        }
      ],
      "name": "addInsuranceType",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "clientInsuranceSelection",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "clientTransactions",
      "outputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "client",
          "type": "address"
        }
      ],
      "name": "getAllClientInsurances",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        },
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "client",
          "type": "address"
        }
      ],
      "name": "getAllClientReceive",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct CarInsurance.TransferStruct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "client",
          "type": "address"
        }
      ],
      "name": "getAllClientTransactions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct CarInsurance.TransferStruct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllInsuranceTypes",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "charges",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "privileges",
              "type": "string[]"
            }
          ],
          "internalType": "struct CarInsurance.InsuranceType[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "typeId",
          "type": "uint256"
        }
      ],
      "name": "getCoverageDetails",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "charges",
          "type": "uint256"
        },
        {
          "internalType": "string[]",
          "name": "privileges",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "insuranceActivationTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "insuranceTypes",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "charges",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "monthlyTransaction",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "purchaseInsurance",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "typeId",
          "type": "uint256"
        }
      ],
      "name": "selectInsuranceType",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "client",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "sendAmountToClient",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  constructor() { }

  async purchaseInsurance(): Promise<void> {
    try {
      if ((window as any).ethereum) {
        this.provider = (window as any).ethereum;
        const web3 = new Web3(this.provider);
        const CarInsuranceContract = new web3.eth.Contract(this.contractABI, this.contractAddress);
        const accounts = await web3.eth.getAccounts();
        const fromAccount = accounts[0];
        //@ts-ignore
        await CarInsuranceContract.methods.purchaseInsurance().send({ from: fromAccount, value: web3.utils.toWei('1', 'ether') }); // Adjust the value as needed
      } else {
        throw new Error('No Ethereum provider found. Please install MetaMask.');
      }
    } catch (error) {
      console.error('Error purchasing insurance:', error);
      throw new Error('Error purchasing insurance');
    }
  }


  //from client to contract address
  async sendAmountToClient(clientAddress: string, InsuranceAddress: string, amount: number): Promise<void> {
    try {
      if ((window as any).ethereum) {
        this.provider = (window as any).ethereum;
        const web3 = new Web3(this.provider);
        const CarInsuranceContract = new web3.eth.Contract(this.contractABI, this.contractAddress);
        const accounts = await web3.eth.getAccounts();
        const fromAccount = accounts[0];
        const client = clientAddress.toLowerCase();
        const insuranceAddress = InsuranceAddress.toLowerCase();

        const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

        await web3.eth.sendTransaction({
          from: client,
          to: insuranceAddress,
          value: amountInWei,
          gasPrice: web3.utils.toWei('80', 'gwei'),
          gas: '10000000',
        });

        console.log(`Sent ${amount}ETH from ${client} to ${insuranceAddress} successfully`);
      } else {
        throw new Error('No Ethereum provider found. Please install MetaMask.');
      }
    } catch (error) {
      console.error('Error sending amount to client:', error);
      throw new Error('Error sending amount to client');
    }
  }

  async sendEtherFromContract(clientAddress: string, amount: number): Promise<void> {
    try {
      if ((window as any).ethereum) {
        this.provider = (window as any).ethereum;
        const web3 = new Web3(this.provider);
        const CarInsuranceContract = new web3.eth.Contract(this.contractABI, this.contractAddress);
        const accounts = await web3.eth.getAccounts();
        const fromAccount = accounts[2];
        const client = clientAddress.toLowerCase();

        const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

        await web3.eth.sendTransaction({
          from: fromAccount,
          to: client,
          value: amountInWei,
          gasPrice: web3.utils.toWei('80', 'gwei'),
          gas: '10000000',
        });

        console.log(`Sent ${amount} ETH to ${client} successfully`);

      } else {
        throw new Error('No Ethereum provider found. Please install MetaMask.');
      }
    } catch (error) {
      console.error('Error sending amount to client:', error);
      throw new Error('Error sending amount to client');
    }
  }

  async getTransactionHistory(address: string): Promise<any[]> {
    try {
      if ((window as any).ethereum) {
        this.provider = (window as any).ethereum;
        const web3 = new Web3(this.provider);

        /* const apiKey = '67D97NMC4EHHNZIZS8U245SNU9MTTWD3GK';
         const apiUrl = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${apiKey}`;
   */
        const apiKey = 'D9KBA365ZE7BHW5B5SXRMYBZ5ZNKQ462AD';
        const apiUrl = `https://api-sepolia.basescan.org/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&page=1&offset=2&sort=asc&apikey=${apiKey}`;

        const response = await axios.get(apiUrl);
        const transactions = response.data.result;

        return transactions;
      } else {
        throw new Error('No Ethereum provider found. Please install MetaMask.');
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      throw new Error('Error fetching transaction history');
    }
  }

  async getAllClientTransactions(clientAddress: string): Promise<any[]> {
    try {
      if ((window as any).ethereum) {
        this.provider = (window as any).ethereum;
        const web3 = new Web3(this.provider);
        const carInsuranceContract = new web3.eth.Contract(this.contractABI, this.contractAddress);

        const client = clientAddress.toLowerCase();

        //@ts-ignore
        const transactions = await carInsuranceContract.methods.getAllClientTransactions(client).call({
          from: (await web3.eth.getAccounts())[0],
        });

        //@ts-ignore
        return transactions;
      } else {
        throw new Error('No Ethereum provider found. Please install MetaMask.');
      }
    } catch (error) {
      console.error('Error getting client transactions:', error);
      throw new Error('Error getting client transactions');
    }
  }



}
