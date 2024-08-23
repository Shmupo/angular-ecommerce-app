import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule , Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup
  alertClass = ''
  responseMessage = ''

  email: any
  password: any

  loggedIn: boolean = false

  // form builder is now a service
  // this is another way, simpler than the template form in register page
  // passing rules to inputs
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    if(authService.checkToken()) {
      this.alertClass = 'alert alert-primary'
      this.responseMessage = "Already logged in"
      this.loggedIn = true
    }

    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.email = this.getEmail()
    this.password = this.getPassword()
  }

  getEmail() {
    return this.loginForm.get('email')
  }

  getPassword() {
    return this.loginForm.get('password')
  }

  // this is one way
  // loginForm = new FormGroup({
  //   email: new FormControl('abc'),
  //   password: new FormControl('xyz'),
  // })

  onSubmitHandler() {
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response)
        this.alertClass='alert alert-success'
        this.responseMessage = 'Login successful.'
        localStorage.setItem('token', response.access_token)
        this.loggedIn = true
      }, (err) => {
        console.log(err)
        this.alertClass='alert alert-danger'
        this.responseMessage = 'Login failed. Please try again.'
        this.loggedIn = false
      }
    )
  }
}
