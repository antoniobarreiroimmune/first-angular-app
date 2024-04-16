import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email as string;
      const password = this.loginForm.value.password as string;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login success', response);
          
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }
  }
}
