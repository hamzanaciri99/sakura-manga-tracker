import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { UserInfoService } from '../services/UserInfoService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  intervalId: any;

  username: string = '';
  password: string = '';

  error: string = ''

  constructor(private authService: AuthService,
    private userInfoService: UserInfoService, private router: Router) { }


  onLogin() {
    this.authService.login(this.username, this.password).subscribe(loginResponse => {
      if(loginResponse.jwtToken) {
        this.userInfoService.register(loginResponse);
        this.router.navigate(['/dashboard/manga-list']);
      } else {
        this.error = 'Bad Credentials';
      }
    });
  }

  ngOnInit(): void {
    this.intervalId = this.letItRain();
  }

  ngOnDestroy(): void {
    if(this.intervalId) clearInterval(this.intervalId);
  }

  letItRain() {
    let leafs: HTMLElement[] = [];
    let body = document.getElementsByTagName('body')[0];

    for(let i = 0; i < 10; ++i) {
      let img = document.createElement('img');
      img.src = 'assets/img/sakura.png';
      img.className = 'h-8';
    
      let leaf = document.createElement('div');
      leaf.className = 'absolute transition ease-in transition-transform z-0';
      leaf.append(img);

      leaf.style.setProperty('display', 'none');
      leafs.push(leaf);
      body.append(leaf);
    }

    return setInterval(function() {
      if(leafs.length > 0) {
        let leaf = leafs.pop() || new HTMLElement();

        leaf.style.setProperty('display', 'block');
        leaf.style.setProperty('top', '-50px');
        leaf.style.setProperty('left', `${Math.random() * 100}%`);
        leaf.style.setProperty('opacity','0%');
    
        setTimeout(function() {
          if(Math.random() > 0.5)
            leaf.style.setProperty('transform', 'translateY(98vh) translateX(-200px) rotate(360deg)');
          else leaf.style.setProperty('transform', 'translateY(98vh) translateX(200px) rotate(360deg)');
          leaf.style.setProperty('transition-duration', '1500ms');
          leaf.style.setProperty('opacity', '75%');
          setTimeout(function() {
            leaf.style.removeProperty('transform');
            leaf.style.setProperty('display', 'none');
            leafs.push(leaf);
          }, 1500);
        }, 1500);
      }
    }, 500);
  }

}
