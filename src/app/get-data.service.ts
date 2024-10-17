import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http : HttpClient) { }

  getEmployees(){
    return this.http.get('http://localhost:8084/getAll');
  }

  searchEmployee(id : string | null | undefined) {
    return this.http.get(`http://localhost:8084/serach/${id}`);
  }

  setEmployee(employee : any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:8084/addEmp',JSON.stringify(employee),{headers});
  }

  updateEmployee(employee : any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put('http://localhost:8084/updateemp',JSON.stringify(employee),{headers});
  }

  deleteEmployee(id : string | null | undefined) {
    return this.http.delete(`http://localhost:8084/deleteemp/${id}`);
  }
}
