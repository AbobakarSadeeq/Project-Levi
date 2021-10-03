import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { threadId } from 'worker_threads';
import { AuthService } from '../auth.service';
import { AuthorizedImagesService } from './authorized-images.service';

@Component({
  selector: 'app-authorized-images',
  templateUrl: './authorized-images.component.html',
  styleUrls: ['./authorized-images.component.css']
})
export class AuthorizedImagesComponent implements OnInit {


  loadingIndicator = false;
  subscription: Subscription;
  displayModel: boolean = false;
  showError: boolean = false;
  displayModelUserAddress = false;
  Cities: any[] = [];
  Countries: any[] = [];
  CitiesDataFilterd: any[] = [];
  forSelected = null;
  MainProfile: any;
  userPhotosData: any;
  imageForMainProfile: any = null;
  getSingleUserIdForPhotos: any;
  getSingleUserAddress: any;
  editDisplayModelUserAddress = false;
  reactiveFormData: FormGroup;
  pleaseAddAddress = false;

  constructor(private cdr: ChangeDetectorRef,private route:Router ,private confirmationService: ConfirmationService, private fb: FormBuilder, private myActivateParams: ActivatedRoute, private authorizedImage: AuthorizedImagesService, private _authService: AuthService) { }

  ngOnInit(): void {

    this.subscription =  this._authService.loadingSpinnerLogOut.subscribe((data:any)=>{
      this.loadingIndicator = data;
    });
    // Getting SingleUser Data
    const getIdFromQueryString = this.myActivateParams.snapshot.params['id'];
    this.getSingleUserIdForPhotos = getIdFromQueryString
    this.GetAllPhotos(getIdFromQueryString);

    this._authService.profilePic.subscribe((data: any) => {
      this.imageForMainProfile = data;
    })
    this.imageForMainProfile = localStorage.getItem("photoUrl");

    this.subscription = this._authService.GetUserAddress(getIdFromQueryString).subscribe((data: any) => {
      if(data == true){
          this.pleaseAddAddress = data;
      }else{
        this.getSingleUserAddress = data;

      }
    });

    this.reactiveFormData = this.fb.group({
      completeAddress: ['', Validators.required],
      phoneNumber: ['',Validators.required],
      user_ID: ['',Validators.required],
      countries: ['',Validators.required],
      city_ID: ['', [Validators.required, Validators.min(1)]]
    })


    this.GetAllCities();
    this.GetAllCountries();
  }

  selectedFile: any = null;
  fileChange(myEvent: any) {
    this.selectedFile = <File>myEvent?.target?.files[0];
  }

  @ViewChild('MyFileInput') MyFileInput: ElementRef;

  InsertPhoto(userId: string, photoData: NgForm) {
    debugger;
    this.hideModel(photoData);
    this.loadingIndicator = true;
    const formForm = new FormData();
    formForm.append("descriptionHeader", photoData.value.descriptionHeader);
    formForm.append("description", photoData.value.description);
    formForm.append("File", this.selectedFile, this.selectedFile?.name);

    this.authorizedImage.UploadOrInsertPhoto(userId, formForm).subscribe((data: any) => {
      if (data.isMainPhoto == true) {
        // LocalStorage is used becuase to override the
        localStorage.setItem("photoUrl", data.url);
        this._authService.profilePic.next(data.url);
      };
      this.loadingIndicator = false;

      this.GetAllPhotos(this.getSingleUserIdForPhotos);
      this.MyFileInput.nativeElement.value = null;
    });
  }


  GetAllPhotos(getUserId: any) {
    this.subscription = this.authorizedImage.GetListPhoto(getUserId).subscribe((data: any) => {
      this.userPhotosData = data;
    });
  }

  MainPhoto(photoData: any) {
    this.subscription = this.authorizedImage.isMainPhotoChanging(photoData?.customIdentityId, photoData?.id).subscribe(() => {
      this.GetAllPhotos(photoData?.customIdentityId);
      localStorage.setItem("photoUrl", photoData.url)
      this._authService.profilePic.next(photoData.url);
    });
  }

  openDeleteDailog(photoData: any, userId: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete Your Profile Picture?',
      accept: () => {
        this.loadingIndicator = true;
        this.authorizedImage.DeletePhoto(photoData).subscribe(() => {
          this.GetAllPhotos(userId);
          this.loadingIndicator = false;
        });
      }
    });
  }

  // User Address:
  InsertUserAddress(formData: NgForm) {
    debugger;
    this.loadingIndicator = true;
    this.subscription = this._authService.InserUserAddress(formData.value).subscribe(() => {
      this.hideModel(formData);
      this.loadingIndicator = false;
      this.route.navigate(['']);
    });
  }

  EditUserAddressModel(editData: any) {
    this.editDisplayModelUserAddress = true;
    this.reactiveFormData = this.fb.group({
      completeAddress: [editData.completeAddress],
      phoneNumber: [editData.phoneNumber],
      user_ID: [editData.user_ID],
      countries: [editData.city?.country_ID],
      city_ID: [editData.city_ID]
    })

  }

  EditUserAddress() {
    debugger;
    const formFrom = new FormData;
    formFrom.append("completeAddress", this.reactiveFormData.value['completeAddress']);
    formFrom.append("phoneNumber", this.reactiveFormData.value['phoneNumber']);
    formFrom.append("user_ID", this.reactiveFormData.value['user_ID']);
    formFrom.append("city_ID", this.reactiveFormData.value['city_ID']);
    this.loadingIndicator = true;
    this.subscription = this._authService.UpdateUserAddress(formFrom).subscribe(() => {
      this.editDisplayModelUserAddress = false;
      this.loadingIndicator = false;
      this.route.navigate(['']);
    })
  }

  // Get Cities and Countries

  GetAllCities() {
    this.subscription = this._authService.getCities().subscribe((data: any) => {
      this.CitiesDataFilterd = data;
      this.Cities = data;
    })
  }

  GetAllCountries() {
    this.subscription = this._authService.getCountry().subscribe((data: any) => {
      this.Countries = data;
    })
  }

  showingCities(event: Event) {
    var Id = (event.target as HTMLInputElement).value;
    this.CitiesDataFilterd = this.Cities.filter(a => a.country_ID == Id);
    this.cdr.detectChanges();


  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }


  // Close Dialog
  closeDialog() {
    this.confirmationService.close();
  }
  AddUserImageModel() {
    this.displayModel = true;
  }

  AddUserAddressModel() {
    this.displayModelUserAddress = true;
  }



  hideModel(formData: NgForm) {
    this.displayModel = false;
  }

  EditHideModel(){
    this.CitiesDataFilterd = this.Cities;
  }

  ngAfterViewChecked(){
    //your code to update the model
    this.cdr.detectChanges();
 }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
