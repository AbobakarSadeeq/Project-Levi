import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import { BasicModule } from './basic/basic.module';
import { MaterialModule } from './material/material.module';
import { PrimengModule } from './primeng/primeng.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [

  ],
  exports: [
    PrimengModule,
    MaterialModule,
    BasicModule,

  ]
})
export class SharedModule { }
