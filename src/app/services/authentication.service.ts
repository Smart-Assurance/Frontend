import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../api/authentication.api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';
  private loginStatusSubject = new BehaviorSubject<boolean>(false);
  loginStatus$ = this.loginStatusSubject.asObservable();
  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router,
  ) {}
  public login(username: string, password: string): void {
    this.authenticationClient.login(username, password).subscribe({
      next: (response) => {
        alert("Login Successful")
        localStorage.setItem(this.tokenKey, response.token);
        this.loginStatusSubject.next(true);
      },
      error: (error) => {
        console.error("Error during login:", error);
        alert("Login Failed")
        this.loginStatusSubject.next(false);
      }
    });
  }
  

  public register(l_name:string,f_name:string,username:string,password:string,email:string,phone:string,city:string,address:string,cin:string,date_of_birth:Date): void {
    this.authenticationClient
      .register(l_name,f_name,username,password,email,phone,city,address,cin,date_of_birth)
      .subscribe({
        next: () => {
          alert("Regiter Successful")
        },
        error: (error) => {
          console.error("Error during register:", error);
          alert("Register Failed")
        }
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    console.log(localStorage.getItem(this.tokenKey));
    if (localStorage.getItem(this.tokenKey) != null) return true;
    return false;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

  public backToMenu(): void {
    this.router.navigate(['/']);
  }
}
