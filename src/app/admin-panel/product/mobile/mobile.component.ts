import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
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




  getMobiles: any[] = [];
  gettingInternetNetwork: any[] = [];
  singleMobileData: any;
  constructor(private route: Router, private _MobileService: MobileService, private DialogService: ConfirmationService) { }

  ngOnInit(): void {


    this.getAllMobiles();
  }


  // Navigation to Add mobile component:
  AddMobileNavigation() {
    this.route.navigate(["Admin/AddMobile"])
  }

  getAllMobiles() {
    this.subscription = this._MobileService.getAllMobile().subscribe((data: any) => {
      this.getMobiles = data;
    });
  }




  // Showing Mobile Details Dialog;

  getInternetNetworks(dataId: any) {
    this._MobileService.getInternetNetwork().subscribe((data: any[]) => {
      console.log(data)
      for (var networkId of dataId) {
        this.gettingInternetNetwork.push(data.filter(a => a.internetNetwork_Id == networkId.internetNetworkId));
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
