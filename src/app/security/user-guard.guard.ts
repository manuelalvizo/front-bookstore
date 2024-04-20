import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router,
    private cookieService: CookieService
  ) { }

  canActivate(): boolean {
    const token = this.cookieService.check('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}