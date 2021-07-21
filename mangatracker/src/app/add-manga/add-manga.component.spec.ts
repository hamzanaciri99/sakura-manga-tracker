import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMangaComponent } from './add-manga.component';

describe('AddMangaComponent', () => {
  let component: AddMangaComponent;
  let fixture: ComponentFixture<AddMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMangaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
