import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddMangaComponent } from './add-manga/add-manga.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditMangaComponent } from './edit-manga/edit-manga.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CacheInterceptor } from './interceptors/CacheInterceptor';
import { JwtTokenInterceptor } from './interceptors/JwtTokenInterceptor';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { MangaListComponent } from './manga-list/manga-list.component';
import { MessageAlertComponent } from './message-alert/message-alert.component';
import { ProfileFieldComponent } from './profile/field/field.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';


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
    MessageAlertComponent,
    ProfileComponent,
    ProfileFieldComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
