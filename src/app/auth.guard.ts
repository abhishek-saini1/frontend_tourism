import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      // Check if the user has the expected role for the protected route
      const expectedRoles = route.data['expectedRoles'] as string[];
      const userRole = this.authService.getUserRole();

      if (expectedRoles.includes(userRole)) {
        return true; // Allow access to the protected route
      } else {
        // Redirect to a different route (e.g., login) for unauthorized access
        alert("not authorized")
        return this.router.createUrlTree(['/login']);
      }
    } else {
      // Redirect to the login page if the user is not logged in
      return this.router.createUrlTree(['/login']);
    }
  }
}
