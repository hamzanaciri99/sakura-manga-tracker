import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take, takeWhile } from 'rxjs/operators';
import { UserInfoService } from '../services/UserInfoService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, private userInfoService: UserInfoService) {
    this.userInfoService.userInfo.subscribe(
      userInfo => {
        if(userInfo) {
          this.fullname = userInfo?.user.fullName || ''
        }
      }
    );
  }

  fullname: string = '';

  ngOnInit(): void {
    
  }

  handleProfileClick(list: HTMLDivElement) {
    if(list.classList.contains('hidden')) list.classList.remove('hidden');
    else list.classList.add('hidden');
  }

  onLogout() {
    this.userInfoService.clear();
    this.router.navigate(['/']);
  }
}
