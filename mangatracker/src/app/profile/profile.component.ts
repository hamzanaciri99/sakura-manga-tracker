import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../models/User';
import { UserInfoService } from '../services/UserInfoService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userInfoService: UserInfoService) { }

  edit: boolean = false;
  user: User | undefined;

  ngOnInit(): void {
    this.userInfoService.userInfo.pipe(take(1))
      .subscribe((userInfo) => this.user = userInfo?.user);
  }

}
