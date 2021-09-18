import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './admin-panel/account/account.component';

const routes: Routes = [


  // All Client Side Paths
  // localHost:4200/AnotherModule
  {path: '', loadChildren: () => import ('./Client-Panel/home/home.module').then( m=> m.HomeModule )},
  {path: 'Mobile/Detail/:id', loadChildren: () => import ('../app/Client-Panel/mobile-detail/mobile-detail.module').then( m=> m.MobileDetailModule )},


  // All Admin Side Paths
  // localHost:4200/Admin/AnotherModule
  {path: 'Admin/Dashboard', loadChildren: () => import ('../app/admin-panel/admin.module').then( m=> m.AdminModule )},
  {path: 'Admin/User', loadChildren: () => import ('./admin-panel/users/user.module').then( m=> m.UserModule )},
  {path: 'Admin/Category', loadChildren: () => import ('./admin-panel/extra-product-info/category/category.module').then( m=> m.CategoryModule )},
  {path: 'Admin/Brand', loadChildren: () => import ('./admin-panel/extra-product-info/brand/brand.module').then( m=> m.BrandModule )},
  {path: 'Admin/Mobile', loadChildren: () => import ('./admin-panel/product/mobile/mobile.module').then( m=> m.MobileModule )},
  {path: 'Admin/AddMobile', loadChildren: () => import ('./admin-panel/product/mobile/add-mobile/add-mobile.module').then( m=> m.AddMobileModule )},
  {path: 'Admin/UpdateMobile/:id', loadChildren: () => import ('./admin-panel/product/mobile/update-mobile/update-mobile.module').then( m=> m.UpdateMobileModule )},
  {path: 'Admin/Carousel', loadChildren: () => import ('./admin-panel/extra-product-info/carousel/carousel.module').then( m=> m.CarouselModule )},





  // Without Lazy-Loading of Admin
  {path: 'Admin/Account', component:AccountComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
