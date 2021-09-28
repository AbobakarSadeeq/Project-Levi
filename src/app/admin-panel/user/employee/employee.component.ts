import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  subscription:Subscription;
  showIndicator = false;
  listEmployees: any[] = [];

  gettingUnpaidEmployeePayment:any[] = [];
  gettingPaidEmployeePayment:any[] = [];
  todayDate:Date;



  displayModal = false;
  singleEmployeeDetail:any;

  constructor(private _employeeService:EmployeeService,private _authService:AuthService, private DialogService: ConfirmationService, private route:Router) { }

  ngOnInit(): void {
    this.subscription =  this._authService.loadingSpinnerLogOut.subscribe((data:any)=>{
      this.showIndicator = data;
    });


    this.todayDate = new Date();
    this.todayDate.getDate();

    this.getAllEmployees();
    this.gettingAllEmployeePayments();
  }


  gettingAllEmployeePayments(){
    this.subscription = this._employeeService.getAllEmployeesPayment().subscribe((data:any[])=>{
      this.gettingUnpaidEmployeePayment = data.filter(a=>a.payment == false);
      this.gettingPaidEmployeePayment = data.filter(a=>a.payment == true);

    })
  }

  updateEmployeePayment(data:any){
    debugger;
    if(data.payment == false){
      data.payment = true;
      this.subscription = this._employeeService.UpdateEmployeePayment(data).subscribe(()=>{
        this.gettingAllEmployeePayments();
      });
    }else{
      data.payment = false;
      this.subscription = this._employeeService.UpdateEmployeePayment(data).subscribe(()=>{
        this.gettingAllEmployeePayments();
      });
    }

  }


  openDeleteDialogConfarmation(dataId:any){
    debugger;
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete Employee?',
      accept: () => {
        this.showIndicator = true;
        this.subscription = this._employeeService.DeleteEmployee(dataId).subscribe(()=>{
          this.getAllEmployees();
          this.showIndicator = false;
        })
      }
    });
  }

  getAllEmployees(){
    this.subscription = this._employeeService.getAllEmployees().subscribe((data)=>{
      this.listEmployees = data;
      this.gettingAllEmployeePayments();
    })
  }

  AddEmployee(){
    this.route.navigate(['/Admin/AddEmployee']);
  }

  showDetailEmployee(dataId:any){
    this.displayModal = true;
    this.subscription = this._employeeService.getSingleEmployee(dataId).subscribe((data:any)=>{
      this.singleEmployeeDetail = data;
    })
  }

}
