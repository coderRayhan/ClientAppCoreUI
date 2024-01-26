import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { StorageService } from '../../../core/service/storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../lms/lms-api-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  frmGroup : FormGroup;
  loginRequest : LoginRequest;
  constructor(private authService: AuthService, private storageService: StorageService){}
  ngOnInit(): void {
    this.setInitValue();
  }

  onSubmit(){
    this.loginRequest = new LoginRequest();
    this.loginRequest.email = this.frmGroup.get("email")?.value;
    this.loginRequest.password = this.frmGroup.get("password")?.value;
    this.authService.login(this.loginRequest);
  }

  setInitValue(){
    this.frmGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

}
