/**
 * Interface representing a category.
 */
export interface Category {
  
  /** 
   * The ID of the category. 
   */
  id: string;

  /** 
   * The name of the category. 
   */
  name: string;
  
}

export type CategoryWithoutId = Omit<Category, 'id'>;
