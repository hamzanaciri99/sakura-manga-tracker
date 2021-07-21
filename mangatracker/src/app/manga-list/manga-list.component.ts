import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Manga } from '../models/Manga';
import { MangaService } from '../services/MangaService';

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
      if(m2.lastRead < m2.lastChapter)return 1;
      return 0;
    }
  };

  editMangaId = '';

  constructor(private mangaService: MangaService) { }

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

  showDeleteMulti() {
    return this.mangaList.find(m => m.selected) != undefined;
  }

  DeleteMulti() {
    let deleteObservables = this.getFilteredMangaList()
      .filter(manga => manga.selected)
      .map(selectedManga => this.mangaService.delete('1', selectedManga.mangaId));
    
    concat(...deleteObservables).subscribe(
      result => {
        if(result.status === 'SUCCESS')
          console.log("deleted!");
        else console.log('delete failed');
      }
    )

    this.mangaList = this.mangaList.filter(manga => !manga.selected);
  }


  ngOnInit(): void {
    this.fetchMangaList();
  }

  onMarkAsRead(mangaId: string, lastRead: string | number) {
    let manga = this.mangaList.find(manga => manga.mangaId == mangaId);
    this.mangaService.updateLastChapter('1', mangaId, lastRead).subscribe(
      result => {
        if(result.status === 'SUCCESS' && manga) 
          manga.lastRead = +lastRead;
        else console.log('mark as read failed');
      }
    );
  }

  onEdit($event: {mangaId: string, status: string}) {
    let manga = this.mangaList.find(manga => manga.mangaId == $event.mangaId);
    if(manga) manga.status = $event.status;
  }

  onDelete(mangaId: string) {
    this.mangaService.delete('1', mangaId).subscribe(
      result => {
        if(result.status === 'SUCCESS')
          this.mangaList.splice(this.mangaList.findIndex(manga => manga.mangaId == mangaId), 1);
        else console.log('delete failed');
      }
    );
  }

  async fetchMangaList() {
    this.mangaService.getUserManga('1').subscribe(mangaList => {
      this.mangaList = mangaList;
    });
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


}
