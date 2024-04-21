import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface, UserInterface, UsersInterface } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiAuthService {

  private urlApi = 'https://app-security-wihjrgjcba-uc.a.run.app/api/v1/';

  constructor(private http: HttpClient) { }

  public register(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.urlApi + 'auth/register', user);
  }

  public login(user: UserInterface): Observable<LoginInterface> {
    return this.http.post<LoginInterface>(this.urlApi + 'auth/login', user);
  }

  public getUsers(limit: number, page: number):Observable<UsersInterface> {
    const params = new HttpParams()
    .set('limit', limit.toString())
    .set('page', page.toString());
    return this.http.get<UsersInterface>(this.urlApi + 'users', { params });
  }
  
  public deleteUser(id: string): Observable<UserInterface> {
    return this.http.delete<UserInterface>(`${this.urlApi+ 'users'}/${id}`);
  }

  public updateUser(updateUser:UserInterface): Observable<UserInterface> {
    return this.http.patch<UserInterface>(`${this.urlApi+ 'users'}/${updateUser.id}`, updateUser);
  }
}