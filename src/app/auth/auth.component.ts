import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  account = 'enter your email here';
  aim = 'enter your password here';

  constructor(private authService: AuthService, private router: Router) {}
  /**
   * Purpose: For switching between login and signup mode
   * Created/Modified By: Shahana K
   * Created On: 18-05-2023
   */

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  /**
   * Purpose: For form submission and after login the form will be reset
   * Created/Modified By: Shahana K
   * Created On: 18-05-2023
   */
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
