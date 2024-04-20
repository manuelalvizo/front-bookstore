import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface, UserInterface } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiAuthService {

  private urlApi = 'https://app-security-wihjrgjcba-uc.a.run.app/api/v1/auth/';

  constructor(private http: HttpClient) { }

  register(user: UserInterface): Observable<UserInterface> {

    return this.http.post<UserInterface>(this.urlApi + 'register', user);
  }

  login(user: UserInterface): Observable<LoginInterface> {

    return this.http.post<LoginInterface>(this.urlApi + 'login', user);
  }

}
