import { Component } from '@angular/core'

import { PostService } from '../../services/post.service';
import { Post } from '../../data/post';

/**
 * Component to display a list of posts.
 */
@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

    /** 
     * Array to store the list of posts. 
     */
    posts: Post[] = [];

    /**
     * Constructor injecting PostService for fetching posts.
     * 
     * @param {PostService} postService Service to interact with the Post API.
     */
    constructor(private postService: PostService) { }

    /**
     * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
     * Calls the loadPosts method to fetch posts.
     */
    ngOnInit(): void {
        this.loadPosts();
    }

    /**
     * Fetches the list of posts from the server.
     */
    loadPosts(): void {
        this.postService.getPosts().subscribe(posts => {
            this.posts = posts;
        });
    }
    
}
