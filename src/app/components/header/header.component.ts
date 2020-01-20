import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /** navigate to the Analytics component */
  navigateToAnalytics(): void {
    this.router.navigate(['/analytics']);
  }

  /** navigate to the Client component */
  navigateToClients(): void {
    this.router.navigate(['/clients']);
  }

  /** navigate to the home component */
  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
