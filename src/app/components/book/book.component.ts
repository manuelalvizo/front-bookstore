import { Component } from '@angular/core';
import { ApiBooksService } from '../../service/api-books.service';
import { BookInterface, BooksInterface } from '../../interfaces/book.interface';
import { Subscription } from 'rxjs';
import { AlertService } from '../../service/alert.service';
import { ErrorInterface } from '../../interfaces/error.interface';
import Swal from 'sweetalert2';
import { ApiAuthService } from '../../service/api-auth.service';
declare var $: any; // Esto es para acceder a la función jQuery
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {

  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  libros: BookInterface[] = [];
  libroSeleccionado: any;
  loading: boolean = false;
  numeroPaginas = 0;
  paginas: number[] = [];
  paginaActual: number = 1;
  filtro:string = '';
  newBook: BookInterface = {
    title: '',
    author: '',
    genre: '',
    year_publication: 0,
    isbn: '',
    editorial: '',
    pages: 0,
    language: '',
    format: '',
    status: '',
    id: '',
    seleccionado: false,
  };
  titulo: string = '';
  roles: string[] = [];
  constructor(
    private apiBooksService: ApiBooksService,
    private alertService: AlertService,
    private authService: ApiAuthService
  ) {}

  ngOnInit(): void {
    this.roles =  this.authService.getRoles();
    this.getBooks();
  }

  selectBook(libro: any) {
    this.libroSeleccionado = libro;
    this.newBook = libro;
  }

  onInputChange(event: Event) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId); // Cancela la ejecución previa si hay una
    }
  
    this.timeoutId = setTimeout(() => {
      this.filtrarDatos();
      this.timeoutId = null; // Restablece el identificador del temporizador después de la ejecución
    }, 1000);
  }
  
  filtrarDatos() {
    const filtroSeleccionado = (document.querySelector('.form-select') as HTMLSelectElement).value;
    const cadenaFiltro = `{"${filtroSeleccionado}":"${this.filtro.trim()}"}`;
    this.getBooks(cadenaFiltro);
    console.log(cadenaFiltro);

  }

  getBooks(cadenaFiltro?:string) {
    this.loading = true;
    const limit: number = 5;
    const subscription: Subscription = this.apiBooksService.getBooks(limit, this.paginaActual, cadenaFiltro)
      .subscribe({
        next: (librosData) => {
          this.libros = librosData.books;
          this.numeroPaginas = Math.ceil(librosData.totalElements / limit);
          this.paginas = Array.from(
            { length: this.numeroPaginas },
            (_, index) => index + 1
          );
          this.loading = false;
        },
        error: (error: ErrorInterface) => {
          this.loading = false;
          this.limpiarCampos();
          this.libros= [];
          this.alertService.fallido(error.error.message.toString());
        }
      });
  }
  
  seleccionarPagina(pagina: number): void {
    if(pagina > 0 && pagina <= this.numeroPaginas){
      this.paginaActual = pagina;
      this.getBooks();
    }
  }

  actualizar() {
    const subscription: Subscription = this.apiBooksService
      .updateBook(this.newBook)
      .subscribe({
        next: (response: BookInterface) => {
          this.loading = false;
          this.limpiarCampos();
          this.alertService.exitoso('Se actualizo correctamente el libro');
          this.getBooks();
        },
        error: (error: ErrorInterface) => {
          console.error(error);
          this.loading = false;
          this.alertService.fallido(error.error.message.toString());
        },
      });
  }

  confirmationDelete() {
    this.newBook = this.libroSeleccionado;
    Swal.fire({
      title: "Estas seguro que deseas eliminar el libro: \n "+this.newBook.title+ "?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo eliminarlo!",
      cancelButtonText: "Cancelar" 
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteBook();
      }
    });
  }

  deleteBook(){
    const subscription: Subscription = this.apiBooksService
      .deleteBook(this.newBook.id)
      .subscribe({
        next: (response: BookInterface) => {
          this.loading = false;
          this.limpiarCampos();
          this.alertService.exitoso('Se elimino correctamente el libro');
          this.getBooks();
        },
        error: (error: ErrorInterface) => {
          console.error(error);
          this.loading = false;
          this.alertService.fallido(error.error.message.toString());
        },
      });
  };

  registrarLibro() {
    const subscription: Subscription = this.apiBooksService
      .registerBooks(this.newBook)
      .subscribe({
        next: (response: BookInterface) => {
          this.loading = false;
          this.limpiarCampos();
          this.numeroPaginas = 0;
          this.alertService.exitoso('Se registró correctamente el libro');
          this.getBooks();
        },
        error: (error: ErrorInterface) => {
          console.error(error);
          this.loading = false;
          this.alertService.fallido(error.error.message.toString());
        },
      });
  }

  limpiarCampos() {
    this.newBook = {
      title: '',
      author: '',
      genre: '',
      year_publication: 0,
      isbn: '',
      editorial: '',
      pages: 0,
      language: '',
      format: '',
      status: '',
      id: '',
      seleccionado: false,
    };

    this.libroSeleccionado = null;
  }

}
