import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MobileService } from './mobile.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
  subscription: Subscription;
  displayModal = false;
  myLoadingIndicator = false;
  showIndicator = false;
  getMobiles: any;
  gettingInternetNetwork: any[] = [];
  singleMobileData: any;

  constructor(private _authService:AuthService, private _route: Router, private _MobileService: MobileService, private DialogService: ConfirmationService) { }

  ngOnInit(): void {

    this.subscription =  this._authService.loadingSpinnerLogOut.subscribe((data:any)=>{
      this.showIndicator = data;
    });
    this.getAllMobiles();
  }


  // Navigation to Add mobile component:
  AddMobileNavigation() {
    this._route.navigate(["Admin/AddMobile"])
  }

  getAllMobiles() {
    this.subscription = this._MobileService.getMobilesbyTablePage(1).subscribe((data: any) => {
      this.getMobiles = data;
    });
  }



  // Pagination Event
  tablePageNo(paginationNumber:any){
    this.getMobiles.mobileData = [];
    this.subscription = this._MobileService.getMobilesbyTablePage(paginationNumber).subscribe((data: any) => {
      this.getMobiles = data;
    });
  }

  // Showing Mobile Details Dialog;

  getInternetNetworks(mobileNetworksData: any[]) {
    this.gettingInternetNetwork.splice(0,this.gettingInternetNetwork.length);
    this._MobileService.getInternetNetwork().subscribe((data: any[]) => {
      debugger;
        for (var mobileNetworks in mobileNetworksData) {
          for (var networks in data) {
            if (mobileNetworksData[mobileNetworks].internetNetworkId == data[networks].internetNetwork_Id) {
              this.gettingInternetNetwork.push(data[networks]);
              break;
            }
          }
        }
    })
  }

  showModalDialog(Id: any) {
    this.displayModal = true;
    this.subscription = this._MobileService.getSingleMobile(Id).subscribe((data: any) => {
      this.singleMobileData = data;
      this.getInternetNetworks(data?.networksMobiles);
    });
  }

  // Delete Mobile
  openDeleteDialogConfarmation(dataId: any) {
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete Mobile?',
      accept: () => {
        this.myLoadingIndicator = true;
        this._MobileService.DeleteSingleMobile(dataId).subscribe(() => {
          this.getAllMobiles();
          this.myLoadingIndicator = false;
        })
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
