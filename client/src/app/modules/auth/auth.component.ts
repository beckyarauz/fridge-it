import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {DataService, UserService} from '../../core/services';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  authType = '';
  title = '';
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      // if (this.authType === 'register') {
      //   this.authForm.addControl('username', new FormControl());
      // } // check for controls
    });
  }

  getFormValue(type: string) {
    return this.authForm.get(type).value;
  }

  updateData(value: boolean) {
    this.dataService.updateData(value);
  }

  submitForm() {
    this.isSubmitting = true;

    const credentials = this.authForm.value;
    this.userService
      .attemptAuth(this.authType, credentials)
      .subscribe(
        data => {
          this.updateData(true);
          this.router.navigateByUrl('/profile');
        },
        err => {
          this.isSubmitting = false;
        }
      );
  }
}
