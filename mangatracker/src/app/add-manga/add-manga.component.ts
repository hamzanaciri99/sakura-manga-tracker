import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Manga } from '../models/Manga';
import { MangaService } from '../services/MangaService';

@Component({
  selector: 'app-add-manga',
  templateUrl: './add-manga.component.html',
  styleUrls: ['./add-manga.component.css']
})
export class AddMangaComponent implements OnInit {

  constructor(private mangaService: MangaService) { }

  _searchKeyword: string = '';
  searchKeywordListner = new BehaviorSubject(this.searchKeyword);

  set searchKeyword(value: string) {
    this._searchKeyword = value;
    this.searchKeywordListner.next(this._searchKeyword);
  }

  get searchKeyword() {
    return this._searchKeyword;
  }

  status: string = '';
  selectedManga: Manga | undefined;
  mangaList: Array<Manga> = [];

  hideList = true;

  @Input('hidden') hidden = true;
  @Output('onClose') closeEventEmitter = new EventEmitter<boolean>();
  @Output('onAdd') addEventEmitter = new EventEmitter<void>();

  ngOnInit(): void {
    this.searchKeywordListner
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(title => {
        if(title)
          this.mangaService.search(title).subscribe(ml => this.mangaList = ml)
      });
  }

  close() {
    this.searchKeyword = '';
    this.status = '';
    this.closeEventEmitter.emit(true);
  }


  add() {
    if(this.selectedManga && this.status != '') {
      this.mangaService.add('1', this.selectedManga?.mangaId, this.status).subscribe(result => this.addEventEmitter.emit());
    }
      
    this.close();
  }

  selectManga(index: number) {
    this.selectedManga = this.mangaList[index];
    this.searchKeyword = this.selectedManga.title;
    this.hideList = true;
  }

  cancelSelect() {
    if(this.selectedManga) this.searchKeyword = this.selectedManga.title;
    this.hideList = true;
  }

}
