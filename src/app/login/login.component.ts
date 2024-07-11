import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  private subscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      console.log('Submitting login data:', { username: this.username, password: this.password });

      this.subscription = this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Login successful:', response.message);
            this.router.navigate(['/home']);
          } else {
            console.error('Login failed:', response.message);
            this.errorMessage = 'Login failed. Please check your username and password.';
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Login failed. Please try again later.';
        }
      });
    } else {
      console.error('Invalid form submission');
      // Mark all form controls as touched to display validation messages
      Object.values(loginForm.controls).forEach(control => control.markAsTouched());
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
