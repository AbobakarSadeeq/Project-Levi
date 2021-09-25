import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }


  getAllEmployees(): Observable<any>{
    return this.http.get("https://localhost:44344/api/Employee");
  }

  getSingleEmployee(dataId:any){
    return this.http.get("https://localhost:44344/api/Employee/" + dataId);
  }

  DeleteEmployee(dataId:any){
    return this.http.delete("https://localhost:44344/api/Employee/" + dataId);
  }

  AddEmployee(data:any){
    return this.http.post("https://localhost:44344/api/Employee/", data);
  }

  UpdateEmployee(data:any){
    return this.http.put("https://localhost:44344/api/Employee/", data);
  }



}
