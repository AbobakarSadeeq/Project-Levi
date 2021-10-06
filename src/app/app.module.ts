import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/Modules/shared.module';
import { AccountModule } from './admin-panel/account/account.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { AuthService } from './auth/auth.service';
import { ShoppingCartComponent } from './Client-Panel/shopping-cart/shopping-cart.component';
@NgModule({
  declarations: [
    AppComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SharedModule,
    AccountModule,
    BrowserAnimationsModule,

  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
