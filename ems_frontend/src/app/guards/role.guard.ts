import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const allowedRoles = route.data['roles'] as string[];

    if (!this.authService.isLoggedIn) {
      // Not logged in - redirect to login
      return this.router.createUrlTree(['/login']);
    }

    if (this.authService.hasAnyRole(allowedRoles)) {
      // Role is allowed
      return true;
    }

    // Role not allowed - redirect to unauthorized page or dashboard
    return this.router.createUrlTree(['/dashboard']);

  }


  
}
