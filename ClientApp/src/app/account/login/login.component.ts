import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  errorMessages: string[] = [];
  returnUrl: string = '';

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activetedRoute: ActivatedRoute
  ) {
    console.log("Chay truoc");
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if(user) {
          this.router.navigateByUrl('/');
        }else {
          this.activetedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              if(params) {
                this.returnUrl = params.get('returnUrl');
              }
            }
          })
        }
      }
    })
  }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.submitted = true;
    this.errorMessages = [];
    // if(this.registerForm.valid) {
    this.accountService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        if(this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        }else {
          this.router.navigateByUrl('/');
        }
      },
      error: (err) => {
        console.log(err);
        if (err.error.errors) {
          this.errorMessages = err.error.errors;
        } else {
          this.errorMessages.push(err.error);
        }
      },
    });
    // console.log(this.registerForm.value);
    // }
  }
}
