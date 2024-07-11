import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}

  showNavbar(): boolean {
    // Implement logic to determine when to show the navbar
    // For example, show navbar only when not on the login page
    return (
      !this.router.url.includes('/login') &&
      !this.router.url.includes('/register')
    );
  }
}
