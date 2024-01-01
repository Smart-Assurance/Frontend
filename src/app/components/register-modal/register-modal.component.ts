import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
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
export class RegisterModalComponent {
  @Input() showRegisterModal: boolean | undefined;
  @Output() toggleRegisterModal = new EventEmitter<boolean>();
  registrationForm: FormGroup;
  cities: string[] = [
    'Casablanca',
    'Rabat',
    'Marrakech',
    'Fes',
    'Tangier',
    'Agadir',
    'Kenitra',
    'Oujda',
    'Tetouan',
    'El Jadida',
    'Taza',
    'Khouribga',
    'Meknes',
    'Sale',
    'Nador',
    'Beni Mellal',
    'Ouarzazate',
    'Al Hoceima',
    'Settat',
    'Mohammedia',
    'Larache',
    'Khémisset',
    'Taourirt',
    'Errachidia',
    'Taroudant',
    'Safi',
    'Guelmim',
    'Ksar El Kebir',
    'Tiznit',
  ];

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.registrationForm = this.fb.group({
      l_name: ['', Validators.required],
      f_name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['Tangier'],
      address: ['', Validators.required],
      cin: ['', Validators.required],
      date_of_birth: ['', Validators.required],
    });
  }
  toggle() {
    this.toggleRegisterModal.emit();
  }

  submitForm() {
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      this.authenticationService.register(
        this.registrationForm.get('l_name')!.value,
        this.registrationForm!.get('f_name')!.value,
        this.registrationForm.get('username')!.value,
        this.registrationForm.get('password')!.value,
        this.registrationForm!.get('email')!.value,
        this.registrationForm.get('phone')!.value,
        this.registrationForm!.get('city')!.value,
        this.registrationForm!.get('address')!.value,
        this.registrationForm!.get('cin')!.value,
        this.registrationForm.get('date_of_birth')!.value
      );
      this.registrationForm.reset();
      this.showRegisterModal = false;
    }
  }
}
