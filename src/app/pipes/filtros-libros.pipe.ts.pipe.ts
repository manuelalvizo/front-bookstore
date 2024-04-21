import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroLibros'
})
export class FiltrosLibrosPipeTsPipe implements PipeTransform {

  transform(libros: any[], filtro: string): any[] {
    if (!libros || !filtro) {
      return libros;
    }

    return libros.filter(libro =>
      libro.id.toLowerCase().includes(filtro.toLowerCase()) ||
      libro.title.toLowerCase().includes(filtro.toLowerCase()) ||
      libro.author.toLowerCase().includes(filtro.toLowerCase())
    );
  }
}
