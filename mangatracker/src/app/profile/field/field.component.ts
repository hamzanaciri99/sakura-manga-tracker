import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { LoginResponse } from "src/app/models/LoginResponse";
import { Response } from "src/app/models/Response";
import { AuthService } from "src/app/services/AuthService";
import { UserInfoService } from "src/app/services/UserInfoService";
import { ICONS } from "./icons";

@Component({
  selector: 'app-profile-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  host: {'class': 'grid grid-cols-5 items-center'}
})
export class ProfileFieldComponent implements OnInit, AfterViewInit {
  
  constructor(private authService: AuthService, private userInfoService: UserInfoService) { }

  @Input('value') value: string = '';
  @Input('_type') type: string = 'text';
  @Input('name') name: 'fullName' | 'email' | 'username' | 'password' | 'none' = 'none';

  @ViewChild('icon') icon: ElementRef | undefined;

  ngAfterViewInit(): void {
    (<HTMLElement>this.icon?.nativeElement).innerHTML = ICONS[this.name];
  }

  edit: boolean = false;

  alert: {
    message: string,
    show: boolean,
    type: 'ERROR' | 'SUCCESS' | 'PENDING'
  } = {
    message: '',
    show: false,
    type: 'ERROR'
  }

  ngOnInit(): void {

  }

  onButtonClick() {
    if(!this.edit) {
      this.edit = true;
    } else {
      if(this.value.trim() == '') {
        this.showAlert(`${this.name} can't be empty!`, 'PENDING');
        this.edit = false;
        return;
      }
      this.userInfoService.userInfo.pipe(take(1))
      .subscribe(
        (userInfo) => {
          this.authService
            .updateUserInfo(userInfo?.user.id || 0, this.name, this.value)
            .pipe(catchError(() => of({status: 'ERROR'} as Response)))
            .subscribe(result => {
              if(result.status == 'SUCCESS') {
                this.updateUserInfo(userInfo || {} as LoginResponse);
                this.showAlert(`${this.name} updated successfully`, 'SUCCESS');
              } else {
                this.showAlert(`${this.name} update failed!`, 'ERROR')
              }

              setTimeout(() => this.alert.show = false, 200);
            })
        }
      );
      this.edit = false;
    }
  }

  showAlert(message: string, type: 'ERROR' | 'PENDING' | 'SUCCESS') {
    this.alert.message = message;
    this.alert.show = true;
    this.alert.type = type;

    setTimeout(() => this.alert.show = false, 200);
  }

  updateUserInfo(userInfo: LoginResponse) {
    let updatedUserInfo = userInfo;
    if(this.name != 'none')
      updatedUserInfo.user[this.name] = this.value;
    this.userInfoService.register(updatedUserInfo);
  }
}
