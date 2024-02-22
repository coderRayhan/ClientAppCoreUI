import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { StorageService } from '../../../core/service/storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginCommand } from '../../lms/lms-api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  frmGroup : FormGroup;
  loginRequest : LoginCommand;
  authService : AuthService = inject(AuthService);
  storageService : StorageService = inject(StorageService);
  router : Router = inject(Router);
  constructor(){}
  ngOnInit(): void {
    this.setInitValue();
  }

  onSubmit(){
    this.loginRequest = new LoginCommand();
    this.loginRequest.userName = this.frmGroup.get("email")?.value;
    this.loginRequest.password = this.frmGroup.get("password")?.value;
    this.authService.login(this.loginRequest);
    const returnUrl = this.authService.returnUrl || '/';
    this.router.navigateByUrl(returnUrl);
  }

  setInitValue(){
    this.frmGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

}
