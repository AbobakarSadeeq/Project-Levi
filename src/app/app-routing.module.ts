import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './admin-panel/account/account.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './Client-Panel/not-found/not-found.component';

const routes: Routes = [


  // All Client Side Paths
  // localHost:4200/AnotherModule
  {path: '', loadChildren: () => import ('./Client-Panel/home/home.module').then( m=> m.HomeModule )},
  {path: 'Mobile/Detail/:id', loadChildren: () => import ('./Client-Panel/client-mobile/mobile-detail/mobile-detail.module').then( m=> m.MobileDetailModule )},
  {path: 'Mobile/:multiData', loadChildren: () => import ('./Client-Panel/client-mobile/client-module.module').then( m=> m.ClientModuleModule )},
  {path: 'Auth', loadChildren: () => import ('./auth/auth.module').then( m=> m.AuthModule )},
  {path: 'User/EditUser/:id', loadChildren: () => import ('./auth/authorized-images/authorized-images.module').then( m=> m.AuthorizedImagesModule )},

  // All Admin Side Paths
  // localHost:4200/Admin/AnotherModule
  {path: 'Admin/Dashboard', loadChildren: () => import ('../app/admin-panel/admin.module').then( m=> m.AdminModule ), canActivate: [AuthGuard]},
  {path: 'Admin/UserRoles', loadChildren: () => import ('./admin-panel/user/user-roles/user-roles.module').then( m=> m.UserRolesModule ), canActivate: [AuthGuard]},
  {path: 'Admin/Category', loadChildren: () => import ('./admin-panel/extra-product-info/category/category.module').then( m=> m.CategoryModule ), canActivate: [AuthGuard]},
  {path: 'Admin/Brand', loadChildren: () => import ('./admin-panel/extra-product-info/brand/brand.module').then( m=> m.BrandModule ), canActivate: [AuthGuard]},
  {path: 'Admin/Mobile', loadChildren: () => import ('./admin-panel/product/mobile/mobile.module').then( m=> m.MobileModule ), canActivate: [AuthGuard]},
  {path: 'Admin/AddMobile', loadChildren: () => import ('./admin-panel/product/mobile/add-mobile/add-mobile.module').then( m=> m.AddMobileModule ), canActivate: [AuthGuard]},
  {path: 'Admin/UpdateMobile/:id', loadChildren: () => import ('./admin-panel/product/mobile/update-mobile/update-mobile.module').then( m=> m.UpdateMobileModule ), canActivate: [AuthGuard]},
  {path: 'Admin/Carousel', loadChildren: () => import ('./admin-panel/extra-product-info/carousel/carousel.module').then( m=> m.CarouselModule ), canActivate: [AuthGuard]},
  {path: 'Admin/EditRole/:id', loadChildren: () => import ('./admin-panel/user/user-roles/edit-role/edit-role.module').then( m=> m.EditRoleModule ), canActivate: [AuthGuard]},
  {path: 'Admin/EditUsersRole/:id', loadChildren: () => import ('./admin-panel/user/user-roles/edit-role/edit-user-in-role/edit-user-in-role.module').then( m=> m.EditUserInRoleModule ), canActivate: [AuthGuard]},
  {path: 'Admin/Employee', loadChildren: () => import ('./admin-panel/user/employee/employee.module').then( m=> m.EmployeeModule ), canActivate: [AuthGuard]},
  {path: 'Admin/AddEmployee', loadChildren: () => import ('./admin-panel/user/employee/add-employee/add-employee.module').then( m=> m.AddEmployeeModule ), canActivate: [AuthGuard]},
  {path: 'Admin/EditEmployee/:id', loadChildren: () => import ('./admin-panel/user/employee/update-employee/update-employee.module').then( m=> m.UpdateEmployeeModule ), canActivate: [AuthGuard]},





  // Without Lazy-Loading of Admin
  {path: 'Admin/Account', component:AccountComponent, canActivate: [AuthGuard]},
  { path: 'notfound', loadChildren: () => import ('./Client-Panel/not-found/not-found.module').then( m=> m.NotFoundModule ), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/notfound' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
