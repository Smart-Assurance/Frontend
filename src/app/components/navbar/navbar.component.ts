import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { MatDialog } from '@angular/material/dialog';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit  {
  showSpinner: boolean = true;
  isModalOpen = false;
  isLoggedIn=false;
  username="test test"

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  constructor(
    private ethereumService: WalletService,
    private modalService: NgbModal,
    private authenticationService:AuthenticationService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    
    setTimeout(() => {
      this.hideSpinner();
    }, 1000); 

    this.authenticationService.loginStatus$.subscribe((status) => {
      this.isLoggedIn = status || this.authenticationService.isLoggedIn();
    });  }

  hideSpinner() {
    this.showSpinner = false;
  }


  openModal(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' }); // Adjust size and options as needed
  }

  logout(){
    this.authenticationService.logout()
    this.isLoggedIn=false
  }

  private checkWalletConnection(): void {
    this.ethereumService.currentAccount.subscribe(account => {
      console.log('Current Account:', account);
    });
    this.ethereumService.checkWalletConnection();
  }

  public connectWallet(): void {
    this.ethereumService.connectWallet()
      .then(() => {
        this.checkWalletConnection();
      })
      .catch(error => {
        console.error(error);
      });
  }

  openTransactionDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(TransactionFormComponent, {
      width: '60%',
      height: '60%',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: false,
    });
  }
  
}
