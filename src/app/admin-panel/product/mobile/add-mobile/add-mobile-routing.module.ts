import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMobileComponent } from './add-mobile.component';

const routes: Routes = [
  {path: "", component: AddMobileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddMobileRoutingModule { }
