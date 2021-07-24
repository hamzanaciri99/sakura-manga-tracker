import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginResponse } from '../models/LoginResponse';
import { AuthService } from '../services/AuthService';
import { UserInfoService } from '../services/UserInfoService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  fullname: string = '';
  email: string = '';
  username: string = '';
  password: string = '';

  formErrors: string = '';

  form: FormGroup;

  error: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
      private userInfoService: UserInfoService, private router: Router) {
    this.form = formBuilder.group({
      fullName: new FormControl('', [Validators.required, Validators.minLength(6)]),
      username: new FormControl('', [
        Validators.minLength(5),
        Validators.pattern(/(^[a-zA-Z])+\w*/g),
        Validators.maxLength(10)
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!$_?@=+#&]).{8,}.+/g),
        Validators.maxLength(15)
      ])
    });
  }

  ngOnInit(): void { }

  onSignup() {
    this.authService.signup(this.form.value)
      .pipe(catchError(err => of({} as LoginResponse)))
      .subscribe((loginResponse: LoginResponse) => {
        if(loginResponse.jwtToken) {
          this.userInfoService.register(loginResponse);
          this.router.navigate(['/dashboard/manga-list']);
        } else {
          this.error = true;
          setTimeout(() => this.error = false, 200);
        }
      });
  }

}
