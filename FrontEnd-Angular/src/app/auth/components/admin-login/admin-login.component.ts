import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/alert';
import { AdminService } from 'src/app/Services/admin.service';

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
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
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
    private adminService: AdminService
  ) {}

  ngOnInit(): void {}

  onSignin() {
    let model = {
      username: this.signinForm.value.signinEmail,
      password: this.signinForm.value.signinPassword,
    };

    this.adminService.loginAdmin(model).subscribe((resp: any) => {
      console.log(resp);
      localStorage.setItem('token', resp.token);
      this.alert.showSnackbar(
        'Congradulations, You Have Successfully signed in to your account!😁',
        'SUCCESS',
        3000
      );
      this.router.navigate(['/admin/comments']);
    });
  }

  onSignup() {
    let model = {
      username: this.signupForm.value.signupEmail,
      password: this.signupForm.value.signupPassword,
    };

    this.adminService.signUpAdmin(model).subscribe((resp: any) => {
      console.log(resp);
      localStorage.setItem('token', resp.token);
      this.alert.showSnackbar(
        'Congradulations, You Have Successfully made an account!😁',
        'SUCCESS',
        3000
      );
      this.router.navigate(['/admin/comments']);
    });
  }
}
