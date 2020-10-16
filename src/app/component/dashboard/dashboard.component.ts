import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  chart: am4charts.XYChart;

  constructor(private zone: NgZone) {
    am4core.useTheme(am4themes_animated);
  }

  ngOnInit() {
    var chart = am4core.create("chartdiv", am4charts.PieChart);

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(50);
    pieSeries.colors.list = [
      am4core.color('#5392ff'),
      am4core.color('#95d13c'),
      am4core.color('#fe8500'),
      am4core.color('#FFD65A'),
      am4core.color('#8FF58C'),
      am4core.color('#00D4F4'),
      am4core.color('#9b82f3'),
      am4core.color('#34bc6e'),
      am4core.color('#FC585C'),
      am4core.color('#00E9C1'),
      am4core.color('#FFB15A'),
      am4core.color('#00CBDF')
    ];

    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.hidden = true;
    pieSeries.tooltip.disabled = true;
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [{
      "country": "Lithuania",
      "litres": 501.9
    }, {
      "country": "Germany",
      "litres": 165.8
    }, {
      "country": "Australia",
      "litres": 139.9
    }, {
      "country": "Austria",
      "litres": 128.3
    }, {
      "country": "UK",
      "litres": 99
    }, {
      "country": "Belgium",
      "litres": 60
    }];
  }
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
