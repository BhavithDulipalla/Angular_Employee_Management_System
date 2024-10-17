import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserAccountService {
  constructor(private http: HttpClient) { }

  getUser(userName : string | null | undefined) {
    return this.http.get(`http://localhost:8084/user/${userName}`);
  }

  setUser(userName : string | null | undefined, emailId : string | null | undefined, password : string | null | undefined) {
    let user = {
      userName: userName,
      emailId: emailId,
      password: password
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:8084/addUser', JSON.stringify(user),{headers});
  }

  updateUser(userName : string | null | undefined, emailId : string | null | undefined, password : string | null | undefined){
    let user = {
      userName: userName,
      emailId: emailId,
      password: password
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put('http://localhost:8084/updateUser', JSON.stringify(user),{headers});
  }

  deleteUser(userName : string | null | undefined){
    return this.http.delete(`http://localhost:8084/user/${userName}`);
  }
}
