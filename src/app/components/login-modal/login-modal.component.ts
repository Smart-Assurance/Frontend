import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          transform: 'scale(1)',
          opacity: 1,
        })
      ),
      state(
        'close',
        style({
          transform: 'scale(0)',
          opacity: 0,
        })
      ),
      transition('open => close', [animate('0.25s ease-in')]),
      transition('close => open', [animate('0.25s ease-out')]),
    ]),
  ],
})
export class LoginModalComponent implements OnInit{
  @Input() showModal: boolean | undefined;
  @Output() toggleModal = new EventEmitter<boolean>();
  isLoggedIn: boolean = false;

  //Register Modal
  isModalOpen = false;

  toggleRegisterModal() {
    this.isModalOpen = !this.isModalOpen;
    this.showModal=false
  }

  

  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.authenticationService.loginStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
  
  openModal(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' }); // Adjust size and options as needed
  }

  closeModal() {
    this.modalService.dismissAll(); // Adjust size and options as needed
  }



  toggle() {
    this.toggleModal.emit();
  }


  password: string = '';
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const inputEl = document.getElementById('password');
    if (inputEl) {
      inputEl.setAttribute('type', this.showPassword ? 'text' : 'password');
    }
  }

  login() {
    if (this.loginForm?.valid) {
      this.authenticationService.login(
        this.loginForm.get('username')!.value,
        this.loginForm!.get('password')!.value
      );
      this.showModal=false
      this.loginForm.reset()
    }
  }

  navigateToSignUp() {
    // Implement the logic to navigate to the sign-up page or show a sign-up modal
    this.showModal=false
  }
}
