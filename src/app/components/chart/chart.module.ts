import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonaComponent } from './dona/dona.component';
import { LineComponent } from './line/line.component';
import { DashedLineComponent } from './dashed-line/dashed-line.component';
import { SplineAreaComponent } from './spline-area/spline-area.component';
import { ColumnChartComponent } from './column-chart/column-chart.component';
import { ColumnLabelsComponent } from './column-labels/column-labels.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineColumnAreaChartComponent } from './line-column-area-chart/line-column-area-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DonaComponent,
    LineComponent,
    DashedLineComponent,
    SplineAreaComponent,
    ColumnChartComponent,
    ColumnLabelsComponent,
    BarChartComponent,
    LineColumnAreaChartComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    DonaComponent,
    LineComponent,
    DashedLineComponent,
    SplineAreaComponent,
    ColumnChartComponent,
    ColumnLabelsComponent,
    BarChartComponent,
    LineColumnAreaChartComponent,
    PieChartComponent
  ]
})
export class ChartModule { }
