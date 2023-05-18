import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  account = 'enter your email here';
  aim = 'enter your password here';

  constructor(private authService: AuthService) {}
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
    this.isLoading = true;

    if (this.isLoginMode) {
    } else {
      this.authService.signup(email, password).subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.error = 'An error occured';
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }
}
