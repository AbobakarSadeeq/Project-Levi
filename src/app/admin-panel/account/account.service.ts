import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _Http: HttpClient) { }

  getAccounts(): Observable<any> {
    return this._Http.get("https://localhost:44344/api/AdminBalanceAccount");
  }

  getlatestedAccountDetail() {
    return this._Http.get("https://localhost:44344/api/AdminBalanceAccount/GetLatestAccountDetail");
  }

  addAccount(data: any) {
    return this._Http.post("https://localhost:44344/api/AdminBalanceAccount", data);
  }

  updateAccount(data: any) {
    return this._Http.put("https://localhost:44344/api/AdminBalanceAccount", data);

  }






}
