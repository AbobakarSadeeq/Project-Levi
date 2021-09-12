import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private http:HttpClient) { }

  // Get Inserting Data's

  getInternetNetwork(): Observable<any>{
    return this.http.get("https://localhost:44344/api/InternetNetwork");
  }

  getBrand(): Observable<any>{
    return this.http.get("https://localhost:44344/api/Brand");
  }

  getColor(): Observable<any>{
    return this.http.get("https://localhost:44344/api/Color");
  }

  getOperatingSystem(): Observable<any>{
    return this.http.get("https://localhost:44344/api/OperatingSystem");
  }

  getOperatingSystemVersion(): Observable<any>{
    return this.http.get("https://localhost:44344/api/OperatingSystemVersion");
  }

  InsertMobile(data:any){
    return this.http.post("https://localhost:44344/api/Mobile",data);
  }


}
