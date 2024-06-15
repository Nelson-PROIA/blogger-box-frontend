import { ChangeDetectorRef, Component, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core'

import { Post, PostWithoutCreatedDate } from '../../data/post';
import { PostService } from '../../services/post.service';

import { ElementRef } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Category } from '../../data/category';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostListItemComponent } from '../post-list-item/post-list-item.component';
import { Subscription, interval } from 'rxjs';
import { UtilsService } from '../../services/utils.service';

/**
 * Component to display a list of posts.
 */
@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

    posts: Post[] = [];
    categories: Category[] = [];

    categoryFilter!: string | null;
    selectedOption!: string;

    @ViewChildren(PostListItemComponent) postItemComponents!: QueryList<PostListItemComponent>;
    private timerSubscription!: Subscription;

    /**
     * Constructor injecting PostService for fetching posts.
     * 
     * @param {PostService} postService Service to interact with the Post API.
     */
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private postService: PostService,
      private categoryService: CategoryService,
      private utilsService: UtilsService,
      private viewportScroller: ViewportScroller) { }

    /**
     * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
     * Calls the loadPosts method to fetch posts.
     */
    ngOnInit(): void {
      this.categoryFilter = this.route.snapshot.paramMap.get('categoryId');

        this.loadPosts();
        this.loadCategories();

        this.timerSubscription = interval(17)
        .subscribe(() => {
          this.updatePostItemComponents();
        });
    }

    private updatePostItemComponents(): void {
      if (this.postItemComponents) {
        this.postItemComponents.forEach(component => {
          if (component.post && component.post.createdDate) {
            component.formattedCreatedDate = this.utilsService.formatCreatedDate(component.post.createdDate);
          }
        });
      }
    }

    /**
     * Fetches the list of posts from the server.
     */
    loadPosts(): void {
      if (this.categoryFilter) {
        this.selectedOption = this.categoryFilter;
        this.categoryService.getCategoryPosts(this.categoryFilter).subscribe(posts => {
          this.posts = posts;
        });
      } else {
        this.selectedOption = "default";
        this.postService.getPosts().subscribe(posts => {
          this.posts = posts;
        });
      }
    }

    loadCategories(): void {
      this.categoryService.getCategories().subscribe(posts => {
          this.categories = posts;
      });
    }

    @ViewChild('scrollToTop') scrollToTopRef?: ElementRef;
    @ViewChild('scrollToEnd') scrollToEndRef?: ElementRef;

    showTopButton = false;
    showBottomButton = false;
    
    @HostListener('window:scroll')
    checkVisibility() {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
  
      this.showTopButton = scrollTop > 0;
      this.showBottomButton = scrollTop < scrollHeight - clientHeight;
    }
    
      scrollToTop() {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    
      scrollToEnd() {
        this.viewportScroller.scrollToPosition([0, document.body.scrollHeight]);
      }

    onCategoryFilterChange(event: Event): void {
      const selectedValue = (event.target as HTMLSelectElement).value;

      if (selectedValue === "default") {
        this.router.navigate(['/posts'])
      } else {
        this.router.navigate(['/categories', selectedValue, 'posts'])
        console.log('cat cat', this.route.snapshot.paramMap.get('categoryId'))
        this.categoryFilter = selectedValue;
        this.loadPosts();
      }
    }

    deletePost(postId: string) {
      this.posts = this.posts.filter(post => post.id !== postId);
    }

    updatePost(post: Post) {
      const correspondPost = this.posts.find(p => p.id === post.id);

      if (correspondPost) {
        correspondPost.content = post.content;
        correspondPost.title = post.title;
        correspondPost.category.name = post.category.name,
        correspondPost.createdDate = post.createdDate;
      }
    }

}
