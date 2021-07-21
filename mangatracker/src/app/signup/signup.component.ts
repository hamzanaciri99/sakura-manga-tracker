import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/AuthService';

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

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      fullname: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
    // console.log(this.form);
    // this.formErrors = ['fullname', 'username', 'email', 'password'].map((cn) => this.form.getError('pattern', cn))
    //   .filter(e => e != null).map(e => `value: ${e.actualValue}, regex: ${e.requiredPattern}`).join('\n');
    this.authService.signup(this.form.value).subscribe(console.log);
  }

}
