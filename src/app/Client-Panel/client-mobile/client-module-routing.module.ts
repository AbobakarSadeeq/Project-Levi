import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientMobileComponent } from './client-mobile.component';

const routes: Routes = [
  {path:"", component:ClientMobileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientModuleRoutingModule { }
