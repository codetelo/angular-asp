import { BrowserModule } from "@angular/platform-browser";
import { Component, ViewEncapsulation } from "@angular/core";
import { ILoadedEventArgs, ChartTheme } from "@syncfusion/ej2-angular-charts";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  closeResult: string;
  public chartData: Object[];
  public marker: Object = {
    visible: true,
    height: 10,
    width: 10,
    shape:'Circle'
  };

  public markers: Object[] = [
    {lat:51.678418,lng:7.809007},
    {lat:51.678418,lng:8.809007},
    {lat:52.678418,lng:7.809007},
    {lat:53.678418,lng:7.809007},
    {lat:51.678418,lng:9.809007}
  ]
  
  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.chart.theme = <ChartTheme>(
      (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
        /-dark/i,
        "Dark"
      )
    );
  }
  public title: string;

  public tooltip: Object = {
    enable: true,
    format:'<b>${point.tooltip}</b><br/>Revenue/Expense Ratio: <b>${point.y}</b><br/>Utility: <b>${point.x}%</b>'
  };

  public primaryXAxis: Object = {
    minimum:0,
    maximum:100,
    title: "Utility"
  };
  public primaryYAxis: Object = {
   
    title:"Revenue/Expense Ratio"
  }
  
  constructor(private modalService: NgbModal) {
    this.chartData = [
      { name:'US',revexp: 19.3, util: 15.02 },
      { name:'NM',revexp: 13.6, util: 14.83 },
      { name:'PET-CT',revexp: 12.4, util: 25.31 },
      { name:'XR',revexp: 12.1, util: 30.79 },
      { name:'ROBOT',revexp: 0, util: 43.69 },
      { name:'LINAC',revexp: 13, util: 49.93 },
      { name:'CT',revexp: 22.4, util: 54.26 },
      { name:'MR',revexp: 9.7, util: 66.75 }
    ];
    this.title='Revenue/Expense Ratio vs Utility';

    
  }

  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    }
    
  mapTitle: string = 'Asset Locations';
  lat: number = 52.678418;
  lng: number = 8.809007;

  
}
