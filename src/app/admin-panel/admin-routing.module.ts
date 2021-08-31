import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminPanelComponent } from './admin-panel.component';

const routes: Routes = [
  {path: '', component: AdminHeaderComponent},
  {path: '', component: AdminPanelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
