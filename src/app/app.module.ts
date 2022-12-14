import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { PlayComponent } from './play/play.component';
import { RecordComponent } from './record/record.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SettingsService } from 'src/services/settingsServices';
import { HTTPServerService } from 'src/services/HTTPServerService';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from 'src/services/AuthInterceptor';
import { GameoverComponent } from './gameover/gameover.component';

@NgModule({
  declarations: [
    AppComponent,
    PreferencesComponent,
    PlayComponent,
    RecordComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    GameoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SettingsService, HTTPServerService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
