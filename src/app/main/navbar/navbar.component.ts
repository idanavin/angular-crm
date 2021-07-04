import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output()
  themeEvent: EventEmitter<string> = new EventEmitter<string>();
  isChecked: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const storageTheme = localStorage.getItem('theme')
    if (storageTheme) {
      this.themeEvent.emit(storageTheme);
      this.isChecked = storageTheme === 'dark'
    }
  }

  logout() {
    this.authService.logout();
  }

  toggleTheme($event: MatSlideToggleChange): void {
    this.isChecked = $event.checked
    const mode = this.isChecked ? 'dark' : 'light'
    this.themeEvent.emit(mode);
    localStorage.setItem('theme', mode);
  }

}
