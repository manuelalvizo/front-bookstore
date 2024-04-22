import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookInterface, BooksInterface } from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiBooksService {

  private urlApi = 'https://app-book-wihjrgjcba-uc.a.run.app/api/v1/books';
  constructor(private http: HttpClient) { }

  public getBooks(limit: number, page: number, cadenaFiltro?: string): Observable<BooksInterface> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());
  
    if (cadenaFiltro) {
      params = params.set('filter', cadenaFiltro.toString().trim());
    }
  
    return this.http.get<BooksInterface>(this.urlApi, { params });
  }

  public registerBooks(newBook:BookInterface): Observable<BookInterface> {
    return this.http.post<BookInterface>(this.urlApi, newBook);
  }

  public deleteBook(id: string): Observable<BookInterface> {
    return this.http.delete<BookInterface>(`${this.urlApi}/${id}`);
  }

  public updateBook(updateBook:BookInterface): Observable<BookInterface> {
    return this.http.patch<BookInterface>(`${this.urlApi}/${updateBook.id}`, updateBook);
  }
  
}
