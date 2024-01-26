import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessTokenResponse, LoginRequest, RegisterRequest, UsersClient } from '../../module/lms/lms-api-service'

const ACCESS_TOKEN = 'access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated : boolean = false; 

  constructor(private userService: UsersClient) { }
loginRequest: LoginRequest;
accessTokenResponse : AccessTokenResponse;

  login(loginRequest : LoginRequest) : AccessTokenResponse{
    this.accessTokenResponse = new AccessTokenResponse();
    this.userService.postApiUsersLogin(true, true, loginRequest).subscribe((res) => {
      this.accessTokenResponse = res;
    });
    window.localStorage.setItem(ACCESS_TOKEN, `${this.accessTokenResponse.accessToken}`);
    return this.accessTokenResponse;
  }

  register(registerRequest: RegisterRequest) : Observable<any>{
    return this.userService.postApiUsersRegister(registerRequest);
  }

  isAuthenticated(){
    this.authenticated = !!window.localStorage.getItem(ACCESS_TOKEN);
    return this.authenticated;
  }
}
