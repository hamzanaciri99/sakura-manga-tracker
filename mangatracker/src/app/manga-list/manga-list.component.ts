import { Component, OnInit } from '@angular/core';
import { concat, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Manga } from '../models/Manga';
import { MangaService } from '../services/MangaService';
import { UserInfoService } from '../services/UserInfoService';

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.css']
})
export class MangaListComponent implements OnInit {


  mangaList: Manga[] = [];

  search = '';
  filter = '';
  sort: 'title'|'unread' = 'title';
  comparator = {
    'title': (m1: Manga, m2: Manga) => {
      if(m1.title == null) return -1;
      return m1.title.localeCompare(m2.title)
    },
    'unread': function(m1: Manga, m2: Manga) {
      if(m1.lastRead < m1.lastChapter) return -1;
      if(m2.lastRead < m2.lastChapter) return 1;
      return 0;
    }
  };

  editMangaId = '';

  constructor(private mangaService: MangaService, private userInfoService: UserInfoService) { }

  addMangaHidden = true;
  editMangaHidden = true;


  closeAddMangaPopup($event: boolean) {
    this.addMangaHidden = $event;
  }

  closeEditMangaPopup($event: boolean) {
    this.editMangaHidden = $event;
  }


  _selectAll: boolean = false;

  set selectAll(selectAll: boolean) {
    this._selectAll = selectAll;
    this.getFilteredMangaList().forEach(manga => manga.selected = selectAll);
  }


  alert: {
    message: string,
    show: boolean,
    type: 'ERROR' | 'SUCCESS' | 'PENDING'
  } = {
    message: '',
    show: false,
    type: 'ERROR'
  }


  showDeleteMulti() {
    return this.mangaList.find(m => m.selected) != undefined;
  }

  DeleteMulti() {
    this.userInfoService.userInfo.pipe(take(1)).subscribe(
      (userInfo) => {
        let deleteObservables = this.getFilteredMangaList()
        .filter(manga => manga.selected)
        .map(selectedManga => this.mangaService.delete(userInfo?.user.id || 0, selectedManga.mangaId));
      
        concat(...deleteObservables)
          .pipe(catchError(err => of({status: 'ERROR'})))
          .subscribe(
            result => {
              if(result.status === 'SUCCESS')
                this.showAlert('Deleted successfully', 'SUCCESS');
              else {
                this.showAlert('Couldn\'t delete manga', 'ERROR');
              };
            }
          );
      }
    );

    this.mangaList = this.mangaList.filter(manga => !manga.selected);
  }


  ngOnInit(): void {
    this.fetchMangaList();
  }

  onMarkAsRead(mangaId: string, lastRead: string | number) {
    let manga = this.mangaList.find(manga => manga.mangaId == mangaId);
    this.userInfoService.userInfo.pipe(take(1)).subscribe(
      (userInfo) => {
        if(userInfo) {
          this.mangaService.updateLastChapter(userInfo.user.id, mangaId, lastRead)
          .pipe(catchError(err => of({status: 'ERROR'})))
          .subscribe(
            result => {
              if(result.status === 'SUCCESS' && manga)  {
                this.showAlert('Manga updated successfully', 'SUCCESS');
                manga.lastRead = +lastRead;
              }
              else this.showAlert('Mark as read failed', 'ERROR');
            }
          );
        }
      }
    );
    
  }

  onEdit($event: {mangaId: string, status: string}) {
    let manga = this.mangaList.find(manga => manga.mangaId == $event.mangaId);
    if(manga) manga.status = $event.status;
  }

  onDelete(mangaId: string) {
    this.userInfoService.userInfo.pipe(take(1)).subscribe(
      (userInfo) => {
        if(userInfo) {
          this.mangaService.delete(userInfo.user.id, mangaId)
          .pipe(catchError(err => of({status: 'ERROR'})))
          .subscribe(
            result => {
              if(result.status === 'SUCCESS') {
                this.showAlert('Deleted successfully', 'SUCCESS');
                this.mangaList.splice(this.mangaList.findIndex(manga => manga.mangaId == mangaId), 1);
              }
              else this.showAlert('Couldn\'t delete manga', 'ERROR');
            }
          );
        }
      }
    );
  }

  async fetchMangaList() {
    this.userInfoService.userInfo.pipe(take(1)).subscribe(
      (userInfo) => {
        if(userInfo) {
          this.mangaService.getUserManga(userInfo.user.id)
          .pipe(catchError(err => {
            this.showAlert('Couldn\'t fetch manga', 'ERROR');
            return of([]);
          }))
          .subscribe(mangaList => {
            this.mangaList = mangaList;
          });
        }
      }
    );
  }

  getFilteredMangaList() {
    let mangaList : Manga[] = [];
    // Filter list
    if(this.filter == '') mangaList = this.mangaList;
    else mangaList = this.mangaList.filter(manga  => manga.status == this.filter);

    //Search
    return mangaList.filter(
      manga => manga.title != null
        && manga.title.toLowerCase().indexOf(this.search.toLowerCase()) != -1
    );
  }

  showAlert(message: string, type: 'ERROR' | 'PENDING' | 'SUCCESS') {
    this.alert.message = message;
    this.alert.show = true;
    this.alert.type = type;

    setTimeout(() => this.alert.show = false, 200);
  }
}
