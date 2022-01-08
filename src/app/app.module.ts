import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { HomeComponent } from './components/home/home.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromStore from './store';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from "primeng/card";
import {DialogModule} from 'primeng/dialog';
import { QuestionsCarouselComponent } from './components/questions-carousel/questions-carousel.component';

@NgModule({
  declarations: [AppComponent, QuestionsComponent, HomeComponent, QuestionsCarouselComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(fromStore.QUESTIONS_FEATURE_KEY, fromStore.reducers),
    EffectsModule.forRoot(),
    EffectsModule.forFeature([fromStore.QuestionsEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    ButtonModule,
    CarouselModule,
    CardModule,
    DialogModule,BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
