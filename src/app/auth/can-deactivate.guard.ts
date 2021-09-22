import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddMobileComponent } from '../admin-panel/product/mobile/add-mobile/add-mobile.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<AddMobileComponent> {
  canDeactivate(component: AddMobileComponent): boolean{
    if(component.mobileFormData.dirty){
      return confirm("Are you sure want to Leave!");
    }
    return true;
  }

}
