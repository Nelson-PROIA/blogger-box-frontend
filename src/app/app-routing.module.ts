import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './components/post-list/post-list.component';
import { WritePostFormComponent } from './components/write-post-form/write-post-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', component: PostListComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/:categoryId/posts', component: PostListComponent },
  { path: 'write-post', component: WritePostFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
