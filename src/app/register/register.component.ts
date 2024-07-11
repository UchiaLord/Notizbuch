import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(registerForm: NgForm): void {
    if (registerForm.valid) {
      console.log('Submitting data:', this.model);

      this.authService.register(this.model).subscribe({
        next: (response) => {
          console.log('Registration successful:', response.message);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
        }
      });
    } else {
      console.error('Invalid form submission');
      Object.keys(registerForm.controls).forEach(controlName => {
        const control = registerForm.controls[controlName];
        control.markAsTouched();
      });
    }
  }
}
