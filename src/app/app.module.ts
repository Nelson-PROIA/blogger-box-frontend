import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostService } from './services/post.service';
import { CategoryService } from './services/category.service';

import { ModalService } from './services/modal.service';
import { ConfirmationModalService } from './services/confirmation-modal.service';

import { TopBarComponent } from './components/top-bar/top-bar.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { ConfirmationModalComponent } from './components/confirm-modal/confirmation-modal.component';
import { WritePostFormComponent } from './components/write-post-form/write-post-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { EditPostModalComponent } from './components/edit-post-modal/edit-post-modal.component';
import { CompletePostFormComponent } from './components/forms/complete-post-form/complete-post-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryListItemComponent } from './components/category-list-item/category-list-item.component';
import { ToastService } from './services/toast.service';
import { EditCategoryModalComponent } from './components/edit-category-modal/edit-category-modal.component';
import { CompleteCategoryFormComponent } from './components/forms/complete-category-form/complete-category-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PostListComponent,
    PostListItemComponent,
    WritePostFormComponent,
    ModalComponent,
    ConfirmationModalComponent,
    EditPostModalComponent,
    CompletePostFormComponent,
    CategoryListComponent,
    CategoryListItemComponent,
    EditCategoryModalComponent,
    CompleteCategoryFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    PostService,
    CategoryService,
    ConfirmationModalService,
    ModalService,
    ToastService,
    DatePipe,
    provideAnimationsAsync()
  ],
  exports: [WritePostFormComponent],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
