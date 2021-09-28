import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserRolesService } from '../../user-roles/user-roles.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  errorMessage:any = null;
  showIndicator = false;
  subscription:Subscription;
  employeeFormData:FormGroup;
  roleList:any[] = [];



  constructor(private _authService:AuthService, private fb: FormBuilder , private _userRoles:UserRolesService, private _employeeService:EmployeeService, private _route:Router) { }

    ngOnInit(): void {
      this.subscription =  this._authService.loadingSpinnerLogOut.subscribe((data:any)=>{
        this.showIndicator = data;
      });

      this.employeeFormData = this.fb.group({
        firstName :['', [Validators.required]],
        lastName  :['', [Validators.required]],
        userName  :['', [Validators.required]],
        email :['', [Validators.required]],
        userPassword :['',[Validators.required]],
        confirmUserPassword :['', [Validators.required]],
        dathOfBirth  :['', [Validators.required]],
        phoneNumber :['', [Validators.required]],
        homeAddress :['', [Validators.required]],
        salary :[''],
        employeeHireDate :['', [Validators.required]],
        roleName :[null, [Validators.required]],
        gender :['', [Validators.required]],
      })



      this.getAllRoles();
  }

  AddEmployeeData(){
    const formFrom = new FormData();
    formFrom.append("firstName", this.employeeFormData.value['firstName']);
    formFrom.append("lastName", this.employeeFormData.value['lastName']);
    formFrom.append("userName", this.employeeFormData.value['userName']);
    formFrom.append("email", this.employeeFormData.value['email']);
    formFrom.append("userPassword", this.employeeFormData.value['userPassword']);
    formFrom.append("dathOfBirth", this.employeeFormData.value['dathOfBirth']);
    formFrom.append("phoneNumber", this.employeeFormData.value['phoneNumber']);
    formFrom.append("homeAddress", this.employeeFormData.value['homeAddress']);
    formFrom.append("salary", this.employeeFormData.value['salary']);
    formFrom.append("employeeHireDate", this.employeeFormData.value['employeeHireDate']);
    formFrom.append("roleName", this.employeeFormData.value['roleName']);
    formFrom.append("gender", this.employeeFormData.value['gender']);
    this.subscription = this._employeeService.AddEmployee(formFrom).subscribe(()=>{
      this._route.navigate(['/Admin/Employee']);
    },
    (errorResponse: HttpErrorResponse) => {
      setTimeout(()=>{
        this.showIndicator = false
        this.errorMessage = errorResponse.error;

      },2000);
    }
    )

  }

  getAllRoles(){
    this.subscription = this._userRoles.getListRole().subscribe((data:any)=>{
      this.roleList = data;
    });
  }

  removeErrorEvent() {
    this.errorMessage = null;
  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


}
