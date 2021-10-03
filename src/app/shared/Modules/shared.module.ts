import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import { BasicModule } from './basic/basic.module';
import { MaterialModule } from './material/material.module';
import { PrimengModule } from './primeng/primeng.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AdminHeaderComponent } from 'src/app/admin-panel/admin-header/admin-header.component';
import { AdminHeaderModule } from 'src/app/admin-panel/admin-header/admin-header.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({


  imports: [
    NgbModule,

  ],
  exports: [
    PrimengModule,
    MaterialModule,
    BasicModule,
    NgbModule
  ]
})
export class SharedModule { }
