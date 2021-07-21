import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnDestroy(): void {
    if(this.intervalId) clearInterval(this.intervalId);
  }

  intervalId: any;

  ngOnInit(): void {
    this.intervalId = this.letItRain();
  }

  letItRain() {
    let leafs: HTMLElement[] = [];
    let body = document.getElementsByTagName('body')[0];

    for(let i = 0; i < 10; ++i) {
      let img = document.createElement('img');
      img.src = 'assets/img/sakura.png';
      img.className = 'h-8';
    
      let leaf = document.createElement('div');
      leaf.className = 'absolute transition ease-in transition-transform z-10';
      leaf.append(img);

      leaf.style.setProperty('display', 'block');
      leafs.push(leaf);
      body.append(leaf);
    }

    return setInterval(function() {
      if(leafs.length > 0) {
        let leaf = leafs.pop() || new HTMLElement();

        leaf.style.setProperty('display', 'block');
        leaf.style.setProperty('top', '0');
        leaf.style.setProperty('left', `${Math.random() * 100}%`);
        leaf.style.setProperty('opacity','0%');
    
        setTimeout(function() {
          leaf.style.setProperty('transform', 'translateY(98vh) rotate(360deg)');
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
