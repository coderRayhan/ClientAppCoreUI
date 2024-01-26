import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from '../../lms/lms-api-service';
import { AuthService } from '../../../core/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  isSuccessful = false;
  isRegistrationFailed = false;
  isPasswordMatched = false;
  frmGroup: FormGroup;
  registerRequest: RegisterRequest;
  constructor(private authService: AuthService, private snackBar: MatSnackBar){

  }
  ngOnInit(): void {
    this.setInitValue();
  }

  setInitValue(){
    this.frmGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required])
    })
  }

  register(){
    this.registerRequest = new RegisterRequest();
    this.registerRequest.email = this.frmGroup.get("email")?.value;
    this.registerRequest.password = this.frmGroup.get("password")?.value;
    this.authService.register(this.registerRequest).subscribe({
      next: data => {
        this.snackBar.open("Registration successfull", "OK");
        console.log(data);
        this.isSuccessful = true;
        this.isRegistrationFailed = false;
      },
      error: err => {
        console.log(err);
        this.isRegistrationFailed = true;
      }
    });
  }

  comparePassword(){
    let password: String = this.frmGroup.get("password")?.value;
    let confirmPassword: String = this.frmGroup.get("confirmPassword")?.value;
    this.isPasswordMatched = password === confirmPassword;
  }
}
