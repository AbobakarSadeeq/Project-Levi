import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from './employee.service';
import { fromEvent } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AccountService } from '../../account/account.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})



export class EmployeeComponent implements OnInit {

  subscription: Subscription;
  showIndicator = false;
  payingEmployeeDialog: any = null;
  listEmployees: any[] = [];

  gettingEmployeesForPayment: any[] = [];
  todayDate: Date;
  getEmployees: any;


  displayModal = false;
  singleEmployeeDetail: any;
  accountBalanceMesg: any = null;


  constructor(private _accountService: AccountService, private _employeeService: EmployeeService, private _authService: AuthService, private DialogService: ConfirmationService, private route: Router) { }

  ngOnInit(): void {
    this.subscription = this._authService.loadingSpinnerLogOut.subscribe((data: any) => {
      this.showIndicator = data;
    });


    this.todayDate = new Date();
    this.todayDate.getDate();

    this.getAllEmployees();
    this.gettingAllEmployeePayments();
    this.getAllEmployeesPaymentByPageNo();
  }


  gettingAllEmployeePayments() {
    this.subscription = this._employeeService.getAllEmployeesPayment().subscribe((data: any[]) => {
      this.gettingEmployeesForPayment = data;
    })
  }

  employeePaymentDone:any = null;
  PayingEmployeesPayment(data: any) {
    console.log(data);
    this.payingEmployeeDialog = true;
    var accountData:any;
    this.DialogService.confirm({
      message: 'Are you sure you want to give monthly salary to employee?',
      accept: () => {
        debugger;
        this.subscription = this._accountService.getlatestedAccountDetail().subscribe((data: any) => {
          accountData = data;
        });

        setTimeout(()=>{
          if (accountData == null || accountData == undefined) {
            this.accountBalanceMesg = "Please add the account the balance first";
            this.showIndicator = false;
          } else if(accountData.balance == 0 || accountData.balance < data.salary){
            this.accountBalanceMesg = "You have low balance to pay";
            this.showIndicator = false;
            setTimeout(()=>{
              this.employeePaymentDone = null;
             },4000)
          }
         else {
            this.showIndicator = true;
            data.payment = true;
            this.subscription = this._employeeService.PayingEmployeePayment(data).subscribe(() => {
              this.showIndicator = false;
              this.getAllEmployeesPaymentByPageNo();
               this.employeePaymentDone = "Payment successfully done!"
               setTimeout(()=>{
                this.employeePaymentDone = null;
               },3000)
            });
          }
        },1000)



      }
    });


  }




  searchingEmployeeData(event: Event) {
    this.getEmployees.employeeData = [];
    var data = (event.target as HTMLInputElement)?.value;
    let searchData = { searchTerm: data, pageNo: 1 };
    this._employeeService.searchEmplyeeData(searchData).pipe(delay(1000)).subscribe((data: any) => {
      this.getEmployees = data;
    })

  }

  tablePageNo(pageNo: number) {
    this.getEmployees.employeeData = [];
    var searchInputData = (document.getElementById('selectSearch') as HTMLInputElement).value;
    if (searchInputData) {
      let combineData = { pageNo: pageNo, searchTerm: searchInputData };
      this.subscription = this._employeeService.searchEmplyeeData(combineData).subscribe((data: any) => {
        this.getEmployees = data;
      });
    } else {
      this.subscription = this._employeeService.getEmployeesPaymentByPageNo(pageNo).subscribe((data: any) => {
        this.getEmployees = data;
      });
    }
  }



  openDeleteDialogConfarmation(dataId: any) {
    this.payingEmployeeDialog = false;
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete Employee?',
      accept: () => {
        this.showIndicator = true;
        this.subscription = this._employeeService.DeleteEmployee(dataId).subscribe(() => {
          this.getAllEmployees();
          this.showIndicator = false;
          this.getAllEmployeesPaymentByPageNo();

        })
      }
    });
  }

  getAllEmployees() {
    this.subscription = this._employeeService.getAllEmployees().subscribe((data) => {
      this.listEmployees = data;
      this.gettingAllEmployeePayments();
    })
  }

  getAllEmployeesPaymentByPageNo() {
    this.subscription = this._employeeService.getEmployeesPaymentByPageNo(1).subscribe((data) => {
      this.getEmployees = data;

    })
  }

  AddEmployee() {
    this.route.navigate(['/Admin/AddEmployee']);
  }

  showDetailEmployee(dataId: any) {
    this.displayModal = true;
    this.subscription = this._employeeService.getSingleEmployee(dataId).subscribe((data: any) => {
      this.singleEmployeeDetail = data;
    })
  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
