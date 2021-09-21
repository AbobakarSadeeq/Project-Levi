import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperatingSystemService {

  constructor(private http: HttpClient) { }

  getOperatingSystem(){
    return this.http.get("https://localhost:44344/api/OperatingSystem");
  }
}
