import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private http:HttpClient) { }

  // Get Inserting Data's

  getInternetNetwork(): Observable<any>{
    return this.http.get("https://localhost:44344/api/InternetNetwork");
  }

  getBrand(): Observable<any>{
    return this.http.get("https://localhost:44344/api/Brand");
  }

  getColor(): Observable<any>{
    return this.http.get("https://localhost:44344/api/Color");
  }

  getOperatingSystem(): Observable<any>{
    return this.http.get("https://localhost:44344/api/OperatingSystem");
  }

  getOperatingSystemVersion(): Observable<any>{
    return this.http.get("https://localhost:44344/api/OperatingSystemVersion");
  }

  InsertMobile(data:any){
    return this.http.post("https://localhost:44344/api/Mobile",data);
  }

  getAllMobile(): Observable<any>{
    return this.http.get("https://localhost:44344/api/Mobile/GetAllsMobile");
  }

  getMobilesbyTablePage(pageNo:number):Observable<any>{
    return this.http.get("https://localhost:44344/api/Mobile/GetMobilesByPagesNo/" + pageNo);
  }

  getSingleMobile(dataId:number){
    return this.http.get("https://localhost:44344/api/Mobile/" + dataId);
  }

  DeleteSingleMobile(dataId:any){
    return this.http.delete("https://localhost:44344/api/Mobile/" + dataId);
  }

  DeleteSingleMobileImage(dataId:any){
    return this.http.delete("https://localhost:44344/api/Mobile/DeletingSingleMobileImage/" + dataId);
  }

  updateMobile(data:any){
    return this.http.put("https://localhost:44344/api/Mobile",data)
  }

  // Client API's
  GetMaxSellOut(){
    return this.http.get("https://localhost:44344/api/Mobile/GetMaxSellOutMobiles");
  }


}
