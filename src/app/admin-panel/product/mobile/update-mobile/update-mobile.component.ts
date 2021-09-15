import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MobileService } from '../mobile.service';

@Component({
  selector: 'app-update-mobile',
  templateUrl: './update-mobile.component.html',
  styleUrls: ['./update-mobile.component.css']
})
export class UpdateMobileComponent implements OnInit {
  subscription: Subscription;
  mobileFormData: FormGroup;


  internetNetworks: any[] = [];
  brandsData: any[] = [];
  colorsData: any[] = [];
  OperatingSystemData: any[] = [];
  OperatingSystemVersionData: any[] = [];
  OperatingSystemVersionDataFilterd: any[] = [];
  gettingMobileNetworksData: any[] = [];
  loadingIndicator = false;
  oldBackCameras: any[] = [];
  oldFrontCameras: any[] = [];
  oldMobileImages: any[] = [];
  oldNetworkMobile: any[] = [];
  updateNetworkMobile: any[] = [];
  deletedImage = false;

  constructor(private DialogService: ConfirmationService, public datepipe: DatePipe, private fb: FormBuilder, private _route: Router, private _activateRoute: ActivatedRoute, private _mobileService: MobileService) { }

  ngOnInit(): void {

    this.mobileFormData = this.fb.group({
      mobile_Id: [''],
      mobileName: [''],
      processor: [''],
      storage: [''],
      batteryMah: [''],
      ram: [''],
      launchDate: [''],
      mobileWeight: [''],
      screenSize: [''],
      charger: [''],
      resolution: [''],
      headPhoneJack: [''],
      bluetooth: [''],
      uSBConnector: [''],
      wifi: [''],
      mobilePrice: [''],
      quantity: [''],
      screenType: [''],
      brand: [null],
      color: [null],
      operatingSystem: [null],
      operatingSystemVersion: [null],
      stockAvailiability: [""],
      backCameras: this.fb.array([]),
      frontCameras: this.fb.array([]),
      Files: this.fb.array([this.fb.group({ File: [''] })])
    })

    const getUrlId = this._activateRoute.snapshot.params['id'];
    this.subscription = this._mobileService.getSingleMobile(getUrlId).subscribe((data: any) => {

      for (var backCameraData of data.mobileBackCameras) {
        this.oldBackCameras.push(backCameraData);
      }

      for (var frontCameraData of data.mobileFrontCameras) {
        this.oldFrontCameras.push(frontCameraData);
      }

      for (var mobileImages of data.mobileImagess) {
        this.oldMobileImages.push(mobileImages);
      }

      for (var mobileNetworks in data.networksMobiles) {
        let changingDataFormate = { internetNetworkId: data.networksMobiles[mobileNetworks]?.internetNetworkId, check: true, mobileNetwork_Id: data.networksMobiles[mobileNetworks].mobileNetwork_Id };
        this.gettingMobileNetworksData.push(changingDataFormate);
        for (var networks in this.internetNetworks) {
          if (data.networksMobiles[mobileNetworks].internetNetworkId == this.internetNetworks[networks].internetNetwork_Id) {
            this.internetNetworks[networks].check = true;
            break;
          }
        }
      }
      // Converting Date
      const convertLaunchDate = this.datepipe.transform(data.launchDate, 'yyyy-MM-dd');


      this.mobileFormData = this.fb.group({
        mobile_Id: [data.mobile_Id],
        mobileName: [data.mobileName],
        processor: [data.processor],
        storage: [data.storage],
        batteryMah: [data.batteryMah],
        ram: [data.ram],
        launchDate: [convertLaunchDate],
        mobileWeight: [data.mobileWeight],
        screenSize: [data.screenSize],
        charger: [data.charger],
        resolution: [data.resolution],
        headPhoneJack: [data.headPhoneJack],
        bluetooth: [data.bluetooth],
        uSBConnector: [data.usbConnector],
        wifi: [data.wifi],
        mobilePrice: [data.mobilePrice],
        quantity: [data.quantity],
        screenType: [data.screenType],
        brand: [data.brandId],
        color: [data.colorId],
        operatingSystem: [data.operatingSystemVersion?.operatingSystemId],
        operatingSystemVersion: [data.osVersionId],
        stockAvailiability: [data.stockAvailiability],
        backCameras: this.fb.array([]),
        frontCameras: this.fb.array([]),
        Files: this.fb.array([this.fb.group({ File: [''] })])
      })
    });



    this.getInternetNetworks();
    this.getBrands();
    this.getColors();
    this.getOperatingSystems();
    this.getOperatingSystemVersions();
    this.getOldBackCameraData();
    this.getOldFrontCameraData();
  }

  getInternetNetworks() {
    this.subscription = this._mobileService.getInternetNetwork().subscribe((data: any) => {
      for (var gettingInternetNetworks of data) {
        this.internetNetworks.push({ check: false, networkName: gettingInternetNetworks.networkName, internetNetwork_Id: gettingInternetNetworks.internetNetwork_Id, mobileNetwork_Id: gettingInternetNetworks.mobileNetwork_Id })
      }
    });
  }
  onChange(data: any) {
    let insertIntoObject = { internetNetworkId: data?.internetNetwork_Id, check: data?.check, mobileNetwork_Id: 0 };
    debugger;
    let findingcheckOrNot;
    for (var getMobileData of this.gettingMobileNetworksData) {
      if (getMobileData.mobileNetwork_Id == null && data.internetNetwork_Id == getMobileData.internetNetworkId) {
        const indexData = this.gettingMobileNetworksData.indexOf(getMobileData);
        this.gettingMobileNetworksData.splice(indexData, 1);
        findingcheckOrNot = false;
        break;
      } else if (data.internetNetwork_Id == getMobileData.internetNetworkId) {
        if (getMobileData.check == false) {
          findingcheckOrNot = false;
          getMobileData.check = true;
          break;

        }
        findingcheckOrNot = false;
        getMobileData.check = false;
        break;
      }
      else {
        findingcheckOrNot = true;
      }


    }

    if (findingcheckOrNot) {
      insertIntoObject.check = true;
      this.gettingMobileNetworksData.push(insertIntoObject);
    }

    //  ;



  }

  getBrands() {
    this.subscription = this._mobileService.getBrand().subscribe((data: any) => {
      this.brandsData = data;
    });
  }

  getColors() {
    this.subscription = this._mobileService.getColor().subscribe((data: any) => {
      this.colorsData = data;
    });
  }

  getOperatingSystems() {
    this.subscription = this._mobileService.getOperatingSystem().subscribe((data: any) => {
      this.OperatingSystemData = data;
    });
  }

  getOperatingSystemVersions() {
    this.subscription = this._mobileService.getOperatingSystemVersion().subscribe((data: any) => {
      this.OperatingSystemVersionData = data;
      this.OperatingSystemVersionDataFilterd = this.OperatingSystemVersionData;
    });
  }


  showingOperatingSystemVersion(event: Event) {
    var Id = (event.target as HTMLInputElement).value;
    this.OperatingSystemVersionDataFilterd = this.OperatingSystemVersionData.filter(a => a.operatingSystemId == Id);
  }






  getbackCamera() {
    const data = (this.mobileFormData.get('backCameras') as FormArray).controls;
    return data;
  }


  getOldBackCameraData() {
    setTimeout(() => {
      for (var data of this.oldBackCameras) {
        (<FormArray>this.mobileFormData.get("backCameras")).push(this.fb.group({ cameraDetail: data.cameraDetail, mobileBackCamera_Id: data.mobileBackCamera_Id }));
      }
    }, 1000)

  }


  // Dynamic Form Data


  getFrontCamera() {
    return (this.mobileFormData.get('frontCameras') as FormArray).controls;
  }

  getOldFrontCameraData() {
    setTimeout(() => {
      for (var data of this.oldFrontCameras) {

        (<FormArray>this.mobileFormData.get("frontCameras")).push(this.fb.group({ cameraDetail: data.cameraDetail, mobileFrontCamera_Id: data.mobileFrontCamera_Id }));
      }
    }, 1000)

  }


  AddMobileImage() {
    (<FormArray>this.mobileFormData.get("Files")).push(this.fb.group({ File: [''] }));
  }

  getMobileImage() {
    return (this.mobileFormData.get('Files') as FormArray).controls;
  }


  selectedFile: any[] = [];
  fileChange(myEvent: any) {
    this.selectedFile.push(<File>myEvent?.target?.files[0]);
  }

  openDeleteDialogConfarmation(dataId: any, indexData: number) {
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete Image?',
      accept: () => {
        this.loadingIndicator = true;
        this._mobileService.DeleteSingleMobileImage(dataId).subscribe(() => {
          this.loadingIndicator = false;
          this.oldMobileImages.splice(indexData, 1);
        })
      }
    });
  }


  // Submiting and updateing Mobile
  updateSubmit() {
    debugger;
    this.loadingIndicator = true;
    const formFrom = new FormData();
    formFrom.append("mobile_Id", this.mobileFormData.value['mobile_Id']);
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
    formFrom.append("oSVersionId", this.mobileFormData.value['operatingSystemVersion']);
    formFrom.append("stockAvailiability", this.mobileFormData.value['stockAvailiability']);

     for (let i = 0; i < this.gettingMobileNetworksData.length; i++) {
      formFrom.append(`networksMobiles[${i.toString()}].internetNetworkId`, this.gettingMobileNetworksData[i].internetNetworkId);
      formFrom.append(`networksMobiles[${i.toString()}].mobileNetwork_Id`, this.gettingMobileNetworksData[i].mobileNetwork_Id);
      formFrom.append(`networksMobiles[${i.toString()}].check`, this.gettingMobileNetworksData[i].check);
     }

    for (let i = 0; i < this.mobileFormData.value['frontCameras'].length; i++) {
      formFrom.append(`frontCameras[${i.toString()}].cameraDetail`, this.mobileFormData.value['frontCameras'][i].cameraDetail);
      formFrom.append(`frontCameras[${i.toString()}].mobileFrontCamera_Id`, this.mobileFormData.value['frontCameras'][i].mobileFrontCamera_Id);

    }

    for (let i = 0; i < this.mobileFormData.value['backCameras'].length; i++) {
      formFrom.append(`backCameras[${i.toString()}].cameraDetail`, this.mobileFormData.value['backCameras'][i].cameraDetail);
      formFrom.append(`backCameras[${i.toString()}].mobileBackCamera_Id`, this.mobileFormData.value['backCameras'][i].mobileBackCamera_Id);

    }

    for (let i = 0; i < this.selectedFile.length; i++) {
      formFrom.append(`File`, this.selectedFile[i], this.selectedFile[i]?.name);
    }


    this.subscription = this._mobileService.updateMobile(formFrom).subscribe((data: any) => {
      this.loadingIndicator = false;
      this._route.navigate(["Admin/Mobile"]);
    });



  }



}
