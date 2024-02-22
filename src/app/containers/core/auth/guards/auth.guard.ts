import { inject } from "@angular/core"
import { AuthService } from "../auth.service"
import { Router, RouterStateSnapshot } from "@angular/router";

export const CanActivate = (state : RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if(authService.isAuthenticated()){
        return true;
    }
    else{
        authService.returnUrl = state.url;
        router.navigate(['/login']);
        return false;
    }
}