import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   users = [
     { name:'admin', password:'admin'},
     { name:'karimou', password:'123456'},
     {name:'yann',password:'yann'},
  ]
  loggedIn = false;
  constructor(
    private http:HttpClient
  ) { }
  logIn() {
    this.loggedIn = true;

  }
  logOut() {
    this.loggedIn = false;
  }
  isAdmin():Promise<any> {
    const isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    })
    return isUserAdmin;

  }

}
