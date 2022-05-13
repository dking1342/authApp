import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  success: boolean,
  message: string
}

interface registerResponse {
  success: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // using localstorage
  // public loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  public loggedInStatus = false;
  private BASE_URL = "http://localhost:1234/api";

  constructor(private http: HttpClient) { }

  setLoggedIn(value:boolean){
    this.loggedInStatus = value;

    // using localstorage
    // JSON.stringify(localStorage.setItem('loggedIn','true'));
  }
  
  get isLoggedIn(){

    // using localstorage
    // return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());

    return this.loggedInStatus;
  }

  getUserDetails(username:string,password:string){
    return this.http.post(`${this.BASE_URL}/login`,{
      username,
      password
    })
  }

  registerUser(username:string, password:string){
    return this.http.post<registerResponse>(`${this.BASE_URL}/register`,{
      username,
      password
    })
  }
}
