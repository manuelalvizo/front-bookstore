import { Component } from '@angular/core';
import { AlertService } from '../../../service/alert.service';
import { ErrorInterface } from '../../../interfaces/error.interface';
import { ApiAuthService } from '../../../service/api-auth.service';
import { LoginInterface, UserInterface } from '../../../interfaces/user.interface';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  loading: boolean = false;

  constructor(private apiAuthService: ApiAuthService,
    private alertaService: AlertService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  login() {
    this.loading = true;

    const user: UserInterface = {
      email: this.email,
      password: this.password
    };

    const subscription: Subscription = this.apiAuthService.login(user).subscribe({
      next: (response: LoginInterface) => {
        this.cookieService.set('token', response.token);
        response.user.name ? this.cookieService.set('name', response.user.name) : null;
        response.user.roles ? this.cookieService.set('roles', response.user.roles.toString()) : null;
        // Manejar la respuesta como sea necesario
        this.loading = false; // Ocultar loader
        this.limpiarCampos();
        this.router.navigate(['/books']); 
      },
      error: (error: ErrorInterface) => {
        console.error(error);
        this.loading = false; // Ocultar loader en caso de error
        this.alertaService.fallido(error.error.message.toString());
      }
    });
  }

  limpiarCampos(){
    this.email = "";
    this.password = "";
  }

}
