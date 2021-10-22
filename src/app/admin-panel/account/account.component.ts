import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MobileService } from '../product/mobile/mobile.service';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  subscription: Subscription;
  showIndicator = false;
  accountList: any[] = [];
  singleLatestAccountDetail: any;

  editFormData = {
    balance:undefined
  };

  mobilesTotalWorth: number = 0;
  userDetails:any = {id:null};
  editdisplayModelAccountBalance = false;
  displayModelAccountBalance = false;
  hideAddButton = true;


  constructor(private _authService: AuthService, private _accountSerivce: AccountService,  private _mobileData:MobileService) { }

  ngOnInit(): void {

    this.subscription = this._authService.loadingSpinnerLogOut.subscribe((data: any) => {
      this.showIndicator = data;
    });

    this.subscription = this._authService.GetLogInProfile().subscribe((data: any) => {
      this.userDetails = data;
    });

    this.getAllAcounts();
    this.getLatestedAccount();
    this.getMobileWorth();
  }


  getAllAcounts() {
    this.subscription = this._accountSerivce.getAccounts().subscribe((data: any) => {
      this.accountList = data;
    });
  }


  getLatestedAccount() {
    this.subscription = this._accountSerivce.getlatestedAccountDetail().subscribe((data: any) => {
      this.singleLatestAccountDetail = data;
      this.editFormData = data;
    this.editFormData = Object.assign({}, data);

    });
  }

  addAccount(formData:NgForm) {
    this.showIndicator = true;
    this.subscription = this._accountSerivce.addAccount(formData.value).subscribe(() => {
      this.showIndicator = false;
      this.getLatestedAccount();
    this.displayModelAccountBalance = false;
      this.hideAddButton = false;
    });
    formData.reset();
  }


  AddAccountBalance() {
    this.displayModelAccountBalance = true;
  }

  hideModel() {
    this.displayModelAccountBalance = false;
    this.editdisplayModelAccountBalance = false;
  }

  EditAccountModel(){
    this.editdisplayModelAccountBalance = true;
  }

  EditAccount(formData:NgForm){
    this.showIndicator = true;
    console.log(formData.value);
    this.subscription = this._accountSerivce.updateAccount(formData.value).subscribe(() => {
      this.showIndicator = false;
      this.getLatestedAccount();
    this.editdisplayModelAccountBalance = false;
    });
    formData.reset();
  }





  getMobileWorth(){
    this.subscription = this._mobileData.getAllMobile().subscribe((data:any[])=>{
      for(var allMobilePriceCost of data){
        this.mobilesTotalWorth = this.mobilesTotalWorth + (allMobilePriceCost.mobilePrice * allMobilePriceCost.quantity);
      }
    });

  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
