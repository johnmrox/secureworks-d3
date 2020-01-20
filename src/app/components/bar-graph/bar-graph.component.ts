import {Component, OnInit, Input, ViewChild, ElementRef, OnChanges, AfterViewInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';
import {ChartData} from '../../models/chart-data.model';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarGraphComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('chart', {static: false}) chartRef: ElementRef;
  @Input() data: ChartData[];

  // constants
  private readonly MARGIN_TOP = 20;
  private readonly MARGIN_RIGHT = 20;
  private readonly MARGIN_BOTTOM = 30;
  private readonly MARGIN_LEFT = 40;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(): void {
    if (!this.data || !this.chartRef) {
      return;
    }
    this.createChart();
  }

  ngAfterViewInit(): void {
    if (!this.data || !this.chartRef) {
      return;
    }
    this.createChart();
  }

  /** create the bar chart and applies styling.
   * the size is recalculated with every window resize event */
  private createChart(): void {
    this.removeSvg();

    const chartElement = this.chartRef.nativeElement;

    const svg = d3.select(chartElement).append('svg')
      .attr('width', chartElement.offsetWidth)
      .attr('height', chartElement.offsetHeight);

    const width = chartElement.offsetWidth - this.MARGIN_LEFT - this.MARGIN_RIGHT;
    const height = chartElement.offsetHeight - this.MARGIN_TOP - this.MARGIN_BOTTOM;

    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.2)
      .domain(this.data.map(d => d.xVal));

    const y = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(this.data, d => d.yVal)]);

    const g = svg.append('g')
      .attr('transform', `translate(${this.MARGIN_LEFT}, ${this.MARGIN_TOP})`);

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickFormat(d3.format('d')));

    g.selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.xVal))
      .attr('y', d => y(d.yVal))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.yVal));
  }

  /** removes any previous instances to ensure there are no duplicates */
  private removeSvg(): void {
    d3.select('svg').remove();
  }

  /** re-creates chart when the screen size changes */
  handleResize(event: Event): void {
    this.createChart();
  }
}
