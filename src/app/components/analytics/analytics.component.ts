import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../../models/client.model';
import {ClientService} from '../../services/client.service';
import {map} from 'rxjs/operators';
import {ChartData} from '../../models/chart-data.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  chartData: ChartData[];
  selectedMode = ChartMode.AGE;
  readonly Mode = ChartMode;

  private getClientSubscription: Subscription;

  constructor(private clientSvc: ClientService) {
  }

  ngOnInit(): void {
    this.updateChartData();
  }

  /** when the page is initialized, updates the chart data and normalizes it to the type the bar chart expects */
  private updateChartData(): void {
    this.getClientSubscription = this.clientSvc.getClients$()
      .pipe(map((clients: Client[]) => clients.map(
        (client: Client) => this.normalizeBarChartData(client))))
      .subscribe((data: ChartData[]) => this.chartData = data);
  }

  /** accepts client data and transforms it to the type required by the bar chart component (i.e., xVal and yVal).
   * also, if the user selects the mode age or weight, those numerical values are passed on.
   * however, if the user selects friends mode, the number of friends is passed on instead of the names
   * of the friends themselves */
  private normalizeBarChartData(clientData: Client): ChartData {
    if (this.selectedMode === ChartMode.FRIENDS) {
      return { xVal: clientData.name, yVal: clientData.friends.length};
    }
    return { xVal: clientData.name, yVal: clientData[this.selectedMode] };
  }

  /** updates the data to match the mode the user selects.
   * triggered when the user selects the chart mode  */
  handleModeSelected(mode: ChartMode): void {
    this.selectedMode = mode;
    this.updateChartData();
  }

  /** returns whether any clients have been saved.
   * this is used to determine whether to show the graph */
  areClientsPopulated(): boolean {
    return this.chartData.length > 0;
  }

  ngOnDestroy(): void {
    this.getClientSubscription.unsubscribe();
  }
}

enum ChartMode {
  WEIGHT = 'weight',
  AGE = 'age',
  FRIENDS = 'friends'
}
