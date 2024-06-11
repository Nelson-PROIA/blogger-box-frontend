import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Category } from '../data/category';
import { Post } from '../data/post';
import { environment } from '../environments/environment';

/**
 * Service to interact with the Category API.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  /** 
   * Base URL for the category API 
   */
  private categoriesURL = `${environment.apiUrl}v1/categories`;

  /**
   * Constructor injecting HttpClient for HTTP requests.
   * 
   * @param {HttpClient} http Angular's HttpClient module.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieve all categories, optionally filtered by name.
   * 
   * @param {string} [name] Optional name to filter categories.
   * @returns {Observable<Category[]>} Observable containing an array of categories.
   */
  getCategories(name?: string): Observable<Category[]> {
    let params = new HttpParams();
    
    if (name) {
      params = params.set('name', name);
    }

    return this.http.get<Category[]>(this.categoriesURL, { params })
      .pipe(
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }

  /**
   * Retrieve a category by its ID.
   * 
   * @param {string} id The ID of the category to retrieve.
   * @returns {Observable<Category>} Observable containing the category.
   */
  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.categoriesURL}/${id}`)
      .pipe(
        catchError(this.handleError<Category>(`getCategoryById id=${id}`))
      );
  }

  /**
   * Create a new category.
   * 
   * @param {string} categoryName The name of the new category.
   * @returns {Observable<Category>} Observable containing the created category.
   */
  createCategory(categoryName: string): Observable<Category> {
    const body = { categoryName };

    return this.http.post<Category>(this.categoriesURL, body)
      .pipe(
        catchError(this.handleError<Category>('createCategory'))
      );
  }

  /**
   * Update the name of a category by its ID.
   * 
   * @param {string} id The ID of the category to update.
   * @param {string} categoryName The new name of the category.
   * @returns {Observable<Category>} Observable containing the updated category.
   */
  updateCategory(id: string, categoryName: string): Observable<Category> {
    const body = { categoryName };

    return this.http.patch<Category>(`${this.categoriesURL}/${id}`, body)
      .pipe(
        catchError(this.handleError<Category>('updateCategory'))
      );
  }

  /**
   * Delete an existing category by its ID.
   * 
   * @param {string} id The ID of the category to delete.
   * @returns {Observable<void>} Observable indicating the result of the delete operation.
   */
  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.categoriesURL}/${id}`)
      .pipe(
        catchError(this.handleError<void>('deleteCategory'))
      );
  }

  /**
   * Retrieve all posts for a specific category by its ID.
   * 
   * @param {string} id The ID of the category to retrieve posts for.
   * @returns {Observable<Post[]>} Observable containing an array of posts for the category.
   */
  getCategoryPosts(id: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.categoriesURL}/${id}/posts`)
      .pipe(
        catchError(this.handleError<Post[]>('getCategoryPosts', []))
      );
  }

  /**
   * Handle HTTP operation failures.
   * 
   * @param {string} operation The name of the operation that failed.
   * @param {T} [result] Optional value to return as the observable result.
   * @returns {Function} A function that returns an observable with the given result.
   */
  protected handleError<T>(operation: string = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);

      return of(result as T);
    };
  }

}
