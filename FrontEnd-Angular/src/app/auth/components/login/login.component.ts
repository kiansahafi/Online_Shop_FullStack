import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/core/alert';
import { ProductService } from 'src/app/Services/product.service';
import { UserService } from 'src/app/Services/user.service';
import { user } from 'src/app/users';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('');
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  signinForm = this.fb.group({
    signinEmail: ['', Validators.email],
    signinPassword: [
      '',
      Validators.pattern('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'),
    ],
    rememberForm: '',
  });

  signupForm = this.fb.group({
    signupName: '',
    signupLastName: '',
    signupEmail: ['', Validators.email],
    signupPassword: '',
    signupRePassword: '',
  });

  matcher = new MyErrorStateMatcher();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alert: AlertService,
    private userservice: UserService,
    private productservice: ProductService
  ) {}

  ngOnInit(): void {}

  onSignin() {
    let model = {
      username: this.signinForm.value.signinEmail,
      password: this.signinForm.value.signinPassword,
    };

    this.userservice.userSignIn(model).subscribe((resp: any) => {
      console.log(resp);
      localStorage.setItem('token', resp.token);
      this.alert.showSnackbar(
        'Congradulations, You Have Successfully signed in to your account!😁',
        'SUCCESS',
        3000
      );
      this.router.navigate(['/product-list']);
    });
  }

  onSignup() {
    let model = {
      username: this.signupForm.value.signupEmail,
      password: this.signupForm.value.signupPassword,
    };

    this.userservice.userSignUp(model).subscribe((resp: any) => {
      console.log(resp);
      localStorage.setItem('token', resp.token);
      this.alert.showSnackbar(
        'Congradulations, You Have Successfully made an account!😁',
        'SUCCESS',
        3000
      );
      this.router.navigate(['/product-list']);
    });
  }
}
