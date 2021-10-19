import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { debounceTime, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  decode: any; // this property used for in appRoleHas Directive.
  profileData = new Subject<any>();
  profilePic = new Subject<any>();
  loadingSpinnerLogOut = new Subject<any>();





  constructor(private httpRequest: HttpClient, private _route: Router) { }





  SignUp(data: any) {

    return this.httpRequest.post("https://localhost:44344/api/Account", data);
  }

  logIn(data: any) {
    return this.httpRequest.post("https://localhost:44344/api/Account/LogIn", data);
  }

  LogOut() {
    localStorage.removeItem('token');
    this._route.navigate(["/Auth"]);
  }

  getUserCount(){
    return this.httpRequest.get("https://localhost:44344/api/Account/UserAccountCount");
  }

  //Getting the Data who's is LogIn
  GetLogInProfile() {
    return this.httpRequest.get("https://localhost:44344/api/Account")
  }

  roleMatch(allowedRoles: any): boolean {
    var isMatch = false;
    var payload = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
    var userRole = payload.role;
    this.decode = userRole;
    allowedRoles.forEach((_element: any) => {
      if (userRole == _element) {
        isMatch = true;
        return;
      }
      return false;
    });
    return isMatch;

  }

    // User Address

    InserUserAddress(data:any){
      return this.httpRequest.post("https://localhost:44344/api/UserAddress",data);
    }

    GetUserAddress(dataId:any){
      return this.httpRequest.get("https://localhost:44344/api/UserAddress/" + dataId);
    }

    UpdateUserAddress(data:any){
      return this.httpRequest.put("https://localhost:44344/api/UserAddress",data);
    }

    // Countries and Cities
    getCities(){
      return this.httpRequest.get("https://localhost:44344/api/City");
    }

    getCountry(){
      return this.httpRequest.get("https://localhost:44344/api/Country");
    }


}

