import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiAuthService } from '../../../service/api-auth.service';
import { UserInterface } from '../../../interfaces/user.interface';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../service/alert.service';
import { ErrorInterface } from '../../../interfaces/error.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email: string = "";
  password: string = "";
  name: string = "";
  loading: boolean = false;

  constructor(private apiAuthService: ApiAuthService,
    private alertaService: AlertService
  ) {}

  register() {
    this.loading = true;

    const user: UserInterface = {
      email: this.email,
      password: this.password,
      name: this.name,
      roles: ['read']
    };

    const subscription: Subscription = this.apiAuthService.register(user).subscribe({
      next: (response: any) => {
        console.log('Usuario registrado exitosamente', response);
        // Manejar la respuesta como sea necesario
        this.loading = false; // Ocultar loader
        this.limpiarCampos();
        this.alertaService.exitoso("Se registró correctamente la cuenta");
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
    this.name = "";
  }

}
