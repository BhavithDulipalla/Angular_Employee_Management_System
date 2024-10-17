import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  constructor() { }
  user : any = '';

  setUser(userName: any){
    this.user = userName;
  }

  getUser(){
    return this.user;
  }
}
