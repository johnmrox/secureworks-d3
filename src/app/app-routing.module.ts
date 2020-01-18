import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnalyticsComponent} from './components/analytics/analytics.component';
import {ClientComponent} from './components/client/client.component';

const routes: Routes = [
  {path: '', redirectTo: '/clients', pathMatch: 'full'},
  {path: 'clients', component: ClientComponent},
  {path: 'analytics', component: AnalyticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
