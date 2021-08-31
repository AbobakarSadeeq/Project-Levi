import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  // All Client Side Paths
  // localHost:4200/AnotherModule
  {path: '', loadChildren: () => import ('../app/home/home.module').then( m=> m.HomeModule )},


  // All Admin Side Paths
  // localHost:4200/Admin/AnotherModule
  {path: 'Admin', loadChildren: () => import ('../app/admin-panel/admin.module').then( m=> m.AdminModule )},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
