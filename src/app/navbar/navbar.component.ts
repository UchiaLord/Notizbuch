import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Adjust the path as needed

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout(): void {
    this.authService.logout().subscribe(response => {
      if (response.success) {
        this.isLoggedIn = false;
        // Optionally redirect or perform other actions on successful logout
      } else {
        // Handle logout failure
        console.error('Logout failed:', response.message);
      }
    });
  }
}
