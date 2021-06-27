import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interface/user';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loading: boolean = false;
  registerError: boolean = false;
  @Output() success = new EventEmitter<boolean>(false);

  registerForm: FormGroup = this.fb.group({
    firstName: ['', [
      Validators.required,
      Validators.minLength(1)
    ]],
    lastName: ['', [
      Validators.required,
      Validators.minLength(1)
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    age: ['', [
      Validators.required,
      Validators.min(18)
    ]]
  });

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
  }

  async register() {
    try {
      this.registerError = false;
      this.loading = true;
      const user: User = {... this.registerForm.value, token: null}
      this.dataService.insertUser = user;
      this.success.emit(true);
    } catch (error) {
      this.registerError = true;
    }
    this.loading = false;
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get age() {
    return this.registerForm.get('age')
  }

}
