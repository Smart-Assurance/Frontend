import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  constructor(private modalService: NgbModal,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    // Call your spinner function after a timeout
    setTimeout(() => {
      this.hideSpinner();
    }, 1000); // 1000 milliseconds (1 second) timeout, adjust as needed

    this.isLoggedIn = this.authenticationService.isLoggedIn()
  }

  // Function to hide the spinner
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
  
}
