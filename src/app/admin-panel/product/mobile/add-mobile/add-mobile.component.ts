import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MobileService } from '../mobile.service';

@Component({
  selector: 'app-add-mobile',
  templateUrl: './add-mobile.component.html',
  styleUrls: ['./add-mobile.component.css']
})
export class AddMobileComponent implements OnInit {
  mobileFormData: FormGroup;
  subscription: Subscription;
  showIndicator = false;
  // Getting Data for fullfill the form
  internetNetworks: any[] = [];
  brandsData: any[] = [];
  colorsData: any[] = [];
  OperatingSystemData: any[] = [];
  OperatingSystemVersionData: any[] = [];
  OperatingSystemVersionDataFilterd: any[] = [];
  gettingMobileNetworksData: any[] = [];
  loadingIndicator = false;


  constructor(private _authService:AuthService, private fb: FormBuilder, private _MobileService: MobileService, private _route:Router) { }

  ngOnInit(): void {

    this.subscription =  this._authService.loadingSpinnerLogOut.subscribe((data:any)=>{
      this.showIndicator = data;
    });

    this.mobileFormData = this.fb.group({
      mobileName: ['', Validators.required],
      processor: ['', Validators.required],
      storage: ['', Validators.required],
      batteryMah: ['', Validators.required],
      ram: ['', Validators.required],
      launchDate: ['', Validators.required],
      mobileWeight: ['', Validators.required],
      screenSize: ['', Validators.required],
      charger: ['', Validators.required],
      resolution: ['', Validators.required],
      headPhoneJack: ['', Validators.required],
      bluetooth: ['', Validators.required],
      uSBConnector: ['', Validators.required],
      wifi: ['', Validators.required],
      mobilePrice: ['', Validators.required],
      quantity: ['',Validators.required],
      screenType: ['', Validators.required],
      brand: [null, Validators.required],
      color: [null, Validators.required],
      operatingSystem: [null, Validators.required],
      operatingSystemVersion: [null, Validators.required],
      stockAvailiability:['', Validators.required],
      backCameras: this.fb.array([this.fb.group({ cameraDetail: [''] })], Validators.required),
      //  mobileNetworks: [''],
      frontCameras: this.fb.array([this.fb.group({ cameraDetail: [''] })], Validators.required),
      Files: this.fb.array([this.fb.group({ File: [''] })], Validators.required)
    })


    this.getInternetNetworks();
    this.getBrands();
    this.getColors();
    this.getOperatingSystems();
    this.getOperatingSystemVersions();

  }


  // Getting Internet Networks

  getInternetNetworks() {
    this.subscription = this._MobileService.getInternetNetwork().subscribe((data: any) => {
      this.internetNetworks = data;
    });
  }

  getBrands() {
    this.subscription = this._MobileService.getBrand().subscribe((data: any) => {
      this.brandsData = data;
    });
  }

  getColors() {
    this.subscription = this._MobileService.getColor().subscribe((data: any) => {
      this.colorsData = data;
    });
  }

  getOperatingSystems() {
    this.subscription = this._MobileService.getOperatingSystem().subscribe((data: any) => {
      this.OperatingSystemData = data;
    });
  }

  getOperatingSystemVersions() {
    this.subscription = this._MobileService.getOperatingSystemVersion().subscribe((data: any) => {
      this.OperatingSystemVersionData = data;
    });
  }

  // show operating system version through Operating System

  showingOperatingSystemVersion(event: Event) {
    var Id = (event.target as HTMLInputElement).value;
    this.OperatingSystemVersionDataFilterd = this.OperatingSystemVersionData.filter(a => a.operatingSystemId == Id);
  }



  selectedFile: any[] = [];
  fileChange(myEvent: any) {
    this.selectedFile.push(<File>myEvent?.target?.files[0]);
  }

  onChange(data: any) {
    let insertIntoObject = { internetNetworkId: data };
     if(this.gettingMobileNetworksData.filter(a=>a.internetNetworkId == data).length > 0){
      var findingIndex =  this.gettingMobileNetworksData.findIndex(a=>a.internetNetworkId == data);
      this.gettingMobileNetworksData.splice(findingIndex,1)
     }
     else{
      this.gettingMobileNetworksData.push(insertIntoObject);
     }

    }

  stockavailibityData:any = false;
  stockAvailiabilityData(){
    this.stockavailibityData = true;
  }


  @ViewChild('MyFileInput') MyFileInput: ElementRef;
  submitMobile() {
    debugger;
    this.loadingIndicator = true;
    const formFrom = new FormData();
    formFrom.append("mobileName", this.mobileFormData.value['mobileName']);
    formFrom.append("processor", this.mobileFormData.value['processor']);
    formFrom.append("storage", this.mobileFormData.value['storage']);
    formFrom.append("batteryMah", this.mobileFormData.value['batteryMah']);
    formFrom.append("ram", this.mobileFormData.value['ram']);
    formFrom.append("launchDate", this.mobileFormData.value['launchDate']);
    formFrom.append("mobileWeight", this.mobileFormData.value['mobileWeight']);
    formFrom.append("screenSize", this.mobileFormData.value['screenSize']);
    formFrom.append("charger", this.mobileFormData.value['charger']);
    formFrom.append("resolution", this.mobileFormData.value['resolution']);
    formFrom.append("headPhoneJack", this.mobileFormData.value['headPhoneJack']);
    formFrom.append("bluetooth", this.mobileFormData.value['bluetooth']);
    formFrom.append("uSBConnector", this.mobileFormData.value['uSBConnector']);
    formFrom.append("mobilePrice", this.mobileFormData.value['mobilePrice']);
    formFrom.append("wifi", this.mobileFormData.value['wifi']);
    formFrom.append("quantity", this.mobileFormData.value['quantity']);
    formFrom.append("screenType", this.mobileFormData.value['screenType']);
    formFrom.append("brandId", this.mobileFormData.value['brand']);
    formFrom.append("colorId", this.mobileFormData.value['color']);
    formFrom.append("oSVersionId", this.mobileFormData.value['operatingSystemVersion'])
    formFrom.append("stockAvailiability", this.stockavailibityData);

    for (let i = 0; i < this.gettingMobileNetworksData.length; i++) {
      formFrom.append(`mobileNetworks[${i.toString()}].internetNetworkId`, this.gettingMobileNetworksData[i].internetNetworkId);
    }

    for (let i = 0; i < this.mobileFormData.value['frontCameras'].length; i++) {
      formFrom.append(`frontCameras[${i.toString()}].cameraDetail`, this.mobileFormData.value['frontCameras'][i].cameraDetail);
    }

    for (let i = 0; i < this.mobileFormData.value['backCameras'].length; i++) {
      formFrom.append(`backCameras[${i.toString()}].cameraDetail`, this.mobileFormData.value['backCameras'][i].cameraDetail);
    }

    for (let i = 0; i < this.selectedFile.length; i++) {
      formFrom.append(`File`, this.selectedFile[i], this.selectedFile[i]?.name);
    }





    this.subscription = this._MobileService.InsertMobile(formFrom).subscribe((data: any) => {
      this.loadingIndicator = false;
      this._route.navigate(["Admin/Mobile"]);
    });



  }


  // Dynamic Form Data
  AddFrontCamera() {
    (<FormArray>this.mobileFormData.get("frontCameras")).push(this.fb.group({ cameraDetail: [''] }));
  }

  getFrontCamera() {
    return (this.mobileFormData.get('frontCameras') as FormArray).controls;
  }


  AddbackCamera() {
    (<FormArray>this.mobileFormData.get("backCameras")).push(this.fb.group({ cameraDetail: [''] }));
  }

  getbackCamera() {
    return (this.mobileFormData.get('backCameras') as FormArray).controls;
  }

  AddMobileImage() {
    (<FormArray>this.mobileFormData.get("Files")).push(this.fb.group({ File: [''] }));
  }

  getMobileImage() {
    return (this.mobileFormData.get('Files') as FormArray).controls;
  }


  // Adding More Dynamic Inputs Through User

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
