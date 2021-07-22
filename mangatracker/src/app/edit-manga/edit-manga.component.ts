import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, take } from 'rxjs/operators';
import { MangaService } from '../services/MangaService';
import { UserInfoService } from '../services/UserInfoService';

@Component({
  selector: 'app-edit-manga',
  templateUrl: './edit-manga.component.html',
  styleUrls: ['./edit-manga.component.css']
})
export class EditMangaComponent implements OnInit {

  constructor(private mangaService: MangaService, private userInfoService: UserInfoService) { }

  status: string = '';
  @Input('hidden') hidden = true;
  @Input('mangaId') mangaId = '';
  @Output('onClose') closeEventEmitter = new EventEmitter<boolean>();
  @Output('onEdit') editEventEmitter = new EventEmitter<{mangaId: string, status: string}>();

  ngOnInit(): void {
  }


  close() {
    this.status = '';
    this.closeEventEmitter.emit(true);
  }

  edit(mangaId: string, status: string) {
    this.userInfoService.userInfo.pipe(take(1)).subscribe(
      userInfo => {
        if(userInfo) {
          this.mangaService.updateStatus(userInfo.user.id, mangaId, status).subscribe(
            result => {
              if(result.status === 'SUCCESS')
                this.editEventEmitter.emit({mangaId, status})
              else console.log('edit failed');
            }
          );
        }
      }
    );
    this.close();
  }
}
