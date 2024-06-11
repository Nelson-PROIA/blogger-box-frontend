import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { PostService } from './services/post.service';
import { CategoryService } from './services/category.service';

import { TopBarComponent } from './components/top-bar/top-bar.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PostListComponent,
    PostListItemComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PostService,
    CategoryService,
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
