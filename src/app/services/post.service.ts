import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Post, PostCreation, PostWithoutCreatedDate } from '../data/post';
import { environment } from '../environments/environment';

/**
 * Service to interact with the Post API.
 */
@Injectable({
  providedIn: 'root'
})
export class PostService {

  /** 
   * Base URL for the post API 
   */
  private postsURL = `${environment.apiUrl}v1/posts`;

  /**
   * Constructor injecting HttpClient for HTTP requests.
   * 
   * @param {HttpClient} http - Angular's HttpClient module.
   */
  constructor(private http: HttpClient) {}

  /**
   * Retrieve all posts ordered by creation date.
   * 
   * @param {string} [topic] - Optional topic to filter posts.
   * @returns {Observable<Post[]>} - Observable containing an array of posts.
   */
  getPosts(topic?: string): Observable<Post[]> {
    let params = new HttpParams();

    if (topic) {
      params = params.set('topic', topic);
    }

    return this.http.get<Post[]>(this.postsURL, { params })
      .pipe(
        catchError(this.handleError<Post[]>('getPosts', []))
      );
  }

  /**
   * Retrieve a single post by its ID.
   * 
   * @param {string} postId - ID of the post to retrieve.
   * @returns {Observable<Post>} - Observable containing the post.
   */
  getPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.postsURL}/${postId}`)
      .pipe(
        catchError(this.handleError<Post>('getPost'))
      );
  }

  /**
   * Create a new post.
   * 
   * @param {string} postTitle - Title of the new post.
   * @param {string} postContent - Content of the new post.
   * @param {string} postCategoryId - Category ID of the new post.
   * @returns {Observable<Post>} - Observable containing the created post.
   */
  createPost(post: PostCreation): Observable<Post> {
    const body = post;

    return this.http.post<Post>(this.postsURL, body)
      .pipe(
        catchError(this.handleError<Post>('createPost'))
      );
  }

  /**
   * Update an existing post.
   * 
   * @param {string} id - ID of the post to update.
   * @param {string} postTitle - Updated title of the post.
   * @param {string} postContent - Updated content of the post.
   * @param {string} postCategoryId - Updated category ID of the post.
   * @returns {Observable<Post>} - Observable containing the updated post.
   */
  updatePost(post: PostWithoutCreatedDate): Observable<Post> {
    const body = { title: post.title, content: post.content, categoryId: post.categoryId };

    return this.http.put<Post>(`${this.postsURL}/${post.id}`, body)
      .pipe(
        catchError(this.handleError<Post>('updatePost'))
      );
  }

  /**
   * Delete an existing post.
   * 
   * @param {string} id - ID of the post to delete.
   * @returns {Observable<void>} - Observable indicating the result of the delete operation.
   */
  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.postsURL}/${id}`)
      .pipe(
        catchError(this.handleError<void>('deletePost'))
      );
  }

  /**
   * Handle HTTP operation failures.
   * 
   * @param {string} [operation='operation'] - The name of the operation that failed.
   * @param {T} [result] - Optional value to return as the observable result.
   * @returns {Function} - A function that returns an observable with the given result.
   */
  private handleError<T>(operation: string = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);

      return of(result as T);
    };
  }

}
