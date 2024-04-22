import { Component } from '@angular/core';
import { UserInterface } from '../../../interfaces/user.interface';
import { ApiAuthService } from '../../../service/api-auth.service';
import { AlertService } from '../../../service/alert.service';
import { Subscription } from 'rxjs';
import { ErrorInterface } from '../../../interfaces/error.interface';
import Swal from 'sweetalert2';
declare var $: any; // Esto es para acceder a la función jQuery

@Component({
  selector: 'app-actions-users',
  templateUrl: './actions-users.component.html',
  styleUrl: './actions-users.component.css',
})
export class ActionsUsersComponent {
  users: UserInterface[] = [];
  userSelected: any;
  loading: boolean = false;
  numeroPaginas = 0;
  paginas: number[] = [];
  paginaActual: number = 1;
  filtro: string = '';
  newUser: UserInterface = {
    id: '',
    name: '',
    email: '',
    password: '',
    roles: [],
  };
  roles: string[] = [];

  constructor(
    private apiAuthService: ApiAuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.roles =  this.apiAuthService.getRoles();
    this.getUsers();
  }


  onInputChange(event: Event) {
    setTimeout(() => {
      this.filtrarDatos();
    }, 3000); // Espera 3 segundos antes de llamar a filtrarDatos()
  }

  filtrarDatos() {
    const filtroSeleccionado = (document.querySelector('.form-select') as HTMLSelectElement).value;
    const cadenaFiltro = `{${filtroSeleccionado}: ${this.filtro}}`;
    console.log(cadenaFiltro); // Aquí puedes hacer lo que quieras con la cadena formada
  }

  getUsers() {
    this.loading = true;
    const limit: number = 50;
    const subscription: Subscription = this.apiAuthService
      .getUsers(limit, this.paginaActual)
      .subscribe({
        next: (usersData) => {
          this.users = usersData.users;
          this.numeroPaginas = Math.ceil(usersData.totalElements / limit);
          this.paginas = Array.from(
            { length: this.numeroPaginas },
            (_, index) => index + 1
          );
          this.loading = false;
        },
        error: (error: ErrorInterface) => {
          this.loading = false;
          this.alertService.fallido(error.error.message.toString());
        },
      });
  }

  seleccionarPagina(pagina: number): void {
    if (pagina > 0 && pagina <= this.numeroPaginas) {
      this.paginaActual = pagina;
      this.getUsers();
    }
  }

  confirmationDelete() {
    this.newUser = this.userSelected;
    Swal.fire({
      title:
        'Estas seguro que deseas eliminar el libro: \n ' +
        this.newUser.name +
        '?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo eliminarlo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteBook();
      }
    });
  }

  deleteBook() {
    if (this.newUser && this.newUser.id) {
      const subscription: Subscription = this.apiAuthService
        .deleteUser(this.newUser.id)
        .subscribe({
          next: (response: UserInterface) => {
            this.loading = false;
            this.limpiarCampos();
            this.alertService.exitoso('Se elimino correctamente el usuario');
            this.getUsers();
          },
          error: (error: ErrorInterface) => {
            console.error(error);
            this.loading = false;
            this.alertService.fallido(error.error.message.toString());
          },
        });
    } else {
      this.alertService.fallido('El ID del usuario no está definido.');
    }
  }

  actualizar() {
    const rolesString = this.newUser.roles?.toString();
    let roles: string[] = [];
    if (rolesString) {
      roles = rolesString.split(','); // Divide la cadena en elementos usando la coma como separador
    }
    this.newUser.roles = roles;
    console.log(this.newUser.roles);
    const subscription: Subscription = this.apiAuthService
      .updateUser(this.newUser)
      .subscribe({
        next: (response: UserInterface) => {
          this.loading = false;
          this.limpiarCampos();
          this.alertService.exitoso('Se actualizo correctamente el usuario');
          this.getUsers();
        },
        error: (error: ErrorInterface) => {
          console.error(error);
          this.loading = false;
          this.alertService.fallido(error.error.message.toString());
        },
      });
  }

  selectUser(user: any) {
    this.userSelected = user;
    this.newUser = user;
  }

  limpiarCampos() {
    this.newUser = {
      id: '',
      name: '',
      email: '',
      password: '',
      roles: [],
    };
    this.userSelected = null;
  }
}
