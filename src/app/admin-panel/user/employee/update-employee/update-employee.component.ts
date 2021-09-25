import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserRolesService } from '../../user-roles/user-roles.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employeeFormData:FormGroup;
  showIndicator = false;
  subscription:Subscription;
  roleList:any[] = [];


  constructor(public datepipe: DatePipe, private _userRoles:UserRolesService,private _authService:AuthService, private fb:FormBuilder, private _employeeService:EmployeeService, private router:Router, private _activateRoute:ActivatedRoute) { }

    ngOnInit(): void {
      this.subscription =  this._authService.loadingSpinnerLogOut.subscribe((data:any)=>{
        this.showIndicator = data;
      });




      this.employeeFormData = this.fb.group({
        firstName :['', [Validators.required]],
        lastName  :['', [Validators.required]],
        userName  :['', [Validators.required]],
        email :['', [Validators.required]],
        dathOfBirth  :['', [Validators.required]],
        phoneNumber :['', [Validators.required]],
        homeAddress :['', [Validators.required]],
        salary :[''],
        employeeHireDate :['', [Validators.required]],
        roleName :[null, [Validators.required]],
        gender :['', [Validators.required]],
      })


      const getUrlId = this._activateRoute.snapshot.params['id'];
      this.subscription = this._employeeService.getSingleEmployee(getUrlId).subscribe((data:any)=>{

      const convertDOB = this.datepipe.transform(data?.dathOfBirth, 'yyyy-MM-dd');
      const convertEmployeeHireDate = this.datepipe.transform(data?.dathOfBirth, 'yyyy-MM-dd');


        this.employeeFormData = this.fb.group({
          firstName :[data.firstName, [Validators.required]],
          lastName  :[data.lastName, [Validators.required]],
          dathOfBirth  :[convertDOB, [Validators.required]],
          phoneNumber :[data.phoneNumber, [Validators.required]],
          homeAddress :[data.homeAddress, [Validators.required]],
          salary :[data.salary],
          employeeHireDate :[convertEmployeeHireDate, [Validators.required]],
          roleName :[data.roleName, [Validators.required]],
          gender :[data.gender, [Validators.required]],
        });
      });



      this.getAllRoles();


  }




  getAllRoles(){
    this.subscription = this._userRoles.getListRole().subscribe((data:any)=>{
      this.roleList = data;
    });
  }


  UpdateEmployeeData(){
    debugger;
    const formFrom = new FormData();
    formFrom.append("employeeId", this._activateRoute.snapshot.params['id']);
    formFrom.append("firstName", this.employeeFormData.value['firstName']);
    formFrom.append("lastName", this.employeeFormData.value['lastName']);
    formFrom.append("dathOfBirth", this.employeeFormData.value['dathOfBirth']);
    formFrom.append("phoneNumber", this.employeeFormData.value['phoneNumber']);
    formFrom.append("homeAddress", this.employeeFormData.value['homeAddress']);
    formFrom.append("salary", this.employeeFormData.value['salary']);
    formFrom.append("employeeHireDate", this.employeeFormData.value['employeeHireDate']);
    formFrom.append("newRoleName", this.employeeFormData.value['roleName']);
    formFrom.append("gender", this.employeeFormData.value['gender']);

    this.showIndicator = true;
    this.subscription = this._employeeService.UpdateEmployee(formFrom).subscribe(()=>{
      setTimeout(()=>{this.showIndicator = false;})
      this.router.navigate(['/Admin/Employee']);
    });
  }






}
