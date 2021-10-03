import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MobileService } from '../../product/mobile/mobile.service';
import { CarouselService } from './carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  showIndicator = false;
  CarouselAllData:any[] = [];
  subscription:Subscription;
  display: boolean = false;
  updateModelDisplay = false;
  myLoadingIndicator = false;
  CarouselFormData:FormGroup;
  showError: boolean = false;

  constructor(private _AuthService:AuthService, private route: Router, private _CarouselService: CarouselService, private DialogService: ConfirmationService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.CarouselFormData = this.fb.group({
      imagePriority: ['',Validators.required],
      imageTitle: ['',Validators.required],
      imageDescription: ['', Validators.required],
      File: ['', Validators.required],
    });

    this.subscription =  this._AuthService.loadingSpinnerLogOut.subscribe((data:any)=>{
      this.showIndicator = data;
    });
    this.getAllCarousel();
  }

  getAllCarousel(){
  this.subscription =  this._CarouselService.getAllCarouselImages().subscribe((data:any)=>{

      this.CarouselAllData = data;
    })
  }

  AddCarouselModel(){
    this.display = true;
  }

  UpdateCarouselModel(dataId:number){
    this.updateModelDisplay = true;
    this.subscription = this._CarouselService.getSingleCarouselImage(dataId).subscribe((data:any)=>{
      this.CarouselFormData = this.fb.group({
        imagePriority: [data.imagePriority],
        imageTitle: [data.imageTitle],
        imageDescription: [data.imageDescription],
      });
    })
  }


  selectedFile:any = null;
  fileChange(myEvent: any) {
    this.selectedFile = <File>myEvent?.target?.files[0];
  }

  SubmitCarouselForm(){
    debugger;
    this.myLoadingIndicator = true;
    if (this.CarouselAllData.filter(a => a.imagePriority === this.CarouselFormData.value['imagePriority']).length > 0) {
      this.showError = true;
     this.myLoadingIndicator = false;

    }else{
      const formFrom = new FormData();
      formFrom.append("imagePriority", this.CarouselFormData.value['imagePriority']);
      formFrom.append("imageTitle", this.CarouselFormData.value['imageTitle']);
      formFrom.append("imageDescription", this.CarouselFormData.value['imageDescription']);
      formFrom.append("File", this.selectedFile, this.selectedFile?.name);
      this.display = false;
      this._CarouselService.AddCarousel(formFrom).subscribe(()=>{
      this.myLoadingIndicator = false;
        this.getAllCarousel();
        this.CarouselFormData.reset();
      })
    }
  }

  updateCarouselForm(){
    debugger;
    this.myLoadingIndicator = true;
    if (this.CarouselAllData.filter(a => a.imagePriority === this.CarouselFormData.value['imagePriority']).length > 0) {
      this.showError = true;
     this.myLoadingIndicator = false;

    }else{
      const formFrom = new FormData();
      formFrom.append("imagePriority", this.CarouselFormData.value['imagePriority']);
      formFrom.append("imageTitle", this.CarouselFormData.value['imageTitle']);
      formFrom.append("imageDescription", this.CarouselFormData.value['imageDescription']);
      formFrom.append("File", this.selectedFile, this.selectedFile?.name);
      this.updateModelDisplay = false;
      this._CarouselService.updateCarousel(formFrom).subscribe(()=>{
      this.myLoadingIndicator = false;
        this.getAllCarousel();
      })
    }
  }

  removeErrorMessage(){
    this.showError = false;
    this.CarouselFormData.reset();
  }

  openDeleteDialogConfarmation(dataId:number){
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete Carousel Image?',
      accept: () => {
        this.myLoadingIndicator = true;
        this._CarouselService.DeleteCarouselImage(dataId).subscribe(()=>{
          this.myLoadingIndicator = false;
          this.getAllCarousel();
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
