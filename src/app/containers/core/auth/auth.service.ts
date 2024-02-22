import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginCommand, UsersClient, AuthenticatedResponse, RegisterCommand } from '../../module/lms/lms-api-service'

const ACCESS_TOKEN = 'access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated : boolean = false; 

  constructor(private userService: UsersClient) { }
loginRequest: LoginCommand;
accessTokenResponse : AuthenticatedResponse;
returnUrl : string;

  login(loginRequest : LoginCommand) : AuthenticatedResponse{
    debugger;
    this.accessTokenResponse = new AuthenticatedResponse();
    this.userService.login(loginRequest).subscribe((res) => {
      this.accessTokenResponse = res;
      window.localStorage.setItem(ACCESS_TOKEN, `${this.accessTokenResponse.accessToken}`);
    });
    console.log(this.accessTokenResponse)
    return this.accessTokenResponse;
  }

  logout() : Observable<any>{
    localStorage.removeItem(ACCESS_TOKEN);
    this.authenticated = false;
    return of(null);
  }

  register(registerRequest: RegisterCommand) : Observable<any>{
    return this.userService.login(registerRequest);
  }

  isAuthenticated(){
    this.authenticated = !!window.localStorage.getItem(ACCESS_TOKEN);
    return this.authenticated;
  }
}
