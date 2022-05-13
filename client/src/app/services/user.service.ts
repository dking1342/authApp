import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface myData {
  message: string,
  success: boolean
}

interface isLoggedIn {
  status: boolean
}

interface logoutStatus {
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = "http://localhost:1234/api";

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<myData>('/api/database.php');
  }

  getUserData(username:string){
    return this.http.post<myData>(`${this.BASE_URL}/auth`,{
      username
    });
  }

  isLoggedIn():Observable<isLoggedIn>{
    return this.http.get<isLoggedIn>(`${this.BASE_URL}/isloggedin`);
  }

  logout(){
    return this.http.get<logoutStatus>(`${this.BASE_URL}/logout`);
  }
}
