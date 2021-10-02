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
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private readonly formValidator: FormValidator,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  loginAsync = () => this.login();

  private async login() {
    if (!this.loginForm.valid) {
      this.formValidator.validate(this.loginForm);
      return;
    }

    return await this.authService.login(this.loginForm.value);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
