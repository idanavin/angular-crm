import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FormValidator } from '../../shared/form/input/form-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  success: boolean;
  loginError: boolean;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private readonly formValidator: FormValidator,
    private authService: AuthService
  ) {
    this.loginError = false;
    this.success = false;
  }

  ngOnInit(): void {}

  async login() {
    try {
      if (!this.loginForm.valid) {
        this.formValidator.validate(this.loginForm);
        return;
      }

      this.loginError = false;
      this.loading = true;
      await this.authService.login(this.loginForm.value);
      this.success = true;
    } catch (error) {
      this.loginError = true;
    }
    this.loading = false;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
