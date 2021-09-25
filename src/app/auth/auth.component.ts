import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  //Fields

  errorMessage: any = null;
  isLoginMode = true;
  successFullInsert: any = null;
  myUserDataaa: any;
  //Constructor
  constructor(private _AuthService: AuthService, private httpRoute: Router) { }

  //Switching Sign In and Sign Up Method
  onSwitchMode(clearData: NgForm) {
    this.isLoginMode = !this.isLoginMode;
    clearData.reset();
  }




  public subscribtion: Subscription;

  ngOnInit(): void {
    //if the user Already LogIn then he/she dont to sign in Again


    if (localStorage.getItem('token') != null) {
      console.log("Already LogIn");
      this.httpRoute.navigate(['/'])
    }





  }
  //Removing the Error from screen when it occurs
  removeErrorEvent() {
    this.errorMessage = null;
    this.successFullInsert = null;
  }



  //Register An Account in the Database And Also Sign In
  loadingIndicator = false;
  authFormData(data: NgForm) {


    if (this.isLoginMode) {
      //Log In
      this.loadingIndicator = true;
      this._AuthService.logIn(data.value).pipe(delay(3000)).subscribe((responseData: any) => {
        let gettingImageUrl = responseData.url ? responseData.url : "../../assets/Pictures/No Image.jpg"
        localStorage.setItem('token', responseData.token);
        localStorage.setItem("photoUrl", gettingImageUrl);
        this.loadingIndicator = false;
        this._AuthService.profileData.next({
          userName: responseData.userName,
          email: responseData.email,
          id: responseData.id,
          photoUrl: gettingImageUrl
        });
        this.httpRoute.navigate(['/'], { queryParams: { ClientName: responseData.userName, ClienEmail: responseData.email } });
      },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          setTimeout(()=>{this.loadingIndicator = false},2000);
          setTimeout(()=>{
            if (errorResponse.status == 400) {
              this.errorMessage = "Incorrect UserName or Password!", "Authentication Faild";
            } else if (errorResponse.status == 0) {
              this.errorMessage = "Your Server is Offline Please Come Back When It To Back Online Thank you!";
            }
            else {
              console.log(errorResponse)
            }
          },2000);


        }
      );

    }
    else {
      //Sign Up
      this.loadingIndicator = true;
      this._AuthService.SignUp(data.value).pipe(delay(3000)).subscribe((response: any) => {
        this.successFullInsert = "Sign Up Operation SuccessFull! And Now Logged it In";
      this.loadingIndicator = false;

      },
        (errorResponse: HttpErrorResponse) => {
          setTimeout(()=>{
            this.loadingIndicator = false
            this.errorMessage = errorResponse.error;

          },2000);
        }
      );
    }

    data.reset();
  }

}


