import { Component } from '@angular/core';
import { ApiBooksService } from '../../service/api-books.service';
import { BookInterface } from '../../interfaces/book.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  libros : BookInterface[] = [];

  constructor(
    private apiBooksService: ApiBooksService){}

  ngOnInit(): void {
    this.getBooks();
  }
 

  getBooks(){
    this.apiBooksService.getBooks().subscribe( libros => {
      this.libros = libros;
      console.log(this.libros);
    })
  }
  
  eliminar(libro:BookInterface) {
    // Implementa aquí la lógica para eliminar el elemento
  }

  actualizar(libro:BookInterface) {
    // Implementa aquí la lógica para actualizar el elemento
  }

  ver(libro:BookInterface) {
    alert(libro)
  }

}
