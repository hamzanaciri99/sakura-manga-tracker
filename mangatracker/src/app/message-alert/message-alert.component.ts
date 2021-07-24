import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.css']
})
export class MessageAlertComponent implements OnInit{

  constructor() { }
  @Input('message') message: string = '';
  @Input('type') type: 'ERROR' | 'SUCCESS' | 'PENDING' = 'SUCCESS';


  @ViewChild('messageAlert') messageAlert: ElementRef | undefined;
   _show: boolean = false;

  get show() {return this._show}

  @Input('show') set show(show: boolean) {
    this._show = show;
    if(show) {
      const alertDOM: HTMLElement = this.messageAlert?.nativeElement;
      setTimeout(() => {
        alertDOM.classList.add('translate-y-48');
      }, 100);
      
      setTimeout(
        () => {
          alertDOM.classList.remove('translate-y-48');
        }
      , 3000);
    }
  }

  ngOnInit(): void {

  }
}
