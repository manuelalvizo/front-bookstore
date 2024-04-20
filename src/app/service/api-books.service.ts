import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookInterface } from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiBooksService {

  private urlApi = 'https://app-book-wihjrgjcba-uc.a.run.app/books';
  constructor(private http: HttpClient) { }

  public getBooks(): Observable<BookInterface[]> {
    return this.http.get<BookInterface[]>(this.urlApi, {});
  }
}
