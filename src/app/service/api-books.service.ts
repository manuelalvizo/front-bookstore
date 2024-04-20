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

  public getBooks(limit: number, page: number): Observable<BooksInterface> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());

    return this.http.get<BooksInterface>(this.urlApi, { params });
  }

  public registerBooks(newBook:BookInterface): Observable<BookInterface> {
    return this.http.post<BookInterface>(this.urlApi, newBook);
  }
}
