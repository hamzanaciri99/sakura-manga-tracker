import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { MangaService } from '../services/MangaService';

@Component({
  selector: 'app-edit-manga',
  templateUrl: './edit-manga.component.html',
  styleUrls: ['./edit-manga.component.css']
})
export class EditMangaComponent implements OnInit {

  constructor(private mangaService: MangaService) { }

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
    this.mangaService.updateStatus('1', mangaId, status).subscribe(
      result => {
        if(result.status === 'SUCCESS')
          this.editEventEmitter.emit({mangaId, status})
        else console.log('edit failed');
      }
    )
    this.close();
  }
}
