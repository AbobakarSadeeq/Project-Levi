import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderSidebarService {

  constructor(private http:HttpClient) { }

  GetLogInProfile() {
    return this.http.get("https://localhost:44324/api/Account")
  }
}
