import { Component } from '@angular/core';
import { ApiBooksService } from '../../service/api-books.service';
import { BookInterface, BooksInterface } from '../../interfaces/book.interface';
import { Subscription } from 'rxjs';
import { AlertService } from '../../service/alert.service';
import { ErrorInterface } from '../../interfaces/error.interface';
import Swal from 'sweetalert2';
declare var $: any; // Esto es para acceder a la función jQuery
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  libros: BookInterface[] = [];
  libroSeleccionado: any;
  loading: boolean = false;
  numeroPaginas = 0;
  paginas: number[] = [];
  paginaActual: number = 1;
  nuevoLibro: BookInterface = {
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
  constructor(
    private apiBooksService: ApiBooksService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  selectBook(libro: any) {
    this.libroSeleccionado = libro;
    this.nuevoLibro = libro;
    console.log('Libro seleccionado:', this.libroSeleccionado);
  }

  getBooks() {
    this.loading = true;
    const limit: number = 10;
    const subscription: Subscription = this.apiBooksService.getBooks(limit, this.paginaActual)
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
          console.error(error);
          this.loading = false;
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
    this.nuevoLibro = this.libroSeleccionado;
  }

  eliminar() {
    this.nuevoLibro = this.libroSeleccionado;
    Swal.fire({
      title: "Estas seguro que deseas eliminar el libro: \n "+this.nuevoLibro.title+ "?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo eliminarlo!",
      cancelButtonText: "Cancelar" 
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado!",
          text: "El libro ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  registrarLibro() {
    console.log('Nuevo libro:', this.nuevoLibro);
    const subscription: Subscription = this.apiBooksService
      .registerBooks(this.nuevoLibro)
      .subscribe({
        next: (response: BookInterface) => {
          this.loading = false;
          this.limpiarCampos();
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
    this.nuevoLibro = {
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
  }
}
