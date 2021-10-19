import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserOrdersService } from './user/user-orders/user-orders.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";
import { MobileService } from './product/mobile/mobile.service';
import { isThisTypeNode } from 'typescript';

export type ChartOptions = {
  series: ApexAxisChartSeries ;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  chartOptions: Partial<ChartOptions>|any;

  shippedOrder:any[] =[];
  orderChartByMonthly:any[]= [];

  // DashBoard Data
  shippdOrderCount:number;
  mobileAvailabilityCount:number;
  mobilesTotalWorth:number = 0;
  userCount:number  = 0;


  subscription:Subscription;
  showIndicator = false;
  constructor(private _authService:AuthService, private _userOrders:UserOrdersService, private _mobileData:MobileService) {


  }



  ngOnInit(): void {


  // Chart Data
  setTimeout(()=>{
    this.chartOptions = {
      series: [
        {
          name: "Inflation",
          data: this.orderChartByMonthly
        }
      ],

      chart: {
        toolbar: {
         show: true,
       tools: {
      download: false
          }
        },
        height: 350,
        type: "bar",

      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom

          }
        }
      },
      dataLabels: {
        enabled: true,

        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },


      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,

        }
      },
      title: {
        text: "Monthly Orders Data",
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
   }
  },1000)







    this.subscription =  this._authService.loadingSpinnerLogOut.subscribe((data:any)=>{
      this.showIndicator = data;
    });



    this.shippedOrders();
    this.gettingChartMonthlyData();
    this.gettingDashBoardData();
  }


  shippedOrders(){
    this.subscription = this._userOrders.getPenddingOrders().subscribe((data:any[])=>{
    var filteringOrderData:any[] =  data.filter(a=>a.orderStatus=="Shipped");
   this.shippdOrderCount=  data.filter(a=>a.orderStatus=="Shipped").length;

    this.shippedOrder = filteringOrderData.slice(filteringOrderData.length-5,filteringOrderData.length);
  });
  }

  gettingChartMonthlyData(){
    this.subscription = this._userOrders.chartMonthData().subscribe((data:any)=>{
      this.orderChartByMonthly = data;
    })
  }

  gettingDashBoardData(){

    this.subscription = this._mobileData.getAllMobile().subscribe((data:any[])=>{
      this.mobileAvailabilityCount = data.filter(a=>a.stockAvailiability == true).length;
      for(var allMobilePriceCost of data){
        debugger;
        this.mobilesTotalWorth = this.mobilesTotalWorth + allMobilePriceCost.mobilePrice;
      }
    });

    this.subscription = this._authService.getUserCount().subscribe((countUser:any)=>{
      this.userCount = countUser;
    })

  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
