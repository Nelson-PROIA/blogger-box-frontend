import { Category } from "./category";

/**
 * Interface representing a post.
 */
export interface Post {
    /** 
     * The ID of the post. 
     */
    id: string;

    /** 
     * The title of the post. 
     */
    title: string;

    /** 
     * The content of the post. 
     */
    content: string;

    /**
     * The creation date of the post. 
     */
    createdDate: Date;

    /** 
     * The category of the post. 
     */
    category: Category;
    
}
