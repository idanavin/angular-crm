import { Component, Input, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;

  constructor(private dataService: DataService) { 
  }

  ngOnInit(): void {
    this.getLocalUser();
  }

  getLocalUser() {
    const userEmail = localStorage.getItem('userEmail')
    let user;
    if (userEmail) {
      user = this.dataService.getUserByEmail(userEmail)
      if (user) {
        this.user = user
      }
    }
  }

}
