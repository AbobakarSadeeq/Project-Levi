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

    // Getting Photo From Server:

    // findinPhotoById(Id:any){
    //   return this.httpRequest.get(environment.urlDepartment + "/" + Id);
    // }


    // GetListPhoto(userId:any){
    // return  this.httpRequest.get(environment.UserPhotosURL +"/GetSingleAllUserPhoto/" + userId);
    // }

    // UploadOrInsertPhoto(userId:string, data:any){
    //   return this.httpRequest.post(environment.UserPhotosURL+ "/" + userId, data);
    // }

    // DeletePhoto(photoId:number){
    //   return this.httpRequest.delete(environment.UserPhotosURL+ "/" + photoId);
    // }

    // // When we want to send the post and put requrest then we should send the data with Id so, here we dont need any kind of data to send becuasse put want to send data so, we send empty.
    // isMainPhotoChanging(userId:string, photoId:number) {
    //   return this.httpRequest.put(environment.UserPhotosURL + "/SetMainPhoto/" + userId + "/" + photoId,{});
    // }


}

