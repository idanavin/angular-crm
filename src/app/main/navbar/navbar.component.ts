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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const storageTheme = localStorage.getItem('theme')
    if (storageTheme) this.themeEvent.emit(storageTheme)
  }

  logout() {
    this.authService.logout();
  }

  toggleTheme($event: MatSlideToggleChange): void {
    const mode = $event.checked ? 'dark' : 'light'
    this.themeEvent.emit(mode);
    localStorage.setItem('theme', mode);
  }

}
