import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { MangaListComponent } from './manga-list/manga-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/AuthService';
import { HttpClientModule } from '@angular/common/http';
import { AddMangaComponent } from './add-manga/add-manga.component';
import { EditMangaComponent } from './edit-manga/edit-manga.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LandingPageComponent,
    HeaderComponent,
    MangaListComponent,
    LoginComponent,
    SignupComponent,
    AddMangaComponent,
    EditMangaComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
